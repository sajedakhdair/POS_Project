import { useState, useEffect } from "react"
import { useHistory } from "react-router-dom";

const useForm = () => {
    const [userInformation, setValues] = useState({ userName: "", password: "" });
    const [errors, setErrors] = useState({
        flagForuserNameErrors: false, userNameError: "",
        flagForPasswordError: false, passwordError: ""
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const history = useHistory();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setValues({ ...userInformation, [name]: value });
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setErrors(checkValues());
        setIsSubmitting(true);
    };

    const checkValues = () => {
        let errors = {
            flagForuserNameErrors: false, userNameError: "",
            flagForPasswordError: false, passwordError: ""
        }
        const password = userInformation.password;
        const userName = userInformation.userName;
        const charsAndNumer: RegExp = /^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]+$/;

        if (userName.length === 0) {
            errors.userNameError = "userName is required"
            errors.flagForuserNameErrors = true;
        }
        if (password.length === 0) {
            errors.passwordError = "password is required"
            errors.flagForPasswordError = true;
        }
        else if (password.length < 4) {
            errors.passwordError = "password needs to be at least 4 char"
            errors.flagForPasswordError = true;
        }
        else if (!password.match(charsAndNumer)) {
            errors.passwordError = "Password must contain chars and numbers"
            errors.flagForPasswordError = true;
        }
        return ((errors));
    }

    useEffect(() => {
        if (errors.userNameError === "" && errors.passwordError === "" && isSubmitting) {
            fetch(`http://localhost:3001/users?username=${userInformation.userName}&password=${userInformation.password}`)
                .then((response) => response.json())
                .then((data) => {
                    if (data.length !== 0) {
                        history.push("/MainPage");
                    }
                })
        }
    }, [errors])

    const returnValues = { handleChange, handleSubmit, userInformation, errors }
    return returnValues
};

export default useForm;