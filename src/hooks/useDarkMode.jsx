import { useState, useEffect } from "react";

const useDarkMode = () => {
  const [isDarkMode, setIsDarkMode] = useState(
    // Get the current theme from local storage
    () => localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    isDarkMode && document.querySelector("html").classList.add("dark");
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(() => !isDarkMode);
    document.querySelector("html").classList.toggle("dark");
    localStorage.setItem("theme", isDarkMode ? "light" : "dark");
  };

  return { isDarkMode, toggleDarkMode };
};

export default useDarkMode;
