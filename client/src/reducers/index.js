import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import profile from './profile';
import aim from './aim';

export default combineReducers({
    alert,
    auth,
    profile,
    aim
});