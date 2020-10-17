import React, { useState, useEffect } from "react";
import { Redirect, useHistory, Link } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import Sidebar from "../Components/Sidebar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { makeStyles } from "@material-ui/core/styles";
import { Paper, Tabs, Tab, Grid } from "@material-ui/core";
import LedgerTable from "../Components/LedgerTable";
import { Pagination } from "@material-ui/lab";

const LedgerWrapper = styled.div`
  .visual {
    height: 100vh;
  }
  background-color: #f5f7f6;
  .sidebar {
    background-color: white;
    box-shadow: 5px 5px 10px #e6e6e6;
    position: fixed;
    min-width: 256px;
    z-index: 5;
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

  .topBar {
    a {
      text-decoration: none;
      color: inherit;
      font-family: "Poppins";
    }
  }
`;

const useStyles = makeStyles({
  root: {
    backgroundColor: "inherit",
    "&selected": {
      backgroundColor: "green",
    },
  },
});
export default function Ledger() {
  const classes = useStyles();
  let history = useHistory();
  const [value, setValue] = React.useState("All");
  const [paginationData, setPaginationData] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [paginationPage, setPaginationPage] = useState(1);
  const [paginationType, setPaginationType] = useState("All");
  const userData = JSON.parse(localStorage.getItem("activeUserDetails"));

  const handleChange = (event, newValue) => {
    //newValue contains the value of All(default), Credit and Debit
    setValue(newValue);
    setPaginationType(newValue);
  };

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

  const changePaginationNumber = (value) => {
    console.log("The changed pagination Number is", value);
    setPaginationPage(value);
  };

  useEffect(() => {
    console.log("The request inside ledger is getting called");
    axios({
      method: "GET",
      url: "http://localhost:5000/user/transactions/pagination",
      params: {
        user: userData._id,
        page: paginationPage,
        type: paginationType,
      },
    }).then(({ data }) => {
      setPaginationData(data.current);
      setTotalPages(data.total_count);
    });
  }, [paginationPage, paginationType, userData]);

  if (!userData.active) {
    return <Redirect to="/login" />;
  }
  return (
    <LedgerWrapper>
      <Container fluid>
        <Row>
          <Col className="d-lg-none" style={{ padding: "0px" }}>
            <Navbar bg="light" expand="lg">
              <Navbar.Brand href="#home">EXPENSE MANAGER</Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto topBar">
                  <Link to="/dashboard" style={{ padding: "5px 0px" }}>
                    Dashboard
                  </Link>

                  <Link to="/dashboard/ledger" style={{ padding: "5px 0px" }}>
                    Ledger
                  </Link>

                  <button
                    onClick={handleLogout}
                    style={{
                      backgroundColor: "#0AC76F",
                      border: "1px solid #10B26C",
                      marginTop: "8px",
                      padding: "3px 0px",
                      color: "white",
                    }}
                  >
                    Logout
                  </button>
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
          <Col
            lg={{ offset: 2 }}
            style={{
              padding: " 0px 20px",
              minHeight: "100vh",
              paddingBottom: "20px",
            }}
          >
            <Grid
              style={{
                width: "90%",
                margin: "auto",
                maxHeight: "100vh",
              }}
            >
              <Paper square={true}>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  indicatorColor="primary"
                  textColor="primary"
                  centered
                >
                  <Tab label="All" value="All" />
                  <Tab label="Credit" value="Credit" />
                  <Tab label="Debit" value="Debit" />
                </Tabs>
              </Paper>
              <Grid>
                <LedgerTable paginationData={paginationData} />
              </Grid>
              <Grid
                style={{
                  width: "fit-content",
                  margin: "0px auto",
                  // marginTop: "10px",
                }}
              >
                <Pagination
                  count={Math.ceil(totalPages / 20)}
                  onChange={(e, value) => changePaginationNumber(value)}
                  classes={{
                    root: classes.root,
                  }}
                  className="paginationButton"
                  size="large"
                />
              </Grid>
            </Grid>
          </Col>
        </Row>
      </Container>
    </LedgerWrapper>
  );
}
