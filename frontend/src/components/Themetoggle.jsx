import { useState, useEffect } from "react";
import { FaSun } from "react-icons/fa";
import { IoIosMoon } from "react-icons/io";

const ThemeToggle = () => {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.add(savedTheme);
    } else {
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      if (prefersDark) {
        setTheme("dark");
        document.documentElement.classList.add("dark");
      }
    }
  }, []);

  const toggleTheme = () => {
    if (theme === "light") {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
      setTheme("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.add("light");
      document.documentElement.classList.remove("dark");
      setTheme("light");
      localStorage.setItem("theme", "light");
    }
  };

  return (
    <div className="text-8xl hover:text-[#878787] dark:hover:text-[#fff]">
      {theme === "light" && (
        <IoIosMoon onClick={toggleTheme} className="nav-icon"></IoIosMoon>
      )}
      {theme === "dark" && (
        <FaSun onClick={toggleTheme} className="nav-icon"></FaSun>
      )}
    </div>
  );
};

export default ThemeToggle;
