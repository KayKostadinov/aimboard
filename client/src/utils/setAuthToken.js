import axios from 'axios';

const setToken = token => {
    if (token) {
        axios.defaults.headers.common['x-auth-token'] = token;
        return;
    }
    delete axios.defaults.headers.common['x-auth-token'];
}

export default setToken;