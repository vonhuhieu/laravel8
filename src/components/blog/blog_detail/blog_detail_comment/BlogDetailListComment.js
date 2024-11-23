import { useEffect, useState } from "react";
import BlogDetailPostComment from "./BlogDetailPostComment";
import BlogDetailComment from "./BlogDetailComment";

const BlogDetailListComment = (props) => {
    // các biến khác
    const baseURL = `http://127.0.0.1:8000/upload/user/avatar/`;

    // props
    const { listComments } = props;

    // hook state
    const [countComments, setCountComments] = useState(listComments.length);

    // hook effect
    useEffect(() => {
        setCountComments(listComments.length);
    }, [listComments]);

    // Callback để tăng số lượng bình luận
    const incrementCountComments = () => {
        setCountComments((prev) => prev + 1);
    };

    // function con
    const renderComments = () => {
        if (listComments && listComments.length > 0) {
            return listComments.map((value, key) => {
                return (
                    <li className="media" key={`comment-${value.id}`}>
                        <a className="pull-left" href="#">
                            <img className="media-object" style={{ width: "121px", height: "86px" }} src={`${baseURL}${value.image_user}`} alt="" />
                        </a>
                        <div className="media-body">
                            <ul className="sinlge-post-meta">
                                <li><i className="fa fa-user"></i>{value.name_user}</li>
                                <li><i className="fa fa-clock-o"></i>{value.updated_at}</li>
                                <li><i className="fa fa-calendar"></i>{value.updated_at}</li>
                            </ul>
                            <p>{value.comment}</p>
                            <a className="btn btn-primary" href=""><i className="fa fa-reply"></i>Replay</a>
                        </div>
                    </li>
                );
            });
        }
    };
    return (
        <>
            <div className="response-area">
                {countComments > 1 ? <h2>{countComments} Responses</h2> : <h2>{countComments} Response</h2>}
                <ul className="media-list">
                    {renderComments()}
                    <BlogDetailComment />
                    {/* <li className="media second-media">
                    <a className="pull-left" href="#">
                        <img className="media-object" src="images/blog/man-three.jpg" alt=""/>
                    </a>
                    <div className="media-body">
                        <ul className="sinlge-post-meta">
                            <li><i className="fa fa-user"></i>Janis Gallagher</li>
                            <li><i className="fa fa-clock-o"></i> 1:33 pm</li>
                            <li><i className="fa fa-calendar"></i> DEC 5, 2013</li>
                        </ul>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                        <a className="btn btn-primary" href=""><i className="fa fa-reply"></i>Replay</a>
                    </div>
                </li> */}
                </ul>
            </div>
            <BlogDetailPostComment incrementCountComments={incrementCountComments} />
        </>
    );
};

export default BlogDetailListComment;