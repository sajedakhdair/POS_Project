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

export const checkProductInformation = (productInformation: Product): ProductFormErrors => {
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

    if (name.length === 0)
        errors.nameError = "Name is required"
    if (rawPrice.length === 0)
        errors.rawPriceError = "Raw Price is required"
    else if (! /^\d+$|\$/.test(rawPrice))
        errors.rawPriceError = "rawProce should be a number"
    else if (Number(rawPrice) <= 0)
        errors.rawPriceError = "Raw Price should be more than 0";
    if (price.length === 0)
        errors.priceError = "Price is required"
    else if (Number(price) <= 0)
        errors.priceError = "Price should be more than 0";
    else if (! /^\d+$|\$/.test(price))
        errors.priceError = "Price should be a number"
    else if (Number(removeSymbols(price)) <= Number(removeSymbols(rawPrice)))
        errors.priceError = "Price should be more than the raw price";
    if (code.length === 0)
        errors.codeError = "Code is required"
    if (!category.id)
        errors.categoryError = "Category is required"
    if (new Date(productInformation.expirationDate) < new Date())
        errors.expirationDateError = "Expiration Date should be more than date of today";
    else if (productInformation.stockCount !== "" && ! /^\d+$/.test(productInformation.stockCount))
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