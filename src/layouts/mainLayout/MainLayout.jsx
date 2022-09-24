import React from "react";
import { Outlet } from "react-router-dom";

//
import MainNavbar from "../../components/mainNavbar/MainNavbar";

export default function MainLayout() {
  return (
    <>
      <MainNavbar />
      <Outlet />
    </>
  );
}
