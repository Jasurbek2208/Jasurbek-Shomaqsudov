import React, { useContext, useEffect, useState } from "react";
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
import Glass from "../../../components/Glass/Glass";
import Button from "../../../components/button/Button";
import MyInput from "../../../components/input/MyInput";
import MySelect from "../../../components/select/MySelect";
import MainFooter from "../../../components/mainFooter/MainFooter";
import LoginAlert from "../../../components/loginAlert/LoginAlert";

// Context
import { MyContext } from "../../../context/Context";

// Resume
import myRezume from "../../../assets/pdf/ShomaqsudovJasurbekResume.pdf";

export default function Home() {
  const {
    isAuth,
    devMode,
    devEditMode,
    setDevEditMode,
    currentLang,
    logging,
    setLogging,
  } = useContext(MyContext);
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

  // Download Rezume
  function downloadRezume(e) {
    fetch(myRezume).then((response) => {
      response.blob().then((blob) => {
        const fileURL = window.URL.createObjectURL(blob);
        let alink = document.createElement("a");
        alink.href = fileURL;
        alink.download = "ShomaqsudovJasurbekResume";
        alink.click();
      });
    });
  }

  useEffect(() => {
    getAllLikes();
    getData(true);
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
              <h1 id="title">
                {currentLang === "Uz"
                  ? "Shomaqsudov Jasurbek"
                  : currentLang === "Ru"
                  ? "Шомаксудов Жасурбек"
                  : "Shomaksudov Jasurbek"}
              </h1>
              <h3>
                {currentLang === "Uz"
                  ? "Front-End Dasturchi"
                  : currentLang === "Ru"
                  ? "Front-End Разработчик"
                  : "Front-End Developer"}
              </h3>
              <p>
                {currentLang === "Uz"
                  ? `
                  Mening ismim Jasurbek va men Frontend Dasturchiman. Men
                  ishimni endigina boshladim va hozirda tajriba orttiryapman. Nega
                  meni tanlashingiz kerak? Ushbu saytni ko'rib chiqib, shu savolga javob olishingiz mumkin.`
                  : currentLang === "Ru"
                  ? `Меня зовут Жасурбек и Я Front-End Разработчик. Я только начал
                  свою работу и в настоящее время набираюсь опыта. Почему вы
                  должны выбрать Меня? Подробнее об этом вы узнаете, прочитав
                  информацию на этом сайте.`
                  : `My name is Jasurbek. And I'm The Front-End Developer. I have
                  just started my job and am currently gaining experience. Why
                  should you choose Me? You will learn more about this by reading
                  the information on this site.`}
              </p>
              <div className="buttons__wrapper">
                <Button
                  type="button"
                  content={
                    currentLang === "Uz"
                      ? "Men haqimda"
                      : currentLang === "Ru"
                      ? "обо мне"
                      : "About Me"
                  }
                  link="#aboutMe"
                />
                <Button
                  type="button"
                  content={currentLang === "Ru" ? "Портфолио" : "Portfolio"}
                  link="#myPortfolio"
                  portfolio={true}
                />
                <Button
                  type="button"
                  content={
                    currentLang === "Uz"
                      ? "Men bilan bog'lanish"
                      : currentLang === "Ru"
                      ? "Связаться со мной"
                      : "Contact Me"
                  }
                  link="#contactMe"
                />
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
          <h1>
            {currentLang === "Uz"
              ? "Men haqimda"
              : currentLang === "Ru"
              ? "обо мне"
              : "About Me"}
          </h1>
          <div className="aboutMe-blok">
            <p>
              {currentLang === "En"
                ? `My name is Shomaksudov Jasurbek and I was born on August 22, 2004
              in Tashkent. I am a Front-End developer. I entered this field
              because of my own interests. In this field, I studied at the
              school "Registon IT" in Tashkent and completed 2 months of
              internship. My main goal these days is to increase my experience
              and become a strong developer.`
                : currentLang === "Ru"
                ? `Меня зовут Шомаксудов Жасурбек, я родился 22 августа 2004 года в
                Ташкенте. Я Front-End разработчик. Я пришел в эту сферу из-за моих
                собственных интересов. По этому направлению я учился в школе
                «Registon IT» в Ташкенте и прошел 2-х месячную стажировку. Моя
                главная цель в эти дни — увеличить свой опыт и стать сильным
                разработчиком.`
                : `Mening ismim Shomaqsudov Jasurbek va men 2004-yilning 22-Avgust
                kuni Toshkent shahrida tug'ilganman. Men Front-End dasturchiman.
                Men bu sohaga o'z qiziqishlarim sabab kirib kelganman. Bu sohada
                Toshkent shahridagi "Registon IT" nomli maktabda o'qib 2Oy
                amaliyot o'taganman. Hozirgi kundagi asosiy maqsadim o'z
                tajribamni oshirish va kuchli dasturchi bo'lish.`}
            </p>
          </div>

          {/* Download Rezume */}
          <div className="rezume-wrapper">
            <Button
              type="button"
              content={
                currentLang === "Uz"
                  ? "Rezumeni Yuklash"
                  : currentLang === "Ru"
                  ? "Скачать Резуме"
                  : "Download Rezume"
              }
              onClick={downloadRezume}
              className="download-rezume"
            />
          </div>
        </div>
      </section>

      {/* SKILLS SECTION */}
      <section className="skills__wrapper" id="my-skills">
        <div className="container">
          <h1>
            {currentLang === "Uz"
              ? "Ko'nikmalar"
              : currentLang === "Ru"
              ? "Навыки"
              : "Skills"}
          </h1>
          <div className="skills-blok">
            <div className="left">
              <p>HTML</p>
              <p>CSS</p>
              <p>Sass</p>
              <p>Bootstrap</p>
              <p>Material UI</p>
            </div>
            <div className="right">
              <p>JavaScript</p>
              <p>TypeScript</p>
              <p>React</p>
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
                { value: "Firebase", name: "Firebase" },
                { value: "Bootstrap", name: "Bootstrap" },
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
    padding: 130px 0 100px;
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
        background-color: #fff0;
        transition: background-color 1s, border-color 500ms, box-shadow 500ms;

        &:hover {
          border: 1px solid #fff0;
          background-color: #fff;
          box-shadow: 6px 6px 10px 2px #9c9c9cc8;
        }

        p {
          font-family: "Poppins";
          line-height: 27px;
        }
      }

      .rezume-wrapper {
        margin-top: 80px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }

  /* SKILLS WRAPPER */
  .skills__wrapper {
    padding: 0px;
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
            transition: 0.4s;

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
