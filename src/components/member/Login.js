
const Login = () => {
    // state
    const [inputs, setInputs] = useState({
        email: '',
        password: '',
    });
    const [errors, setErrors] = useState({});

    // function con
    const handleInput = (event) => {
        const { name, value } = event.target;
        setInputs((prevInputs) => ({
            ...prevInputs, [name]: value,
        }));
    };
    return (
        <section id="form">
            <div class="container">
                <div class="row">
                    <div class="col-sm-4 col-sm-offset-1">
                        <div class="login-form">
                            <h2>Login to your account</h2>
                            <form>
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
                                <button type="submit" class="btn btn-default">Login</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
export default Login;