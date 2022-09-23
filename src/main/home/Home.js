import React, { useContext, useEffect, useState } from "react";
import {
  collection,
  doc,
  getDocs,
  setDoc,
  deleteDoc,
} from "firebase/firestore";
import styled from "styled-components";
import Button from "../../components/button/Button";
import Glass from "../../components/Glass/Glass";
import { db } from "../../firebase";
import MainFooter from "../../components/mainFooter/MainFooter";
import { MyContext } from "../../context/Context";
import Loading from "../../components/loading/Loading";

export default function Home() {
  const { devMode, devEditMode, setDevEditMode } = useContext(MyContext);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [likeLoading, setLikeLoading] = useState(false);

  // GET DATA
  async function getData() {
    setLoading(true);
    let list = [];
    try {
      const querySnapshot = await getDocs(collection(db, "portfolio"));
      querySnapshot.forEach((doc) => {
        list.push(doc._document);
      });
      setData(list);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  // CLICK LIKE
  async function clickForLike(e) {
    setLikeLoading(true);
    let upDateData = null;
    let currentLike = false;
    let id = "";
    if (e.target.classList.contains("fa-regular")) {
      e.target.classList.remove("fa-regular");
      e.target.classList.add("fa-solid");
      currentLike = true;
    } else {
      e.target.classList.remove("fa-solid");
      e.target.classList.add("fa-regular");
    }

    try {
      const querySnapshot = await getDocs(collection(db, "portfolio"));
      querySnapshot.forEach((doc) => {
        if (
          doc._document.data.value.mapValue.fields.id.stringValue ===
          e.target.id
        ) {
          upDateData = doc._document.data.value.mapValue.fields;
          id = doc.id;
        }
      });
      const docRef = doc(db, "portfolio", id);

      let rowList = [];
      Object.entries(upDateData).forEach((i) => {
        let tempObj = {};
        i[0] === "like"
          ? (tempObj[i[0]] = i[1].integerValue)
          : (tempObj[i[0]] = i[1].stringValue);
        rowList.push(tempObj);
      });
      rowList.forEach((i) => {
        Object.entries(i).forEach((j) => {
          let jKey = j[0];
          let jValue = j[1];
          upDateData = { ...upDateData, [jKey]: jValue };
        });
      });
      let num = upDateData.like;
      upDateData.like = currentLike
        ? Number(++num)
        : num !== 0
          ? Number(--num)
          : Number(num);
      await setDoc(docRef, upDateData);
      getData();
    } catch (e) {
      console.error("Error adding document: ", e);
    } finally {
      setLikeLoading(false);
    }
  }

  const [checkedDataWatcher, setCheckedDataWatcher] = useState([]);
  // DELETE DATA
  function deleteDocId() {
    checkedDataWatcher.forEach((id) => {
      dbDocDelete(id);
    });
    getData();
    setCheckedDataWatcher([]);
  }

  async function dbDocDelete(id) {
    try {
      deleteDoc(doc(db, "portfolio", id));
    } catch (error) {
      console.log(error);
    }
  }

  function checkDataId(id) {
    if (!checkedDataWatcher.includes(id)) {
      setCheckedDataWatcher((p) => [...p, id]);
    } else {
      setCheckedDataWatcher(
        checkedDataWatcher.filter((i) => (i !== id ? true : false))
      );
    }
  }

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (setDevEditMode) setCheckedDataWatcher([]);
  }, [devEditMode]);

  return (
    <StyledHome id="header">
      <div className="headHeader">
        <div className="container">
          {/* HEADER SECTION */}
          <header className="header__wrapper">
            <main className="headerMain">
              <h1 id="title">Shomaqsudov Jasurbek</h1>
              <h3>Front-End Developer</h3>
              <p>
                My name is Jasurbek. And I'm The Front-End Developer. I have
                just started my job and am currently gaining experience. Why
                should you choose Me? You will learn more about this by reading
                the information on this site.
              </p>
              <div className="buttons__wrapper">
                <Button type="button" content="About Me" link="#aboutMe" />
                <Button
                  type="button"
                  content="Portfolio"
                  link="#myPortfolio"
                  portfolio={true}
                />
                <Button type="button" content="Contact Me" link="#contactMe" />
              </div>
            </main>
            <div className="image__wrapper">
              <Glass>
                <img src="" alt="person-img" />
              </Glass>
            </div>
          </header>
        </div>
      </div>

      {/* ABOUT SECTION */}
      <section className="about__wrapper" id="aboutMe">
        <div className="container">
          <h1>About Me</h1>
          <div className="aboutMe-blok">
            <p>
              My name is Shomaksudov Jasurbek and I was born on August 22, 2004
              in Tashkent. I am a Front-End developer. I entered this field
              because of my own interests. In this field, I studied at the
              school "Registon IT" in Tashkent and completed 2 months of
              internship. My main goal these days is to increase my experience
              and become a strong developer.
            </p>
          </div>
        </div>
      </section>

      {/* SKILLS SECTION */}
      <section className="skills__wrapper" id="my-skills">
        <div className="container">
          <h1>Skills</h1>
          <div className="skills-blok">
            <div className="left">
              <p>HTML 5</p>
              <p>CSS 3</p>
              <p>SCSS(SASS)</p>
              <p>BOOTSTRAP 5</p>
              <p>Material UI</p>
            </div>
            <div className="right">
              <p>JavaScript</p>
              <p>TypeScript</p>
              <p>React.JS</p>
              <p>Firebase</p>
              <p>C++</p>
            </div>
          </div>
        </div>
      </section>

      {/* DELETE BTN */}
      <div
        className={
          (checkedDataWatcher.length > 0 ? "On " : "") + "deleteFixedBtn"
        }
        onClick={deleteDocId}
      >
        <p>Delete item</p>
      </div>

      <div
        className={
          (checkedDataWatcher.length === 1 ? "On " : "") +
          "deleteFixedBtn CurrEdit"
        }
        onClick={() => console.log("Yeah")}
      >
        <p>Edit Current Portfolio</p>
      </div>

      {/* PORTFOLIO WRAPPER */}
      <section className="portfolio__wrapper" id="myPortfolio">
        <div className="container">
          <h1>
            Portfolio
            {devMode ? (
              <div style={{ width: "100px", marginTop: "-12px" }}>
                <Button
                  type="button"
                  className="add-btn"
                  content={devEditMode ? "Close" : "Edit"}
                  onClick={() => {
                    setDevEditMode((p) => !p);
                  }}
                />
              </div>
            ) : null}
          </h1>
          <main className="my-portfolios">
            {loading ? (
              <Loading />
            ) : data.length === 0 ? (
              <h1
                style={{
                  fontSize: "22px",
                  textAlign: "center",
                  lineHeight: "44px",
                  marginTop: "20px",
                }}
              >
                No portfolio or your internet is off!
              </h1>
            ) : (
              data?.map((i) => {
                return (
                  <div
                    key={i?.data?.value?.mapValue?.fields?.title?.stringValue}
                    className="blog_wrapper"
                  >
                    <div className="top">
                      <img
                        src={i?.data?.value?.mapValue?.fields?.img?.stringValue}
                        alt={
                          i?.data?.value?.mapValue?.fields?.title?.stringValue +
                          ".jpg"
                        }
                      />
                    </div>
                    <div className="bottom">
                      {devEditMode ? (
                        <input
                          className="form-check-input"
                          type="checkbox"
                          checked={
                            checkedDataWatcher.includes(
                              i?.key?.path?.segments[6]
                            )
                              ? true
                              : false
                          }
                          onChange={() =>
                            checkDataId(i?.key?.path?.segments[6])
                          }
                          id="flexCheckDefault"
                        />
                      ) : null}
                      <h2>
                        {i?.data?.value?.mapValue?.fields?.title?.stringValue}
                      </h2>
                      <h5>
                        {
                          i?.data?.value?.mapValue?.fields?.technologies
                            ?.stringValue
                        }
                      </h5>
                      <p
                        dangerouslySetInnerHTML={{
                          __html:
                            i?.data?.value?.mapValue?.fields?.description
                              ?.stringValue,
                        }}
                      ></p>
                      <div className="link">
                        <a
                          href={
                            i?.data?.value?.mapValue?.fields?.link?.stringValue
                          }
                        >
                          Link to Project
                        </a>
                        <div className="icon-wrapper">
                          <span>
                            {likeLoading ? (
                              <Loading like={true} />
                            ) : (
                              i?.data?.value?.mapValue?.fields?.like
                                ?.integerValue
                            )}
                          </span>
                          <i
                            id={
                              i?.data?.value?.mapValue?.fields?.id?.stringValue
                            }
                            onClick={clickForLike}
                            className="icon icon-like fa-regular fa-thumbs-up"
                          ></i>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </main>
        </div>
      </section>

      {/* FOOTER */}
      <MainFooter />
    </StyledHome>
  );
}
const StyledHome = styled.div`
  padding: 0px;
  margin: 0px;

  .headHeader {
    padding: 140px 0 60px;
    width: 100%;
    height: 100%;
    background: radial-gradient(rgb(19, 129, 255), rgb(0, 31, 78));

    .container {
      /* HEADER SECTION STYLE */
      .header__wrapper {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-wrap: wrap-reverse;
        gap: 50px;
        row-gap: 65px;
        padding-bottom: 80px;

        .headerMain {
          h1 {
            color: #fff;
            font-weight: 800;
          }

          h3 {
            color: #fcfcfc;
            font-weight: 600;
            margin: 16px 0 32px;
          }

          & > p {
            max-width: 400px;
            color: #eeeded;
            font-weight: 600;
            line-height: 24px;
            font-family: "Courier New", Courier, monospace;
          }

          .buttons__wrapper {
            margin-top: 32px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            flex-wrap: wrap;
            row-gap: 36px;
            gap: 30px;
          }
        }

        .image__wrapper {
          width: 400px;
          height: 450px;
          position: relative;
        }
      }
    }
  }

  /* ABOUT SECTION STYLE */
  .about__wrapper {
    padding: 130px 0 200px;
    background-color: #ececec;

    .container {
      h1 {
        text-align: center;
        font-weight: 800;
        font-size: 2rem;
        color: #1b1b1b;
      }

      .aboutMe-blok {
        margin: 0 auto;
        margin-top: 60px;
        max-width: 720px;
        padding: 40px;
        border: 1px solid #1b1b1b;
        box-shadow: 6px 6px 10px 2px #9c9c9cc8;
        background-color: #fff0;

        p {
          font-family: "Poppins";
          line-height: 27px;
        }
      }
    }
  }

  /* SKILLS WRAPPER */
  .skills__wrapper {
    padding: 20px 0 50px;
    background-color: #ececec;

    .container {
      h1 {
        text-align: center;
        font-weight: 800;
        font-size: 2rem;
        color: #1b1b1b;
      }

      .skills-blok {
        padding: 30px 16px;
        margin: 0px auto;
        max-width: 500px;
        display: flex;
        align-items: flex-start;
        justify-content: space-around;
        flex-wrap: wrap;
        gap: 30px;

        .left,
        .right {
          display: flex;
          flex-direction: column;
          row-gap: 14px;

          p {
            text-align: center;
            color: #000;
            padding: 8px 10px;
            border-radius: 20px;
            background-color: #fff0;
            transition: 0.2s;

            &:hover {
              color: #fff;
              background-color: #1b1b1b;
            }
          }
        }
      }
    }
  }

  /* deleteFixedBtn */
  .deleteFixedBtn {
    cursor: pointer;
    padding-left: 10px;
    position: fixed;
    z-index: 1;
    right: -1000px;
    top: 25%;
    width: 110px;
    height: 50px;
    background-color: #ececec;
    border-radius: 10px;
    box-shadow: 0px 3px 7px 1px #aaa;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    transition: 0.2s;

    &.CurrEdit {
      top: 40%;
    }

    &.On {
      right: -10px;
    }

    p {
      margin: 0;
      font-size: 13px;
    }
  }

  /* PORTFOLIO WRAPPER */
  .portfolio__wrapper {
    padding: 130px 0px 200px;
    background-color: #ececec;

    .container {
      h1 {
        margin: 0px;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 50px;
        font-weight: 800;
        font-size: 2rem;
        color: #1b1b1b;
      }

      .my-portfolios {
        margin-top: 50px;
        display: flex;
        align-items: center;
        justify-content: space-around;
        flex-wrap: wrap;
        gap: 30px;
        row-gap: 50px;

        .blog_wrapper {
          position: relative;
          width: 300px;
          height: 380px;
          border-radius: 12px;
          /* border: 2px solid #000; */
          background-color: #fff;
          box-shadow: 0px 3px 8px 0px #ccc;

          .top {
            width: 100%;
            height: 200px;
            border-radius: 12px;

            img {
              width: 100%;
              height: 100%;
              border-top-left-radius: 12px;
              border-top-right-radius: 12px;
            }
          }

          .bottom {
            padding: 12px 14px;
            position: relative;
            width: 100%;
            height: 180px;

            .form-check-input {
              cursor: pointer;
              position: absolute;
              top: 12px;
              right: 25px;
            }

            h2 {
              font-size: 20px;
            }

            h5 {
              margin: 8px 0px 12px;
              font-size: 13px;
            }

            p {
              font-size: 12px;
            }

            .link {
              padding: 12px 0px;
              position: absolute;
              bottom: 0px;
              width: 100%;
              display: flex;
              justify-content: space-between;

              a {
                font-size: 15px;
                text-decoration: none;
                color: #9c9c9cc8;
                transition: 0.1s;

                &:hover {
                  color: blueviolet;
                }

                &:focus {
                  outline: none;
                  color: blueviolet;
                }
              }

              .icon-wrapper {
                .icon-like,
                span {
                  position: absolute;
                  top: 10px;
                  right: 25px;
                  cursor: pointer;
                  transform: translateX(-50%);
                }

                span {
                  cursor: default;
                  top: 8px;
                  right: 54px;
                }
              }
            }
          }
        }
      }
    }
  }
`;
