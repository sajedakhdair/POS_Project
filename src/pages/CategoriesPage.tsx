import React, { useState, useEffect } from "react";
import { withStyles, WithStyles } from "@material-ui/core/styles";
import { createStyles, Theme } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import CategoriesTable from "../components/Categories/CategoriesTable";
import { Category, Column } from "../types";
import { fetchCategories, fetchDeleteCategory } from "../apis/fetchCategories";

const styles = (theme: Theme) => createStyles({});

function CategoriesPage(props: WithStyles<typeof styles>) {
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

  const onfetchCategories = async () => {
    let categories: Category[] = await fetchCategories();
    setRows(categories);
  };

  const onDelete = async (id: string) => {
    await fetchDeleteCategory(id);
    onfetchCategories();
  };

  const onEdit = (selectedCategory: Category, name: string) => {};

  useEffect(() => {
    onfetchCategories();
  }, []);

  return (
    <CategoriesTable
      columns={columns}
      rows={rows}
      onDelete={onDelete}
      onEdit={onEdit}
    />
  );
}
export default withStyles(styles)(CategoriesPage);
