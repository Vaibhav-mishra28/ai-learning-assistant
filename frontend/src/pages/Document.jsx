import React, { useState } from "react";
import Navbar from "../components/Navbar.jsx";

const Document = () => {

  const [selectedDoc, setSelectedDoc] = useState(null);
   const [darkMode, setDarkMode] = useState(true);

  const documents = [
    {
      id: 1,
      title: "Binary Search Basics",
      uploaded: "2 days ago",
      summary: "Binary search reduces search space by half...",
      quiz: [
        "What is the time complexity of Binary Search?",
        "Can binary search work on unsorted arrays?"
      ]
    },
    {
      id: 2,
      title: "Normalization DBMS",
      uploaded: "5 days ago",
      summary: "Normalization reduces redundancy and ensures data integrity...",
      quiz: [
        "What is BCNF?",
        "What is dependency preservation?"
      ]
    },
    {
      id: 3,
      title: "OOPs Concepts in Java",
      uploaded: "1 week ago",
      summary: "Encapsulation, Abstraction, Polymorphism, Inheritance...",
      quiz: [
        "What is polymorphism?",
        "Define abstraction."
      ]
    }
  ];

  return (
    <div className="w-full min-h-screen pt-[110px] bg-[#EBDCCB] p-6">
       <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
      <h1 className="text-3xl font-bold mb-6 text-[#4b3b1c]">📄 My Documents</h1>

      {/* Documents Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

        {documents.map((doc) => (
          <div 
            key={doc.id}
            onClick={() => setSelectedDoc(doc)}
            className="cursor-pointer bg-[#FDF5EA] rounded-xl p-4 shadow hover:scale-[1.02] hover:shadow-lg transition"
          >
            <h2 className="text-xl font-semibold text-[#4b3b1c]">{doc.title}</h2>
            <p className="text-sm text-[#4b3b1c] opacity-70 mt-1">Uploaded: {doc.uploaded}</p>
            
            <button className="mt-4 bg-[#E2A16F] text-white px-3 py-1 rounded-lg hover:scale-[1.03] transition">
              Open Document
            </button>
          </div>
        ))}

      </div>

      {/* Popup Modal */}
      {selectedDoc && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white w-[90%] max-w-[600px] rounded-xl p-6 shadow-lg">

            <h2 className="text-2xl font-semibold text-[#4b3b1c] mb-2">{selectedDoc.title}</h2>
            <p className="text-sm text-[#4b3b1c] opacity-80 mb-4">{selectedDoc.summary}</p>

            <h3 className="text-lg font-semibold text-[#4b3b1c] mb-2">📝 Quiz Preview:</h3>
            <ul className="text-sm text-[#4b3b1c] opacity-90 mb-4 list-disc pl-6">
              {selectedDoc.quiz.map((q, i) => (
                <li key={i}>{q}</li>
              ))}
            </ul>

            <div className="flex justify-end gap-3">
              <button 
                onClick={() => setSelectedDoc(null)}
                className="bg-gray-400 text-white px-4 py-1 rounded-md hover:scale-105 transition"
              >
                Close
              </button>

              <button 
                className="bg-[#E2A16F] text-white px-4 py-1 rounded-md hover:scale-105 transition"
              >
                Start Full Quiz
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Document;
