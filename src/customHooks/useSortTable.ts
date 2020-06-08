import { useState } from "react"
import { Order } from "../types";
import { removeSymbols } from "../utils"

const useSortTable = (initialOrderBy: any) => {
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

    const sort = <T>(order: Order, first: T, second: T) => {
        if (order == "desc")
            return first < second
                ? 1 : -1;
        else
            return first > second
                ? 1 : -1;
    }

    const stableSort = <T>(array: T[], order: Order, orderBy: keyof T) => {
        return array.sort((a: T, b: T) => {
            let firstValue = a[orderBy];
            let secondValue = b[orderBy];
            if (typeof firstValue === "string" && typeof secondValue === "string") {
                if (firstValue.match(/^[0-9]+/)) {
                    return sort(order, Number(removeSymbols(firstValue)),
                        Number(removeSymbols(secondValue)))
                }
                else return sort(order, firstValue.toLowerCase(),
                    secondValue.toLowerCase())
            }
            return sort(order, a[orderBy],
                b[orderBy])
        });
    }
    const returnValues = { createSortHandler, stableSort, order, orderBy }

    return returnValues
};

export default useSortTable; 