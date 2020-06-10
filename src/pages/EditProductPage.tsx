import React from "react";
import { withStyles, WithStyles } from "@material-ui/core/styles";
import { createStyles, Theme } from "@material-ui/core/styles";
import { useHistory, RouteComponentProps, Router } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import ProductForm from "../components/Products/ProductForm";
import { Product } from "../types";
import { fetchEditProduct } from "../apis/fetchProducts";

const styles = (theme: Theme) =>
  createStyles({
    gridContainer: {
      backgroundColor: theme.palette.grey[50],
      paddingTop: theme.spacing(30),
      paddingBottom: theme.spacing(40),
      display: "flex",
      justifyContent: "center",
    },
    imageBox: {
      color: theme.palette.common.black,
    },
    imageLabel: {
      display: "flex",
      justifyContent: "flex-start",
    },
  });

type Params = {
  id: string;
};

type Props = RouteComponentProps<Params>;

const EditProductPage: React.FC<Props & WithStyles<typeof styles>> = ({
  match,
  classes,
}) => {
  const flagForLoggedIn = localStorage.getItem("flagForLoggedIn");
  const history = useHistory();
  if (flagForLoggedIn !== "true") history.push("/");

  const handleClose = () => {
    history.push("/ProductsPage");
  };

  const handleEdit = async (
    selectedProduct: Product,
    editedProduct: Product
  ) => {
    const validationStatus = await fetchEditProduct(
      selectedProduct,
      editedProduct
    );
    return validationStatus;
  };

  return (
    <>
      <Grid xs={12} container className={classes.gridContainer}>
        <Grid item xs={6}>
          <ProductForm
            onSubmit={handleEdit}
            onClose={handleClose}
            id={match.params.id}
            classes={{
              imageBox: classes.imageBox,
              imageLabel: classes.imageLabel,
            }}
          />
        </Grid>
      </Grid>
    </>
  );
};
export default withStyles(styles)(EditProductPage);
