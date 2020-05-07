import React from "react";
import { storiesOf } from "@storybook/react";
import DeleteCategoryDialog from "../../components/Categories/DeleteCategoryDialog";
import { action } from "@storybook/addon-actions";
import CategoryFormDialog from "../../components/Categories/CategoryFormDialog";
import { Theme, createStyles } from "@material-ui/core";
import classes from "*.module.css";

storiesOf("Dialog", module)
  .add("DeleteCategoryDialog", () => (
    <DeleteCategoryDialog id={3} onDelete={action("delete Button clicked")} />
  ))
  .add("EditCategoryFormDialog", () => (
    <CategoryFormDialog
      mode="Edit"
      category={{ id: 1, name: "fruits", date: "2020-05-29 08:24:29" }}
      onSubmit={action("submit for edit category clicked")}
    />
  ))
  .add("CreateCategoryFormDialog", () => (
    <CategoryFormDialog
      mode="Create"
      onSubmit={action("submit for create category clicked")}
    />
  ));
