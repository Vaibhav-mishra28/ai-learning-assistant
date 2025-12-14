/** @format */

import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import StatsGrid from "../components/statsGrid";
import Revision from "../components/Revision";
import Continue from "../components/Continue";

const Dashboard = () => {
  const [darkMode, setDarkMode] = useState(true);

  return (
    <div className="w-full min-h-screen bg-[#EBDCCB]">
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />

      {/* Dashboard Body */}
      <div className="flex w-full h-[calc(100vh-110px)] pt-[110px]">
        {/* Sidebar */}
        <div className="w-[20%] min-w-[60px] md:min-w-[220px]">
          <Sidebar />
        </div>

        {/* MAIN CONTENT */}
        <div className="flex-1 p-6 overflow-auto">
          {/* UPLOAD BAR */}
          <div className="w-full bg-[#E2A16F] text-white font-semibold text-lg rounded-xl p-4 shadow-md flex justify-between items-center mb-6">
            <label className="cursor-pointer bg-white text-[#E2A16F] px-4 py-2 rounded-lg font-medium hover:scale-[1.03] transition shadow-md">
              Select File
              <input type="file" className="hidden" />
            </label>
            <button className="bg-white text-[#E2A16F] px-4 py-1 rounded-lg font-medium hover:scale-105 transition">
              Browse
            </button>
          </div>

          {/* GRID SECTION */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-5">
            {/* 1. Statistics */}
            <div className="bg-[#FDF5EA] rounded-xl p-5 shadow-md">
              <h2 className="text-xl font-semibold text-[#4b3b1c] mb-3">
                📊 Statistics
              </h2>
              <p className="text-[#4b3b1c] opacity-80">
                Track your progress and learning activity.
                <StatsGrid />
              </p>
            </div>

            {/* 2. Recommended Revision */}
            <div className="bg-[#FDF5EA] rounded-xl p-5 shadow-md">
              <h2 className="text-xl font-semibold text-[#4b3b1c] mb-3">
                🧠 Recommended Revision
              </h2>
              <p className="text-[#4b3b1c] opacity-80">
                Review topics where you need improvement.
                <Revision />
              </p>
            </div>

            {/* 3. New Feature Highlight */}
            <div className="bg-[#FDF5EA] rounded-xl p-5 shadow-md">
              <h2 className="text-xl font-semibold text-[#4b3b1c] mb-3">
                🚀 New Features
              </h2>
              <p className="text-[#4b3b1c] opacity-80">
                Explore latest enhancements in your AI learning assistant.
              </p>
            </div>

            {/* 4. Continue Learning / Prompt Box */}
            <div className="bg-[#FDF5EA] rounded-xl p-5 shadow-md">
              <h2 className="text-xl font-semibold text-[#4b3b1c] mb-3">
                📘 Continue Learning
              </h2>
              <p className="text-[#4b3b1c] opacity-80">
                Pick up where you left off and study smarter.
                <Continue />
              </p>

              <button className="mt-3 bg-[#E2A16F] text-white px-4 py-2 rounded-lg hover:scale-105 shadow-md transition">
                Continue
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
