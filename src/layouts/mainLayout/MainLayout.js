import React from "react";
import { Outlet } from "react-router-dom";

//
import MainNavbar from "../../components/mainNavbar/MainNavbar";
import MainFooter from "../../components/mainFooter/MainFooter";

export default function MainLayout() {
  return (
    <>
      <MainNavbar />
      <Outlet />
      {/* <MainFooter /> */}
    </>
  );
}
