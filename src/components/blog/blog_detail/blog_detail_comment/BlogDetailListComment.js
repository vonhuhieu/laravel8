import { useEffect, useState } from "react";
import BlogDetailPostComment from "./BlogDetailPostComment";

const BlogDetailListComment = (props) => {
    // các biến khác
    const baseUrl = `http://127.0.0.1:8000/upload/user/avatar/`;

    // hook state
    const [listComments, setListComments] = useState(props.listComments);

    // hook effect
    useEffect(() => {
        setListComments(props.listComments);
    }, [props.listComments]);

    // function con 
    const renderListComments = () => {
        if (listComments && listComments.length > 0) {
            return listComments.map((value, key) => {
                if (value.id_comment === 0) {
                    return (
                        <li className="media" key={`comment-${value}`}>

                            <a className="pull-left" href="#">
                                <img style={{ width: "121px", height: "86px" }} className="media-object" src={`${baseUrl}${value.image_user}`} alt="" />
                            </a>
                            <div className="media-body">
                                <ul className="sinlge-post-meta">
                                    <li><i className="fa fa-user">{value.name_user}</i></li>
                                    <li><i className="fa fa-clock-o"></i>{value.updated_at}</li>
                                    <li><i className="fa fa-calendar"></i>{value.updated_at}</li>
                                </ul>
                                <p>{value.comment}</p>
                                <button className="btn btn-primary" href=""><i className="fa fa-reply"></i>Replay</button>
                            </div>
                        </li>
                    );
                }
            });
        }
    };
    return (
        <>
            <div className="response-area">
                {listComments.length > 1 ? <h2>{listComments.length} Responses</h2> : <h2>{listComments.length} Response</h2>}
                <ul className="media-list">
                    {renderListComments()}
                </ul>
            </div>
            <BlogDetailPostComment
                listComments={listComments}
                setListComments={setListComments}
            />
        </>
    );
};

export default BlogDetailListComment;