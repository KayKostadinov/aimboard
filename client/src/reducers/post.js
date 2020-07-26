import { GET_POSTS, POST_ERR } from '../actions/types';

const initialState = {
    posts: [],
    post: null,
    loading: true,
    error: {}
}

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case GET_POSTS:
            return {
                ...state,
                posts: payload,
                loading: false
            }
        case POST_ERR:
            return {
                ...state,
                error: payload,
                loading: false
            }
        default:
            return {
                ...state
            }
    }
}