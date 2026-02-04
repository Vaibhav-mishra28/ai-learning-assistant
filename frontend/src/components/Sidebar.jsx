import React from "react";
import { NavLink } from "react-router-dom";
import { ClipboardList, FileText, History, MessageCircle, Target } from "lucide-react";

const Sidebar = () => {
  const menuItems = [
    { label: "Dashboard", path: "/dashboard", icon: <ClipboardList size={20}/> },
    { label: "Summarize and quiz", path: "/document", icon: <FileText size={20}/> },
    { label: "Quiz History", path: "/quiz", icon: <History size={20}/> },
    { label: "My Explains", path: "/explains", icon: <MessageCircle size={20}/> },
    { label: "Focus Tracker", path: "/focus-tracker", icon: <Target size={20}/> },
  ];

  return (
    <div className="h-full bg-[#F5ECDC] border-r border-black/20">

      <div className="flex flex-col gap-2 p-3">

        {menuItems.map((item, i) => (
          <NavLink
            key={i}
            to={item.path}
            className={({ isActive }) =>
              `
              flex items-center gap-3 p-3 rounded-lg cursor-pointer transition

              ${isActive 
                ? "bg-[#E2A16F] text-white shadow-md" 
                : "bg-[#FDF5EA] text-[#4b3b1c]"
              }

              hover:bg-[#E2A16F] hover:text-white

              `
            }
          >
            {/* ICON visible on all screens */}
            <span>{item.icon}</span>

            {/* TEXT visible only on larger screens */}
            <span className="font-medium hidden md:block">
              {item.label}
            </span>

          </NavLink>
        ))}
      </div>

    </div>
  );
};

export default Sidebar;
