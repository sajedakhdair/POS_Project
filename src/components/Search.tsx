import React, { useState } from "react";
import { withStyles, WithStyles } from "@material-ui/core/styles";
import { createStyles, Theme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import { SearchProps } from "../types";

const styles = (theme: Theme) =>
  createStyles({
    inputTextHeight: {
      maxHeight: theme.spacing(5),
      width: theme.spacing(20),
    },
    searchInputLabel: {
      position: "absolute",
      top: theme.spacing(6),
      left: theme.spacing(1),
      fontSize: theme.typography.subtitle1.fontSize,
    },
    searchTextField: {
      position: "absolute",
      top: theme.spacing(4.3),
      left: theme.spacing(10),
    },
  });

const Search: React.FunctionComponent<
  SearchProps & WithStyles<typeof styles>
> = ({ classes, onSearch }) => {
  const [searchText, setSearchText] = useState("");
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchFieldText = event.target.value;
    setSearchText(searchFieldText);
    onSearch(searchFieldText);
  };

  return (
    <>
      <InputLabel className={classes.searchInputLabel} htmlFor="searchText">
        Search:
      </InputLabel>
      <TextField
        id="searchText"
        type="text"
        variant="outlined"
        className={classes.searchTextField}
        onChange={handleChange}
        InputProps={{
          className: classes.inputTextHeight,
        }}
        label="Enter Search Text"
        size="small"
      />
    </>
  );
};

export default withStyles(styles)(Search);
