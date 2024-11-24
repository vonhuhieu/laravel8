import axios from "../../../../axiosCustomize/axiosCustomize.js";

const ApiGetAllBlogDetailRates = (blog_id) => {
    return axios.get(`http://127.0.0.1:8000/api/blog/rate/${blog_id}`);
};

export default ApiGetAllBlogDetailRates;