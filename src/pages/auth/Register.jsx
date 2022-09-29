import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import styled from "styled-components";

// Firebase
import { addDoc, collection } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../firebase";
import { v4 } from "uuid";

// Context
import { MyContext } from "../../context/Context";

export default function Login() {
  const { setIsAuth } = useContext(MyContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  async function RegisterAuth(data) {
    // setError(false);
    // setLoading(true);
    // let currUser = null;
    // try {
    //   await signInWithEmailAndPassword(auth, data.email, data.password).then(
    //     (userCredential) => {
    //       currUser = userCredential.user;
    //     }
    //   );
    //   setError(false);
    //   setUser(currUser);
    //   setIsAuth(true);
    //   localStorage.setItem("$ISAUTH$", "true");
    //   localStorage.setItem("$T$O$K$E$N$", currUser?.accessToken);
    //   navigate("home");
    // } catch (error) {
    //   console.log(error);
    //   setError(true);
    // } finally {
    //   setLoading(false);
    // }
  }

  async function registerUser({ email, password }) {
    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setUser(user);
        setIsAuth(true);
        localStorage.setItem("$U$I$D$", user?.uid);
        localStorage.setItem("$ISAUTH$", "true");
        localStorage.setItem("$T$O$K$E$N$", user?.accessToken);
        addUserDb(email, password, user?.uid);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async function addUserDb(email, password, uid) {
    try {
      await addDoc(collection(db, "users"), {
        email,
        password,
        liked: "",
        id: v4(),
        uid,
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <StyledLogin>
      <Link to="home">
        <button type="button" className="btn btn-primary btn-block mb-4">
          Back to Home
        </button>
      </Link>

      <form onSubmit={handleSubmit(registerUser)}>
        <h1>Register</h1>
        <div className="form-outline mb-4">
          <input
            type="email"
            id="form2Example1"
            className={(error ? "myError " : "") + "form-control"}
            {...register("email", { required: true })}
          />
          <label className="form-label" htmlFor="form2Example1">
            Email address
          </label>
        </div>

        <div className="form-outline mb-2">
          <input
            type="password"
            id="form2Example2"
            className={(error ? "myError " : "") + "form-control"}
            {...register("password", { required: true })}
          />
          <label className="form-label" htmlFor="form2Example2">
            Password
          </label>
        </div>

        <button type="submit" className="btn btn-primary btn-block mb-4 mt-3">
          Register
          {error ? (
            <span className="error">Email yoki Parol noto'g'ri !</span>
          ) : null}
        </button>

        <div className="text-center">
          <p>
            Registered? <Link to="/login">Login</Link>
          </p>
        </div>
      </form>
    </StyledLogin>
  );
}

const StyledLogin = styled.div`
  padding-top: 50px;

  a {
    :focus {
      outline: none;
    }
  }

  form {
    width: 400px;
    margin: 0 auto;
    margin-top: 45px;

    h1 {
      margin-bottom: 32px;
      text-align: center;
      font-weight: 800;
      font-size: 2rem;
      color: #1b1b1b;
    }

    .btn-primary {
      position: relative;
      width: 90%;
      margin: 0px 5%;
    }

    input {
      &.myError {
        border: 1px solid red;
      }
    }

    .error {
      position: absolute;
      left: 50%;
      bottom: -22px;
      transform: translateX(-50%);
      font-size: 12px;
      color: red;
    }
  }

  @media (max-width: 424px) {
    form {
      width: 300px;
    }
  }
`;
