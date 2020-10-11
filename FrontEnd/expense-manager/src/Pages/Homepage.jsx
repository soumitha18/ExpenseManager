import React from "react";
import styled from "styled-components";

const HomepageWrapper = styled.div`
  border: 1px solid red;
  h1 {
    font-family: "Poppins";
    text-align: center;
  }
`;

export default function Homepage() {
  return (
    <HomepageWrapper>
      <h1>EXPENSE MANAGER</h1>
    </HomepageWrapper>
  );
}
