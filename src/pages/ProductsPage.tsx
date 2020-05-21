import React from "react";
import { withStyles, WithStyles } from "@material-ui/core/styles";
import { createStyles, Theme } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";

const styles = (theme: Theme) => createStyles({});

const ProductsPage: React.FC<WithStyles<typeof styles>> = ({ classes }) => {
  const flagForLoggedIn = localStorage.getItem("flagForLoggedIn");
  const history = useHistory();
  if (flagForLoggedIn !== "true") history.push("/");

  return <div>Products Page</div>;
};
export default withStyles(styles)(ProductsPage);
