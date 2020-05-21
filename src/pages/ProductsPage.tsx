import React, { useState, useEffect } from "react";
import { withStyles, WithStyles } from "@material-ui/core/styles";
import { createStyles, Theme } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import { Product, Column } from "../types";
import ProductsTable from "../components/Products/ProductsTable";
import { fetchProducts, fetchDeleteProduct } from "../apis/fetchProducts";

const styles = (theme: Theme) =>
  createStyles({
    gridContainer: {
      backgroundColor: theme.palette.grey[50],
      paddingTop: theme.spacing(30),
      paddingBottom: theme.spacing(40),
      display: "flex",
      justifyContent: "space-around",
    },
    productsTableGrid: { margin: theme.spacing(2, 3, 7, 10) },
  });

const ProductsPage: React.FC<WithStyles<typeof styles>> = ({ classes }) => {
  const flagForLoggedIn = localStorage.getItem("flagForLoggedIn");
  const history = useHistory();
  if (flagForLoggedIn !== "true") history.push("/");

  const [rows, setRows] = useState<Product[]>([]);
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

  useEffect(() => {
    onfetchProducts();
  }, []);

  return (
    <Grid container className={classes.gridContainer}>
      <Grid item xs={12} className={classes.productsTableGrid}>
        <ProductsTable
          columns={columns}
          rows={rows}
          onDelete={onDelete}
          onEdit={onEdit}
          onViewDetails={onViewDetails}
        />
      </Grid>
    </Grid>
  );
};
export default withStyles(styles)(ProductsPage);
