import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Category } from "../../types";
import { WithStyles, withStyles } from "@material-ui/core/styles";
import { Theme, createStyles } from "@material-ui/core/styles";
import EditIcon from "@material-ui/icons/Edit";
import IconButton from "@material-ui/core/IconButton";

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
  mode: "Edit" | "Create";
  category?: Category;
  onSubmit: Function;
}
type CategoryFormDialogProps = Props & WithStyles;

const CategoryFormDialog: React.FunctionComponent<CategoryFormDialogProps> = ({
  classes,
  mode,
  onSubmit,
  category,
}) => {
  const [open, setOpen] = React.useState(false);
  const titleOfForm: string =
    mode === "Edit" ? "Edit Category Name" : "Add Category";

  const placeHolhderForTextFeild: string =
    mode === "Edit" ? (category ? category.name : "") : "Enter Category Name";

  const [name, setName] = useState("");
  const [textFieldErrorStatus, setTextFieldErrorStatus] = useState(false);
  const [textFieldErrorMsg, setTextFieldErrorMsg] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newName = event.target.value;
    setName(newName);
  };

  const handleSubmit = () => {
    if (name.length === 0) {
      setTextFieldErrorStatus(true);
      setTextFieldErrorMsg("Please fill out the category Name");
    } else {
      setTextFieldErrorStatus(false);
      handleClose();
      mode === "Edit" ? onSubmit(category, name) : onSubmit(name);
    }
  };

  const DialogButton =
    mode === "Edit" ? (
      <IconButton color="inherit" onClick={handleClickOpen}>
        <EditIcon fontSize="small" />
      </IconButton>
    ) : (
      <Button
        variant="contained"
        color="primary"
        className={classes.button}
        onClick={handleClickOpen}
      >
        Add Category
      </Button>
    );

  return (
    <>
      {DialogButton}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title" className={classes.dialogTitle}>
          {titleOfForm}
        </DialogTitle>
        <DialogContent className={classes.dialog}>
          <TextField
            required
            autoFocus
            margin="dense"
            id="name"
            type="text"
            label="Category Name"
            fullWidth
            placeholder={placeHolhderForTextFeild}
            onChange={handleChange}
            error={textFieldErrorStatus}
            helperText={textFieldErrorMsg}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            color="primary"
            className={classes.button}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            color="primary"
            variant="contained"
            className={classes.button}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default withStyles(styles)(CategoryFormDialog);
