import { useEffect, useState } from "react";
import LeftAccount from "../../layout/left/LeftAccount";
import _ from 'lodash';
import { useDispatch, useSelector } from "react-redux";
import Validate from "../../validate/Validate";
import ApiUpdateAccount from "../../../api/account/update_account/ApiUpdateAccount";
import { doUpdateAccount } from "../../../redux/action/memberAction";

const UpdateAccount = () => {
    // hook effect
    useEffect(() => {
        if (!_.isEmpty(account)) {
            setInputs({
                email: account.email,
                name: account.name,
                phone: account.phone,
                address: account.address
            });
            if (account.avatar) {
                setPreviewAvatar(`${baseUrl}${account.avatar}`);
            }
            else {
                setPreviewAvatar("");
            }
            setAvatar("");
        }
    }, [account]);
    
    // các biến khác
    const baseUrl = `http://127.0.0.1:8000/upload/user/avatar/`;
    // hook state
    const [inputs, setInputs] = useState({
        name: "",
        email: "",
        phone: "",
        address: "",
    });
    const [errors, setErrors] = useState({});
    const [avatar, setAvatar] = useState("");
    const [previewAvatar, setPreviewAvatar] = useState("");
    const [file, setFile] = useState("");

    // redux state
    const account = useSelector(state => state?.member?.account);

    // redux action 
    const dispatch = useDispatch();

    // function con
    const handleInput = (event) => {
        const { name, value } = event.target;
        setInputs((prevInputs) => ({
            ...prevInputs, [name]: value,
        }));
    };

    const handleAvatar = (event) => {
        if (event.target.files && event.target.files[0]) {
            setFile(event.target.files[0]);
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
        let check_validate = true;
        let errorsSubmit = {};
        if (inputs.name === "") {
            check_validate = false;
            errorsSubmit.name = "Name must not be empty";
        }
        if (inputs.phone === "") {
            check_validate = false;
            errorsSubmit.phone = "Phone must not be empty";
        }
        if (inputs.address === "") {
            check_validate = false;
            errorsSubmit.address = "Address must not be empty";
        }
        if (file !== "") {
            if (file.name.split('.')[1] != "jpg" && file.name.split('.')[1] != "png" && file.name.split('.')[1] != "jpeg" && file.name.split('.')[1] != "gif") {
                check_validate = false;
                errorsSubmit.file = "Extension of file muse be jpg or png";
            }
            if (file.size >= 1024 * 1024) {
                check_validate = false;
                errorsSubmit.file = "Capacity of file must be under 1MB";
            }
        }
        setErrors(errorsSubmit);
        if (check_validate === true) {
            const id_user = account.id;
            let response = await ApiUpdateAccount(id_user, inputs.name, inputs.email, inputs.phone, inputs.address, avatar, 0);
            if (response && response.response === "success") {
                dispatch(doUpdateAccount(response));
                alert("Update account successfully");
            }
            else if (response && response.response !== "success") {
                alert("Update account fail");
            }
            else {
                alert("No data from server");
            }
        }
    };
    return (
        <section>
            <div className="container">
                <div className="row">
                    <LeftAccount />
                    <div className="col-sm-9">
                        <div className="blog-post-area">
                            <h2 className="title text-center">Update user</h2>
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
                                        readOnly
                                        type="email"
                                        name="email"
                                        value={inputs.email}
                                        placeholder="Email"
                                    />
                                    <br />
                                    <label><b>Password</b></label>
                                    <input
                                        type="password"
                                        readOnly
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
                                    <button type="submit" className="btn btn-default">Update</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default UpdateAccount;