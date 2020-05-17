import { useMemo } from "react"
import { TableRows } from "../types";

const useSearch = (rows: TableRows, searchText: string) => {
    const filteredRows = useMemo(() => {
        return rows.filter((row) =>
            Object.values(row).filter((value) =>
                value.toString().toLowerCase().includes(searchText.toLowerCase())
            ).length !== 0
        );
    }, [rows, searchText]);
    return filteredRows
};

export default useSearch; 