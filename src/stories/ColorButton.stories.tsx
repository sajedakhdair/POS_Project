import React from "react";
import { storiesOf } from "@storybook/react";
import ColorButton from "../components/ColorButton";
import { action } from "@storybook/addon-actions";
import { withKnobs, text, select } from "@storybook/addon-knobs";
storiesOf("ColorButton", module)
  .add("red", () => (
    <ColorButton
      color= "red"
      onClick={action("clicked")}>hello World
    </ColorButton>
  ))
  .add("blue", () => (
    <ColorButton color= "blue" onClick={action("clicked")}>
      hello World
    </ColorButton>
  ));
