import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  container: {
    maxHeight: 640,
  },
});

const indianCurrencyFormat = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
});

export default function LedgerTable({ paginationData }) {
  const classes = useStyles();

  return (
    <TableContainer
      component={Paper}
      square={true}
      className={classes.container}
    >
      <Table className={classes.table} aria-label="simple table" stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell align="left">
              <b>#</b>
            </TableCell>
            <TableCell align="left">
              <b>DATE</b>
            </TableCell>
            <TableCell align="center">
              <b>TITLE</b>
            </TableCell>
            <TableCell align="center">
              <b>TYPE</b>
            </TableCell>
            <TableCell align="right">
              <b>AMOUNT</b>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {paginationData &&
            paginationData.map((row, index) => {
              return (
                <TableRow key={row._id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell align="left">{row.date}</TableCell>
                  <TableCell align="center">{row.title}</TableCell>
                  <TableCell align="center">{row.type}</TableCell>
                  <TableCell align="right">
                    {indianCurrencyFormat.format(row.amount)}
                  </TableCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
