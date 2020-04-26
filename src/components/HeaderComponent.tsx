import React from "react";
import { Theme, createStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { withStyles, WithStyles } from "@material-ui/core/styles";
import livePOSImg from "../imgs/livePOS.png";
import { Box, Link, Avatar, Button, Typography } from "@material-ui/core";
import PaymentIcon from "@material-ui/icons/Payment"; //pos
import BookmarkIcon from "@material-ui/icons/Bookmark"; //cat
import SettingsIcon from "@material-ui/icons/Settings";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney"; //$
import AssessmentIcon from "@material-ui/icons/Assessment"; //report
import LocalMallIcon from "@material-ui/icons/LocalMall";
import ReceiptIcon from "@material-ui/icons/Receipt";
import PeopleMenu from "./PeopleMenu";
import CategoriesMenu from "./CategoriesMenu";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import avater from "../imgs/avater.jpeg";
import english from "../imgs/en.png";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

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
    rightPartOfHeader: {
      display: "flex",
      alignItems: "center",
      marginLeft: theme.spacing(12),
    },
    languageImg: {
      maxHeight: 35,
      maxWidth: 35,
      paddingRight: theme.spacing(1),
    },
    userInfo: {
      display: "flex",
      alignItems: "center",
      color: theme.palette.text.secondary,
    },
    avatar: {
      width: theme.spacing(4),
      height: theme.spacing(4),
      marginRight: theme.spacing(1),
    },
    colorButton: {
      color: theme.palette.text.secondary,
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
          <PeopleMenu classes={{ linkItem: classes.linkItem }} />
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
          <CategoriesMenu classes={{ linkItem: classes.linkItem }} />
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
      <Box className={classes.rightPartOfHeader}>
        <Box className={classes.userInfo}>
          <Avatar
            alt="Profile picture"
            src={avater}
            className={classes.avatar}
          />
          <Typography>userName </Typography>
          {/* i will change it to the userName  */}
        </Box>
        <Button href="#" className={classes.colorButton}>
          <img src={english} className={classes.languageImg} alt="english" />
          <ArrowDropDownIcon fontSize="small" />
        </Button>
        <Button className={classes.colorButton}>
          <ExitToAppIcon fontSize="default" />
        </Button>
      </Box>
    </AppBar>
  );
};
export default withStyles(styles)(HeaderComponent);
