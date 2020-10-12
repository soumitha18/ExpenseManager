import React from "react";
import styled from "styled-components";

const DashboardCardWrapper = styled.div`
  width: 352px;
  height: 170px;
  border: 1px solid black;
  border-radius: 10px;
  ${(props) =>
    props.tag === "total"
      ? css`
          background-color: lightyellow;
        `
      : props.tag === "credit"
      ? css`
          background-color: lightgreen;
        `
      : css`
          background-color: red;
        `}
`;

//this takes some titleProps, and a value(number)
export default function DashboardCard(props) {
  return (
    <DashboardCardWrapper tag={props.tag}>
      <div>{props.title}</div>
      <h2>{props.value}</h2>
    </DashboardCardWrapper>
  );
}
