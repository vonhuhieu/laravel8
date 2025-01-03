import axios from "axios";
import { store } from "../redux/store";

const instance = axios.create({
    baseURL: 'http://127.0.0.1:8000',
});

// Add a request interceptor
instance.interceptors.request.use(function (config) {
    const token = store.getState().member.account.token;
    config.headers["Authorization"] = `Bearer ${token}`;
    // Do something before request is sent
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

// Add a response interceptor
instance.interceptors.response.use(function (response) {
    return response && response.data ? response.data : response;
}, function (error) {
    return error && error.response && error.response.data ? error.response.data : Promise.reject(error);
});

export default instance;