import React, { useContext } from "react";
import styled from "styled-components";

// Context
import { MyContext } from "../../context/Context";

// Components
import Button from "../button/Button";

export default function LoginAlert() {
  const { setLogging } = useContext(MyContext);

  function closeModal() {
    setLogging(false);
  }

  return (
    <StyledLoginAlert onClick={closeModal}>
      <main className="wrapper" onClick={(e) => e.stopPropagation()}>
        <h1>You are not a member of the site!</h1>
        <div className="buttons__wrapper">
          <div className="button__wrapper">
            <Button
              className="add-btn"
              type="button"
              content="Close"
              onClick={() => setLogging(false)}
            />
          </div>
          <div className="button__wrapper">
            <Button
              className="add-btn"
              type="button"
              content="Login"
              onClick={() => setLogging(false)}
              link="/login"
            />
          </div>
        </div>
      </main>
    </StyledLoginAlert>
  );
}

const StyledLoginAlert = styled.div`
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100vw;
  height: 100vh;
  background-color: #61616136;
  z-index: 200000;

  .wrapper {
    padding: 30px;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -45%);
    width: 400px;
    height: 350px;
    background-color: #ececec;
    box-shadow: 6px 6px 10px 2px #9c9c9cc8;
    border-radius: 15px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;

    h1 {
      text-align: center;
      line-height: 50px;
    }

    .buttons__wrapper {
      width: 100%;
      display: flex;
      flex-direction: column;
      row-gap: 40px;

      .button__wrapper {
        width: 90%;
        height: 30px;
      }
    }

    @media (max-width: 410px) {
      width: 100%;
    }
  }
`;
