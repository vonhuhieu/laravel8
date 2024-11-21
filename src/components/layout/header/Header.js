import { useNavigate, Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import { useDispatch } from "react-redux";
import { doLogout } from "../../../redux/action/memberAction";

const Header = (props) => {
    // navigate
    const navigate = useNavigate();

    // state redux
    const isAuthenticated = useSelector(state => state.member.isAuthenticated);

    // dispatch
    const dispatch = useDispatch();

    // function con
    const handleLogout = () => {
        navigate('/login');
        dispatch(doLogout());
    };
    return (
        <header id="header">
            <div className="header-middle">
                <div className="container">
                    <div className="row">
                        <div className="col-md-4 clearfix">
                            <div className="logo pull-left">
                                <a href="index.html"><img src="images/home/logo.png" alt="" /></a>
                            </div>
                        </div>
                        <div className="col-md-8 clearfix">
                            <div className="shop-menu clearfix pull-right">
                                <ul className="nav navbar-nav">
                                    {isAuthenticated ?
                                        <>
                                            <li><a href=""><i className="fa fa-user"></i> Account</a></li>
                                            <li><a href=""><i className="fa fa-star"></i> Wishlist</a></li>
                                            <li><a href="checkout.html"><i className="fa fa-crosshairs"></i> Checkout</a></li>
                                            <li><a href="cart.html"><i className="fa fa-shopping-cart"></i> Cart</a></li>
                                            <button onClick={() => {handleLogout()}}>Logout</button>
                                        </>
                                        :
                                        <>
                                            <li><a href="checkout.html"><i className="fa fa-crosshairs"></i> Checkout</a></li>
                                            <li><a href="cart.html"><i className="fa fa-shopping-cart"></i> Cart</a></li>
                                            <li><Link to='/login'>Login</Link></li>
                                            <li><Link to='/register'>Register</Link></li>
                                        </>
                                    }
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="header-bottom">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-9">
                            <div className="navbar-header">
                                <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                                    <span className="sr-only">Toggle navigation</span>
                                    <span className="icon-bar"></span>
                                    <span className="icon-bar"></span>
                                    <span className="icon-bar"></span>
                                </button>
                            </div>
                            <div className="mainmenu pull-left">
                                <ul className="nav navbar-nav collapse navbar-collapse">
                                    <li><Link to=''>Home</Link></li>
                                    <li><Link to='/blog'>Blog List</Link></li>
                                    <li><a href="contact-us.html">Contact</a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-sm-3">
                            <div className="search_box pull-right">
                                <input type="text" placeholder="Search" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
