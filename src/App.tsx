import React from "react";
import ColorButton from "../src/components/ColorButton";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <ColorButton color="green">Hello World</ColorButton>
      </header>
    </div>
  );
}

export default App;
