import axios from 'axios';
import { REG_SUCCESS, REG_FAIL } from './types';
import { setAlert } from './alert';

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
        })
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