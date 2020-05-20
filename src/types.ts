import { WithStyles } from "@material-ui/core/styles/withStyles";

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

export interface Product {
    id: number;
    name: string;
    rawPrice: string;
    price: string;
    tax: string;
    code: string;
    color?: string
    image?: string
    category: string
    description?: string
    stockCount?: number
    quantity: number;
    expirationDate?: string
}

export interface Column {
    id: keyof Category;
    label: string;
    minWidth?: number;
    align?: "center" | "left" | "right";
}

export type TableRows = Category[];
export interface TableContent {
    rows: TableRows;
    columns: Column[];
}
export interface Actions {
    onDelete: Function;
    onEdit: Function;
}

export type CategoriesTableProps = TableContent & Actions & WithStyles

export type Order = "asc" | "desc";

export interface SearchProps {
    onSearch: (searchText: string) => void;
} 