import React from "react";
import styled, { css } from "styled-components";

export default function Button({ type, className, content, link, onClick }) {
  return (
    <StyledButton className={className} href={link}>
      <button type={type} onClick={onClick}>
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

  @media (max-width: 600px) {
    width: 90%;
    margin: 0 auto;
    padding: 20px 26px;

    &:hover {
      transform: scale(105%);
    }
  }

  &.add-btn {
    cursor: pointer;
    padding: 12px 16px;
    border: none;
    background-color: #0068c4;
    border-radius: 10px;
    color: #fff;
    font-size: 16px;
    transition: 0.3s;

    &:hover {
      transform: scale(100%);
      box-shadow: 8px 6px 8px 2px #ccc;
      button {
        color: #fff;
      }
    }

    &:focus {
      box-shadow: 8px 6px 8px 2px #ccc;
      button {
        color: #fff;
        outline: none;
      }
    }
  }
`;
