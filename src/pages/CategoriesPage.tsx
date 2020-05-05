import React from "react";
import { withStyles, WithStyles } from "@material-ui/core/styles";
import { createStyles, Theme } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";

const styles = (theme: Theme) => createStyles({});

function CategoriesPage(props: WithStyles<typeof styles>) {
  const flagForLoggedIn = localStorage.getItem("flagForLoggedIn");
  const history = useHistory();
  if (flagForLoggedIn !== "true") history.push("/");
  return <div>welcome to categories Page</div>;
}
export default withStyles(styles)(CategoriesPage);
