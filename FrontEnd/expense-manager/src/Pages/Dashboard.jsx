import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../Components/Sidebar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useHistory, Link } from "react-router-dom";
import styled from "styled-components";
import Card from "react-bootstrap/Card";
import CardDeck from "react-bootstrap/CardDeck";
import RecentTransactions from "../Components/RecentTransactions";
import EnterTransaction from "../Components/EnterTransaction";

const DashboardWrapper = styled.div`
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

  .userNameDiv {
    font-family: "Poppins";
    ${"" /* Capitalises the first letter */}
    text-transform: capitalize;
    margin: 20px;
  }

  .balanceDashboardCardBody {
    display: flex;
    align-items: center;

    .balanceDashboardCardTitle {
      flex: 1;
      color: #8f8f8f;
      margin: auto;
      font-family: "Poppins";
    }

    .balanceDashboardCardText {
      font-family: "Poppins";
      font-size: 30px;
    }
  }

  .totalBalance,
  .totalIncome {
    border: 1px solid #d4d4d4;
    :hover {
      transition: 0.2s;
      border: 1px solid #10b26c;
      box-shadow: 5px 5px 10px #d3d4d4;
      .balanceDashboardCardTitle {
        transition: 0.2s;
        color: black;
      }

      .balanceDashboardCardText {
        transition: 0.2s;
        color: #10b26c;
      }
    }
  }

  .totalExpense {
    border: 1px solid #d4d4d4;
    :hover {
      transition: 0.2s;
      border: 1px solid red;
      box-shadow: 5px 5px 10px #d3d4d4;
      .balanceDashboardCardTitle {
        transition: 0.2s;
        color: black;
      }

      .balanceDashboardCardText {
        transition: 0.2s;
        color: #ff601c;
      }
    }
  }

  .recentTransactionsDiv {
    margin: 15px 10px;
    > h5 {
      font-family: "Poppins";
      margin: 15px 0px;
    }
  }

  .enterTransactionDiv {
    margin: 20px 10px;
    > h5 {
      font-family: "Poppins";
      margin: 15px 0px;
    }
  }
`;

export default function Dashboard(props) {
  const history = useHistory();
  const userData = JSON.parse(localStorage.getItem("activeUserDetails"));
  const [isLoading, setIsLoading] = useState(true);
  const [recentTransactions, setRecentTransactions] = useState([]);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [totalBalance, setTotalBalance] = useState(0);
  const [transactionMade, setTransactionMade] = useState(false);

  //function to convert a number to a local currency format
  const indianCurrencyFormat = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  });

  useEffect(() => {
    axios
      .get(`http://localhost:5000/user/transactions?user=${userData._id}`)
      .then((res) => {
        console.log(res);
        setRecentTransactions(res.data.transaction);
        setTotalBalance(res.data.balance);
        setTotalIncome(res.data.total_income);
        setTotalExpense(res.data.total_expense);
      })
      .catch((err) => console.log(err.response.data));
  }, [transactionMade]);

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
            {/* The Sidebar division */}
            <Col className="visual d-none d-lg-block sidebar" lg={2}>
              <Sidebar handleLogout={handleLogout} />
            </Col>

            {/* The main Dashboard Division*/}
            <Col className="visual" lg={10}>
              {/*Dashboard Card Div */}
              <Row>
                <Col sm={12}>
                  <h1 className="userNameDiv">Hello, {userData.name}</h1>
                </Col>
                <Col>
                  <CardDeck>
                    <Card className="totalBalance">
                      <Card.Body className="balanceDashboardCardBody">
                        <Card.Title className="balanceDashboardCardTitle">
                          TOTAL BALANCE
                        </Card.Title>
                        <Card.Text className="balanceDashboardCardText">
                          {indianCurrencyFormat.format(totalBalance)}
                        </Card.Text>
                      </Card.Body>
                    </Card>
                    <Card className="totalIncome">
                      <Card.Body className="balanceDashboardCardBody">
                        <Card.Title className="balanceDashboardCardTitle">
                          TOTAL INCOME
                        </Card.Title>
                        <Card.Text className="balanceDashboardCardText">
                          {indianCurrencyFormat.format(totalIncome)}
                        </Card.Text>
                      </Card.Body>
                    </Card>
                    <Card className="totalExpense">
                      <Card.Body className="balanceDashboardCardBody">
                        <Card.Title className="balanceDashboardCardTitle">
                          TOTAL EXPENSE
                        </Card.Title>
                        <Card.Text className="balanceDashboardCardText">
                          {indianCurrencyFormat.format(totalExpense)}
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  </CardDeck>
                </Col>
              </Row>
              {/* Dashboard Recent 5 Transactions, and Enter Transaction Form Div */}
              <Row>
                <Col className="recentTransactionsDiv" lg={7}>
                  <h5>Recent Transactions</h5>
                  <RecentTransactions data={recentTransactions} />
                </Col>
                <Col className="enterTransactionDiv" lg={4}>
                  <h5>Enter Transaction</h5>
                  <EnterTransaction setTransactionMade={setTransactionMade} />
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </DashboardWrapper>
    );
  }
}
