import { useEffect, useState } from "react";
import LeftCategoryBrand from "../../layout/left/LeftCategoryBrand";
import { useParams } from "react-router-dom";
import ApiBlogDetail from "../../../api/blog/blog_detail/ApiBlogDetail";
import BlogDetailListComment from "./blog_detail_comment/BlogDetailListComment";

const BlogDetail = () => {
    // Param
    const params = useParams();

    // State
    const [isLoading, setIsLoading] = useState(true);
    const [blogDetail, setBlogDetail] = useState({});
    const [listComments, setListComments] = useState([]);

    // Effect
    useEffect(() => {
        fetchBlogDetail();
    }, [params.blog_id]);

    // function con
    const fetchBlogDetail = async () => {
        let response = await ApiBlogDetail(params.blog_id);
        if (response && response.status === 200) {
            if (response.data) {
                setBlogDetail(response.data);
                setIsLoading(false);
                setListComments(response.data.comment);
            }
            else {
                console.log("Không có data");
            }
        }
        else if (response && response.status !== 200) {
            console.log("Có lỗi");
        }
        else {
            console.log("Không có data từ máy chủ");
        }
    };

    const renderBlogDetail = () => {
        if (blogDetail && Object.keys(blogDetail).length > 0) {
            return (
                <div className="single-blog-post">
                    <h3>{blogDetail.title}</h3>
                    <div className="post-meta">
                        <ul>
                            <li><i className="fa fa-user"></i>{blogDetail.title}</li>
                            <li><i className="fa fa-clock-o"></i>{blogDetail.updated_at}</li>
                            <li><i className="fa fa-calendar"></i>{blogDetail.updated_at}</li>
                        </ul>
                        <span>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star-half-o"></i>
                        </span>
                    </div>
                    <a href="">
                        <img src={`/upload/Blog/image/${blogDetail.image}`} alt="" />
                    </a>
                    <p>{blogDetail.content}</p>
                    <div className="pager-area">
                        <ul className="pager pull-right">
                            <li><a href="#">Pre</a></li>
                            <li><a href="#">Next</a></li>
                        </ul>
                    </div>
                </div>
            );
        }
    };

    return (
        <section>
            <div className="container">
                <div className="row">
                    <LeftCategoryBrand />
                    <div className="col-sm-9">
                        <div className="blog-post-area">
                            {isLoading ?
                                <>
                                    Data is loading...
                                </>
                                :
                                renderBlogDetail()
                            }
                        </div>
                        <div className="rating-area">
                            <ul className="ratings">
                                <li className="rate-this">Rate this item:</li>
                                <li>
                                    <i className="fa fa-star color"></i>
                                    <i className="fa fa-star color"></i>
                                    <i className="fa fa-star color"></i>
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>
                                </li>
                                <li className="color">(6 votes)</li>
                            </ul>
                            <ul className="tag">
                                <li>TAG:</li>
                                <li><a className="color" href="">Pink <span>/</span></a></li>
                                <li><a className="color" href="">T-Shirt <span>/</span></a></li>
                                <li><a className="color" href="">Girls</a></li>
                            </ul>
                        </div>
                        <BlogDetailListComment listComments={listComments}/>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BlogDetail;