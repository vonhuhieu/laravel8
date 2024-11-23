import { useState } from "react";
import { useSelector } from "react-redux";
import Validate from "../../../validate/Validate.js";
import { useParams } from "react-router-dom";
import ApiBlogDetailComment from "../../../../api/blog/blog_detail/ApiBlogDetailComment";
import BlogDetailComment from "./BlogDetailComment.js";

const BlogDetailPostComment = (props) => {
    // params
    const params = useParams();
    const id_blog = params.blog_id;

    // hook state
    const [comment, setComment] = useState("");
    const [errors, setErrors] = useState({});
    const [listComments, setListComments] = useState([]);

    // redux state
    const isAuthenticated = useSelector(state => state?.member?.isAuthenticated);
    const id_user = useSelector(state => state?.member?.account?.id);
    const name_user = useSelector(state => state?.member?.account?.name);
    const image_user = useSelector(state => state?.member?.account?.avatar);

    // function con
    const handleComment = (event) => {
        setComment(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        let check_validate = true;
        let errorsSubmit = {};
        if (comment === "") {
            check_validate = false;
            errorsSubmit.comment = "Please type your comment";
        }
        if (!isAuthenticated) {
            check_validate = false;
            errorsSubmit.notLogin = "Please login to continue";
        }
        setErrors(errorsSubmit);
        if (check_validate === true) {
            const id_comment = 0;
            let response = await ApiBlogDetailComment(id_blog, id_user, name_user, id_comment, comment, image_user);
            if (response && response.status === 200) {
                if (response.data) {
                    setListComments((prevComments) => ([
                        ...prevComments, response.data 
                    ]));
                    // Tăng số lượng bình luận (callback từ cha)
                    props.incrementCountComments();
                    // Xóa nội dung ô nhập bình luận
                    setComment("");
                }
            }
        }
    };
    return (
        <>
            <BlogDetailComment listComments={listComments}/>
            <div class="replay-box">
                <div class="row">
                    <div class="col-sm-12">
                        <h2>Leave a replay</h2>

                        <div class="text-area">
                            <Validate errors={errors} />
                            <form onSubmit={(event) => { handleSubmit(event) }}>
                                <textarea rows="11" value={comment} onChange={(event) => { handleComment(event) }}></textarea>
                                <button class="btn btn-primary">post comment</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default BlogDetailPostComment;