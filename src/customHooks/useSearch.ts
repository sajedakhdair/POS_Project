import { useMemo } from "react"
import { Column } from "../types";

const useSearch = <T>(rows: T[], columns: Column<T>[], searchText: string) => {
    const filteredRows = useMemo(() => {
        return rows.filter((row) =>
            columns.filter((column) => {
                const value = row[column.id];
                if (typeof value === "number" || typeof value === "string")
                    return value.toString().toLowerCase().includes(searchText.toLowerCase())
            }).length !== 0
        );
    }, [rows, searchText]);
    return filteredRows
};
export default useSearch; 