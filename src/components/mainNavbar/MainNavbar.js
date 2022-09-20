import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";

export default function MainNavbar() {
  const [menuToggle, setMenuToggle] = useState(false);
  const location = useLocation();

  function CloseNav() {
    setMenuToggle(false);
  }

  return (
    <StyledNavbar>
      <div className="navbar__wrapper">
        <div className="container">
          <h1>
            <Link onClick={CloseNav} to={"/home"}>
              Portfolio
            </Link>
          </h1>
          <div
            className={(menuToggle ? "On " : "") + "menu-btn"}
            onClick={() => setMenuToggle((p) => !p)}
          >
            <span id="span1"></span>
            <span id="span2"></span>
            <span id="span3"></span>
          </div>
        </div>
      </div>
      <div className={(menuToggle ? "On " : "") + "menu__wrappper"}>
        <div className="container">
          <ul>
            <li>
              <a
                onClick={CloseNav}
                href={"#header"}
                className={location.hash === "#header" ? "On" : ""}
              >
                Home
                <span className="left"></span>
              </a>
            </li>
            <li>
              <a
                onClick={CloseNav}
                href={"#aboutMe"}
                className={location.hash === "#aboutMe" ? "On" : ""}
              >
                About
                <span className="right"></span>
              </a>
            </li>
            <li>
              <a
                onClick={CloseNav}
                href={"#myPortfolio"}
                className={location === "#myPortfolio" ? "On" : ""}
              >
                Portfolio
                <span className="left"></span>
              </a>
            </li>
            <li>
              <Link
                onClick={CloseNav}
                to={"/contacts"}
                className={location === "/contacts" ? "On" : ""}
              >
                Contacts
                <span className="right"></span>
              </Link>
            </li>
            <li>
              <Link
                onClick={CloseNav}
                to={"/adminPage"}
                className={location === "/adminPage" ? "On" : ""}
              >
                Admin Page
                <span className="right"></span>
              </Link>
            </li>
            <li>
              <Link
                onClick={CloseNav}
                to={"/login"}
                className={location === "/login" ? "On" : ""}
              >
                Login
                <span className="right"></span>
              </Link>
            </li>
            <li>
              <Link
                onClick={CloseNav}
                to={"/register"}
                className={location === "/register" ? "On" : ""}
              >
                Register
                <span className="right"></span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </StyledNavbar>
  );
}

const StyledNavbar = styled.nav`
  .navbar__wrapper {
    position: fixed;
    z-index: 2;
    width: 100%;
    padding: 18px 16px;
    background-color: #ececec;
    box-shadow: 0 2px 6px 0 #0e0e0ee1;

    .container {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: space-between;

      h1,
      a {
        color: #1b1b1b;
        font-weight: 900;
      }

      .menu-btn {
        cursor: pointer;
        position: relative;
        display: flex;
        flex-direction: column;
        gap: 7px;
        width: 42px;
        height: 23px;
        transition: 0.1s;

        span {
          position: absolute;
          top: 0;
          right: 0px;
          width: 42px;
          height: 3px;
          background-color: #1b1b1b;
          transition: 0.6s;

          &#span2 {
            top: 10px;
            transition: 0.4s;
          }
          &#span3 {
            top: 20px;
          }
        }

        &.On {
          #span1 {
            top: 10px;
            transform: rotate(-50deg);
          }
          #span2 {
            right: -100vw;
          }
          #span3 {
            top: 10px;
            transform: rotate(50deg);
          }
        }
      }
    }
  }
  .menu__wrappper {
    position: fixed;
    top: -2500px;
    right: 0;
    width: 100%;
    height: max-content;
    z-index: 1;
    background-color: #1f1f1f;
    transition: 0.5s;

    &.On {
      top: 0;
    }

    .container {
      ul {
        margin-top: 130px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        gap: 48px;
        list-style: none;

        li {
          a {
            position: relative;
            padding: 5px 10px;
            color: #dddddd;
            font-weight: 600;
            font-size: 28px;
            text-decoration: none;
            transition: 0.2s;

            span {
              position: absolute;
              bottom: -8px;
              left: 0;
              right: 0;
              margin: 0 auto;
              height: 4px;
              width: 0px;
              background-color: #fff;
              transition: 1s;
            }

            &:hover {
              color: #fff;

              span {
                width: 100%;
              }
            }

            &.On {
              color: #fff;

              span {
                width: 100%;
              }
            }
          }
        }
      }
    }
  }
`;
