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
import { ProductsTableProps } from "../../types";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import useSortTable from "../../customHooks/useSortTable";
import useTablePagination from "../../customHooks/useTablePagination";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import DeleteDialog from "../DeleteDialog";
import ProductDetailsDiaolg from "./ProductDetailsDiaolg";
import { useHistory } from "react-router-dom";

const styles = (theme: Theme) =>
  createStyles({
    root: {
      width: "95%",
    },
    container: {
      maxHeight: 280,
    },
    tableCell: {
      width: 120,
      align: "left",
      padding: theme.spacing(0.1, 0, 0.1, 2),
    },
  });

const ProductsTable: React.FC<ProductsTableProps> = ({
  classes,
  columns = [],
  rows: incomingRows = [],
  onDelete: handleDelete,
  onEdit: handleEdit,
}) => {
  const history = useHistory();
  const { createSortHandler, stableSort, order, orderBy } = useSortTable(
    columns[0].id
  );

  const { tablePagination, page, rowsPerPage } = useTablePagination(
    incomingRows
  );

  const rows = useMemo(
    () =>
      stableSort(incomingRows.slice(), order, orderBy).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      ),
    [incomingRows, order, orderBy, page, rowsPerPage]
  );

  const tableHead = (
    <TableHead>
      <TableRow>
        {columns.map((column) => (
          <TableCell
            key={column.id}
            align={column.align}
            style={{ width: column.minWidth }}
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
            {rows.map((row) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    if (column.id === "category") {
                      const categoryName = row[column.id].categoryName;
                      return (
                        <TableCell
                          key={column.id}
                          align={column.align}
                          className={classes.tableCell}
                          style={{ width: column.minWidth }}
                        >
                          {categoryName}
                        </TableCell>
                      );
                    }
                    return (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        className={classes.tableCell}
                        style={{ width: column.minWidth }}
                      >
                        {value}
                      </TableCell>
                    );
                  })}
                  <TableCell key="actions" className={classes.tableCell}>
                    <DeleteDialog id={row.id} onDelete={handleDelete} />
                    <IconButton
                      color="inherit"
                      onClick={() => {
                        history.push(`/products/${row.id}/edit`);
                      }}
                    >
                      <EditIcon fontSize="small" />
                    </IconButton>
                    <ProductDetailsDiaolg product={row} />
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
export default withStyles(styles)(ProductsTable);
