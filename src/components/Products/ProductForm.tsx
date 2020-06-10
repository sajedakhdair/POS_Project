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
import CircularProgress from "@material-ui/core/CircularProgress";
import CloseConfirmation from "../Products/CloseConfirmation";

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
    imageBox: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-start",
    },
    imageLabel: {},
    buttonsBox: {
      display: "flex",
      justifyContent: "flex-end",
      marginTop: theme.spacing(2),
    },
    button: { textTransform: "none", marginRight: theme.spacing(2) },
    circularProgress: {
      left: "45%",
      top: "50%",
      color: theme.palette.primary.dark,
      size: "20px",
    },
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
    handleUploadImage,
    productInfo,
    setProductInfo,
    errors,
    categories,
    disabledButton,
    circularProgress,
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
            value={productInfo.name}
            onChange={handleChange}
            name="name"
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
            value={productInfo.rawPrice}
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
            value={productInfo.price}
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
            value={productInfo.code}
            onChange={handleChange}
            name="code"
          />
          <FormHelperText id="component-helper-text">
            {errors.codeError}
          </FormHelperText>
        </FormControl>
        <Box className={classes.imageBox}>
          <label htmlFor="button-image" className={classes.imageLabel}>
            Image
          </label>
          <input
            accept="image/*"
            id="button-image"
            multiple
            type="file"
            name="image"
            onChange={handleUploadImage}
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
            value={productInfo.category}
            onChange={(event) =>
              setProductInfo({
                ...productInfo,
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
          placeholder={productInfo.description}
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
            value={productInfo.stockCount}
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
            value={productInfo.expirationDate}
            error={Boolean(errors.expirationDateError)}
            helperText={errors.expirationDateError}
            onChange={(date) =>
              setProductInfo({
                ...productInfo,
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
          <CloseConfirmation
            onConfirm={onClose}
            classes={{ button: classes.button }}
          />
          <Button
            disabled={disabledButton}
            color="primary"
            variant="contained"
            className={classes.button}
            type="submit"
          >
            Submit
          </Button>
          {circularProgress && (
            <CircularProgress className={classes.circularProgress} />
          )}
        </Box>
      </Box>
    </form>
  );
};
export default withStyles(styles)(ProductForm);
