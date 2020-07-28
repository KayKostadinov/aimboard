import axios from 'axios';
import { setAlert } from './alert';
import { GET_POSTS, POST_ERR, UPDATE_LIKES } from './types';

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

// add like
export const addLike = id => async dispatch => {
    try {
        const res = await axios.put(`/api/posts/like/${id}`);
        dispatch({
            type: UPDATE_LIKES,
            payload: { id, updoots: res.data }
        })
    } catch (err) {
        dispatch({
            type: POST_ERR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}

// remove like
export const removeLike = id => async dispatch => {
    try {
        const res = await axios.put(`/api/posts/unlike/${id}`);
        dispatch({
            type: UPDATE_LIKES,
            payload: { id, updoots: res.data }
        })
    } catch (err) {
        dispatch({
            type: POST_ERR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}