import React, { useState } from "react";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import InputLabel from "@material-ui/core/InputLabel";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import { withStyles, WithStyles } from "@material-ui/core/styles";
import { createStyles, Theme } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import useProductForm from "../../customHooks/useProductForm";
import Divider from "@material-ui/core/Divider";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { dateFormat } from "../Products/FilterByExpirationDate";
import TextField from "@material-ui/core/TextField";
const styles = (theme: Theme) =>
  createStyles({
    boxForm: {
      display: "flex",
      flexDirection: "column",
    },
    formControl: {
      paddingTop: theme.spacing(1),
      marginTop: theme.spacing(0.8),
      marginBottom: theme.spacing(0.8),
    },
    inputTextHeight: {
      maxHeight: theme.spacing(3),
      width: theme.spacing(10),
    },
    imageBox: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-start",
    },
    buttonsBox: {
      display: "flex",
      justifyContent: "flex-end",
      marginTop: theme.spacing(2),
    },
    button: { textTransform: "none", marginRight: theme.spacing(2) },
  });

interface Props {
  id?: string;
  onSubmit: Function;
  onClose: Function;
}
type ProductFormProps = Props & WithStyles;

const ProductForm: React.FunctionComponent<ProductFormProps> = ({
  id,
  onSubmit,
  onClose,
  classes,
}) => {
  const {
    handleChange,
    handleSubmit,
    productInformation,
    setValues,
    errors,
    categories,
  } = useProductForm(onSubmit, onClose, id);

  return (
    <form onSubmit={handleSubmit}>
      <Box className={classes.boxForm}>
        <FormControl
          variant="outlined"
          error={Boolean(errors.nameError)}
          className={classes.formControl}
        >
          <InputLabel htmlFor="component-Name">Name</InputLabel>
          <OutlinedInput
            id="component-Name"
            value={productInformation.name}
            onChange={handleChange}
            name="name"
            inputProps={{
              className: classes.inputTextHeight,
            }}
          />
          <FormHelperText id="component-helper-text">
            {errors.nameError}
          </FormHelperText>
        </FormControl>
        <FormControl
          variant="outlined"
          error={Boolean(errors.rawPriceError)}
          className={classes.formControl}
        >
          <InputLabel htmlFor="component-Raw-Price">Raw Price</InputLabel>
          <OutlinedInput
            id="component-Raw-Price"
            value={productInformation.rawPrice}
            onChange={handleChange}
            name="rawPrice"
          />
          <FormHelperText id="component-helper-text">
            {errors.rawPriceError}
          </FormHelperText>
        </FormControl>
        <FormControl
          variant="outlined"
          error={Boolean(errors.priceError)}
          className={classes.formControl}
        >
          <InputLabel htmlFor="component-Price">Price</InputLabel>
          <OutlinedInput
            id="component-Price"
            value={productInformation.price}
            onChange={handleChange}
            name="price"
          />
          <FormHelperText id="component-helper-text">
            {errors.priceError}
          </FormHelperText>
        </FormControl>
        <FormControl
          variant="outlined"
          error={Boolean(errors.codeError)}
          className={classes.formControl}
        >
          <InputLabel htmlFor="component-Code">Code</InputLabel>
          <OutlinedInput
            id="component-Code"
            value={productInformation.code}
            onChange={handleChange}
            name="code"
          />
          <FormHelperText id="component-helper-text">
            {errors.codeError}
          </FormHelperText>
        </FormControl>
        <Box className={classes.imageBox}>
          <label htmlFor="button-image">Image</label>
          <input
            accept="image/*"
            id="button-image"
            multiple
            type="file"
            name="image"
            onChange={handleChange}
          />
        </Box>
        <FormControl
          variant="outlined"
          error={Boolean(errors.categoryError)}
          className={classes.formControl}
        >
          <InputLabel htmlFor="category-select">Category</InputLabel>
          <Select
            id="category-select"
            color="primary"
            value={productInformation.category}
            onChange={(event) =>
              setValues({
                ...productInformation,
                category: `${event.target.value}`,
              })
            }
            name="category"
          >
            {categories.map((category) => {
              return (
                <MenuItem value={category.name} key={category.name}>
                  {category.name}
                </MenuItem>
              );
            })}
          </Select>
          <FormHelperText id="component-helper-text">
            {errors.categoryError}
          </FormHelperText>
        </FormControl>
        <TextField
          id="description-area"
          label="Description"
          multiline
          rows={4}
          placeholder={productInformation.description}
          variant="outlined"
        />
        <FormControl
          variant="outlined"
          error={Boolean(errors.stockCountError)}
          className={classes.formControl}
        >
          <InputLabel htmlFor="component-Stock">Stock Count</InputLabel>
          <OutlinedInput
            id="component-Stock"
            value={productInformation.stockCount}
            onChange={handleChange}
            name="stockCount"
          />
          <FormHelperText id="component-helper-text">
            {errors.stockCountError}
          </FormHelperText>
        </FormControl>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            disableToolbar
            variant="inline"
            format={dateFormat}
            margin="normal"
            id="fromDate"
            label="expirationDate"
            value={productInformation.expirationDate}
            error={Boolean(errors.expirationDateError)}
            helperText={errors.expirationDateError}
            onChange={(date) =>
              setValues({
                ...productInformation,
                expirationDate: date ? `${date.toJSON()}`.slice(0, 10) : "",
              })
            }
            KeyboardButtonProps={{
              "aria-label": "change date",
            }}
          />
        </MuiPickersUtilsProvider>
        <Divider />
        <Box className={classes.buttonsBox}>
          <Button
            variant="contained"
            className={classes.button}
            onClick={() => {
              onClose();
            }}
          >
            Cancel
          </Button>
          <Button
            color="primary"
            variant="contained"
            className={classes.button}
            type="submit"
          >
            Submit
          </Button>
        </Box>
      </Box>
    </form>
  );
};
export default withStyles(styles)(ProductForm);
