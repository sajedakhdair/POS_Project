import { useMemo } from "react"
import { Product } from "../types";

const useFilterByExpirationDate = (rows: Product[], firstDate: Date | null, secondDate: Date | null) => {
    const filteredRows: Product[] = useMemo(() => {
        if (firstDate && secondDate)
            return rows.filter((row) =>
                row.expirationDate ?
                    new Date(row.expirationDate) >= firstDate &&
                    new Date(row.expirationDate) <= secondDate
                    : false);
        else if (firstDate && !secondDate)
            return rows.filter((row) =>
                row.expirationDate ? new Date(row.expirationDate) >= firstDate : false);
        else if (!firstDate && secondDate)
            return rows.filter((row) =>
                row.expirationDate ? new Date(row.expirationDate) <= secondDate : false);
        else
            return rows
    }, [rows, firstDate, secondDate]);
    return filteredRows
};

export default useFilterByExpirationDate; 