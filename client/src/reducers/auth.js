import {
    REG_SUCCESS,
    REG_FAIL,
    AUTH_SUCCESS,
    AUTH_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
} from '../actions/types';

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    user: null
}

export default function (state = initialState, action) {
    switch (action.type) {
        case LOGIN_SUCCESS:
        case REG_SUCCESS:
            localStorage.setItem('token', action.payload.token);
            return {
                ...state,
                ...action.payload,
                isAuthenticated: true,
                loading: false
            }
        case REG_FAIL:
        case AUTH_FAIL:
        case LOGIN_FAIL:
        case LOGOUT:
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false
            }
        case AUTH_SUCCESS:
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                user: action.payload
            }
        default: return state;
    }
}