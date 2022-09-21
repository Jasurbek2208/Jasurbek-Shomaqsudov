import React, { createContext, useState } from "react";

export const MyContext = createContext();

export default function Context({ children }) {
  const [devMode, setDevMode] = useState(false);
  const [devEditMode, setDevEditMode] = useState(false);

  return (
    <MyContext.Provider
      value={{
        devMode,
        setDevMode,
        devEditMode,
        setDevEditMode,
      }}
    >
      {children}
    </MyContext.Provider>
  );
}
