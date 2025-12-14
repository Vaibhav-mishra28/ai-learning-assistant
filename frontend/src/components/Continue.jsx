/** @format */

import React from "react";

const Continue = () => {
  return (
    <div>
      {/* 4. Continue Learning */}
      <div className="bg-[#FDF5EA] rounded-xl p-5 shadow-md">

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            {
              type: "Document Summary",
              title: "Graphs in DSA",
              snippet: "You were reading summary: BFS vs DFS",
              last: "Last viewed: 1 day ago",
              action: "Open Summary",
            },
            {
              type: "Uploaded Notes",
              title: "Operating System - Deadlocks",
              snippet: "Uploaded notes summary completed 40%",
              last: "Last edited: 3 days ago",
              action: "Continue Learning",
            },
            {
              type: "Quiz Attempt",
              title: "DBMS Normalization Quiz",
              snippet: "You scored 7/10, 3 weak areas",
              last: "Attempted: 5 hours ago",
              action: "View Analysis",
            },
            {
              type: "Generated Revision",
              title: "Compiler Design Notes",
              snippet: "AI generated helpers last session",
              last: "Last access: 4 days ago",
              action: "Resume",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-white rounded-lg p-4 shadow flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-semibold text-[#4b3b1c]">
                  {item.title}
                </h3>
                <p className="text-xs text-[#E2A16F] font-medium mt-1">
                  {item.type}
                </p>
                <p className="text-sm text-[#4b3b1c] opacity-80 mt-2">
                  {item.snippet}
                </p>
                <p className="text-xs text-[#4b3b1c] opacity-70 mt-1">
                  {item.last}
                </p>
              </div>

              <button className="mt-3 bg-[#E2A16F] text-white px-3 py-2 rounded-lg hover:scale-[1.04] shadow-md transition">
                {item.action}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Continue;
