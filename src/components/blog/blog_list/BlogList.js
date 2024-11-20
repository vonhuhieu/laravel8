import LeftCategoryBrand from "../../layout/left/LeftCategoryBrand";
import ApiBlogList from "../../../api/blog/blog_list/ApiBlogList";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const BlogList = () => {
    // state
    const [blogList, setBlogList] = useState([]);

    // effect
    useEffect(() => {
        fetchBlogList();
    }, []);

    // navigate
    const navigate = useNavigate();

    // function con

    const fetchBlogList = async () => {
        let response = await ApiBlogList();
        if (response && response.blog && response.blog.data) {
            setBlogList(response.blog.data);
        }
    }

    const renderBlog = () => {
        if (blogList && blogList.length > 0) {
            return blogList.map((value, key) => {
                return (
                    <div className="single-blog-post" key={`single-blog-${value.id}`}>
                        <h3>{value.title}</h3>
                        <div className="post-meta">
                            <ul>
                                <li><i className="fa fa-user"></i>{value.title}</li>
                                <li><i className="fa fa-clock-o"></i>{value.updated_at}</li>
                                <li><i className="fa fa-calendar"></i>{value.updated_at}</li>
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
                            <img src={`/upload/Blog/Image/${value.image}`} alt="" />
                        </a>
                        <p>{value.description}</p>
                        <button className="btn btn-primary" onClick={() => {handleBlogDetail(value.id)}}>Read More</button>
                    </div>
                );
            });
        }
    };

    const handleBlogDetail = (id_blog) => {
        navigate(`/blog_detail/${id_blog}`);
    };
    return (
        <section>
            <div className="container">
                <div className="row">
                    <LeftCategoryBrand />
                    <div className="col-sm-9">
                        <div className="blog-post-area">
                            <h2 className="title text-center">Latest From our Blog</h2>
                            {renderBlog()}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BlogList;