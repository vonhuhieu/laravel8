import { Link } from "react-router-dom";

const LeftAccount = () => {
    return (
        <div class="col-sm-3">
            <div class="left-sidebar">
                <h2>Account</h2>
                <div class="panel-group category-products" id="accordian">
                    <div class="panel panel-default">
                        <div class="panel-heading">
                            <h4 class="panel-title"><Link to="/account/updateAccount">Account</Link></h4>
                        </div>
                    </div>
                    <div class="panel panel-default">
                        <div class="panel-heading">
                            <h4 class="panel-title"><Link to="/account/myListProduct">My product</Link></h4>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LeftAccount;