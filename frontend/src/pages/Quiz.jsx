import React, { useState } from "react";
import Navbar from "../components/Navbar.jsx";

const Quiz = () => {
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [darkMode, setDarkMode] = useState(true);

  const quizzes = [
    {
      id: 1,
      title: "Normalization Levels",
      date: "Jan 29, 2025",
      score: "7 / 10",
      summary: "You understood 1NF, 2NF well but struggled with 3NF.",
    },
    {
      id: 2,
      title: "Binary Search Concepts",
      date: "Jan 27, 2025",
      score: "9 / 10",
      summary: "You mastered binary search steps but got edge cases slightly wrong.",
    },
    {
      id: 3,
      title: "OOPS Polymorphism",
      date: "Jan 26, 2025",
      score: "6 / 10",
      summary: "Confusion between overriding and overloading.",
    },
    {
      id: 4,
      title: "Deadlock Detection",
      date: "Jan 23, 2025",
      score: "8 / 10",
      summary: "Strong logic, minor confusion in banker’s algorithm.",
    },
  ];

  return (
    <div className="w-full min-h-screen pt-[110px] bg-[#EBDCCB] p-6">
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
      <h1 className="text-3xl font-bold text-[#4b3b1c] mb-6">
        🧪 Quiz History
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

        {quizzes.map((quiz) => (
          <div
            key={quiz.id}
            onClick={() => setSelectedQuiz(quiz)}
            className="cursor-pointer bg-[#FDF5EA] rounded-xl p-5 shadow hover:scale-[1.02] hover:shadow-lg transition flex flex-col justify-between"
          >
            <h2 className="text-xl font-semibold text-[#4b3b1c]">{quiz.title}</h2>
            <p className="text-sm text-[#4b3b1c] opacity-70 mt-1">Date: {quiz.date}</p>

            <p className="mt-4 text-[#E2A16F] font-semibold text-lg">
              Score: {quiz.score}
            </p>

            <button className="mt-4 bg-[#E2A16F] text-white px-3 py-1 rounded-lg hover:scale-[1.03] transition">
              View Details
            </button>
          </div>
        ))}

      </div>

      {/* POPUP WINDOW */}
      {selectedQuiz && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-40">
          <div className="bg-white w-[92%] max-w-[600px] rounded-xl p-6 shadow-lg">

            <h2 className="text-2xl font-semibold text-[#4b3b1c]">{selectedQuiz.title}</h2>
            <p className="text-sm text-[#4b3b1c] opacity-70 mt-1">{selectedQuiz.date}</p>

            <p className="text-lg font-semibold text-[#E2A16F] mt-4">
              Score: {selectedQuiz.score}
            </p>

            <h3 className="text-lg font-semibold mt-4 text-[#4b3b1c]">📝 Summary:</h3>
            <p className="text-[#4b3b1c] opacity-80 mt-1">{selectedQuiz.summary}</p>

            <div className="flex justify-end gap-3 mt-6">

              <button 
                onClick={() => setSelectedQuiz(null)}
                className="bg-gray-400 text-white px-4 py-1 rounded-lg hover:scale-105 transition"
              >
                Close
              </button>

              <button className="bg-[#E2A16F] text-white px-4 py-1 rounded-lg hover:scale-105 transition">
                Reattempt Quiz
              </button>

              <button className="bg-[#4b3b1c] text-white px-4 py-1 rounded-lg hover:scale-105 transition">
                Create Summary
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};

export default Quiz;
