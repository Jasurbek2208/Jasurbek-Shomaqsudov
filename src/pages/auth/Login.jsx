import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { signInWithEmailAndPassword } from "firebase/auth";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import { MyContext } from "../../context/Context";
import { toast } from "react-toastify";

export default function Login() {
  const { setIsAuth, setLogging } = useContext(MyContext);
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
      setUser(currUser);
      setIsAuth(true);
      localStorage.setItem("$U$I$D$", currUser?.uid);
      localStorage.setItem("$ISAUTH$", "true");
      localStorage.setItem("$T$O$K$E$N$", currUser?.accessToken);
      navigate("home");
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
      setLogging(false);
    }
  }

  return (
    <StyledLogin>
      <Link to="/home">
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
            onChange={() => setError(false)}
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
            onChange={() => setError(false)}
          />
          <label className="form-label" htmlFor="form2Example2">
            Password
          </label>
        </div>

        <button
          type="submit"
          className={
            (loading ? "disabled " : "") +
            "btn btn-primary btn-block mb-4 mt-3 py-2"
          }
        >
          Login
          {error ? (
            <span className="error" b>
              Login yoki Parol noto'g'ri !
            </span>
          ) : null}
        </button>

        <div className="text-center mt-3">
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
      bottom: -28px;
      transform: translateX(-50%);
      font-size: 13px;
      width: max-content;
      color: red;
    }
  }

  @media (max-width: 424px) {
    form {
      width: 300px;
    }
  }
`;
