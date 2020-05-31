import React from "react";
import { withStyles, WithStyles } from "@material-ui/core/styles";
import { createStyles, Theme } from "@material-ui/core/styles";
import { FilterByDateProps } from "../../types";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

const styles = (theme: Theme) =>
  createStyles({
    filterByDateBox: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    typography: { margin: theme.spacing(3, 3, 0, 0) },
    datePicker: {
      width: 150,
      margin: theme.spacing(0, 4),
    },
    filterButton: {
      textTransform: "none",
      margin: theme.spacing(2, 0, 0, 0),
    },
  });
export const dateFormat: string = "yyyy-MM-dd";
const FilterByDate: React.FunctionComponent<
  FilterByDateProps & WithStyles<typeof styles>
> = ({ classes, onFilterByDate: handleFilterByDate }) => {
  const [selectedFirstDate, setSelectedFirstDate] = React.useState<Date | null>(
    null
  );
  const [
    selectedSecondDate,
    setSelectedSecondDate,
  ] = React.useState<Date | null>(null);

  const handleFirstDateChange = (date: Date | null) => {
    setSelectedFirstDate(date);
  };

  const handleSecondDateChange = (date: Date | null) => {
    setSelectedSecondDate(date);
  };

  return (
    <Box className={classes.filterByDateBox}>
      <Typography className={classes.typography}> Expiration Date</Typography>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          className={classes.datePicker}
          disableToolbar
          variant="inline"
          format={dateFormat}
          margin="normal"
          id="fromDate"
          label="From"
          value={selectedFirstDate}
          onChange={handleFirstDateChange}
          KeyboardButtonProps={{
            "aria-label": "change date",
          }}
        />
        <KeyboardDatePicker
          className={classes.datePicker}
          disableToolbar
          variant="inline"
          format="yyyy-MM-dd"
          margin="normal"
          id="toDate"
          label="To"
          value={selectedSecondDate}
          onChange={handleSecondDateChange}
          KeyboardButtonProps={{
            "aria-label": "change date",
          }}
        />
      </MuiPickersUtilsProvider>
      <Button
        variant="contained"
        className={classes.filterButton}
        color="primary"
        onClick={() => {
          handleFilterByDate(selectedFirstDate, selectedSecondDate);
        }}
      >
        Apply Filter
      </Button>
    </Box>
  );
};

export default withStyles(styles)(FilterByDate);
