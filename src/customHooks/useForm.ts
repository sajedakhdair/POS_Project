import { useState } from "react"
import { useHistory } from "react-router-dom";
import { errorsProps } from "../types";
import { checkValues } from "../utils"
import { isThereAnyError } from "../utils";
import { fetchSubmitLogin } from "../apis/fetchSubmitLogin"
const useForm = () => {
    const [userInformation, setValues] = useState({ userName: "", password: "" });
    const [errors, setErrors] = useState({
        flagForuserNameErrors: false, userNameError: "",
        flagForPasswordError: false, passwordError: ""
    });
    const history = useHistory();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setValues({ ...userInformation, [name]: value });
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const errors: errorsProps = checkValues(userInformation);
        const hasErrors: boolean = isThereAnyError(errors);
        if (!hasErrors) {
            if (await fetchSubmitLogin(userInformation)) {
                history.push("/MainPage");
                localStorage.setItem("flagForLoggedIn", "true");
            }
        }
        else setErrors(errors);
    };

    const returnValues = { handleChange, handleSubmit, userInformation, errors }
    return returnValues
};

export default useForm;