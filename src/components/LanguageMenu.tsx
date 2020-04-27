import React from "react";
import { Theme, createStyles } from "@material-ui/core/styles";
import { Link, Button } from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import { withStyles, WithStyles } from "@material-ui/core/styles";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import english from "../imgs/en.png";
import Francais from "../imgs/fr.png";
import Portuguese from "../imgs/pr.png";
import Spanish from "../imgs/sp.png";
import Arabic from "../imgs/ar.png";
import Danish from "../imgs/da.png";
import Turkish from "../imgs/tr.png";
import Greek from "../imgs/gr.png";

const styles = (theme: Theme) =>
  createStyles({
    colorButton: {},
    languageImg: { maxHeight: 35, maxWidth: 35 },
  });

const LanguageMenu: React.FunctionComponent<WithStyles<typeof styles>> = (
  props
) => {
  const classes = props.classes;

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const isMenuOpen = Boolean(anchorEl);

  const handleLanguageMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLanguageMenuClose = () => {
    setAnchorEl(null);
  };

  const menuId = "primary-People-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      getContentAnchorEl={null}
      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      id={menuId}
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleLanguageMenuClose}
    >
      <MenuItem onClick={handleLanguageMenuClose}>
        <img src={english} className={classes.languageImg} alt="english" />
        English
      </MenuItem>
      <MenuItem onClick={handleLanguageMenuClose}>
        <img src={Francais} className={classes.languageImg} alt="Francais" />
        Francais
      </MenuItem>
      <MenuItem onClick={handleLanguageMenuClose}>
        <img
          src={Portuguese}
          className={classes.languageImg}
          alt="Portuguese"
        />
        Portuguese
      </MenuItem>
      <MenuItem onClick={handleLanguageMenuClose}>
        <img src={Spanish} className={classes.languageImg} alt="Spanish" />
        Spanish
      </MenuItem>
      <MenuItem onClick={handleLanguageMenuClose}>
        <img src={Arabic} className={classes.languageImg} alt="Arabic" />
        Arabic
      </MenuItem>
      <MenuItem onClick={handleLanguageMenuClose}>
        <img src={Danish} className={classes.languageImg} alt="Danish" />
        Danish
      </MenuItem>
      <MenuItem onClick={handleLanguageMenuClose}>
        <img src={Turkish} className={classes.languageImg} alt="Turkish" />
        Turkish
      </MenuItem>
      <MenuItem onClick={handleLanguageMenuClose}>
        <img src={Greek} className={classes.languageImg} alt="Greek" />
        Greek
      </MenuItem>
    </Menu>
  );
  return (
    <div>
      <Button
        href="#"
        color="inherit"
        onClick={handleLanguageMenuOpen}
        className={classes.colorButton}
      >
        <img src={english} className={classes.languageImg} alt="english" />
        <ArrowDropDownIcon color="inherit" fontSize="small" />
      </Button>
      {renderMenu}
    </div>
  );
};
export default withStyles(styles)(LanguageMenu);
