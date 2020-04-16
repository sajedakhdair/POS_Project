import React from "react";
import Box from "@material-ui/core/Box";
import { withStyles, WithStyles, createStyles } from "@material-ui/core/styles";
import LogInComponent from "../components/LoginComponent";
import BackgroundImage from "../imgs/login.jpg";

const styles = createStyles({
  root: {
    display: "flex	",
    justifyContent: "center",
    alignItems: "center",
    backgroundImage: `url(${BackgroundImage})`,
    height: "100vh",
    width: "100%",
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
});
function LoginPage(props: WithStyles<typeof styles>) {
  const { classes } = props;
  return (
    <Box className={classes.root}>
      <LogInComponent
        bgColorForForm="#2D3E47"
        bgColorForTextField="#FFF"
        bgColorForButton="#4d70fe"
      />
    </Box>
  );
}
export default withStyles(styles)(LoginPage);
