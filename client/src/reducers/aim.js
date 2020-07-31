import { GET_AIM, AIM_ERR, CLEAR_AIM, GET_AIMS, UPDATE_AIM, CREATE_AIM } from '../actions/types';

const initialState = {
    aim: null,
    aims: [],
    loading: true,
    error: {}
}


export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case GET_AIMS:
            return {
                ...state,
                aims: payload,
                loading: false
            }
        case CREATE_AIM:
            return {
                ...state,
                aims: [...state.aims, payload],
                loading: false
            }
        case GET_AIM:
            return {
                ...state,
                aim: payload,
                loading: false
            }
        case UPDATE_AIM:
            return {
                ...state,
                aims: state.aims.map(aim => aim._id === payload._id ? { ...aim, title: payload.title, complete: payload.complete } : aim),
                loading: false
            }
        case AIM_ERR:
            return {
                ...state,
                error: payload,
                loading: false
            }
        case CLEAR_AIM:
            return {
                ...state,
                aims: state.aims.filter(x => x._id !== payload),
                loading: false
            }
        default: return state;
    }
}