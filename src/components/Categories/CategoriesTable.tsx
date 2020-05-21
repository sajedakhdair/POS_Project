import React, { useState, useEffect, useMemo } from "react";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { withStyles } from "@material-ui/core/styles";
import { createStyles, Theme } from "@material-ui/core/styles";
import DeleteDialog from "./DeleteDialog";
import CategoryFormDialog from "./CategoryFormDialog";
import { CategoriesTableProps } from "../../types";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import useSortTable from "../../customHooks/useSortTable";
import useTablePagination from "../../customHooks/useTablePagination";

const styles = (theme: Theme) =>
  createStyles({
    root: {
      width: "95%",
    },
    container: {
      maxHeight: 280,
    },
    tableCell: {
      minWidth: 170,
      align: "left",
      padding: theme.spacing(0.2, 0.5, 0.2, 1.5),
    },
  });

const CategoriesTable: React.FC<CategoriesTableProps> = ({
  classes,
  columns = [],
  rows: incomingRows = [],
  onDelete: handleDelete,
  onEdit: handleEdit,
}) => {
  const rows = useMemo(() => incomingRows.slice(), [incomingRows]);

  const { createSortHandler, stableSort, order, orderBy } = useSortTable(
    columns[0].id
  );

  const { tablePagination, page, rowsPerPage } = useTablePagination(rows);

  const tableHead = (
    <TableHead>
      <TableRow>
        {columns.map((column) => (
          <TableCell
            key={column.id}
            align={column.align}
            style={{ minWidth: column.minWidth }}
          >
            <TableSortLabel
              active={orderBy === column.id}
              direction={orderBy === column.id ? order : "asc"}
              onClick={createSortHandler(column.id)}
            >
              {column.label}
            </TableSortLabel>
          </TableCell>
        ))}
        <TableCell className={classes.tableCell}>{"Actions"}</TableCell>
      </TableRow>
    </TableHead>
  );

  if (rows.length === 0)
    return (
      <Paper className={classes.root}>
        <TableContainer className={classes.container}>
          <Table stickyHeader aria-label="sticky table">
            {tableHead}
            <TableBody>
              <TableRow>
                <TableCell className={classes.tableCell}>
                  {"No matching records found"}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    );

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          {tableHead}
          <TableBody>
            {stableSort(rows, order, orderBy)
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell
                          key={column.id}
                          align={column.align}
                          className={classes.tableCell}
                        >
                          {value}
                        </TableCell>
                      );
                    })}
                    <TableCell key="actions" className={classes.tableCell}>
                      <DeleteDialog id={row.id} onDelete={handleDelete} />
                      <CategoryFormDialog
                        mode="Edit"
                        category={row}
                        onSubmit={handleEdit}
                      />
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      {tablePagination}
    </Paper>
  );
};
export default withStyles(styles)(CategoriesTable);
