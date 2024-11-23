import { useEffect, useState } from "react";

const BlogDetailComment = (props) => {
    // các biến khác
    const baseURL = `http://127.0.0.1:8000/upload/user/avatar/`;

    // props
    const {listComments} = props;

    // function con
    const renderComments = () => {
        if (listComments && listComments.length > 0) {
            return listComments.map((value, key) => {
                return (
                    <li style={{ listStyle: "none" }} class="media" key={`comment-${value.id}`}>

                        <a class="pull-left" href="#">
                            <img style={{width: "121px", height: "86px"}} class="media-object" src={`${baseURL}${value.image_user}`} alt="" />
                        </a>
                        <div class="media-body">
                            <ul class="sinlge-post-meta">
                                <li><i class="fa fa-user"></i>{value.name_user}</li>
                                <li><i class="fa fa-clock-o"></i>{value.updated_at}</li>
                                <li><i class="fa fa-calendar"></i>{value.updated_at}</li>
                            </ul>
                            <p>{value.comment}</p>
                            <a class="btn btn-primary" href=""><i class="fa fa-reply"></i>Replay</a>
                        </div>
                    </li>
                );
            });
        }
    };
    return (
        <>
            {renderComments()}
        </>
    );
};

export default BlogDetailComment;