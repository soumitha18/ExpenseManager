import React, { useEffect, useState } from "react";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useHistory, Link } from "react-router-dom";
import styled from "styled-components";

const DashboardWrapper = styled.div`
  .visual {
    border: 1px solid black;
    height: 100vh;
  }

  .sidebar {
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
        color: #678c7f;
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
          color: #678c7f;
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

export default function Dashboard() {
  const history = useHistory();
  const userData = JSON.parse(localStorage.getItem("activeUserDetails"));
  const [recentTransactions, setRecentTransactions] = useState([]);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [totalBalance, setTotalBalance] = useState(0);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/user/transactions?user=${userData._id}`)
      .then((res) => console.log(res))
      .catch((err) => console.log(err.response.data));
  }, []);

  const handleLogout = () => {
    axios({
      method: "post",
      url: "http://localhost:5000/user/logout",
      data: {
        email: userData.email
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
      <DashboardWrapper>
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
            <Col className="visual d-none d-lg-block sidebar" lg={2}>
              <h4>EXPENSE MANAGER</h4>
              <div className="sidebarDivItems">
                <ul style={{ listStyle: "none" }}>
                  <Link to="/dashboard">
                    <li>
                      <i className="fas fa-th-large"></i>Dashboard
                    </li>
                  </Link>
                  <Link to="/dashboard/ledger">
                    <li>
                      <i className="fas fa-copy"></i>Ledger
                    </li>
                  </Link>
                  <li>
                    <button onClick={() => handleLogout()}>
                      <i className="fas fa-sign-out-alt"></i>Logout
                    </button>
                  </li>
                </ul>
              </div>
            </Col>
            <Col className="visual" lg={10}></Col>
          </Row>
        </Container>
      </DashboardWrapper>
    );
  }
}
