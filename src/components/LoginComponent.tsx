import React from "react";
import { withStyles, WithStyles, createStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import logo from "../imgs/logo.png";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

interface IProps {
  bgColorForForm: string;
  bgColorForTextField: string;
  bgColorForButton: string;
}

const styles = createStyles({
  loginBox: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: (props: IProps) => props.bgColorForForm,
    height: "50vh",
    width: "27vw",
    paddingBottom: "10vh",
    marginTop: "10vh",
  },
  header: {
    margin: "5% 0",
    fontSize: "1.1em",
  },
  logoImage: {
    marginTop: "8%",
    maxWidth: "18%",
    maxHeight: "20%",
  },
  loginForm: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  textField: {
    marginTop: "5%",
    width: "130%",
    backgroundColor: (props: IProps) => props.bgColorForTextField,
  },
  inputTextHeight: { maxHeight: 50 },
  button: {
    backgroundColor: (props: IProps) => props.bgColorForButton,
    height: 45,
    color: "white",
    margin: "5% 0",
    width: "130%",
    textTransform: "none",
  },
});
const LogInComponent: React.FunctionComponent<
  IProps & WithStyles<typeof styles>
> = (props) => {
  const { classes } = props;
  return (
    <Box className={classes.loginBox}>
      <img className={classes.logoImage} src={logo} alt="img"></img>
      <Typography variant="h5" className={classes.header}>
        Login to Your Account
      </Typography>
      <form className={classes.loginForm}>
        <TextField
          label="Username"
          variant="outlined"
          placeholder="Username"
          required
          className={classes.textField}
          InputProps={{
            className: classes.inputTextHeight,
          }}
        />
        <TextField
          label="Password"
          variant="outlined"
          placeholder="Password"
          required
          type="password"
          className={classes.textField}
          InputProps={{
            className: classes.inputTextHeight,
          }}
        />
        <Button className={classes.button}>Login</Button>
      </form>
      <Typography variant="subtitle2" color="inherit">
        {`© ${new Date().getFullYear()} Demo`}
      </Typography>
    </Box>
  );
};
export default withStyles(styles)(LogInComponent);
