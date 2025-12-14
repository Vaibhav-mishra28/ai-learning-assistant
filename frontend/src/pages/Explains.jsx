import React, { useState } from "react";
import Navbar from "../components/Navbar.jsx";

const MyExplains = () => {
  const [selectedExplain, setSelectedExplain] = useState(null);
   const [darkMode, setDarkMode] = useState(true);

  // Dummy Data (Frontend only)
  const explains = [
    {
      id: 1,
      title: "Binary Search Notes Explain",
      type: "Document Explanation",
      updated: "Jan 28, 2025 - 7PM",
      history: [
        { role: "user", text: "Explain Binary Search in simple words." },
        { role: "ai", text: "Binary search splits the search space in half..." },
        { role: "user", text: "Give an example?" },
        { role: "ai", text: "Example: Searching for a number in a sorted array..." },
      ],
    },
    {
      id: 2,
      title: "Normalization Summary",
      type: "AI Summary",
      updated: "Jan 25, 2025 - 3PM",
      history: [
        { role: "user", text: "Summarize DBMS normalization." },
        { role: "ai", text: "Normalization reduces redundancy and improves integrity..." },
      ],
    },
    {
      id: 3,
      title: "OOPS Revision Chat",
      type: "Q&A Explain",
      updated: "Jan 22, 2025 - 5PM",
      history: [
        { role: "user", text: "Difference between overloading and overriding?" },
        { role: "ai", text: "Overloading occurs within same class, overriding across inheritance..." },
      ],
    },
  ];

  return (
    <div className="w-full min-h-screen pt-[110px] bg-[#EBDCCB] p-6">
<Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
      <h1 className="text-3xl font-bold text-[#4b3b1c] mb-6">
        💬 My Explains History
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

        {explains.map((explain) => (
          <div
            key={explain.id}
            onClick={() => setSelectedExplain(explain)}
            className="cursor-pointer bg-[#FDF5EA] rounded-xl p-4 shadow hover:scale-[1.02] hover:shadow-lg transition"
          >
            <h2 className="text-xl font-semibold text-[#4b3b1c]">{explain.title}</h2>
            <p className="text-sm text-[#E2A16F] opacity-90 mt-1">{explain.type}</p>
            <p className="text-sm text-[#4b3b1c] opacity-70 mt-2">{explain.updated}</p>

            <button className="mt-4 bg-[#E2A16F] text-white px-3 py-1 rounded-lg hover:scale-[1.03] transition">
              Open Chat
            </button>
          </div>
        ))}
      </div>

      {/* Popup Chat */}
      {selectedExplain && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white w-[95%] max-w-[750px] max-h-[80vh] rounded-xl p-6 shadow-lg flex flex-col">
            
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-[#4b3b1c]">{selectedExplain.title}</h2>
              <button
                onClick={() => setSelectedExplain(null)}
                className="bg-gray-400 text-white px-3 py-1 rounded-lg hover:scale-105 transition"
              >
                Close
              </button>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto pr-2 space-y-3">
              {selectedExplain.history.map((msg, i) => (
                <div
                  key={i}
                  className={`max-w-[80%] p-3 rounded-md shadow 
                  ${
                    msg.role === "ai"
                      ? "bg-[#E2A16F] text-white self-start"
                      : "bg-[#FDF5EA] text-[#4b3b1c] self-end ml-auto"
                  }`}
                >
                  {msg.text}
                </div>
              ))}
            </div>

            {/* Footer */}
            <p className="text-xs text-[#4b3b1c] opacity-60 mt-3">
              Historical record stored locally on UI (no backend).
            </p>

          </div>
        </div>
      )}

    </div>
  );
};

export default MyExplains;
