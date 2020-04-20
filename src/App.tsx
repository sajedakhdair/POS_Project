import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import LoginPage from "../src/pages/LoginPage";
import MainPage from "../src/pages/MainPage";

import "./App.css";
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Router>
          <Route exact path="/" component={LoginPage} />
          <Route path="/MainPage" component={MainPage} />
        </Router>
      </header>
    </div>
  );
}

export default App;
