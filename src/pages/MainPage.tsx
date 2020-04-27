import React from "react";
import { useHistory } from "react-router-dom";
import "../App.css";

function MainPage() {
  const flagForLoggedIn = localStorage.getItem("flagForLoggedIn");
  const history = useHistory();
  if (flagForLoggedIn !== "true") history.push("/");
  return (
    <div className="App">
      <header className="App-header">
        <div> Welcome </div>
      </header>
    </div>
  );
}
export default MainPage;
