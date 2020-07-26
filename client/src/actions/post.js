import axios from 'axios';
import { setAlert } from './alert';
import { GET_POSTS, POST_ERR } from './types';

// get all posts

export const getPosts = () => async dispatch => {
    try {
        const res = await axios.get('/api/posts');
        dispatch({
            type: GET_POSTS,
            payload: res.data,
        })
    } catch (err) {
        dispatch({
            type: POST_ERR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}