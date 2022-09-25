import React from "react";
import styled from "styled-components";

export default function MyInput({ placeholder, value, onChange }) {
  return (
    <StyledInput
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}

const StyledInput = styled.input`
  padding: 7px 12px;
  background-color: transparent;
  border: 1px solid #1b1b1b;

  &:focus {
    outline: none;
  }
`;
