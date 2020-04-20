import React from "react";
import { storiesOf } from "@storybook/react";
import LogInComponent from "../components/LoginComponent";
storiesOf("LogInComponent", module)
  .add("LogInComponent1", () => (
    <LogInComponent
      bgColorForForm="#999"
      bgColorForTextField="#FFF"
      bgColorForButton="#4d70fe"
    />
  ))
  .add("LogInComponent2", () => (
    <LogInComponent
      bgColorForForm="#888"
      bgColorForTextField="#077"
      bgColorForButton="#077"
    />
  ));
