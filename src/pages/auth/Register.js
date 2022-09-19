import React from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import styled from "styled-components";
import { Link } from "react-router-dom";

// async function LoginAuth() {
//   const auth = getAuth();
//   signInWithEmailAndPassword(auth, email, password)
//     .then((userCredential) => {
//       const user = userCredential.user;
//     })
//     .catch((error) => {
//       console.log(error);
//     });
// }

export default function Register() {
  return (
    <StyledLogin>
      <Link to="home">
        <button type="button" className="btn btn-primary btn-block mb-4">
          Back to Home
        </button>
      </Link>

      <form>
        <h1>Register</h1>
        <div className="form-outline mb-4">
          <input type="email" id="form2Example1" className="form-control" />
          <label className="form-label" for="form2Example1">
            Email address
          </label>
        </div>

        <div className="form-outline mb-4">
          <input type="password" id="form2Example2" className="form-control" />
          <label className="form-label" for="form2Example2">
            Password
          </label>
        </div>

        <button type="button" className="btn btn-primary btn-block mb-4">
          Register
        </button>

        <div className="text-center">
          <p>
            Registered? <Link to="/login">Login</Link>
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
      width: 90%;
      margin: 0px 5%;
    }
  }
`;
