import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

// Firebase
import {
  collection,
  doc,
  getDocs,
  setDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../../../firebase";

// Components
import Button from "../../../components/button/Button";
import MyInput from "../../../components/input/MyInput";
import MySelect from "../../../components/select/MySelect";
import LoginAlert from "../../../components/loginAlert/LoginAlert";

// Context
import { MyContext } from "../../../context/Context";
import MainFooter from "../../../components/mainFooter/MainFooter";

export default function PortfolioPosts() {
  const navigate = useNavigate();

  //   ===============================================================================================================================
  const { isAuth, devMode, devEditMode, setDevEditMode, logging, setLogging } =
    useContext(MyContext);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [likeLoading, setLikeLoading] = useState(false);
  const [curUserAllLikes, setCurUserAllLikes] = useState("");
  const [disblLike, setDisblLike] = useState(false);

  // GET DATA
  async function getData(what) {
    if (what) {
      setLoading(true);
    }
    let list = [];
    try {
      const querySnapshot = await getDocs(collection(db, "portfolio"));
      querySnapshot.forEach((doc) => {
        list.push(doc._document);
      });
      setData(list);
      setFilteredData(list);
      setCurrFilDate(list);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  // GET Current User's all likes id
  async function getAllLikes() {
    try {
      const querySnapshot = await getDocs(collection(db, "users"));
      querySnapshot.forEach((doc) => {
        if (
          doc._document?.data?.value?.mapValue?.fields?.uid?.stringValue ===
          localStorage.getItem("$U$I$D$")
        ) {
          setCurUserAllLikes(
            doc._document?.data?.value?.mapValue?.fields?.liked?.stringValue
          );
        }
      });
    } catch (error) {
      console.log(error);
    }
  }

  // CLICK LIKE
  async function clickForLike(divId, e) {
    setDisblLike(true);
    await getAllLikes();
    setLikeLoading(true);
    const loadLikeId = document.getElementById(divId);
    loadLikeId.innerHTML = `<div class="spinner-border spinner-border-sm" role="status"></div>`;
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
      curUserAllLikes.includes(divId)
        ? (upDateData.like = Number(--num))
        : (upDateData.like = Number(++num));
      dbCheckLike(divId);
      await setDoc(docRef, upDateData);
      getData(false);
    } catch (e) {
      console.error("Error adding document: ", e);
    } finally {
      setLikeLoading(false);
      setDisblLike(false);
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

  async function checkDataId(id) {
    if (!checkedDataWatcher.includes(id)) {
      setCheckedDataWatcher((p) => [...p, id]);
    } else {
      setCheckedDataWatcher(
        checkedDataWatcher.filter((i) => (i !== id ? true : false))
      );
    }
  }

  async function dbCheckLike(currPostId) {
    let currUserId = "";
    let currUserDate = "";
    let currUserLikedId = "";
    let aa = [];
    const querySnapshot = await getDocs(collection(db, "users"));
    querySnapshot.forEach((doc) => {
      if (
        doc._document?.data?.value?.mapValue?.fields?.uid?.stringValue ===
        localStorage.getItem("$U$I$D$")
      ) {
        currUserId = doc?.id;
        currUserDate = doc._document?.data?.value?.mapValue?.fields;
        currUserLikedId = currUserDate?.liked?.stringValue;
      }

      aa = currUserLikedId.split(" ");
      aa.includes(currPostId)
        ? (aa = aa.filter((i) => (i !== currPostId ? true : false)))
        : aa.push(currPostId);
    });

    setCurUserAllLikes(aa.join(" "));

    await setDoc(doc(db, "users", currUserId), {
      email: currUserDate?.email?.stringValue,
      password: currUserDate?.password?.stringValue,
      id: currUserDate?.id?.stringValue,
      uid: currUserDate?.uid?.stringValue,
      liked: aa.join(" "),
    });
  }

  // SORT
  const [sortValue, setSortValue] = useState("");
  function sortPosts(sort) {
    setSortValue(sort);
    sort.includes("like")
      ? sort === "likeDown"
        ? setFilteredData(
            [...filteredData].sort(
              (a, b) =>
                a.data?.value?.mapValue?.fields?.like.integerValue -
                b.data?.value?.mapValue?.fields?.like.integerValue
            )
          )
        : setFilteredData(
            [...filteredData].sort(
              (a, b) =>
                b.data?.value?.mapValue?.fields?.like?.integerValue -
                a.data?.value?.mapValue?.fields?.like?.integerValue
            )
          )
      : setFilteredData(
          [...filteredData].sort((a, b) =>
            a.data?.value?.mapValue?.fields[sort].stringValue.localeCompare(
              b.data?.value?.mapValue?.fields[sort].stringValue
            )
          )
        );
    setCurrFilDate(filteredData);
  }

  // FILTER
  const [filterValue, setFilterValue] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  function filterPosts(filter) {
    setFilterValue(filter);
    let filDate = [];
    filter === "All"
      ? (filDate = data)
      : (filDate = data.filter((i) =>
          i.data?.value?.mapValue?.fields?.technologies?.stringValue.includes(
            filter
          )
            ? true
            : false
        ));
    setFilteredData(filDate);
    setCurrFilDate(filDate);
    setSortValue("");
  }

  // SEARCH
  const [searchValue, setSearchValue] = useState("");
  const [currFilDate, setCurrFilDate] = useState([]);
  function searchPosts(search = "") {
    setFilteredData(currFilDate);
    setSearchValue(search);
    setSortValue("");
    let filDate = [];
    search === ""
      ? (filDate = currFilDate)
      : (filDate = currFilDate.filter((i) =>
          i.data?.value?.mapValue?.fields?.title?.stringValue
            .toLowerCase()
            .includes(search.toLowerCase())
            ? true
            : false
        ));
    setFilteredData(filDate);
  }

  useEffect(() => {
    getAllLikes();
    getData(true);
  }, []);

  useEffect(() => {
    if (setDevEditMode) setCheckedDataWatcher([]);
  }, [devEditMode]);
  //   ===============================================================================================================================

  return (
    <StyledPortfolioPosts>
      {/* BACK TO HOME NAVBAR */}
      <nav className="navbar">
        <ul>
          <li onClick={() => navigate("..")}>
            <i className="fa-solid fa-arrow-left-long"></i>
            <p>Back to Home</p>
          </li>
        </ul>
      </nav>

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
          <div className="post-actions">
            {/* SORT */}
            <MySelect
              options={[
                { value: "title", name: "title" },
                { value: "technologies", name: "technologies" },
                { value: "likeUp", name: "popular Up" },
                { value: "likeDown", name: "popular Down" },
              ]}
              defaultValue="sort by"
              value={sortValue}
              onChange={sortPosts}
            />
            {/* FILTER */}
            <MySelect
              options={[
                { value: "All", name: "All" },
                { value: "HTML 5", name: "HTML 5" },
                { value: "CSS 3", name: "CSS 3" },
                { value: "SASS", name: "Sass" },
                { value: "JavaScript", name: "JavaScript" },
                { value: "React", name: "React" },
                { value: "Astro", name: "Astro" },
                { value: "Firebase", name: "Firebase" },
                { value: "Bootstrap", name: "Bootstrap" },
                { value: "Tailwind", name: "Tailwind" },
                { value: "Material UI", name: "Material UI" },
              ]}
              defaultValue="filter by"
              value={filterValue}
              onChange={filterPosts}
            />
            <MyInput
              placeholder="Search posts by title..."
              value={searchValue}
              onChange={searchPosts}
            />
          </div>
          <main className="my-portfolios">
            {logging ? <LoginAlert /> : null}
            {filteredData.length === 0 ? (
              <h1
                style={{
                  fontSize: "22px",
                  textAlign: "center",
                  lineHeight: "44px",
                  marginTop: "20px",
                }}
              >
                Portolio not found !
              </h1>
            ) : (
              filteredData?.map((i) => {
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
                          <span
                            id={
                              i?.data?.value?.mapValue?.fields?.id?.stringValue
                            }
                          >
                            {
                              i?.data?.value?.mapValue?.fields?.like
                                ?.integerValue
                            }
                          </span>
                          <i
                            id={
                              i?.data?.value?.mapValue?.fields?.id?.stringValue
                            }
                            onClick={(e) => {
                              if (!disblLike) {
                                if (!likeLoading) {
                                  isAuth
                                    ? clickForLike(
                                        i?.data?.value?.mapValue?.fields?.id
                                          ?.stringValue,
                                        e
                                      )
                                    : setLogging(true);
                                }
                              }
                            }}
                            className={
                              (curUserAllLikes.includes(
                                i?.data?.value?.mapValue?.fields?.id
                                  ?.stringValue
                              )
                                ? "fa-solid"
                                : "fa-regular") + " icon icon-like fa-thumbs-up"
                            }
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
      <MainFooter />
    </StyledPortfolioPosts>
  );
}

const StyledPortfolioPosts = styled.div`
  background-color: #ececec;

  nav {
    ul {
      li {
        cursor: pointer;
        margin-top: 116px;
        color: #000;
        list-style: none;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 10px;

        p,
        i {
          margin: 0;
          font-size: 1.3rem;
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

  .portfolio__wrapper {
    padding: 40px 0px 100px;

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

      .post-actions {
        margin-top: 20px;
        padding: 12px 18px;
        display: flex;
        align-items: flex-start;
        justify-content: space-around;
        gap: 30px;
        row-gap: 20px;
        flex-wrap: wrap;
      }

      .my-portfolios {
        margin-top: 30px;
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
                transition: 0.3s ease-in-out;

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
