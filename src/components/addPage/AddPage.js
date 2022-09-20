import React, { useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";

// Firebase
import { addDoc, collection } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../firebase";
import { db } from "../../firebase";
import { v4 } from "uuid";

export default function AddPage({ open, setOpen }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [img, setImg] = useState("");
  const [loading, setLoading] = useState(false);
  const [imgLoading, setImgLoading] = useState(false);
  const [error, setError] = useState(false);

  async function setWallpaper(e) {
    setImgLoading(true);
    const file = e.target.files[0];
    const storageRef = ref(storage, "images/" + file.name);

    try {
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImg(downloadURL);
          });
        }
      );
      setError(false);
    } catch {
      setError(true);
    } finally {
      setImgLoading(false);
      console.log(error, img);
    }
  }

  async function onSubmit(data) {
    console.log(data);
    setLoading(true);
    data.img = img;
    data.like = 0;
    data.id = v4();
    data.description = "";

    try {
      await addDoc(collection(db, "portfolio"), data);
    } catch (e) {
      console.error("Error adding document: ", e);
    } finally {
      setLoading(false);
      setOpen(false);
    }
  }

  return (
    <StyledAddPage className={open ? "On" : ""}>
      <div className="container">
        <h1>Add Portfolio</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="form-wrapper">
          <div className="inputs__wrapper">
            <div>
              <p>Project Title</p>
              <input
                className={errors.title ? "On" : ""}
                {...register("title", { required: true })}
                type="text"
                placeholder="title"
              />
              {errors.title && <span>Title yozmadingiz !</span>}
            </div>
            <div>
              <p>Project Technologies</p>
              <input
                className={errors.technologies ? "On" : ""}
                {...register("technologies", { required: true })}
                type="text"
                placeholder="technologies"
              />
              {errors.technologies && <span>Technologies yozilmadi !</span>}
            </div>
            <div>
              <p>Project Link</p>
              <input
                className={errors.link ? "On" : ""}
                {...register("link", { required: true })}
                type="text"
                placeholder="project link"
              />
              {errors.link && <span>Project linki yozilmadi !</span>}
            </div>
            <div>
              <p>Project Image</p>
              <input
                className={errors.img ? "On" : ""}
                {...register("img", { required: true })}
                type="file"
                placeholder="project image"
                onChange={setWallpaper}
              />
              {errors.img && <span>Rasm yuklamadingiz !</span>}
              {error ? (
                <span>Rasm yuklashda xatolik, qayta yuklang !</span>
              ) : null}
            </div>
          </div>
          <div className="buttons__wrapper">
            <button
              disabled={imgLoading}
              type="reset"
              onClick={() => setOpen(false)}
            >
              Close
            </button>
            <button disabled={imgLoading} type="submit">
              Save
            </button>
          </div>
        </form>
        {loading ? (
          <div
            style={{
              position: "fixed",
              top: "0px",
              left: "0px",
              width: "100%",
              height: "100%",
              backgroundColor: "#ccc7",
            }}
          >
            <div
              class="spinner-border"
              role="status"
              style={{
                position: "fixed",
                top: "50%",
                left: "50%",
                scale: "200%",
              }}
            >
              <span class="sr-only"></span>
            </div>
          </div>
        ) : null}
      </div>
    </StyledAddPage>
  );
}

const StyledAddPage = styled.div`
  padding: 145px 0px 0px;
  position: absolute;
  top: -2000px;
  left: 0px;
  width: 100vw;
  height: max-content;
  background-color: #ececec;
  transition: 0.5s;

  &.On {
    top: 0px;
  }

  .container {
    h1 {
      text-align: center;
      font-weight: 800;
      font-size: 2rem;
      color: #1b1b1b;
    }

    .form-wrapper {
      padding: 36px 0px;

      .inputs__wrapper {
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        gap: 50px;

        div {
          position: relative;

          input {
            padding: 10px 14px;
            width: 300px;
            border: none;
            border-radius: 5px;

            &:focus {
              outline: none;
              box-shadow: 8px 6px 8px 2px #ccc;
            }

            &[type="file"] {
              padding: 0px;

              ::-webkit-file-upload-button {
                cursor: pointer;
                padding: 12px 14px;
                width: 300px;
                border: none;
                border-radius: 5px;
                background-color: #0068c4;
                font-weight: 500;
                line-height: 16px;
                font-size: 14px;
                color: #fff;
                box-shadow: 8px 6px 8px 2px #ccc;
              }
            }

            &.On {
              border: 1px solid red;
            }
          }

          span {
            position: absolute;
            left: 0px;
            bottom: -22px;
            font-size: 12px;
            color: red;
          }
        }
      }

      .buttons__wrapper {
        margin-top: 52px;
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        gap: 50px;

        button {
          cursor: pointer;
          padding: 12px 16px;
          width: 300px;
          border: none;
          border-radius: 5px;
          font-weight: 500;
          background-color: #fff;
          transition: 0.3s;

          &:hover {
            box-shadow: 8px 6px 8px 2px #ccc;
          }

          &:focus {
            outline: none;
            box-shadow: 8px 6px 8px 2px #ccc;
          }

          &:active {
            transform: scale(98%);
          }

          &:last-of-type {
            color: #fff;
            background-color: #0068c4;
          }
        }
      }
    }
  }
`;
