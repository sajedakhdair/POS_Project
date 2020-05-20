import { useState } from "react";
import React from "react";
import TablePagination from "@material-ui/core/TablePagination";

const useTablePagination = <T extends object>(rows: T[]) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(4);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const tablePagination = (
    <TablePagination
      rowsPerPageOptions={[4, 8, 16, 32]}
      component="div"
      count={rows.length}
      rowsPerPage={rowsPerPage}
      page={page}
      onChangePage={handleChangePage}
      onChangeRowsPerPage={handleChangeRowsPerPage}
    />
  );

  return { tablePagination, page, rowsPerPage };
};

export default useTablePagination;
