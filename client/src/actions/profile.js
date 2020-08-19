import axios from "axios";
import { setAlert } from './alert';
import { GET_PROFILE, PROFILE_ERR, CLEAR_PROFILE, DELETE_ACC, GET_PROFILES, LOGOUT } from './types';

// get current profile

export const getMyProfile = () => async dispatch => {
    try {
        const res = await axios.get('/api/profile/me');
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: PROFILE_ERR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}

// get all profiles

export const getAllProfiles = () => async dispatch => {
    dispatch({ type: CLEAR_PROFILE });
    try {
        const res = await axios.get('/api/profile');
        dispatch({
            type: GET_PROFILES,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: PROFILE_ERR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}

// get profile by id

export const getProfileById = userId => async dispatch => {
    try {
        const res = await axios.get(`/api/profile/user/${userId}`);
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: PROFILE_ERR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}


// create/ update profile

export const createProfile = (formData, history, edit = false) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const res = await axios.post('/api/profile', formData, config);

        dispatch({
            type: GET_PROFILE,
            payload: res.data
        });

        dispatch(setAlert(edit ? 'Profile updated' : 'Profile created', 'success'));

        if (!edit) {
            history.push('/profile');
        }
    } catch (err) {
        const errors = err.response.data.errors;

        if (errors) {
            errors.forEach(x => dispatch(setAlert(x.msg, 'error')))
        }
        dispatch({
            type: PROFILE_ERR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}

// delete acc and profile

export const deleteProfile = () => async dispatch => {
    if (window.confirm('This actions cannot be undone. Proceed to delete all of your information?')) {
        try {
            await axios.delete('/api/profile');

            dispatch({ type: CLEAR_PROFILE });
            dispatch({ type: DELETE_ACC });
            dispatch({ type: LOGOUT })
            dispatch(setAlert('Account has been permanently deleted'), 'error');
        } catch (err) {
            dispatch({
                type: PROFILE_ERR,
                payload: { msg: err.response.statusText, status: err.response.status }
            });
        }
    }
}