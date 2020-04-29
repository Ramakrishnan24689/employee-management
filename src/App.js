import React from "react";
import logo from "./logo.svg";
import "./App.css";
import TopNavigationMenu from "./components/TopNavigationMenu";
import EmployeeGallery from "./components/EmployeeGallery";
import ManageEmployee from "./components/ManageEmployee";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div>
        <TopNavigationMenu />
        <Switch>
          <Route path="/" exact component={EmployeeGallery} />
          <Route path="/EmployeeGallery" component={EmployeeGallery} />
          <Route path="/ManageEmployee" component={ManageEmployee} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
