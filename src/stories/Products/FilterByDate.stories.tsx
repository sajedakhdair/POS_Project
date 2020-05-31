import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import FilterByExpirationDate from "../../components/Products/FilterByExpirationDate";

storiesOf("Search", module).add("FilterByExpirationDate", () => (
  <FilterByExpirationDate
    onFilterByDate={action("submit for filter by date clicked")}
  />
));
