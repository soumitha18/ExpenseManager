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
      <NavbarComponent />
      <Route path="/" exact>
        <Homepage />
      </Route>
      <Route path="/login">
        <Login />
      </Route>
      <Route path="/registration">
        <Registration />
      </Route>
      <Route path="/dashboard">
        <Dashboard />
      </Route>
    </>
  );
}
