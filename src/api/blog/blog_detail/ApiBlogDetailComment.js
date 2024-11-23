import axios from "../../../axiosCustomize/axiosCustomize.js";

const ApiBlogDetailComment = (id_blog, id_user, name_user, id_comment, comment, image_user) => {
    const data = new FormData();
    data.append('id_blog', id_blog);
    data.append('id_user', id_user);
    data.append('name_user', name_user);
    data.append('id_comment', id_comment);
    data.append('comment', comment);
    data.append('image_user', image_user);
    return axios.post(`/api/blog/comment/${id_blog}`, data);
};

export default ApiBlogDetailComment;