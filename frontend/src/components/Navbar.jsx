import React from "react";
import { Moon, Sun, User, HelpCircle } from "lucide-react";

const Navbar = ({ darkMode, setDarkMode }) => {
  return (
    <div className="floating-full-navbar">

      <h2 className="brand-name">SmartStudy AI</h2>

      <div className="navbar-icons">
        <button className="nav-btn">
          <User size={22} />
        </button>

        <button className="nav-btn" onClick={() => setDarkMode(!darkMode)}>
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
