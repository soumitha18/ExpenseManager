import React from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

export default function Dashboard() {
  const history = useHistory();
  const userData = JSON.parse(localStorage.getItem("activeUserDetails"));

  if (!userData.active) {
    history.push("/login");
    return null;
  } else {
    return <div></div>;
  }
}
