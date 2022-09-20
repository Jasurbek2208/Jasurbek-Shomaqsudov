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
    <a href={link}>
      <StyledButton type={type} portfolio={portfolio} onClick={onclick}>
        {content}
      </StyledButton>
    </a>
  );
}

const StyledButton = styled.button`
  cursor: pointer;
  padding: 12px 20px;
  border: 1px solid #fff;
  background-color: #fff0;
  color: #fff;
  font-size: 16px;
  text-decoration: none;
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
  transition: 0.3s;

  &:hover {
    background-color: #fcfcfc;
    transform: scale(110%);
    color: #1381ff;
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
