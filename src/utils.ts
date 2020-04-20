import { userInformationProps } from "./types";
import { errorsProps } from "./types";

export const checkValues = (userInformation: userInformationProps): errorsProps => {
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

export const isThereAnyError = (errors: errorsProps): boolean => {
    if (!errors.flagForuserNameErrors && !errors.flagForPasswordError)
        return false
    else return true
} 