import React, { useContext } from "react";
import styled from "styled-components";
import { MyContext } from "../../context/Context";

export default function MainFooter() {
  const { currentLang } = useContext(MyContext);
  return (
    <StyledFooter id="contactMe">
      <div className="container">
        <h1>
          {currentLang === "Uz"
            ? "Aloqa"
            : currentLang === "Ru"
            ? "Контакты"
            : "Contacts"}
        </h1>
        <ul>
          <li>
            <a href="https://my-portfolio-jasurbekshomaqsudov.vercel.app">
              Web
            </a>
          </li>
          <li>
            <a href="https://t.me/Joni2208">Telegram</a>
          </li>
          <li>
            <a href="https://t.me/JasurbekFrontend">Telegram Portfolio</a>
          </li>
          <li>
            <a href="https://www.instagram.com/jasurbekshomaqsudov_frontend">
              Instagram
            </a>
          </li>
          <li>
            <a href="mailto: jasurbekshomaqsudov2004@gmail.com">Gmail</a>
          </li>
          <li>
            <a href="tel: +998971052208">+998-97-105-22-08</a>
          </li>
        </ul>
      </div>
    </StyledFooter>
  );
}

const StyledFooter = styled.footer`
  padding: 100px 0px 40px;
  background-color: #ececec;
  border-top: 1px solid #1b1b1b;

  .container {
    h1 {
      margin-left: 25px;
      text-align: center;
      font-weight: 800;
      font-size: 1.5rem;
      color: #1b1b1b;
    }

    ul {
      margin-top: 50px;
      display: flex;
      align-items: flex-start;
      justify-content: space-around;
      flex-wrap: wrap;
      gap: 200px;
      row-gap: 60px;

      li {
        list-style: none;
        text-align: left;

        a {
          text-decoration: none;
        }
      }
    }
  }
`;
