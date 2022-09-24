import { collection, getDocs } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { MyContext } from "../context/Context";
import { db } from "../firebase";

// Layouts
import MainLayout from "../layouts/mainLayout/MainLayout";

//
import Home from "../main/home/Home";
import AdminPage from "../pages/admin/AdminPage";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

export default function Router() {
  const { isAuth, isAdmin, setIsAdmin } = useContext(MyContext);

  async function getAdminsData() {
    const token = localStorage.getItem("$T$O$K$E$N$");
    const querySnapshot = await getDocs(collection(db, "admin"));
    querySnapshot.forEach((doc) => {
      if (
        doc._firestore._authCredentials.auth.auth.currentUser.accessToken ===
        token
      ) {
        setIsAdmin(true);
      }
    });
  }

  useEffect(() => {
    getAdminsData();
  }, [isAuth]);

  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="home" element={<Home />} />
        {isAdmin ? <Route path="adminPage" element={<AdminPage />} /> : null}
        <Route path="*" element={<Navigate to={"/home"} />} />
      </Route>

      {!isAuth ? (
        <Route>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
      ) : null}
    </Routes>
  );
}
