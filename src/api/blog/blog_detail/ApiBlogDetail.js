import axios from '../../../axiosCustomize/axiosCustomize.js';
const ApiBlogDetail = (id_blog) => {
    return axios.get(`api/blog/detail/${id_blog}`);
};

export default ApiBlogDetail;