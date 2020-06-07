import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import CloseConfirmation from "../../components/Products/CloseConfirmation";

storiesOf("Dialog", module).add("CloseConfirmationDialog", () => (
  <CloseConfirmation onClose={action("Close Button clicked")} />
));
