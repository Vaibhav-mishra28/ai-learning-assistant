/** @format */

import React from "react";

const Revision = () => {
  return (
    <div>
      {/* 2. Recommended Revision */}
      <div className="bg-[#FDF5EA] rounded-xl p-5 shadow-md">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            {
              topic: "DSA – Arrays",
              last: "2 days ago",
              issue: "Low confidence",
            },
            {
              topic: "Java – OOP Concepts",
              last: "1 day ago",
              issue: "You made 3 mistakes",
            },
            {
              topic: "DBMS – Normalization",
              last: "3 days ago",
              issue: "Forgot key rules",
            },
            {
              topic: "Compiler Design – Lexical",
              last: "5 days ago",
              issue: "You revisited 60% only",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-white rounded-lg p-4 shadow flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-semibold text-[#4b3b1c]">
                  {item.topic}
                </h3>
                <p className="text-sm text-[#4b3b1c] opacity-80">
                  Last Studied: {item.last}
                </p>
                <p className="text-sm text-[#4b3b1c] opacity-80">
                  Reason: {item.issue}
                </p>
              </div>

              <button className="mt-3 bg-[#E2A16F] text-white px-3 py-1 rounded-lg hover:scale-[1.04] shadow-md transition">
                Revise Now
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Revision;
