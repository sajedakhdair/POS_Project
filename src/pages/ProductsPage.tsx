import React, { useState, useEffect } from "react";
import { withStyles, WithStyles } from "@material-ui/core/styles";
import { createStyles, Theme } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import { Product, Column } from "../types";
import ProductsTable from "../components/Products/ProductsTable";
import { fetchProducts, fetchDeleteProduct } from "../apis/fetchProducts";
import Search from "../components/Search";
import useSearch from "../customHooks/useSearch";
import Button from "@material-ui/core/Button";
import FilterByDate from "../components/Products/FilterByDate";
import useFilterByDate from "../customHooks/useFilterByDate";

const styles = (theme: Theme) =>
  createStyles({
    gridContainer: {
      backgroundColor: theme.palette.grey[50],
      paddingTop: theme.spacing(30),
      paddingBottom: theme.spacing(40),
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-around",
    },
    productsTableGrid: { margin: theme.spacing(2, 3, 7, 10) },
    searchGrid: {
      display: "flex",
      justifyContent: "flex-end",
    },
    inputTextHeight: {
      maxHeight: theme.spacing(4),
      width: theme.spacing(19),
    },
    addProductButton: {
      display: "flex",
      justifyContent: "flex-start",
      textTransform: "none",
    },
    buttonAndSearchGrid: {
      display: "flex",
      justifyContent: "space-around",
      textTransform: "none",
      margin: theme.spacing(4, 0, 0, 0),
    },
    filterByDateGrid: {
      display: "flex",
      justifyContent: "flex-end",
      margin: "auto",
      marginRight: "6vw",
    },
    typography: {
      color: theme.palette.grey[600],
    },
  });

const ProductsPage: React.FC<WithStyles<typeof styles>> = ({ classes }) => {
  const flagForLoggedIn = localStorage.getItem("flagForLoggedIn");
  const history = useHistory();
  if (flagForLoggedIn !== "true") history.push("/");

  const [rows, setRows] = useState<Product[]>([]);
  const [searchText, setSearchText] = useState("");
  const [firstDate, setFirstDate] = React.useState<Date | null>(null);
  const [secondDate, setSecondDate] = React.useState<Date | null>(null);
  const columns: Column<Product>[] = [
    { id: "code", label: "Code", minWidth: 1 },
    {
      id: "name",
      label: "Name",
      minWidth: 1,
    },
    { id: "category", label: "Category", minWidth: 1 },
    {
      id: "description",
      label: "Description",
      minWidth: 1,
    },
    { id: "tax", label: "tax (%)", minWidth: 1 },
    {
      id: "price",
      label: "Price",
      minWidth: 1,
    },
  ];

  const onfetchProducts = () => {
    fetchProducts()
      .then((data) => {
        setRows(data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const onDelete = async (id: string) => {
    await fetchDeleteProduct(id);
    onfetchProducts();
  };

  const onEdit = (selectedProduct: Product) => {};

  const onViewDetails = (selectedProduct: Product) => {};

  const onSearch = (searchText: string) => {
    setSearchText(searchText);
  };

  const onFilterByDate = (
    selectedFirstDate: Date | null,
    selectedSecondDate: Date | null
  ) => {
    setFirstDate(selectedFirstDate);
    setSecondDate(selectedSecondDate);
  };

  const filteredRowsByDate = useFilterByDate(rows, firstDate, secondDate);

  const filteredRows = useSearch(filteredRowsByDate, columns, searchText);

  useEffect(() => {
    onfetchProducts();
  }, []);

  return (
    <Grid container className={classes.gridContainer}>
      <Grid item xs={8} className={classes.filterByDateGrid}>
        <FilterByDate
          onFilterByDate={onFilterByDate}
          classes={{
            typography: classes.typography,
          }}
        />
      </Grid>
      <Grid className={classes.buttonAndSearchGrid}>
        <Grid item xs={3}>
          <Button
            variant="contained"
            color="primary"
            className={classes.addProductButton}
          >
            Add Product
          </Button>
        </Grid>
        <Grid item xs={6} className={classes.searchGrid}>
          <Search
            onSearch={onSearch}
            classes={{
              inputTextHeight: classes.inputTextHeight,
            }}
          />
        </Grid>
      </Grid>
      <Grid item xs={12} className={classes.productsTableGrid}>
        <ProductsTable
          columns={columns}
          rows={filteredRows}
          onDelete={onDelete}
          onEdit={onEdit}
          onViewDetails={onViewDetails}
        />
      </Grid>
    </Grid>
  );
};
export default withStyles(styles)(ProductsPage);
