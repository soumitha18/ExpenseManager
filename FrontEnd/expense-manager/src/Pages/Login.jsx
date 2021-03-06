import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { Link, Redirect, useHistory } from "react-router-dom";
import Alert from "@material-ui/lab/Alert";

const RegistrationWrapper = styled.div`
  padding-top: 40px;
  background-color: #f5f7f6;
  height: 93vh;
  @media only screen and (max-width: 768px) {
    background-color: white;
    padding-top: 0px;
  }
  .loginDiv {
    border: 1px solid green;
    border-radius: 4px;
    width: 1000px;
    margin: 80px auto;
    display: flex;
    box-shadow: 9px 9px 18px #d3d4d4, -9px -9px 18px #ffffff;

    @media only screen and (max-width: 768px) {
      flex-direction: column;
      margin: 0px;
      width: 100%;
    }
    .loginPageImageDiv {
      background-color: white;
      border-radius: 4px;
      width: 500px;
      @media only screen and (max-width: 768px) {
        width: 90%;
        margin: auto;
        padding: 15px;
        order: 2;
      }
    }

    .formDiv {
      background-color: white;
      border-radius: 4px;
      padding-bottom: 15px;
      width: 500px;
      position: relative;
      @media only screen and (max-width: 768px) {
        width: 100%;
        padding: 15px;
      }

      .expenseManagerTitle {
        display: inline-block;
        font-family: "Poppins";
        color: grey;
        position: absolute;
        left: 50%;
        top: 10px;
        transform: translate(-50%);
      }

      h2 {
        font-family: "Poppins";
        width: fit-content;
        margin: 40px auto;
      }

      .form {
        border-radius: 4px;
        padding: 8px;
        width: fit-content;
        margin: auto;
        position: relative;
        min-height: 230px;
        @media only screen and (max-width: 768px) {
          min-height: 300px;
          width: 100%;
        }

        label {
          display: inline-block;
          font-family: "Poppins";
          width: 100px;

          @media only screen and (max-width: 768px) {
            margin-top: 10px;
          }
        }

        input {
          font-family: "Poppins";
          font-size: 20px;
          padding: 4px;
          margin: 8px 0px;
          outline: none;
          border: none;
          width: 252px;
          border-bottom: 1px solid black;

          @media only screen and (max-width: 768px) {
            width: 100%;
            margin: 0px;
          }
        }

        .createAccount {
          font-family: "Poppins";
          font-size: 14px;
          text-decoration: underline;
          position: absolute;
          bottom: 0;
          :hover {
            cursor: pointer;
          }
        }

        button {
          background-color: white;
          color: #10b26c;
          border: 1px solid #10b26c;
          padding: 6px 8px;
          border-radius: 3px;
          margin-top: 5px;
          position: absolute;
          outline: none;
          right: 10px;
          bottom: 50px;
          @media only screen and (max-width: 768px) {
            left: 50%;
            transform: translate(-50%);
            bottom: 60px;
            padding: 10px 16px;
          }
          :hover {
            transition: 0.3s;
            background-color: #10b26c;
            color: white;
            cursor: pointer;
          }
        }
      }
      .errorMessageSmall {
        position: absolute;
        bottom: 10px;
        right: 10px;
      }
    }
  }
`;

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [showError, setShowError] = useState(false);
  const history = useHistory();
  const [isLoginSuccessful, setLoginSuccessful] = useState(false);

  const userData = JSON.parse(localStorage.getItem("activeUserDetails"));

  const handleSubmit = (e) => {
    let obj = { email, password };
    e.preventDefault();
    axios
      .post("http://localhost:5000/user/login", obj)
      .then((res) => {
        setErr("");
        setLoginSuccessful(true);
        setTimeout(() => {
          setLoginSuccessful(false);
          savingData(res.data.user);
          history.push("/dashboard");
        }, 1000);
      })
      .catch((err) => {
        setErr(err.response.data);
        setShowError(true);
        setTimeout(() => {
          setShowError(false);
        }, 2000);
      });
  };

  const savingData = (data) => {
    localStorage.setItem("activeUserDetails", JSON.stringify(data));
  };

  if (userData.active) {
    return <Redirect to="/dashboard"></Redirect>;
  }

  return (
    <RegistrationWrapper>
      {isLoginSuccessful && <Alert severity="success">Successful Login</Alert>}
      <div className="loginDiv">
        {/* Picture Div */}
        <div className="loginPageImageDiv">
          <img
            style={{ width: "100%", borderRadius: "4px" }}
            src="./loginPage.png"
            alt="LoginPageLandingImage"
          />
        </div>

        {/* Form Div */}
        <div className="formDiv">
          <div className="expenseManagerTitle">Expense Manager</div>
          <h2>Login</h2>
          <div className="form">
            <form onSubmit={(e) => handleSubmit(e)}>
              <label>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <br />
              <label>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <br />
              <div className="createAccount">
                {" "}
                <Link to="/registration">Create an Account</Link>
              </div>
              <button onClick={(e) => handleSubmit(e)}>LOGIN</button>
              {err && showError && (
                <small className="errorMessageSmall" style={{ color: "red" }}>
                  {err}
                </small>
              )}
            </form>
          </div>
        </div>
      </div>
    </RegistrationWrapper>
  );
}
