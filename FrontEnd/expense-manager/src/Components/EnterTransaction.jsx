import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Redirect } from "react-router-dom";
import axios from "axios";
import CheckIcon from "@material-ui/icons/Check";
import {
  Grid,
  Box,
  TextField,
  Radio,
  FormControlLabel,
  RadioGroup,
  Button,
  FormHelperText,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
} from "@material-ui/core";

const useStyles = makeStyles(() => ({
  formRoot: {
    border: "1px solid #0AC76F",
    backgroundColor: "white",
    borderRadius: 4,
    width: "fit-content",
    padding: "10px 20px",
    "& label": {
      margin: "auto 0px",
      fontFamily: "Poppins",
      fontSize: 20,
      width: 100,
    },
  },

  formDetailsDiv: {
    margin: "20px 0px 10px 10px",
  },
  "MuiButton-containedPrimary": {
    backgroundColor: "#0AC76F",
    outline: "none",
    "&:hover": {
      backgroundColor: "#10B26C",
    },
  },
  makeTransactionButton: {
    width: "fit-content",
    display: "flex",
    marginLeft: "auto",
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

export default function EnterTransaction({ setTransactionMade }) {
  const classes = useStyles();
  const userData = JSON.parse(localStorage.getItem("activeUserDetails"));
  const [value, setValue] = useState("");
  const [valueError, setValueError] = useState(false);
  const [title, setTitle] = useState("");
  const [titleError, setTitleError] = useState(false);
  const [amount, setAmount] = useState(0);
  const [amountError, setAmountError] = useState(false);
  const [errorInTransaction, setErrorInTransaction] = useState(false);
  const [successInTransaction, setSuccessInTransaction] = useState(false);

  const handleRadioChange = (value) => {
    setValue(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (value === "") {
      setValueError(true);
    }
    if (title === "") {
      setTitleError(true);
    }
    if (amount === 0 || amount === "") {
      setAmountError(true);
    } else if (
      value !== "" &&
      title !== "" &&
      (amount !== 0 || amount !== "")
    ) {
      let payload = {
        user_id: userData._id,
        title: title,
        amount: amount,
        type: value,
      };

      axios({
        method: "post",
        url: "http://localhost:5000/user/transaction",
        data: payload,
      })
        .then(() => {
          setSuccessInTransaction(true);
          setTimeout(() => {
            setTransactionMade((prev) => !prev);
            setSuccessInTransaction(false);
          }, 2000);
        })
        .catch((err) => {
          setErrorInTransaction(true);
          setTimeout(() => {
            setErrorInTransaction(false);
          }, 2500);
        });
    }
  };

  if (!userData.active) {
    return <Redirect to="/login"></Redirect>;
  } else {
    return (
      <Grid>
        {/* Dialog box for showing error in making Transaction */}
        <Dialog
          open={errorInTransaction}
          TransitionComponent={Transition}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title">
            Transaction{" "}
            <span style={{ color: "#ff601c", fontFamily: "Poppins" }}>
              UNSUCCESSFUL
            </span>
          </DialogTitle>
          <DialogContent>
            <DialogContentText
              id="alert-dialog-slide-description"
              style={{ color: "black", fontFamily: "Poppins" }}
            >
              Please enter a title with MINIMUM 3 CHARACTERS
            </DialogContentText>
          </DialogContent>
        </Dialog>

        {/* Dialog box for showing successfull transaction */}
        <Dialog
          open={successInTransaction}
          TransitionComponent={Transition}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title">
            Transaction{" "}
            <span style={{ color: "#0AC76F", fontFamily: "Poppins" }}>
              SUCCESSFUL
            </span>
            <CheckIcon style={{ color: "green", fontSize: "32px" }} />
          </DialogTitle>
        </Dialog>

        <Box>
          <form className={classes.formRoot} onSubmit={handleSubmit}>
            <Box className={classes.formDetailsDiv}>
              <label>Title</label>
              <TextField
                required
                value={title}
                onChange={(e) => {
                  setTitleError(false);
                  setTitle(e.target.value);
                }}
                error={titleError}
                helperText={titleError ? "Transaction Title is required" : ""}
              />
            </Box>
            <Box className={classes.formDetailsDiv}>
              <label>Amount</label>
              <TextField
                required
                type="number"
                value={amount}
                onChange={(e) => {
                  setAmountError(false);
                  setAmount(e.target.value);
                }}
                error={amountError}
                helperText={amountError ? "Amount is required" : ""}
              />
            </Box>
            <Box>
              {valueError && (
                <FormHelperText error>Select any one</FormHelperText>
              )}

              <RadioGroup
                value={value}
                onChange={(e) => {
                  setValueError(false);
                  handleRadioChange(e.target.value);
                }}
              >
                <FormControlLabel
                  value="Credit"
                  control={<Radio />}
                  label="Credit"
                />
                <FormControlLabel
                  value="Debit"
                  control={<Radio />}
                  label="Debit"
                />
              </RadioGroup>
            </Box>

            <Box className={classes.makeTransactionButton}>
              <Button
                variant="contained"
                color="primary"
                className={`${classes["MuiButton-containedPrimary"]}`}
                onClick={handleSubmit}
              >
                Make Transaction
              </Button>
            </Box>
          </form>
        </Box>
      </Grid>
    );
  }
}
