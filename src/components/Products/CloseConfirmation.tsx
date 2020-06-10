import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { WithStyles, withStyles } from "@material-ui/core/styles";
import { Theme, createStyles } from "@material-ui/core/styles";

const styles = (theme: Theme) => createStyles({ button: {} });

interface Props {
  onConfirm: Function;
}
type CloseConfirmationProps = Props & WithStyles;

const CloseConfirmation: React.FunctionComponent<CloseConfirmationProps> = ({
  classes,
  onConfirm,
}) => {
  const [open, setOpen] = React.useState(false);

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
        className={classes.button}
        onClick={handleClickOpen}
      >
        Cancel
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="delete-dialog-title"
        aria-describedby="delete-dialog-description"
      >
        <DialogTitle id="delete-dialog-title">Delete</DialogTitle>
        <DialogContent>
          <DialogContentText id="delete-dialog-description">
            Are you sure? Your data will be lost
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              handleClose();
              onConfirm();
            }}
            color="primary"
          >
            Yes
          </Button>
          <Button onClick={handleClose} color="primary" autoFocus>
            No
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default withStyles(styles)(CloseConfirmation);
