import React, { useState, useEffect } from "react";
import darkPng from "../../assets/website/dark-mode-button.png";
import lightPng from "../../assets/website/light-mode-button.png";

const DarkMode = () => {
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "light"
  );
  const element = document.documentElement;

  useEffect(() => {
    if (theme === "dark") {
      element.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      element.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [theme]);

  return (
    <div className="relative">
      <img
        src={lightPng}
        alt="light mode"
        onClick={() => setTheme((theme) => (theme === "dark" ? "light" : "dark"))}
        style={{
          width: "3rem",
          cursor: "pointer",
          position: "absolute",
          top: 0,
          right: 0,
          zIndex: 10,
          opacity: theme === "dark" ? 0 : 1,
          transition: "opacity 300ms ease",
          boxShadow: "1px 1px 1px rgba(0, 0, 0, 0.1)"
        }}
      />
      <img
        src={darkPng}
        alt="dark mode"
        onClick={() => setTheme((theme) => (theme === "dark" ? "light" : "dark"))}
        style={{
          width: "3rem",
          cursor: "pointer",
          transition: "transform 300ms ease",
          transform: theme === "dark" ? "scale(1.2)" : "scale(1)",
          boxShadow: "1px 1px 2px rgba(0, 0, 0, 0.5)"
        }}
      />
    </div>
  );
};

export default DarkMode;
