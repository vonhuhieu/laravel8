import { useState } from "react";
import Validate from "../validate/Validate";
import ApiLogin from "../../api/member/login/ApiLogin";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { doLogin } from "../../redux/action/memberAction";

const Login = () => {
    // state
    const [inputs, setInputs] = useState({
        email: '',
        password: '',
    });

    const [errors, setErrors] = useState({});

    // navigate
    const navigate = useNavigate();
    
    // dispatch
    const dispatch = useDispatch();
    // function con
    const handleInput = (event) => {
        const { name, value } = event.target;
        setInputs((prevInputs) => ({
            ...prevInputs, [name]: value,
        }));
    };

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        let errorsSubmit = {};
        let check_validate = true;
        if (inputs.email == "" || !validateEmail(inputs.email)) {
            check_validate = false;
            errorsSubmit.email = "Invalid email";
        }
        if (inputs.password == "") {
            check_validate = false;
            errorsSubmit.password = "Password must not be empty";
        }
        setErrors(errorsSubmit)
        if (check_validate == true) {
            let response = await ApiLogin(inputs);
            if(response && response["success"] === "success")
            {
                dispatch(doLogin(response));
                navigate('/');
            }
            else if(response && response["response"] === "error")
            {
                console.log(response["errors"]["errors"]);
            }
            else
            {
                console.log("No data from server");
            }
        }
    };
    return (
        <section id="form">
            <div className="container">
                <div className="row">
                    <div className="col-sm-4 col-sm-offset-1">
                        <div className="login-form">
                            <h2>Login to your account</h2>
                            <Validate errors={errors} />
                            <form onSubmit={(event) => { handleSubmit(event) }}>
                                <label><b>Email</b></label>
                                <input
                                    type="email"
                                    name="email"
                                    value={inputs.email}
                                    onChange={(event) => { handleInput(event) }}
                                    placeholder="Email Address" />
                                <br />
                                <label><b>Password</b></label>
                                <input
                                    type="password"
                                    name="password"
                                    value={inputs.password}
                                    onChange={(event) => { handleInput(event) }}
                                    placeholder="Password" />
                                <br />
                                <button type="submit" className="btn btn-default">Login</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
export default Login;