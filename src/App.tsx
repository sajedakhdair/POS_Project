import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LoginPage from "../src/pages/LoginPage";
import MainPage from "../src/pages/MainPage";
import CategoriesPage from "../src/pages/CategoriesPage";
import HeaderComponent from "../src/components/HeaderComponent";
import "./App.css";
import ProductsPage from "../src/pages/ProductsPage";
import EditProductPage from "../src/pages/EditProductPage";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Router>
          <Switch>
            <Route exact path="/" component={LoginPage} />
            <Fragment>
              <HeaderComponent />
              <Route path="/CategoriesPage" component={CategoriesPage} />
              <Route path="/ProductsPage" component={ProductsPage} />
              <Route
                path="/products/:id/edit"
                component={EditProductPage}
              />
              <Route exact path="/MainPage" component={MainPage} />
            </Fragment>
          </Switch>
        </Router>
      </header>
    </div>
  );
}

export default App;
