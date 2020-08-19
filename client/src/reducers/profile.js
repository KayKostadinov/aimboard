import { GET_PROFILE, PROFILE_ERR, CLEAR_PROFILE, DELETE_ACC, UPDATE_PROFILE, GET_PROFILES } from '../actions/types';


const initialState = {
    profile: null,
    profiles: [],
    loading: true,
    error: {}
}

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case GET_PROFILE:
        case UPDATE_PROFILE:
            return {
                ...state,
                profile: payload,
                loading: false
            }
        case PROFILE_ERR:
            return {
                ...state,
                error: payload,
                loading: false
            }
        case DELETE_ACC:
        case CLEAR_PROFILE:
            return {
                ...state,
                profile: null,
                loading: false
            }
        case GET_PROFILES:
            return {
                ...state,
                profiles: payload,
                loading: false
            }
        default: return state;
    }
}