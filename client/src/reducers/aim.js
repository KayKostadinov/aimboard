import { GET_AIM, AIM_ERR } from '../actions/types';

const initialState = {
    aim: null,
    loading: true,
    error: {}
}

export default function (state = initialState, action) {
    const {type, payload} = action;

    switch(type){
        case GET_AIM:
            return {
                ...state,
                aim: payload,
                loading: false
            }
        case AIM_ERR:
            return{
                ...state,
                error: payload,
                loading: false
            }
        default: return state;
    }
}