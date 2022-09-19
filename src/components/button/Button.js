import React from "react";
import styled, { css } from "styled-components";

export default function Button({ type, content, portfolio, onclick }) {
  return (
    <StyledButton type={type} portfolio={portfolio} onClick={onclick}>
      {content}
    </StyledButton>
  );
}

const StyledButton = styled.button`
  cursor: pointer;
  padding: 12px 20px;
  color: #fff;
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
  font-size: 16px;
  border: 1px solid #fff;
  background-color: #fff0;
  transition: 0.3s;

  &:hover {
    background-color: #fcfcfc;
    color: #1381ff;
    transform: scale(111%);
  }

  &:active {
    transform: translateY(3px);
  }

  ${({ portfolio }) => {
    if (portfolio) {
      return css`
        
      `;
    }
  }}

  @media (max-width: 600px) {
    width: 90%;
    margin: 0 auto;
    padding: 20px 26px;
    
  &:hover {
    transform: scale(105%);
  }
  }
`;
