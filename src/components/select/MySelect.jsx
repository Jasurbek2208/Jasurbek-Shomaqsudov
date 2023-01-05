import React from "react";
import styled from "styled-components";

export default function ({
  options,
  defaultValue,
  value,
  onChange,
  className = "",
}) {
  return (
    <StyledSelect
      className={className}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      <option disabled value="">
        {defaultValue}
      </option>
      {options.map((i) => (
        <option key={i.value} value={i.value}>
          {i.name}
        </option>
      ))}
    </StyledSelect>
  );
}

const StyledSelect = styled.select`
  padding: 8px 12px;
  border: 1px solid #1b1b1b;
  background-color: transparent;
  width: 240px;
  transition: 0.3s;

  &:focus {
    box-shadow: 4px 2px 10px 0px #4e4e4e;
    outline: none;
  }

  &.lang-select {
    border: 1px solid #fff;
    background-color: #ccc;

    option {
      color: #000;
    }
  }
`;
