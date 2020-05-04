import React from "react";
import { storiesOf } from "@storybook/react";
import DeleteCategoryDialog from "../../components/Categories/DeleteCategoryDialog";
import { action } from "@storybook/addon-actions";

storiesOf("Dialog", module).add("DeleteCategoryDialog", () => (
  <DeleteCategoryDialog id={3} onDelete={action("delete Button clicked")} />
));
