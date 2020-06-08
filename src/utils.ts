import { userInformationProps, ProductFormErrors, Product } from "./types";
import { errorsProps } from "./types";

//******login component******
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

//** Category component **
function appendLeadingZeroes(number: number) {
    if (number <= 9) {
        return "0" + number;
    }
    return number
}

export const formatDate = () => {
    let currentDateTime = new Date();
    let formattedDate = currentDateTime.getFullYear() + "-"
        + appendLeadingZeroes(currentDateTime.getMonth() + 1) + "-"
        + appendLeadingZeroes(currentDateTime.getDate()) + " "
        + appendLeadingZeroes(currentDateTime.getHours()) + ":"
        + appendLeadingZeroes(currentDateTime.getMinutes()) + ":"
        + appendLeadingZeroes(currentDateTime.getSeconds())
    return formattedDate;
}

// ** Product component **

export const removeSymbols = (sentence: string): string => {
    const regex: RegExp = /\$|\%|\-/g;
    return sentence.replace(regex, '');
}

export const checkProductInformation = (productInformation: any): ProductFormErrors => {
    let errors: ProductFormErrors =
    {
        nameError: "",
        rawPriceError: "",
        priceError: "",
        codeError: "",
        categoryError: "",
        expirationDateError: "",
        stockCountError: ""
    }

    const { name, rawPrice, price, tax, category, code } = productInformation

    if (name.length === 0 || name === "Name")
        errors.nameError = "Name is required"
    if (rawPrice === 0 || rawPrice.length === 0)
        errors.rawPriceError = "Raw Price is required"
    if (price === 0 || price.length === 0)
        errors.priceError = "Price is required"
    else if (price <= 0)
        errors.priceError = "Price should be more than 0";
    else if (Number(removeSymbols(price)) <= Number(removeSymbols(rawPrice)))
        errors.priceError = "Price should be more than the raw price";
    if (code === "000000" || code.length === 0)
        errors.codeError = "Code is required"
    if (category.length === 0 || category === "Category")
        errors.categoryError = "Category is required"
    if (new Date(productInformation.expirationDate) < new Date())
        errors.expirationDateError = "Expiration Date should be more than date of today";
    if (isNaN(productInformation.stockCount))
        errors.stockCountError = "Stock Count should be a number"
    return ((errors));

}

export const isThereAnyProductError = (errors: ProductFormErrors): boolean => {
    if (!errors.nameError && !errors.rawPriceError &&
        !errors.priceError && !errors.codeError &&
        !errors.categoryError && !errors.stockCountError
        && !errors.expirationDateError) {
        return false
    }
    else return true
}

export const formatPrice = (price: string): string => {
    return Number(price).toFixed(2) + '$'
}