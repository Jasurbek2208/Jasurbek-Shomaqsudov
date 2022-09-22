import React, { createContext, useState } from "react";

export const MyContext = createContext();

export default function Context({ children }) {
  const [isAuth, setIsAuth] = useState(
    JSON.parse(localStorage.getItem("$ISAUTH$") || "false")
  );
  const [devMode, setDevMode] = useState(false);
  const [devEditMode, setDevEditMode] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  return (
    <MyContext.Provider
      value={{
        devMode,
        setDevMode,
        devEditMode,
        setDevEditMode,
        isAuth,
        setIsAuth,
        isAdmin,
        setIsAdmin,
      }}
    >
      {children}
    </MyContext.Provider>
  );
}
