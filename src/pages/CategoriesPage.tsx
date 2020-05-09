import React, { useState, useEffect } from "react";
import { withStyles, WithStyles } from "@material-ui/core/styles";
import { createStyles, Theme } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import CategoriesTable from "../components/Categories/CategoriesTable";
import { Category, Column } from "../types";
import { fetchCategories, fetchDeleteCategory } from "../apis/fetchCategories";
import { fetchEditCategory } from "../apis/fetchCategories";
import Grid from "@material-ui/core/Grid";
import CategoryFormDialog from "../components/Categories/CategoryFormDialog";

const styles = (theme: Theme) =>
  createStyles({
    gridContainer: {
      backgroundColor: theme.palette.grey[50],
      paddingTop: theme.spacing(19),
      paddingBottom: theme.spacing(19),
      display: "flex",
    },
    categoriesTableGrid: {
      margin: theme.spacing(2, 3, 7, 10),
    },
  });

const CategoriesPage: React.FC<WithStyles<typeof styles>> = ({ classes }) => {
  const flagForLoggedIn = localStorage.getItem("flagForLoggedIn");
  const history = useHistory();
  if (flagForLoggedIn !== "true") history.push("/");

  const [rows, setRows] = useState<Category[]>([]);
  const columns: Column[] = [
    { id: "name", label: "Name", minWidth: 170, align: "left" },
    {
      id: "date",
      label: "Created At",
      minWidth: 170,
      align: "left",
    },
  ];

  const onfetchCategories = () => {
    fetchCategories().then((data) => {
      setRows(data);
    });
  };

  const onDelete = async (id: string) => {
    await fetchDeleteCategory(id);
    onfetchCategories();
  };

  const onEdit = async (selectedCategory: Category, name: string) => {
    const result = await fetchEditCategory(selectedCategory, name);
    onfetchCategories();
  };

  const onAdd = async (name: string) => {};

  useEffect(() => {
    onfetchCategories();
  }, []);

  return (
    <Grid container className={classes.gridContainer}>
      <Grid item xs={3}>
        <CategoryFormDialog mode="Create" onSubmit={onAdd} />
      </Grid>
      <Grid item xs={12} className={classes.categoriesTableGrid}>
        <CategoriesTable
          columns={columns}
          rows={rows}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      </Grid>
    </Grid>
  );
};
export default withStyles(styles)(CategoriesPage);
