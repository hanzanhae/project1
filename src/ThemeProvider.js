import React, { createContext, useState, useContext } from "react";

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  const [isBlackAndWhite, setIsBlackAndWhite] = useState(false);

  const toggleTheme = () => {
    setIsBlackAndWhite((prevTheme) => !prevTheme);
  };

  return <ThemeContext.Provider value={{ isBlackAndWhite, toggleTheme }}>{children}</ThemeContext.Provider>;
};
