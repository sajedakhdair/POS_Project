
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

export interface Column {
    id: "name" | "date";
    label: string;
    minWidth?: number;
    align?: "center" | "left" |"right";
}
export interface TableContent {
    rows: Category[];
    columns: Column[];
}
export interface Actions {
    onDelete: Function;
    onEdit: Function;
}