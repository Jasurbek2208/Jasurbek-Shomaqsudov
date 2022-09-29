import React from "react";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";

//
import GlobalStyle from "./assets/style/Global";
import "bootstrap/dist/css/bootstrap.css";

//
import Router from "./router/Router";
import Context from "./context/Context";

export default function App() {
  return (
    <Context>
        <ToastContainer />
        <BrowserRouter>
          <GlobalStyle />
          <Router />
        </BrowserRouter>
      </Context>
  );
}
