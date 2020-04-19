import React, { useEffect } from "react";
import "../App.css";

function MainPage() {
  useEffect(() => {
    localStorage.setItem("flagForLoggedIn", "true");
    return () => {
      localStorage.setItem("flagForLoggedIn", "false");
    };
  });
  return (
    <div className="App">
      <header className="App-header">
        <div> Welcome </div>
      </header>
    </div>
  );
}
export default MainPage;
