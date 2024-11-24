import axios from "../../../../axiosCustomize/axiosCustomize.js";

const ApiBlogDetailRate = (user_id, blog_id, rate) => {
    const data = new FormData();
    data.append("user_id", user_id);
    data.append("blog_id", blog_id);
    data.append("rate", rate);
    return axios.post(`http://127.0.0.1:8000/api/blog/rate/${blog_id}`, data);
};

export default  ApiBlogDetailRate ;