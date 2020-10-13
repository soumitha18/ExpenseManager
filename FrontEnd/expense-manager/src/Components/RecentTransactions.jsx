import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const useStyles = makeStyles(() => ({
  root: {
    width: "100%",
  },
  "MuiAccordion-root": {
    margin: "10px 0px",
    padding: "5px 0px",
  },
  credit: {
    border: "2px solid #0AC76F",
  },
  debit: {
    border: "2px solid #ff601c",
  },
  accordionSummary: {
    display: "flex",
    alignItems: "center",
  },
  amount: {
    fontFamily: "Poppins",
    display: "flex",
    alignItems: "center",
    marginLeft: "auto",
    fontSize: 20,
  },
  moreDetails: {
    display: "flex",
    flexDirection: "column",
  },
}));

export default function RecentTransactions({ data }) {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  console.log("The data in recent transactions is", data);

  const indianCurrencyFormat = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  });

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div className={classes.root}>
      {data.map((item) => {
        return (
          <Accordion
            key={item._id}
            square={true}
            expanded={expanded === item._id}
            onChange={handleChange(item._id)}
            className={`${classes["MuiAccordion-root"]}
            } ${item.type === "Credit" ? classes.credit : classes.debit}`}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
              className={classes.accordionSummary}
            >
              <Typography>{item.title}</Typography>
              <Typography className={classes.amount}>
                {item.type === "Credit"
                  ? `+${indianCurrencyFormat.format(item.amount)}`
                  : `-${indianCurrencyFormat.format(item.amount)}`}
              </Typography>
            </AccordionSummary>
            <AccordionDetails className={classes.moreDetails}>
              <Typography>
                <b>Type :</b> {item.type}
              </Typography>
              <Typography>
                <b>Date/Time :</b> {item.date}
              </Typography>
            </AccordionDetails>
          </Accordion>
        );
      })}
    </div>
  );
}
