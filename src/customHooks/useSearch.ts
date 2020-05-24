import { useMemo } from "react"

const useSearch = <T>(rows: T[], searchText: string) => {
    const filteredRows = useMemo(() => {
        return rows.filter((row) =>
            JSON.stringify(row).toLowerCase().includes(searchText.toLowerCase())
        );
    }, [rows, searchText]);
    return filteredRows
};

export default useSearch; 