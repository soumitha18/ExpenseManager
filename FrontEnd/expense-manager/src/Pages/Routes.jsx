import React from "react";
import NavbarComponent from "../Components/NavbarComponent";
import { Route } from "react-router-dom";
import Homepage from "./Homepage";
import Registration from "./Registration";
import Login from "./Login";
import Dashboard from "./Dashboard";
import Ledger from "./Ledger";
import Sidebar from "../Components/Sidebar";

export default function Routes() {
  const userData = JSON.parse(localStorage.getItem("activeUserDetails"));
  return (
    <>
      <Route path="/" exact>
        <NavbarComponent />
        <Homepage />
      </Route>
      <Route path="/login">
        <NavbarComponent />
        <Login />
      </Route>
      <Route path="/registration">
        <NavbarComponent />
        <Registration />
      </Route>
      <Route path="/dashboard" exact>
        <Dashboard />
      </Route>
      <Route path="/dashboard/ledger">
        <Ledger />
      </Route>
    </>
  );
}
