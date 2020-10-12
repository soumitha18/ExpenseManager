import React from "react";
import NavbarComponent from "../Components/NavbarComponent";
import { Route } from "react-router-dom";
import Homepage from "./Homepage";
import Registration from "./Registration";
import Login from "./Login";
import Dashboard from "./Dashboard";

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
      <Route path="/dashboard">
        <Dashboard />
      </Route>
    </>
  );
}
