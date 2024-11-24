import axios from "../../../axiosCustomize/axiosCustomize.js";

const ApiUpdateAccount = (id_user, name, email, phone, address, avatar, level) => {
    const data = new FormData();
    data.append('name', name);
    data.append('email', email);
    data.append('password', "");
    data.append('phone', phone);
    data.append('address', address);
    data.append('avatar', avatar);
    data.append('level', level);
    return axios.post(`/api/user/update/${id_user}`, data);
};

export default ApiUpdateAccount;