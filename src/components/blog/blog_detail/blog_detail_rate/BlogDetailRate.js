import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import StarRatings from "react-star-ratings";
import Validate from "../../../validate/Validate";
import { useParams } from "react-router-dom";
import ApiBlogDetailRate from "../../../../api/blog/blog_detail/blog_detail_rate/ApiBlogDetailRate";
import ApiGetAllBlogDetailRates from "../../../../api/blog/blog_detail/blog_detail_rate/ApiGetAllBlogDetailRates";

const BlogDetailRate = () => {
    // params
    const params = useParams();
    const { blog_id } = params;

    // hook state
    const [rating, setRating] = useState(0);
    const [errors, setErrors] = useState({});
    const [announce, setAnnounce] = useState(`data is loading...`);
    const [countRate, setCountRate] = useState(`data is loading...`);

    // hook effect
    useEffect(() => {
        fetchAverageRate();
    }, [blog_id])

    // redux state
    const isAuthenticated = useSelector((state) => state?.member?.isAuthenticated);
    const user_id = useSelector((state) => state?.member?.account?.id);

    // function con
    const changeRating = async (newRating, name) => {
        let check_validate = true;
        let errorsSubmit = {};
        if (!isAuthenticated) {
            check_validate = false;
            errorsSubmit.notLogin = "Please login to continue";
        }
        setErrors(errorsSubmit);
        if (check_validate === true) {
            setRating(newRating);
            let response = await ApiBlogDetailRate(user_id, blog_id, newRating);
            if (response && response.status === 200) {
                setAnnounce(response.message);
                setCountRate(count => count + 1);
            }
            else if (response && response.status !== 200) {
                setAnnounce("Error");
            }
            else {
                setAnnounce("No response from server");
            }
        }
    };

    const fetchAverageRate = async () => {
        let response = await ApiGetAllBlogDetailRates(blog_id);
        if (response && response.response === "success") {
            // if (response.data && response.data.length > 0) {
            //     let sum = 0;
            //     response.data.map((value, key) => {
            //         sum += value.rate;
            //     });
            //     let averageRate = Math.round(sum / response.data.length);
            //     setAnnounce(`Average Rate: ${averageRate}`);
            //     setCountRate(response.data.length);
            //     setRating(averageRate);
            // }
            if(response.data && Object.keys(response.data).length > 0){
                let sum = 0;
                Object.keys(response.data).map((key, index) => {
                    sum += response.data[key]["rate"];
                });
                let averageRate = Math.round(sum / Object.keys(response.data).length);
                setAnnounce(`Average Rate: ${averageRate}`);
                setCountRate(Object.keys(response.data).length);
                setRating(averageRate);
            }
            else {
                setAnnounce(`Nobody rate before. Let's be the first person`);
                setCountRate(0);
            }
        }
        else if (response && response.response !== "success") {
            setAnnounce("Errors happen. Sorry about that");
        }
        else {
            setAnnounce("No data from server");
        }
    };

    return (
        <>
            <Validate errors={errors} />
            <div className="rating-area">
                <ul className="ratings">
                    <li className="rate-this">Rate this item:</li>
                    <li>
                        <StarRatings
                            rating={rating}
                            starRatedColor="blue"
                            changeRating={changeRating}
                            numberOfStars={5}
                            name="rating"
                        />
                    </li>
                    <li className="color">{announce}</li>
                </ul>
            </div>
            <div className="counting-rate">
                {countRate > 1 ? <span>{countRate} votes</span> : <span>{countRate} vote</span>}
            </div>
        </>
    );
};

export default BlogDetailRate;