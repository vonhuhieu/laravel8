import { useEffect, useState } from "react";
import BlogDetailPostComment from "./BlogDetailPostComment";
import BlogDetailPostReplay from "./BlogDetailPostReplay";

const BlogDetailListComment = (props) => {
    // các biến khác
    const baseUrl = `http://127.0.0.1:8000/upload/user/avatar/`;

    // hook state
    const [listComments, setListComments] = useState(props.listComments);
    const [showReplayForm, setShowReplayForm] = useState(null);

    // hook effect
    useEffect(() => {
        setListComments(props.listComments);
    }, [props.listComments]);

    // function con 
    const handleShowReplayForm = (id_comment) => {
        setShowReplayForm((activeID) => (activeID === id_comment ? null : id_comment));
    };
    const renderListComments = () => {
        if (listComments && listComments.length > 0) {
            return listComments.map((value, key) => {
                if (value.id_comment === 0) {
                    const renderListReplay = () => {
                        return listComments.map((value1, key1) => {
                            if (parseInt(value1.id_comment) === parseInt(value.id)) {
                                return (
                                    <li className="media second-media" key={`replay-${value1.id}`}>
                                        <a className="pull-left" href="#">
                                            <img style={{ width: "121px", height: "86px" }} className="media-object" src={`${baseUrl}${value1.image_user}`} alt="" />
                                        </a>
                                        <div className="media-body">
                                            <ul className="sinlge-post-meta">
                                                <li><i className="fa fa-user"></i>{value1.name_user}</li>
                                                <li><i className="fa fa-clock-o"></i>{value1.updated_at}</li>
                                                <li><i className="fa fa-calendar"></i>{value1.updated_at}</li>
                                            </ul>
                                            <p>{value1.comment}</p>
                                        </div>
                                    </li>
                                );
                            }
                        });
                    };
                    return (
                        <>
                            <li className="media" key={`comment-${value.id}`}>
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
                                    <button className="btn btn-primary" onClick={() => { handleShowReplayForm(value.id) }}><i className="fa fa-reply"></i>Replay</button>
                                    {showReplayForm === value.id &&
                                        <BlogDetailPostReplay
                                            id_comment={value.id}
                                            listComments={listComments}
                                            setListComments={setListComments}
                                            showReplayForm={showReplayForm}
                                            setShowReplayForm={setShowReplayForm}
                                        />
                                    }
                                </div>
                            </li>
                            {renderListReplay()}
                        </>
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