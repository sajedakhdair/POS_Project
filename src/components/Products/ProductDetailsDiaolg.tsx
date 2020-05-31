import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import DescriptionIcon from "@material-ui/icons/Description";
import IconButton from "@material-ui/core/IconButton";
import { withStyles, WithStyles } from "@material-ui/core/styles";
import { createStyles, Theme } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableContainer from "@material-ui/core/TableContainer";
import TableBody from "@material-ui/core/TableBody";
import Divider from "@material-ui/core/Divider";
import { Product } from "../../types";

const styles = (theme: Theme) =>
  createStyles({
    button: {
      textTransform: "none",
      backgroundColor: theme.palette.common.white,
    },
    dialog: {
      width: theme.spacing(97),
    },
    dialogTitle: {
      backgroundColor: theme.palette.primary.dark,
      color: theme.palette.common.white,
    },
    gridContainer: {
      display: "flex",
      justifyContent: "space-between",
      paddingTop: theme.spacing(3),
    },
    productImage: {
      display: "flex",
      width: theme.spacing(25),
      height: theme.spacing(25),
      borderRadius: theme.spacing(2),
    },
    detailsGrid: {
      display: "flex",
      flexDirection: "column",
    },
    rightPartGrid: {
      display: "flex",
      flexDirection: "column",
    },
    tableCell: {
      borderBottom: theme.spacing(0),
      paddingRight: theme.spacing(12),
    },
    boxInRightGrid: {
      display: "flex",
      marginTop: theme.spacing(3),
    },
    typographyInRightPart: {
      paddingRight: theme.spacing(8),
    },
  });

interface Props {
  product: Product;
}
type ProductDetailsPopupProps = Props & WithStyles;

const ProductDetailsDiaolg: React.FunctionComponent<ProductDetailsPopupProps> = ({
  classes,
  product,
}) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const columns = [
    { id: "code", label: "Code" },
    {
      id: "quantity",
      label: "Quantity",
    },
  ];

  const tableHead = (
    <TableHead>
      <TableRow>
        {columns.map((column) => (
          <TableCell key={column.id} className={classes.tableCell}>
            {column.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );

  return (
    <>
      <IconButton color="inherit" onClick={handleClickOpen}>
        <DescriptionIcon fontSize="small" />
      </IconButton>
      <Dialog open={open} aria-labelledby="form-dialog-title" maxWidth="md">
        <DialogTitle id="form-dialog-title" className={classes.dialogTitle}>
          Product Details
        </DialogTitle>
        <DialogContent className={classes.dialog}>
          <Grid container className={classes.gridContainer}>
            <Grid item xs={3}>
              {product.image ? (
                <img
                  className={classes.productImage}
                  src={require(`../../imgs/${product.image}`)}
                  alt="img"
                ></img>
              ) : (
                <img
                  className={classes.productImage}
                  alt={`${product.name} img`}
                ></img>
              )}
            </Grid>
            <Grid item xs={3} className={classes.detailsGrid}>
              <Box>
                <Typography variant="h4">{product.name}</Typography>
                <Typography variant="body2">
                  <strong>Category</strong>: {product.category}
                </Typography>
                <Typography variant="body2">
                  <strong>Raw Price:</strong> {product.rawPrice}
                </Typography>
                <Typography variant="body2">
                  <strong>Price:</strong> {product.price}
                </Typography>
                <Typography variant="body2">
                  <strong>Product Description:</strong> {product.description}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={5} className={classes.rightPartGrid}>
              <TableContainer>
                {tableHead}
                <Divider />
                <TableBody>
                  <TableRow hover>
                    <TableCell
                      key={columns[0].id}
                      className={classes.tableCell}
                    >
                      {product.code}
                    </TableCell>
                    <TableCell
                      key={columns[1].id}
                      className={classes.tableCell}
                    >
                      {product.quantity}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </TableContainer>
              <Box className={classes.boxInRightGrid}>
                <Typography
                  variant="body2"
                  className={classes.typographyInRightPart}
                >
                  expiration Date
                </Typography>
                <Typography variant="body2">
                  {product.expirationDate}
                </Typography>
              </Box>
              <Divider />
            </Grid>
          </Grid>
        </DialogContent>
        <Divider />
        <DialogActions>
          <Button
            variant="contained"
            onClick={handleClose}
            className={classes.button}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
export default withStyles(styles)(ProductDetailsDiaolg);
