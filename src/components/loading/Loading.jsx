import React from "react";
import styled from "styled-components";

export default function Loading({ like }) {
  return (
    <StyledLoading
      style={{
        position: "fixed",
        top: "0px",
        left: "0px",
        width: "100%",
        height: "100%",
        backgroundColor: "#ccc7",
      }}
    >
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
    </StyledLoading>
  );
}

const StyledLoading = styled.div`
  .like {
    width: 50%;
    height: 50%;
    top: 5px !important;
    left: -12px !important;
  }
`;
