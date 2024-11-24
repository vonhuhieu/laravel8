import { useState } from "react";
import { useSelector } from "react-redux";
import Validate from "../../../validate/Validate.js";
import { useParams } from "react-router-dom";
import ApiBlogDetailComment from "../../../../api/blog/blog_detail/ApiBlogDetailComment.js";
import RealTimeBlogDetailPostReplay from "./RealTimeBlogDetailPostReplay.js";

const BlogDetailPostComment = (props) => {
    // các biến khác
    const baseUrl = `http://127.0.0.1:8000/upload/user/avatar/`;

    // params
    const params = useParams();
    const id_blog = params.blog_id;

    // hook state
    const [comment, setComment] = useState("");
    const [errors, setErrors] = useState({});
    const [listComments, setListComments] = useState([]);
    const [realTimeShowReplayForm, setRealTimeShowReplayForm] = useState(null);

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
            errorsSubmit.notComment = "Please type your comment";
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
                    setComment("");
                    props.setListComments((prevComments) => ([
                        ...prevComments, response.data
                    ]));
                    setListComments((prevComments) => ([
                        ...prevComments, response.data
                    ]));
                }
                else {
                    console.log("No data from api");
                }
            }
            else if (response.status !== 200) {
                console.log("Error");
            }
            else {
                console.log("No data from server");
            }
        }
    };

    const renderComments = () => {
        if (listComments && listComments.length > 0) {
            return listComments.map((value, key) => {
                if (parseInt(value.id_comment) === 0) {
                    const renderReplays = () => {
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
                                    <button className="btn btn-primary" onClick={() => { handleRealTimeShowReplayForm(value.id) }}><i className="fa fa-reply"></i>Replay</button>
                                    {realTimeShowReplayForm === value.id &&
                                        <RealTimeBlogDetailPostReplay
                                            id_comment={value.id}
                                            listComments={props.listComments}
                                            setListComments={props.setListComments}
                                            realTimeListComments={listComments}
                                            setRealTimeListComments={setListComments}
                                            realTimeShowReplayForm={realTimeShowReplayForm}
                                            setRealTimeShowReplayForm={setRealTimeShowReplayForm}
                                        />}
                                </div>
                            </li>
                            {renderReplays()}
                        </>
                    );
                }
            });
        }
    };

    const handleRealTimeShowReplayForm = (id_comment) => {
        setRealTimeShowReplayForm((activeID) => (activeID === id_comment ? null : id_comment));
    };

    return (
        <>
            <div className="response-area">
                <ul className="media-list">
                    {renderComments()}
                </ul>
            </div>
            <div className="replay-box">
                <div className="row">
                    <div className="col-sm-12">
                        <h2>Leave a replay</h2>
                        <div className="text-area">
                            <Validate errors={errors} />
                            <form onSubmit={(event) => { handleSubmit(event) }}>
                                <textarea rows="11" value={comment} onChange={(event) => { handleComment(event) }}></textarea>
                                <button className="btn btn-primary">post comment</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default BlogDetailPostComment;