import React from "react";
import { storiesOf } from "@storybook/react";
import Search from "../components/Search";
import { Category } from "../types";

const inputCategory: Category[] = [
  { id: 1, name: "fruits", date: "2020-05-29 08:24:29" },
  { id: 2, name: "services", date: "2020-05-23 23:15:41" },
  { id: 3, name: "computers", date: "2020-05-07 12:10:34" },
  { id: 4, name: "clothing", date: "2020-04-28 17:23:11" },
  { id: 5, name: "vegetables", date: "2020-05-20 13:23:58" },
];

const onSearch = (rows: Category[], searchText: string) => {
  const result = rows.filter((row) => row.name.includes(searchText));
  return result;
};

storiesOf("Search", module).add("Search", () => (
  <Search rows={inputCategory} onSearch={onSearch} />
));
