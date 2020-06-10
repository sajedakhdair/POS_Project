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
    stockCount: number
    quantity: number;
    expirationDate: string
}

export interface ProductFormErrors {
    nameError: string;
    rawPriceError: string;
    priceError: string;
    codeError: string;
    categoryError: string
    expirationDateError: string
    stockCountError: string
}

export interface Column<T> {
    id: keyof T;
    label: string;
    minWidth?: number;
    align?: "center" | "left" | "right";
}

export interface TableContent<T> {
    rows: T[];
    columns: Column<T>[];
}
export interface Actions {
    onDelete: (id: string) => void;
    onEdit: (category: Category, name: string) => void;
}
export interface ProductActions {
    onDelete: (id: string) => void;
    onEdit: Function;
}

export type CategoriesTableProps = TableContent<Category> & Actions & WithStyles

export type ProductsTableProps = TableContent<Product> & ProductActions & WithStyles

export type Order = "asc" | "desc";

export interface SearchProps {
    onSearch: (searchText: string) => void;
}

export interface FilterByDateProps {
    onFilterByDate: (selectedFirstDate: Date | null, selectedSecondDate: Date | null) => void;
} 