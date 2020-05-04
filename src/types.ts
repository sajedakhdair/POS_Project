
export interface userInformationProps {
    userName: string;
    password: string;
}
export interface errorsProps {
    flagForuserNameErrors: boolean;
    userNameError: string;
    flagForPasswordError: boolean;
    passwordError: string;
}
export interface Category {
    id: number;
    name: string;
    date: string;
}
