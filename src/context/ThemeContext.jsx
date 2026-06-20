import { createContext, useState, useContext, useEffect } from "react";

const ThemeContext = createContext();

export const useThemeContext = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const theme = localStorage.getItem("theme");

    return theme ? JSON.parse(theme) : false;
  });

  useEffect(() => {
    localStorage.setItem("theme", JSON.stringify(isDarkMode));
  }, [isDarkMode]);
  useEffect(() => {
    localStorage.setItem("theme", JSON.stringify(isDarkMode));

    // Zarządzanie klasą na tagu <html>
    const html = document.documentElement;
    if (isDarkMode) {
      html.classList.remove("light");
    } else {
      html.classList.add("light");
    }
  }, [isDarkMode]);

  const value = {
    isDarkMode,
    setIsDarkMode,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};
