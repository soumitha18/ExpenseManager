import React, { useState, useEffect } from "react";
import { Redirect, useHistory } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import Sidebar from "../Components/Sidebar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

const LedgerWrapper = styled.div`
  .visual {
    height: 100vh;
  }
  background-color: #f5f7f6;
  .sidebar {
    background-color: white;
    box-shadow: 5px 5px 10px #e6e6e6;
    h4 {
      text-align: center;
      font-family: "Poppins";
      font-weight: 700;
      margin: 10px 0px;
      color: black;
    }

    .sidebarDivItems {
      margin: 35px 0px;
      a {
        color: #8f8f8f;
        text-decoration: none;
        :hover {
          color: black;
        }
      }
      li {
        font-family: "Poppins";
        font-size: 17px;
        border: 2px solid white;
        border-radius: 4px;
        margin: 10px 0px;
        padding: 5px 0px;
        i {
          margin: 0px 15px 0px 25px;
        }

        button {
          border: none;
          background-color: transparent;
          color: #8f8f8f;
          padding-right: 105px;
          outline: none;
          :hover {
            color: black;
          }
        }
        :hover {
          transition: 0.1s;
          border: 2px solid #0ac76f;
          cursor: pointer;
        }
      }
    }
  }
`;

export default function Ledger() {
  let history = useHistory();
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
    return <Redirect to="/login" />;
  }
  return (
    <LedgerWrapper>
      <Container fluid>
        <Row>
          <Col className="d-lg-none" style={{ padding: "0px" }}>
            <Navbar bg="light" expand="lg">
              <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                  <Nav.Link href="#home">Home</Nav.Link>
                  <Nav.Link href="#link">Link</Nav.Link>
                </Nav>
              </Navbar.Collapse>
            </Navbar>
          </Col>
        </Row>
        <Row>
          {/* The Sidebar division */}
          <Col className="visual d-none d-lg-block sidebar" lg={2}>
            <Sidebar handleLogout={handleLogout} />
          </Col>
          <Col lg={10}>Inside the Ledger Page</Col>
        </Row>
      </Container>
    </LedgerWrapper>
  );
}
