import React from "react";
import { storiesOf } from "@storybook/react";
import ProductDetailsDiaolg from "../../components/Products/ProductDetailsDiaolg";
import { Product } from "../../types";

const product: Product = {
  id: 5,
  name: "computer repair",
  rawPrice: "30.00$",
  price: "350.00$",
  tax: "12%",
  code: "126547",
  image: "computerRepair.jpeg",
  category: "services",
  quantity: 10,
  expirationDate: "2020-09-23",
};

storiesOf("Dialog", module).add("ProductDetailsDiaolg", () => (
  <ProductDetailsDiaolg product={product} />
));
