import { useMemo } from "react"
import { TableRows } from "../types";

const useSearch = (rows: TableRows, searchText: string) => {
    const filteredRows = useMemo(() => {
        return rows.filter((row) =>
            JSON.stringify(row).toLowerCase().includes(searchText.toLowerCase())
        );
    }, [rows, searchText]);
    return filteredRows
};

export default useSearch; 