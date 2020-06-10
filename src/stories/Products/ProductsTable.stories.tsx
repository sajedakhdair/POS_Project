import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { Product } from "../../types";
import { Column } from "../../types";
import ProductsTable from "../../components/Products/ProductsTable";

const inputProduct: Product[] = [
  {
    id: 1,
    name: "kiwi",
    rawPrice: "5.00$",
    price: "30.00$",
    tax: "18%",
    code: "856512",
    category: { id: 1, categoryName: "fruits" },
    quantity: 7,
    expirationDate: "2020-06-10",
    stockCount: "1",
  },
  {
    id: 2,
    name: "mens gloves",
    rawPrice: "4.00$",
    price: "40.00$",
    tax: "0%",
    code: "112345",
    category: { id: 4, categoryName: "clothing" },
    quantity: 7,
    expirationDate: "2020-06-10",
    stockCount: "2",
  },
  {
    id: 3,
    name: "Computer",
    rawPrice: "50.00$",
    price: "350.00$",
    tax: "18%",
    code: "123456",
    category: { id: 3, categoryName: "computers" },
    quantity: 10,
    expirationDate: "2020-07-16",
    stockCount: "19",
  },
  {
    id: 4,
    name: "Bon O Bon",
    rawPrice: "1.00$",
    price: "20.00$",
    tax: "3%",
    code: "115239",
    category: { id: 5, categoryName: "chocolate" },
    description: "Chocolate with peanut Cream",
    quantity: 100,
    expirationDate: "2021-08-20",
    stockCount: "9",
  },
  {
    id: 5,
    name: "computer repair",
    rawPrice: "30.00$",
    price: "350.00$",
    tax: "12%",
    code: "126547",
    category: { id: 2, categoryName: "services" },
    quantity: 10,
    expirationDate: "2020-09-23",
    stockCount: "10",
  },
];
const productsTableColumns: Column<Product>[] = [
  { id: "code", label: "Code", minWidth: 1 },
  {
    id: "name",
    label: "Name",
    minWidth: 1,
  },
  { id: "category", label: "Category", minWidth: 1 },
  {
    id: "description",
    label: "Description",
    minWidth: 1,
  },
  { id: "tax", label: "tax (%)", minWidth: 1 },
  {
    id: "price",
    label: "Price",
    minWidth: 1,
  },
];
storiesOf("Table", module).add("ProductsTable", () => (
  <ProductsTable
    columns={productsTableColumns}
    rows={inputProduct}
    onDelete={action("Delete Button clicked")}
    onEdit={action("Edit Button clicked")}
  />
));
