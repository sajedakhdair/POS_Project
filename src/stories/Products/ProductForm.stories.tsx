import React from "react";
import { storiesOf } from "@storybook/react";
import ProductForm from "../../components/Products/ProductForm";
import { action } from "@storybook/addon-actions";

storiesOf("Product", module).add("Product Form", () => (
  <ProductForm
    onSubmit={action("submit for create Product or Edit it clicked")}
    onClose={action("close product form clicked")}
  />
));
