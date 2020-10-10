import React from "react";
import { Route } from "react-router-dom";
import Registration from "./Registration";
import Login from "./Login";

export default function Routes() {
  return (
    <>
      <Route path="/login" render={() => <Login />}></Route>
      <Route path="/registration" render={() => <Registration />}></Route>
    </>
  );
}
