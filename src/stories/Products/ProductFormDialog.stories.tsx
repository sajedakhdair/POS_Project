import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import ProductFormDiaolg from "../../components/Products/ProductFormDialog";

storiesOf("Dialog", module).add("ProductFormDialog", () => (
  <ProductFormDiaolg onSubmit={action("submit for create category clicked")} />
));
