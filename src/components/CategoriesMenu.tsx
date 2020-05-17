import React from "react";
import { Theme, createStyles } from "@material-ui/core/styles";
import { Link } from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import { withStyles, WithStyles } from "@material-ui/core/styles";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney"; //$
import LocalMallIcon from "@material-ui/icons/LocalMall";
import BookmarkIcon from "@material-ui/icons/Bookmark"; //cat
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";

const styles = (theme: Theme) =>
  createStyles({
    linkItem: {},
  });

const CategoriesMenu: React.FunctionComponent<WithStyles<typeof styles>> = (
  props
) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const isMenuOpen = Boolean(anchorEl);

  const handleCategoriesMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCategoriesMenuClose = () => {
    setAnchorEl(null);
  };

  const menuId = "primary-Categories-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      getContentAnchorEl={null}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      id={menuId}
      transformOrigin={{ vertical: "top", horizontal: "center" }}
      open={isMenuOpen}
      onClose={handleCategoriesMenuClose}
    >
      <MenuItem
        component={Link}
        href="/CategoriesPage"
        onClick={handleCategoriesMenuClose}
      >
        <LocalMallIcon fontSize="small" />
        Product
      </MenuItem>
      <MenuItem onClick={handleCategoriesMenuClose}>
        <AttachMoneyIcon fontSize="small" />
        Expense
      </MenuItem>
    </Menu>
  );
  const classes = props.classes;
  return (
    <div>
      <Link
        href="#"
        color="inherit"
        className={classes.linkItem}
        underline="none"
        onClick={handleCategoriesMenuOpen}
      >
        <BookmarkIcon color="inherit" fontSize="small" />
        Categories
        <ArrowDropDownIcon color="inherit" fontSize="small" />
      </Link>
      {renderMenu}
    </div>
  );
};
export default withStyles(styles)(CategoriesMenu);
