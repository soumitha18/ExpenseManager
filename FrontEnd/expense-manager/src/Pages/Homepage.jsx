import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Grid, Button, Divider } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const HomepageWrapper = styled.div`
  h3 {
    font-family: "Poppins";
    color: #10b26c;
  }

  .heading {
    div {
      font-family: "Poppins";
      font-size: 32px;
      text-align: center;
      font-weight: 700;
    }
  }

  .subHeading {
    width: 600px;
    padding: 10px 20px;
    margin: auto;
    text-align: center;
    font-family: "Poppins";
  }
  @media only screen and (max-width: 426px) {
    .subHeading {
      width: 90%;
    }
  }

  .details {
    h3 {
      padding: 0px 60px;
    }
    p {
      padding: 0px 60px;
      font-size: 18px;
      line-height: 1.75;
    }
  }
`;

const useStyles = makeStyles({
  root: {
    background: "linear-gradient(45deg, #0AC76F 30%, #10B26C 90%)",
    border: 0,
    borderRadius: 3,
    color: "white",
    height: 48,
    padding: "0 30px",
  },
});
export default function Homepage() {
  const classes = useStyles();
  return (
    <HomepageWrapper>
      <Grid style={{ paddingTop: "10px" }}>
        <Grid lg={12} justify="center" container>
          <h3>EXPENSE MANAGER</h3>
        </Grid>
        <Grid lg={12} justify="center" container>
          <div className="heading">
            <div>Manage Your Transactions</div>
            <div>Anywhere in Real Time</div>
          </div>
        </Grid>
        <Grid className="subHeading">
          <p>
            Boost your productivity by keeping a track of you expense management
            process. Our easy-to-use tool helps you keep track and view the
            transactions your made, and helps you in keeping the record of the
            statements.
          </p>
        </Grid>
        <Grid container justify="center">
          <Link to="/registration" style={{ textDecoration: "none" }}>
            <Button className={classes.root}>Register Now</Button>
          </Link>
        </Grid>
        <Divider style={{ margin: "20px 0px" }} />
        <Grid lg={12} container>
          {/* Image Div */}
          <Grid
            sm={6}
            style={{
              padding: "10px",
              margin: "40px 0px",
            }}
            container
            justify="center"
          >
            <img
              src="./Dashboard.png"
              alt="Dashboard View of Application"
              style={{
                width: "80%",
                border: "2px solid #0AC76F",
                borderRadius: "3px",
              }}
            />
          </Grid>
          <Grid
            sm={6}
            style={{
              margin: "40px 0px",
              padding: "10px",
            }}
            className="details"
          >
            <h3>Dashboard</h3>
            <p>
              The dashboard provides you with a complete view of the amount of
              transactions made, by you in terms of income, expenses and the
              total balance. You can also view the details of the latest 5
              transactions that you made, along, with the option to record a
              transaction too.
            </p>
          </Grid>
        </Grid>

        <Grid lg={12} container>
          <Grid
            sm={6}
            style={{
              margin: "40px 0px",
              padding: "10px",
            }}
            className="details"
          >
            <h3>Ledger</h3>
            <p>
              The Ledger keeps a track of all the transactions that you have
              made till now. You can view all the transacations at once, or you
              can even segregate the transactions into Debit and Credit tables
              to visualize them at once.
            </p>
          </Grid>
          {/* Image Div */}
          <Grid
            sm={6}
            style={{
              padding: "10px",
              margin: "40px 0px",
            }}
            container
            justify="center"
          >
            <img
              src="./Ledger.png"
              alt="Dashboard View of Application"
              style={{
                width: "80%",
                border: "2px solid #0AC76F",
                borderRadius: "3px",
              }}
            />
          </Grid>
        </Grid>
      </Grid>
    </HomepageWrapper>
  );
}
