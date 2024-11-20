import axios from "../../../axiosCustomize/axiosCustomize.js";

const ApiBlogList = () => {
    return axios.get(`api/blog`);
};

export default ApiBlogList;