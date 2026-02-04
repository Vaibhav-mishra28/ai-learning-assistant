import React from "react";
import { Moon, Sun, User, HelpCircle } from "lucide-react";
import { useDarkMode } from "../contexts/DarkModeContext.jsx";

const Navbar = () => {
  const { darkMode, toggleDarkMode } = useDarkMode();

  return (
    <div className={`floating-full-navbar ${darkMode ? 'dark-navbar' : ''}`}>

      <h2 className="brand-name">SmartStudy AI</h2>

      <div className="navbar-icons">
        <button className="nav-btn">
          <User size={22} />
        </button>

        <button className="nav-btn" onClick={toggleDarkMode} title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}>
          {darkMode ? <Sun size={22} /> : <Moon size={22} />}
        </button>

        <button className="nav-btn">
          <HelpCircle size={22} />
        </button>
      </div>

    </div>
  );
};

export default Navbar;
