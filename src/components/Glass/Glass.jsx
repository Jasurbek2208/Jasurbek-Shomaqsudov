import React from "react";
import styled from "styled-components";

export default function Glass({ children }) {
  return (
    <StyledGlass>
      <div className="img-glass">
        <div className="img__wrapper">{children}</div>
      </div>
    </StyledGlass>
  );
}

const StyledGlass = styled.div`
  .img-glass.Off {
    width: 0;
    height: 0;
    display: none;
  }

  .img-glass,
  .img-glass.On {
    position: absolute;
    width: 100%;
    height: 100%;
    margin: 0 auto;
    top: 0;
    left: 0px;
    right: 0px;
    border: 1px solid #3b3b3b19;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 16px;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(5px);
    -webkit-backdrop-filter: blur(5px);
    border: 1px solid rgba(255, 255, 255, 0.3);
    transform: rotate3d(130%);
    animation-name: glassAnimate;
    animation-duration: 3.5s;

    @keyframes glassAnimate {
      0% {
        width: 0%;
        border: none;
      }

      33% {
        width: 0%;
        border: none;
      }

      100% {
        width: 100%;
        height: 450px;
        background: rgba(255, 255, 255, 0.2);
        border-radius: 16px;
        box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
        backdrop-filter: blur(5px);
        -webkit-backdrop-filter: blur(5px);
        border: 1px solid rgba(255, 255, 255, 0.3);
        transform: rotate3d(130deg);
      }
    }

    .img__wrapper {
      max-width: 250px;
      max-height: 350px;
      display: none;

      img {
        width: 100%;
        height: 100%;
      }
    }
  }
`;
