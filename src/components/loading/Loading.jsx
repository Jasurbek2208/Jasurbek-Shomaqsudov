import React from "react";
import styled from "styled-components";

export default function Loading({ like, winLoad }) {
  return (
    <StyledLoading className={winLoad}>
      <div
        className={(like ? "like " : "") + "spinner-border"}
        role="status"
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          scale: "200%",
        }}
      >
        <span className="sr-only"></span>
      </div>
      {winLoad ? <h1>Loading...</h1> : null}
    </StyledLoading>
  );
}

const StyledLoading = styled.div`
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100vw;
  height: 100vh;
  background-color: #ccc7;
  z-index: 100000;

  &.true {
    background-color: #ccc;

    div {
      top: 40% !important;
    }
  }

  h1 {
    position: fixed;
    bottom: 40%;
    left: 50%;
    right: 50%;
  }

  .like {
    width: 50%;
    height: 50%;
    top: 5px !important;
    left: -12px !important;
  }
`;
