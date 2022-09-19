import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// Layouts
import MainLayout from "../layouts/mainLayout/MainLayout";

//
import Home from "../main/home/Home";
import AdminPage from "../pages/admin/AdminPage";

export default function Router() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="main" element={<Home />} />
        <Route path="adminPage" element={<AdminPage />} />
      </Route>
      <Route path="*" element={<Navigate to={"/main"} />} />
    </Routes>
  );
}
