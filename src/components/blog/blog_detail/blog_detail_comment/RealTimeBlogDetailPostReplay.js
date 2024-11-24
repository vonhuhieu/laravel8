import { useState } from "react";
import { useSelector } from "react-redux";
import Validate from "../../../validate/Validate";
import ApiBlogDetailComment from "../../../../api/blog/blog_detail/ApiBlogDetailComment";
import { useParams } from "react-router-dom";

const RealTimeBlogDetailPostReplay = (props) => {
    // các biến khác
    const { id_comment } = props;

    // params
    const params = useParams();
    const id_blog = params.blog_id;

    // hook state
    const [realTimeReplay, setRealTimeReplay] = useState("");
    const [errors, setErrors] = useState({});

    // redux state
    const isAuthenticated = useSelector(state => state?.member?.isAuthenticated);
    const id_user = useSelector(state => state?.member?.account?.id);
    const name_user = useSelector(state => state?.member?.account?.name);
    const image_user = useSelector(state => state?.member?.account?.avatar);

    // function con
    const handleRealTimeReplay = (event) => {
        setRealTimeReplay(event.target.value);
    };

    const handleRealTimeSubmit = async (event) => {
        event.preventDefault();
        let check_validate = true;
        let errorsSubmit = {};
        if (realTimeReplay === "") {
            check_validate = false;
            errorsSubmit.notReplay = "Please type your replay";
        }
        if (!isAuthenticated) {
            check_validate = false;
            errorsSubmit.notLogin = "Please login to continue";
        }
        setErrors(errorsSubmit);
        if (check_validate === true) {
            let response = await ApiBlogDetailComment(id_blog, id_user, name_user, id_comment, realTimeReplay, image_user);
            if (response && response.status === 200) {
                if (response.data) {
                    setRealTimeReplay("");
                    props.setRealTimeShowReplayForm(null);
                    props.setListComments((prevComments) => ([
                        ...prevComments, response.data
                    ]));
                    props.setRealTimeListComments((prevComments) => ([
                        ...prevComments, response.data
                    ]));
                }
                else {
                    console.log("No response from api");
                }
            }
            else if (response.status !== 200) {
                console.log("error");
            }
            else {
                console.log("No response from server");
            }
        }
    };

    return (
        <>
            <Validate errors={errors} />
            <form onSubmit={(event) => { handleRealTimeSubmit(event) }}>
                <textarea rows="5" value={realTimeReplay} onChange={(event) => { handleRealTimeReplay(event) }}></textarea>
                <button className="btn btn-primary">post replay</button>
            </form>
        </>
    );
};

export default RealTimeBlogDetailPostReplay;