import { useState } from "react";
import Validate from "../validate/Validate";
import _ from 'lodash';
import ApiRegister from "../../api/member/register/ApiRegister";
import { useNavigate } from "react-router-dom";

const Register = () => {
    // state
    const [inputs, setInputs] = useState({
        name: '',
        email: '',
        password: '',
        phone: '',
        address: '',
    });
    const [errors, setErrors] = useState({});
    const [previewAvatar, setPreviewAvatar] = useState("");
    const [avatar, setAvatar] = useState("");
    const [file, setFile] = useState("");

    // navigate
    const navigate = useNavigate();

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

    const handleAvatar = (event) => {
        if (event.target.files && event.target.files[0]) {
            setFile(event.target.files[0]);
            // !_.isEmpty(updateUser)
            let reader = new FileReader();
            reader.onload = (event) => {
                setAvatar(event.target.result);
            }
            reader.readAsDataURL(event.target.files[0]);
            setPreviewAvatar(URL.createObjectURL(event.target.files[0]));
        }
    }
   
    const handleSubmit = async (event) => {
        event.preventDefault();
        let errorsSubmit = {};
        let validate = true;
        if (inputs.name === "") {
            validate = false;
            errorsSubmit.name = "Name must not be empty";
        }
        if (inputs.email === "" || !validateEmail(inputs.email)) {
            validate = false;
            errorsSubmit.email = "Invalid email";
        }
        if (inputs.password === "") {
            validate = false;
            errorsSubmit.password = "Password must not be empty";
        }
        if (inputs.phone === "") {
            validate = false;
            errorsSubmit.phone = "Phone must not be empty";
        }
        if (inputs.address === "") {
            validate = false;
            errorsSubmit.address = "Address must not be empty";
        }
        if(file !== "")
        {
            if(file.name.split('.')[1] != "jpg" && file.name.split('.')[1] != "png" && file.name.split('.')[1] != "jpeg" && file.name.split('.')[1] != "gif")
            {
                validate = false;
                errorsSubmit.file = "Extension of file muse be jpg or png";
            }
            if(file.size >= 1024 * 1024)
            {
                validate = false;
                errorsSubmit.file = "Capacity of file must be under 1MB";
            }
        }
        setErrors(errorsSubmit);
        if (validate == true) {
            let response = await ApiRegister(inputs, avatar);
            if(response && response["message"] === "success")
            {
                navigate('/login');
            }
            else if(response && response["message"] !== "success")
            {
                console.log("Có lỗi xảy ra");
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
                    <div className="col-sm-4">
                        <div className="signup-form">
                            <Validate errors={errors} />
                            <form onSubmit={(event) => { handleSubmit(event) }} encType="multipart/form-data">
                                <label><b>Name</b></label>
                                <input
                                    type="text"
                                    name="name"
                                    value={inputs.name}
                                    onChange={(event) => { handleInput(event) }}
                                    placeholder="Name"
                                />
                                <br />
                                <label><b>Email</b></label>
                                <input
                                    type="email"
                                    name="email"
                                    value={inputs.email}
                                    onChange={(event) => { handleInput(event) }}
                                    placeholder="Email"
                                />
                                <br />
                                <label><b>Password</b></label>
                                <input
                                    type="password"
                                    name="password"
                                    value={inputs.password}
                                    onChange={(event) => { handleInput(event) }}
                                    placeholder="Password"
                                />
                                <br />
                                <label><b>Phone</b></label>
                                <input
                                    type="text"
                                    name="phone"
                                    value={inputs.phone}
                                    onChange={(event) => { handleInput(event) }}
                                    placeholder="Phone"
                                />
                                <br />
                                <label><b>Address</b></label>
                                <input
                                    type="text"
                                    name="address"
                                    value={inputs.address}
                                    onChange={(event) => { handleInput(event) }}
                                    placeholder="Address"
                                />
                                <br />
                                <label style={{ cursor: "pointer" }} htmlFor="avatar"><b>Avatar</b></label>
                                <input
                                    type="file"
                                    id="avatar"
                                    style={{ display: "none" }}
                                    onChange={(event) => { handleAvatar(event) }}
                                />
                                <br /><br />
                                {previewAvatar !== "" && <img src={previewAvatar} />}
                                <button type="submit" className="btn btn-default">Signup</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Register;