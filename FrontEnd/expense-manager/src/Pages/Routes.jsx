import React from "react";
import { Route } from "react-router-dom";
import Registration from "./Registration";
import Login from "./Login";
import Dashboard from "./Dashboard";

export default function Routes() {
  return (
    <>
      <Route path="/login" render={() => <Login />}></Route>
      <Route path="/registration" render={() => <Registration />}></Route>
      <Route path="/dashboard" render={() => <Dashboard />}></Route>
    </>
  );
}
