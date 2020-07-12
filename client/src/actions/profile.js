import axios from "axios";
import setAlert from './alert';
import { GET_PROFILE, PROFILE_ERR } from './types';

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