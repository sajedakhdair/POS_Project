import { userInformationProps } from "../types";

export const fetchSubmitLogin = async (userInformation: userInformationProps): Promise<boolean> => {
    let loggedIn: boolean = false;
    const password = userInformation.password;
    const userName = userInformation.userName;
    const url = `http://localhost:3001/users?username=${userName}&password=${password}`;
    let fetchResult = await fetch(url);
    let response = await fetchResult.json().then((data) => {
        if (data.length != 0)
            loggedIn = true
        else loggedIn = false
    });
    return loggedIn;
}