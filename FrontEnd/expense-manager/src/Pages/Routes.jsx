import React from "react";
import NavbarComponent from "../Components/NavbarComponent";
import { Route } from "react-router-dom";
import Registration from "./Registration";
import Login from "./Login";
import Dashboard from "./Dashboard";

export default function Routes() {
  return (
    <>
      <Route path="/login">
        <NavbarComponent />
        <Login />
      </Route>
      <Route path="/registration">
        <NavbarComponent />
        <Registration />
      </Route>
      <Route path="/dashboard">
        <NavbarComponent />
        <Dashboard />
      </Route>
    </>
  );
}
