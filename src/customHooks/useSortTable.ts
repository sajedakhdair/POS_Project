import { useState } from "react"
import { Order } from "../types";

const useStoreTable = (initialOrderBy: any) => {
    const [order, setOrder] = useState<Order>("asc");
    const [orderBy, setOrderBy] = useState(initialOrderBy);

    const handleRequestSort = <T>(
        event: React.MouseEvent<unknown>,
        property: T
    ) => {
        const isAsc = orderBy === property && order === "asc";
        setOrder(isAsc ? "desc" : "asc");
        setOrderBy(property);
    };

    const createSortHandler = <T>(property: T) => (
        event: React.MouseEvent<unknown>) => {
        handleRequestSort(event, property);
    };

    const stableSort = <T>(array: T[], order: Order, orderBy: keyof T) => {
        return array.sort((a: T, b: T) => {
            if (order == "desc")
                return a[orderBy] < b[orderBy]
                    ? 1 : -1;
            else
                return a[orderBy] > b[orderBy]
                    ? 1 : -1;

        });
    }

    const returnValues = { createSortHandler, stableSort, order, orderBy }

    return returnValues
};

export default useStoreTable; 