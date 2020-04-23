// import React from "react";
// import { withStyles, WithStyles, createStyles } from "@material-ui/core/styles";

// const styles = createStyles({
//   loginBox: {},
// });

// const LogInComponent: React.FunctionComponent<WithStyles<typeof styles>> = (
//   props
// ) => {
//   const classes = props.classes;
//   return <div></div>;
// };
// export default withStyles(styles)(LogInComponent);

///////////////////////////////////////
import React from "react";
import {
  fade,
  makeStyles,
  Theme,
  createStyles,
} from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";

import PeopleIcon from "@material-ui/icons/People"; //people
import { Box, Link } from "@material-ui/core";

import EmojiPeopleIcon from "@material-ui/icons/EmojiPeople";
import AirportShuttleIcon from "@material-ui/icons/AirportShuttle";

import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MailIcon from "@material-ui/icons/Mail";
import NotificationsIcon from "@material-ui/icons/Notifications";
import MoreIcon from "@material-ui/icons/MoreVert";
import { withStyles, WithStyles } from "@material-ui/core/styles";

// const useStyles = makeStyles((theme: Theme) =>
//   createStyles({

const styles = (theme: Theme) =>
  createStyles({
    linkItem: {},
  });

const People: React.FunctionComponent<WithStyles<typeof styles>> = (props) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [
    mobileMoreAnchorEl,
    setMobileMoreAnchorEl,
  ] = React.useState<null | HTMLElement>(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      getContentAnchorEl={null}
      elevation={7}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      id={menuId}
      transformOrigin={{ vertical: "top", horizontal: "center" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>
        {" "}
        <EmojiPeopleIcon fontSize="small" />
        Customers
      </MenuItem>
      <MenuItem onClick={handleMenuClose}>
        <AirportShuttleIcon fontSize="small" />
        Suppliers
      </MenuItem>
    </Menu>
  );
  const classes = props.classes;
  return (
    <div>
      <Link
        href="#"
        color="inherit"
        aria-label="account of current user"
        aria-controls={menuId}
        aria-haspopup="true"
        onClick={handleProfileMenuOpen}
        className={classes.linkItem}
        underline="none"
      >
        <PeopleIcon color="inhrite" fontSize="small" />
        People
      </Link>
      {renderMenu}
    </div>
  );
};
export default withStyles(styles)(People);
