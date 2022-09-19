import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// Layouts
import MainLayout from "../layouts/mainLayout/MainLayout";

//
import Home from "../main/home/Home";
import AdminPage from "../pages/admin/AdminPage";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

export default function Router() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="home" element={<Home />} />
        <Route path="adminPage" element={<AdminPage />} />
        <Route path="*" element={<Navigate to={"/home"} />} />
      </Route>

      <Route>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>
    </Routes>
  );
}
