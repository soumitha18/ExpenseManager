import React, { useState } from "react";
import styled from "styled-components";

const RegistrationWrapper = styled.div`
  padding-top: 40px;
  background-color: #f5f7f6;
  height: 93vh;
  @media only screen and (max-width: 768px) {
    background-color: white;
    padding-top: 0px;
  }
  .registrationDiv {
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
    .registrationPageImageDiv {
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
          border-bottom: 1px solid black;

          @media only screen and (max-width: 768px) {
            width: 100%;
            margin: 0px;
          }
        }

        .alreadyRegistered {
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
          right: 10px;
          bottom: 0;
          :hover {
            transition: 0.3s;
            background-color: #10b26c;
            color: white;
            cursor: pointer;
          }
        }
      }
    }
  }
`;

export default function Registration() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(name, email, password);
  };

  return (
    <RegistrationWrapper>
      <div className="registrationDiv">
        {/* Picture Div */}
        <div className="registrationPageImageDiv">
          <img
            style={{ width: "100%", borderRadius: "4px" }}
            src="./registrationPage.png"
            alt="Registration Page Landing Image"
          />
        </div>

        {/* Form Div */}
        <div className="formDiv">
          <div className="expenseManagerTitle">Expense Manager</div>
          <h2>Registration</h2>
          <div className="form">
            <form onSubmit={(e) => handleSubmit(e)}>
              <label>Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <br />
              <label>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <br />
              <label>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <br />
              <div className="alreadyRegistered">Already Registered</div>
              <button onClick={(e) => handleSubmit(e)}>REGISTER</button>
            </form>
          </div>
        </div>
      </div>
    </RegistrationWrapper>
  );
}
