import React from "react";
import { Theme, createStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { withStyles, WithStyles } from "@material-ui/core/styles";
import livePOSImg from "../imgs/livePOS.png";
import { Box, Link } from "@material-ui/core";
import PaymentIcon from "@material-ui/icons/Payment"; //pos
import BookmarkIcon from "@material-ui/icons/Bookmark"; //cat
import SettingsIcon from "@material-ui/icons/Settings";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney"; //$
import AssessmentIcon from "@material-ui/icons/Assessment"; //report
import TrendingUpIcon from "@material-ui/icons/TrendingUp"; //report2
import PeopleIcon from "@material-ui/icons/People"; //people
import LocalMallIcon from "@material-ui/icons/LocalMall";
import ReceiptIcon from "@material-ui/icons/Receipt";

const styles = (theme: Theme) =>
  createStyles({
    appBar: {
      backgroundColor: "#f5f5f5",
      displat: "flex",
      flexDirection: "row",
      padding: theme.spacing(1),
    },
    containerForAllLinks: {
      display: "flex",
      backgroundColor: "#f5f5f5",
    },
    linkItem: {
      display: "flex",
      padding: theme.spacing(2.7, 1.2, 2, 2),
      marginTop: theme.spacing(1),
      fontSize: 14.5,
      fontFamily: "lato",
      color: "#979797",
    },
    livePOSImg: {
      paddingTop: theme.spacing(2.4),
      marginLeft: theme.spacing(-2),
      paddingRight: theme.spacing(7.5),
      height: 40,
      width: 100,
    },
  });

const HeaderComponent: React.FunctionComponent<WithStyles<typeof styles>> = (
  props
) => {
  const classes = props.classes;
  return (
    <AppBar className={classes.appBar}>
      <Toolbar>
        <Box>
          <img src={livePOSImg} alt="livePOS" className={classes.livePOSImg} />
        </Box>
        <Box className={classes.containerForAllLinks}>
          <Link
            href="#"
            color="inherit"
            underline="none"
            className={classes.linkItem}
          >
            <PaymentIcon color="inherit" fontSize="small" />
            POS
          </Link>
          <Link
            href="#"
            color="inherit"
            underline="none"
            className={classes.linkItem}
          >
            <LocalMallIcon color="inherit" fontSize="small" />
            Product
          </Link>
          <Link
            href="#"
            color="inherit"
            className={classes.linkItem}
            underline="none"
          >
            <PeopleIcon color="inherit" fontSize="small" />
            People
          </Link>
          <Link
            href="#"
            color="inherit"
            underline="none"
            className={classes.linkItem}
          >
            <ReceiptIcon color="inherit" fontSize="small" /> Sales
          </Link>
          <Link
            href="#"
            color="inherit"
            underline="none"
            className={classes.linkItem}
          >
            <AttachMoneyIcon color="inherit" fontSize="small" />
            Expense
          </Link>
          <Link
            href="#"
            color="inherit"
            aria-label="account of current user"
            aria-haspopup="true"
            className={classes.linkItem}
            underline="none"
          >
            <BookmarkIcon color="inherit" fontSize="small" />
            Categories
          </Link>
          <Link
            href="#"
            color="inherit"
            underline="none"
            className={classes.linkItem}
          >
            <SettingsIcon color="inherit" fontSize="small" /> Setting
          </Link>
          <Link
            href="#"
            color="inherit"
            underline="none"
            className={classes.linkItem}
          >
            <AssessmentIcon color="inherit" fontSize="small" />
            Reports
          </Link>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
export default withStyles(styles)(HeaderComponent);
