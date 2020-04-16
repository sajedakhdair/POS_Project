import React from "react";
import LogInComponent from "../src/components/LoginComponent";
import "./App.css";
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <LogInComponent
          bgColorForForm="#999"
          bgColorForTextField="#FFF"
          bgColorForButton="#4d70fe"
        />
      </header>
    </div>
  );
}

export default App;
