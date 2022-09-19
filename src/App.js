import React from "react";
import { BrowserRouter } from "react-router-dom";

//
import GlobalStyle from "./assets/style/Global";
import "bootstrap/dist/css/bootstrap.css"

//
import Router from "./router/Router";

export default function App() {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Router />
    </BrowserRouter>
  );
}
