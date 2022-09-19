import React, { useState } from "react";
import styled, { css } from "styled-components";

export default function Glass({ children, aboutPage }) {
  const [scroll, setScroll] = useState(" Off");
  
  function scrolled() {
    window.scrollY > 300 ? setScroll(" On") : setScroll(" Off");
  }

  document.body.setAttribute("onScroll", '() => scrolled()');

  return (
    <StyledGlass>
      <div className={"img-glass" + (aboutPage ? scroll : "")}>
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
    background: linear-gradient(60deg, #3b3b3b19, #8f8f8fb3, #3b3b3b19);
    transform: rotate3d(130%);
    animation-name: glassAnimate;
    animation-duration: 3.5s;

    ${(scrollY) => {
      if (scrollY === 120) {
        console.log(scrollY);
      }
    }}
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
        border: 1px solid #3b3b3b19;
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

  ${({ aboutPage }) => {
    if (aboutPage) {
      return css``;
    }
  }}
`;
