import React from "react";
import styled from "styled-components";

export default function ({ options, defaultValue, value, onChange }) {
  return (
    <StyledSelect value={value} onChange={(e) => onChange(e.target.value)}>
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

  &:focus {
    outline: none;
  }
`;
