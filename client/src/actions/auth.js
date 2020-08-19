import axios from 'axios';
import {
    REG_SUCCESS,
    REG_FAIL,
    AUTH_SUCCESS,
    AUTH_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    CLEAR_PROFILE,
    CLEAR_AIM,
} from './types';
import { setAlert } from './alert';
import setToken from '../utils/setAuthToken';

//register

export const register = ({ name, email, password }) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({ name, email, password });

    try {
        const res = await axios.post('/api/users', body, config);
        dispatch({
            type: REG_SUCCESS,
            payload: res.data
        });
        dispatch(loadUser());
    } catch (err) {
        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach(x => dispatch(setAlert(x.msg, 'error'))); // change error to dynamic styling class
        }
        dispatch({
            type: REG_FAIL
        })
    }
}

// load user

export const loadUser = () => async dispatch => {
    // check cache for token
    if (localStorage.token) {
        setToken(localStorage.token);
    }
    // authenticate user
    try {
        const res = await axios.get('/api/auth');
        dispatch({
            type: AUTH_SUCCESS,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: AUTH_FAIL
        })
    }
}

// login

export const login = (email, password) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({ email, password });

    try {
        const res = await axios.post('/api/auth', body, config);
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        });
        dispatch(loadUser());
    } catch (err) {
        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach(x => dispatch(setAlert(x.msg, 'error'))); // change error to dynamic styling class
        }
        dispatch({
            type: LOGIN_FAIL
        })
    }
}

// log out

export const logout = () => async dispatch => {
    dispatch({ type: CLEAR_PROFILE });
    dispatch({ type: LOGOUT });
    dispatch({ type: CLEAR_AIM });
}