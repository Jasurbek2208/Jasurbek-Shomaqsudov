import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../firebase";

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  async function LoginAuth(data) {
    setError(false);
    setLoading(true);
    let currUser = null;

    try {
      await signInWithEmailAndPassword(auth, data.email, data.password).then(
        (userCredential) => {
          currUser = userCredential.user;
        }
      );
      setError(false);
      setUser(currUser);
      localStorage.setItem("$ISAUTH$", "true");
      localStorage.setItem("$T$O$K$E$N$", currUser?.accessToken);
      navigate("home");
    } catch (error) {
      console.log(error);
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <StyledLogin>
      <Link to="home">
        <button type="button" className="btn btn-primary btn-block mb-4">
          Back to Home
        </button>
      </Link>

      <form onSubmit={handleSubmit(LoginAuth)}>
        <h1>Login</h1>
        <div className="form-outline mb-4">
          <input
            type="email"
            id="form2Example1"
            className={(error ? "myError " : "") + "form-control"}
            {...register("email", { required: true })}
          />
          <label className="form-label">Email address</label>
        </div>

        <div className="form-outline mb-2">
          <input
            type="password"
            id="form2Example2"
            className={(error ? "myError " : "") + "form-control"}
            {...register("password", { required: true })}
          />
          <label className="form-label">Password</label>
        </div>

        <div class="form-check mb-4">
          <input
            class="form-check-input"
            type="checkbox"
            value=""
            id="form2Example31"
          />
          <label class="form-check-label" for="form2Example31">
            Remember me
          </label>
        </div>

        <button type="submit" className="btn btn-primary btn-block mb-4">
          Login
          {error ? (
            <span className="error">Login yoki Parol noto'g'ri !</span>
          ) : null}
        </button>

        <div className="text-center">
          <p>
            Not a member? <Link to="/register">Register</Link>
          </p>
        </div>
      </form>
    </StyledLogin>
  );
}

const StyledLogin = styled.div`
  padding-top: 50px;

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
