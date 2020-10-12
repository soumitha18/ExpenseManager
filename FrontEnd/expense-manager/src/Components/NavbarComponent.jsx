import React from "react";
import styled from "styled-components";
import axios from "axios";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink, useLocation } from "react-router-dom";
import { useHistory, Redirect } from "react-router-dom";

const NavbarWrapper = styled.div`
  border: 1px solid #0ac76f;
  width: 100%;
  height: 50px;
  position: fixed;
  z-index: 5;
  box-shadow: 6px 6px 12px #dbdbdb, -6px -6px 12px #ffffff;

  .navbarLinks {
    margin: 0px 10px;
    color: #10b26c;
    text-decoration: none;
  }

  .activeNavbarLinks {
    color: green;
    font-family: "Poppins";
    font-size: 16px;
  }

  button {
    border: 1px solid #f8f9fa;
    background-color: #f8f9fa;
    color: #10b26c;
  }
`;

export default function NavbarComponent() {
  const location = useLocation();
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

  if (userData === null) {
    localStorage.setItem(
      "activeUserDetails",
      JSON.stringify({ active: false })
    );
  }

  return (
    <NavbarWrapper>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand style={{ fontFamily: "Poppins", flex: 15 }}>
          EXPENSE MANAGER
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <NavLink
              to="/registration"
              className="navbarLinks"
              activeClassName="activeNavbarLinks"
            >
              Registration
            </NavLink>
            {location.pathname !== "/dashboard" && !userData.active && (
              <>
                <NavLink
                  to="/login"
                  className="navbarLinks"
                  activeClassName="activeNavbarLinks"
                >
                  Login
                </NavLink>
              </>
            )}

            {userData && (
              <>
                {userData.active && (
                  <NavLink
                    to="/dashboard"
                    className="navbarLinks"
                    activeClassName="activeNavbarLinks"
                  >
                    Dashboard
                  </NavLink>
                )}
                {userData.active && (
                  <button onClick={() => handleLogout()}>Logout</button>
                )}
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </NavbarWrapper>
  );
}
