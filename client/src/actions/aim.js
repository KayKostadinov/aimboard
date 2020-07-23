import axios from 'axios';
import { setAlert } from './alert';
import { GET_AIM, AIM_ERR} from './types';

// get aims for current profile

export const getAims = () => async dispatch => {
    try {
        const res = await axios.get('/api/aim');
        dispatch({
            type: GET_AIM,
            payload: res.data
        })

    } catch (err) {
        dispatch({
            type: AIM_ERR,
            payload: {msg: err.response.statusText, status: err.response.status}
        })
    }
}

// create aim

export const createAim = formData => async dispatch => {
    try {
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }

        const res = await axios.post('/api/aim', formData, config);

        dispatch({
            type: GET_AIM,
            payload: res.data
        });        

    } catch (err) {
        const errors = err.response.data.errors;
        if(errors){
            errors.forEach(x => dispatch(setAlert(x.msg, 'error')))
        }
        dispatch({
            type: AIM_ERR,
            payload: {msg: err.response.statusText, status: err.response.status}
        })
    }
}