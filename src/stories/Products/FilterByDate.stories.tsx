import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import FilterByDate from "../../components/Products/FilterByDate";

storiesOf("Search", module).add("FilterByDate", () => (
  <FilterByDate onFilterByDate={action("submit for filter by date clicked")} />
));
