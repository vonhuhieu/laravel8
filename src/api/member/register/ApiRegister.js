import axios from '../../../axiosCustomize/axiosCustomize.js';

const ApiRegister = (inputs, avatar) => {
    const data = new FormData();
    data.append('name', inputs.name);
    data.append('email', inputs.email);
    data.append('password', inputs.password);
    data.append('phone', inputs.phone);
    data.append('address', inputs.address);
    data.append('level', 0);
    data.append('avatar', avatar);
    return axios.post(`/api/register`, data);
};

export default ApiRegister;