import React from "react";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import { withStyles, WithStyles } from "@material-ui/core/styles";
import { createStyles, Theme } from "@material-ui/core/styles";
import { Actions } from "../../types";
import { TableContent } from "../../types";
import EditIcon from "@material-ui/icons/Edit";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import IconButton from "@material-ui/core/IconButton";

const styles = (theme: Theme) =>
  createStyles({
    root: {
      width: "75%",
    },
    container: {
      maxHeight: 300,
    },
    tableCell: {
      minWidth: 170,
      align: "left",
    },
  });

const CategoriesTable: React.FC<
  TableContent & Actions & WithStyles<typeof styles>
> = (props) => {
  const classes = props.classes;
  const handleDelete = props.onDelete;
  const rows = props.rows;
  const columns = props.columns;
  const handleEdit = props.onEdit;

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
              <TableCell className={classes.tableCell}>{"Actions"}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell align={column.align}>{value}</TableCell>
                      );
                    })}
                    <TableCell className={classes.tableCell}>
                      <IconButton
                        color="inherit"
                        onClick={() => {
                          handleDelete(row.id);
                        }}
                      >
                        <DeleteForeverIcon fontSize="small" />
                      </IconButton>
                      <IconButton
                        color="inherit"
                        aria-label="upload picture"
                        onClick={() => {
                          handleEdit(row, "newName");
                        }}
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 15, 25]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
};
export default withStyles(styles)(CategoriesTable);