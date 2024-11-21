import axios from '../../../axiosCustomize/axiosCustomize.js';

const ApiLogin = (inputs) => {
    const data = new FormData();
    data.append('email', inputs.email);
    data.append('password', inputs.password);
    data.append('level', 0);
    return axios.post(`/api/login`, data);
};

export default ApiLogin;