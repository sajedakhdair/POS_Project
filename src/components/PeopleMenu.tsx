import React from "react";
import { Theme, createStyles } from "@material-ui/core/styles";
import PeopleIcon from "@material-ui/icons/People"; //people
import { Link } from "@material-ui/core";
import EmojiPeopleIcon from "@material-ui/icons/EmojiPeople";
import AirportShuttleIcon from "@material-ui/icons/AirportShuttle";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import { withStyles, WithStyles } from "@material-ui/core/styles";

const styles = (theme: Theme) =>
  createStyles({
    linkItem: {},
  });

const PeopleMenu: React.FunctionComponent<WithStyles<typeof styles>> = (
  props
) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const isMenuOpen = Boolean(anchorEl);

  const handlePeopleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePeopleMenuClose = () => {
    setAnchorEl(null);
  };

  const menuId = "primary-People-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      getContentAnchorEl={null}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      id={menuId}
      transformOrigin={{ vertical: "top", horizontal: "center" }}
      open={isMenuOpen}
      onClose={handlePeopleMenuClose}
    >
      <MenuItem onClick={handlePeopleMenuClose}>
        {" "}
        <EmojiPeopleIcon fontSize="small" />
        Customers
      </MenuItem>
      <MenuItem onClick={handlePeopleMenuClose}>
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
        onClick={handlePeopleMenuOpen}
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
export default withStyles(styles)(PeopleMenu);
