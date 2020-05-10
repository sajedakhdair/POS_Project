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
import CircularProgress from "@material-ui/core/CircularProgress";
import Snackbar from "@material-ui/core/Snackbar";
import CloseIcon from "@material-ui/icons/Close";

const styles = (theme: Theme) =>
  createStyles({
    button: { textTransform: "none" },
    dialog: { width: 500 },
    dialogTitle: {
      backgroundColor: theme.palette.primary.dark,
      color: theme.palette.common.white,
    },
    circularProgress: {
      position: "absolute",
      left: "45%",
      marginLeft: "-25px",
      top: "50%",
      marginTop: "-25px",
      color: theme.palette.primary.dark,
      size: "20px",
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
  const [disabledButton, setDisabledButton] = useState(false);
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [circularProgress, setCircularProgress] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
    setName("");
    setTextFieldErrorStatus(false);
    setTextFieldErrorMsg("");
    setDisabledButton(false);
    setOpenSnackBar(false);
    setCircularProgress(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newName = event.target.value;
    setName(newName);
  };

  const handleSubmit = async () => {
    setDisabledButton(true);
    let categoryNameValidationStatus: boolean;
    if (name.length === 0) {
      setTextFieldErrorStatus(true);
      setTextFieldErrorMsg("Please fill out the category Name");
    } else {
      if (mode === "Edit") {
        categoryNameValidationStatus = await onSubmit(category, name);
      } else {
        categoryNameValidationStatus = await onSubmit(name);
      }
      if (categoryNameValidationStatus) {
        setCircularProgress(true);
        setTimeout(() => {
          handleClose();
        }, 3000);
      } else {
        setOpenSnackBar(true);
        handleClose();
      }
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
            disabled={circularProgress}
            onClick={handleSubmit}
            color="primary"
            variant="contained"
            className={classes.button}
          >
            Submit
          </Button>
          {circularProgress ? (
            <CircularProgress className={classes.circularProgress} />
          ) : null}
        </DialogActions>
      </Dialog>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        open={openSnackBar}
        message="Please try again as category name must be unique :("
        action={
          <IconButton
            size="small"
            color="inherit"
            onClick={() => {
              setOpenSnackBar(false);
            }}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      />
    </>
  );
};

export default withStyles(styles)(CategoryFormDialog);
