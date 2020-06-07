import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { WithStyles, withStyles } from "@material-ui/core/styles";
import { Theme, createStyles } from "@material-ui/core/styles";
import ProductForm from "./ProductForm";

const styles = (theme: Theme) =>
  createStyles({
    button: { textTransform: "none" },
    dialog: { width: 500 },
    dialogTitle: {
      backgroundColor: theme.palette.primary.dark,
      color: theme.palette.common.white,
    },
  });

interface Props {
  onSubmit: Function;
}
type CategoryFormDialogProps = Props & WithStyles;

const ProductFormDialog: React.FunctionComponent<CategoryFormDialogProps> = ({
  classes,
  onSubmit: handleAdd,
}) => {
  const [open, setOpen] = React.useState(false);
  const titleOfForm: string = "Add Product";

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        className={classes.button}
        onClick={handleClickOpen}
      >
        Add Product
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title" className={classes.dialogTitle}>
          {titleOfForm}
        </DialogTitle>
        <DialogContent className={classes.dialog}>
          <ProductForm onSubmit={handleAdd} onClose={handleClose} />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default withStyles(styles)(ProductFormDialog);
