import React, { useState, useEffect, useMemo } from "react";
import { withStyles, WithStyles } from "@material-ui/core/styles";
import { createStyles, Theme } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import CategoriesTable from "../components/Categories/CategoriesTable";
import { Category, Column } from "../types";
import {
  fetchCategories,
  fetchDeleteCategory,
  fetchAddCategory,
} from "../apis/fetchCategories";
import { fetchEditCategory } from "../apis/fetchCategories";
import Grid from "@material-ui/core/Grid";
import CategoryFormDialog from "../components/Categories/CategoryFormDialog";
import Search from "../components/Search";
import useSearch from "../customHooks/useSearch";

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
    searchTextField: {
      position: "relative",
      top: theme.spacing(-2),
      left: theme.spacing(56),
    },
    searchInputLabel: {
      position: "relative",
      top: theme.spacing(1),
      left: theme.spacing(42),
    },
    inputTextHeight: {
      maxHeight: theme.spacing(4),
      width: theme.spacing(19),
    },
  });

const CategoriesPage: React.FC<WithStyles<typeof styles>> = ({ classes }) => {
  const flagForLoggedIn = localStorage.getItem("flagForLoggedIn");
  const history = useHistory();
  if (flagForLoggedIn !== "true") history.push("/");

  const [rows, setRows] = useState<Category[]>([]);
  const [name, setName] = useState<string>("");
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
    fetchCategories()
      .then((data) => {
        setRows(data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const onDelete = async (id: string) => {
    await fetchDeleteCategory(id);
    onfetchCategories();
  };

  const onEdit = async (selectedCategory: Category, name: string) => {
    const validationStatus = await fetchEditCategory(selectedCategory, name);
    onfetchCategories();
    return validationStatus;
  };

  const onAdd = async (name: string) => {
    const validationStatus = await fetchAddCategory(name);
    onfetchCategories();
    return validationStatus;
  };

  const onSearch = (name: string) => {
    setName(name);
  };

  const filteredRows = useSearch(rows, name);

  useEffect(() => {
    onfetchCategories();
  }, []);

  return (
    <Grid container className={classes.gridContainer}>
      <Grid item xs={3}>
        <CategoryFormDialog mode="Create" onSubmit={onAdd} />
      </Grid>
      <Grid item xs={6}>
        <Search
          onSearch={onSearch}
          classes={{
            searchTextField: classes.searchTextField,
            searchInputLabel: classes.searchInputLabel,
            inputTextHeight: classes.inputTextHeight,
          }}
        />
      </Grid>
      <Grid item xs={12} className={classes.categoriesTableGrid}>
        <CategoriesTable
          columns={columns}
          rows={filteredRows}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      </Grid>
    </Grid>
  );
};
export default withStyles(styles)(CategoriesPage);
