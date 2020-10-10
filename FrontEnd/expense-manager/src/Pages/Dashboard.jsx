import React from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

export default function Dashboard() {
  const history = useHistory();
  const userData = JSON.parse(localStorage.getItem("activeUserDetails"));
  const handleLogout = () => {
    axios({
      method: "post",
      url: "http://localhost:5000/user/logout",
      data: {
        email: userData.email,
      },
    })
      .then((response) => {
        console.log(response);
        localStorage.setItem(
          "activeUserDetails",
          JSON.stringify(response.data.user)
        );
        history.push("/login");
      })
      .catch((err) => console.log(err));
  };

  if (!userData.active) {
    history.push("/login");
    return null;
  } else {
    return (
      <div>
        <button onClick={() => handleLogout()}>LOGOUT</button>
      </div>
    );
  }
}
