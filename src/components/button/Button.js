import React from "react";
import styled, { css } from "styled-components";

export default function Button({
  type,
  content,
  portfolio,
  children,
  link,
  onclick,
}) {
  return (
    <StyledButton href={link}>
      <button type={type} portfolio={portfolio} onClick={onclick}>
        {content}
      </button>
    </StyledButton>
  );
}

const StyledButton = styled.a`
  cursor: pointer;
  padding: 12px 20px;
  border: 1px solid #fff;
  transition: 0.3s;

  button {
    width: 100%;
    height: 100%;
    color: #fff;
    font-size: 16px;
    text-decoration: none;
    background-color: #fff0;
    font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
    border: none;
  }

  &:hover {
    background-color: #fcfcfc;
    transform: scale(110%);

    button {
      color: #1381ff;
    }
  }

  &:active {
    transform: translateY(3px);
  }

  ${({ portfolio }) => {
    if (portfolio) {
      return css``;
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
