import React, { useContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";

// Context
import { MyContext } from "../../context/Context";

export default function MainNavbar() {
  const { isAuth, setIsAuth, isAdmin, setIsAdmin } = useContext(MyContext);
  const { setDevMode, setDevEditMode } = useContext(MyContext);
  const [isDevMode, setIsDevEditMode] = useState(false);
  const [menuToggle, setMenuToggle] = useState(false);
  const location = useLocation();

  function CloseNav() {
    setMenuToggle(false);
  }

  function LogOut() {
    localStorage.removeItem("$ISAUTH$");
    localStorage.removeItem("$T$O$K$E$N$");
    setIsAuth(false);
    setIsAdmin(false);
    CloseNav();
  }

  return (
    <StyledNavbar>
      <div className="navbar__wrapper">
        <div className="container">
          <h1>
            {isDevMode ? (
              <Link
                onClick={() => {
                  CloseNav();
                  setIsDevEditMode(false);
                }}
                to="home"
              >
                Portfolio
              </Link>
            ) : (
              <a
                onClick={() => {
                  CloseNav();
                  setIsDevEditMode(false);
                }}
                href="/home#"
              >
                Portfolio
              </a>
            )}
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
          {isDevMode ? (
            <ul>
              <li>
                <Link
                  onClick={() => {
                    CloseNav();
                    setIsDevEditMode(false);
                  }}
                  to={"home"}
                  className={location.hash === "header" ? "On" : ""}
                >
                  Home
                  <span className="left"></span>
                </Link>
              </li>
            </ul>
          ) : (
            <ul>
              <li>
                <a
                  onClick={CloseNav}
                  href={"home#header"}
                  className={location.hash === "#header" ? "On" : ""}
                >
                  Home
                  <span className="left"></span>
                </a>
              </li>
              <li>
                <a
                  onClick={CloseNav}
                  href={"home#aboutMe"}
                  className={location.hash === "#aboutMe" ? "On" : ""}
                >
                  About
                  <span className="right"></span>
                </a>
              </li>
              <li>
                <a
                  onClick={CloseNav}
                  href={"home#myPortfolio"}
                  className={location === "#myPortfolio" ? "On" : ""}
                >
                  Portfolio
                  <span className="left"></span>
                </a>
              </li>
              <li>
                <a
                  onClick={CloseNav}
                  href={"home#contactMe"}
                  className={location === "#contactMe" ? "On" : ""}
                >
                  Contacts
                  <span className="right"></span>
                </a>
              </li>
              {isAdmin ? (
                <li>
                  <Link
                    onClick={() => {
                      CloseNav();
                      setIsDevEditMode(true);
                    }}
                    to={"/adminPage"}
                    className={location === "/adminPage" ? "On" : ""}
                  >
                    Admin Page
                    <span className="right"></span>
                  </Link>
                </li>
              ) : null}
              {isAuth ? (
                <li>
                  <Link
                    onClick={LogOut}
                    to={"/login"}
                    className={location === "/login" ? "On" : ""}
                  >
                    LogOut
                    <span className="right"></span>
                  </Link>
                </li>
              ) : (
                <li>
                  <Link
                    onClick={CloseNav}
                    to={"/login"}
                    className={location === "/login" ? "On" : ""}
                  >
                    Login or Register
                    <span className="right"></span>
                  </Link>
                </li>
              )}
              {isAdmin ? (
                <li>
                  <label
                    className="form-check-label"
                    for="flexSwitchCheckDefault"
                  >
                    Developer mode
                  </label>
                  <div className="form-check form-switch">
                    <input
                      onChange={() => {
                        setDevMode((p) => !p);
                        setDevEditMode(false);
                      }}
                      className="form-check-input"
                      type="checkbox"
                      id="flexSwitchCheckDefault"
                    />
                  </div>
                </li>
              ) : null}
            </ul>
          )}
        </div>
      </div>
    </StyledNavbar>
  );
}

const StyledNavbar = styled.nav`
  .navbar__wrapper {
    position: fixed;
    z-index: 3;
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
    height: 100vh;
    z-index: 2;
    background-color: #1f1f1f;
    transition: 0.5s;

    &.On {
      top: 0;
    }

    .container {
      ul {
        margin-top: 150px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        gap: 42px;
        list-style: none;

        li {
          a,
          label {
            position: relative;
            padding: 3px 10px;
            color: #dddddd;
            margin-left: -20px;
            font-weight: 600;
            font-size: 22px;
            text-decoration: none;
            transition: 0.2s;

            span {
              position: absolute;
              bottom: -8px;
              left: 0;
              right: 0;
              margin: 0 auto;
              height: 3px;
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

          &:last-of-type {
            display: flex;
            align-items: center;
            gap: 8px;

            label {
              cursor: pointer;
              font-size: 18px;
            }

            input {
              cursor: pointer;
            }
          }
        }
      }
    }
  }
`;
