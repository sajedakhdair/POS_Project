import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { Category } from "../../types";
import { Column } from "../../types";
import CategoriesTable from "../../components/Categories/CategoriesTable";

const inputCategory: Category[] = [
  { id: 1, name: "fruits", date: "2020-05-29 08:24:29" },
  { id: 2, name: "services", date: "2020-05-23 23:15:41" },
  { id: 3, name: "computers", date: "2020-05-07 12:10:34" },
  { id: 4, name: "clothing", date: "2020-04-28 17:23:11" },
  { id: 5, name: "vegetables", date: "2020-05-20 13:23:58" },
];
const cateogryTableColumns: Column[] = [
  { id: "name", label: "Name", minWidth: 170, align: "left" },
  {
    id: "date",
    label: "Created At",
    minWidth: 170,
    align: "left",
  },
];
storiesOf("Table", module).add("CategoriesTable", () => (
  <CategoriesTable
    columns={cateogryTableColumns}
    rows={inputCategory}
    onDelete={action("delete Button clicked")}
    onEdit={action("edit Button clicked")}
  />
));
