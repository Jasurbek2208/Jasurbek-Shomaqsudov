import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import styled from "styled-components";
import { Link } from "react-router-dom";

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  async function LoginAuth(data) {
    setError(false);
    setLoading(true);
    console.log(data);
    const auth = getAuth();
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password).then(
        (userCredential) => {
          const user = userCredential.user;
          console.log(user);
        }
      );
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
            className="form-control"
            {...register("email", { required: true })}
          />
          <label className="form-label">Email address</label>
        </div>

        <div className="form-outline mb-4">
          <input
            type="password"
            id="form2Example2"
            className="form-control"
            {...register("password", { required: true })}
          />
          <label className="form-label">Password</label>
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
          <p>or sign up with:</p>
          <button type="button" className="btn btn-link btn-floating mx-1">
            <i className="fab fa-google"></i>
          </button>
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
    margin-top: 60px;

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

    .error {
      position: absolute;
      left: 50%;
      bottom: -22px;
      transform: translateX(-50%);
      font-size: 12px;
      color: red;
    }
  }
`;
