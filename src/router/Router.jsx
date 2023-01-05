import { useContext, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// Firebase
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

// Layouts
import MainLayout from "../layouts/mainLayout/MainLayout";

// Pages
import Login from "../pages/auth/Login";
import Home from "../pages/main/home/Home";
import Register from "../pages/auth/Register";
import AdminPage from "../pages/admin/AdminPage";
import PortfolioPosts from "../pages/main/portfolioPosts/PortfolioPosts";

// Context
import { MyContext } from "../context/Context";

export default function Router() {
  const { isAuth, isAdmin, setIsAdmin } = useContext(MyContext);

  async function getAdminsData() {
    const token = localStorage.getItem("$T$O$K$E$N$");
    const querySnapshot = await getDocs(collection(db, "admin"));
    querySnapshot.forEach((doc) => {
      if (
        doc?._firestore?._authCredentials?.auth?.auth?.currentUser
          ?.accessToken === token
      ) {
        if (
          doc?._firestore?._authCredentials?.auth?.auth?.currentUser?.uid ===
          doc?.id
        ) {
          setIsAdmin(true);
        }
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
        <Route path="portfolio-posts" element={<PortfolioPosts />} />
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
