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

    &:focus {
      outline: none;
    }
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
      outline: none;
      box-shadow: 8px 6px 8px 2px #ccc;
    }
  }

  &:focus {
    outline: none;
    background-color: #fcfcfc;
    transform: scale(110%);
    button {
      color: #1381ff;
      outline: none;
    }
  }

  &.download-rezume {
    border: none;
    padding: 0px;
    transition: 0.3s;

    button {
      cursor: pointer;
      padding: 12px 20px;
      border: 1px solid #1b1b1b;
      transition: 0.3s;
      color: #1b1b1b;

      &:focus {
        transform: scale(103%) !important;
        box-shadow: 8px 6px 8px 2px #ccc;
        background-color: #fff;
      }
    }
  }
`;
