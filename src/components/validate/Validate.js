import { useEffect } from "react";

const Validate = (props) => {
    // props
    const { errors } = props;

    // effect
    useEffect(() => {
        fetchErrors();
    }, [errors]);

    // function con
    const fetchErrors = () => {
        if (errors && Object.keys(errors).length > 0) {
            return Object.keys(errors).map((key, index) => {
                return (
                    <li key={`error-${index}`}>{errors[key]}</li>
                );
            });
        }
    };

    return (
        <>
            {fetchErrors()}
        </>
    );
};

export default Validate;