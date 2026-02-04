/** @format */

import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="w-screen h-screen bg-[#EBDCCB] flex flex-col md:flex-row items-center justify-center text-center md:text-left px-5 md:px-20 gap-10 relative overflow-hidden">

      {/* Decorative Soft Glow Elements */}
      <div className="absolute top-[15%] left-[10%] w-52 h-52 bg-[#E2A16F]/30 rounded-full blur-[120px]" />
      <div className="absolute bottom-[20%] right-[5%] w-60 h-60 bg-[#E2A16F]/40 rounded-full blur-[140px]" />
      <div className="absolute top-[50%] right-[40%] w-32 h-32 bg-[#FDF5EA]/40 rounded-full blur-[100px]" />

      {/* LEFT SECTION */}
      <div className="flex flex-col items-center md:items-start justify-center gap-6 order-1 md:order-1">
        <h1
          className="text-5xl sm:text-6xl md:text-6xl font-bold 
          bg-gradient-to-r from-[#E2A16F] via-[#c9835e] to-[#E2A16F]
          animate-gradient bg-clip-text text-transparent 
          drop-shadow-[0_0_15px_#E2A16F]">
          Meet the <span className="text-[#4b3b1c] drop-shadow-md">SmartStudy AI!</span>
        </h1>

        <h3
          className="text-2xl sm:text-3xl md:text-4xl font-semibold 
          text-[#4b3b1c]">
          Learn 10x Faster 🚀
        </h3>
      </div>

      {/* RIGHT SECTION */}
      <div className="flex flex-col items-center justify-center gap-6 order-2 md:order-2 z-[1]">
        <img
          src="/public/images/logoo.png"
          alt="SmartStudy AI"
          className="w-[75%] max-w-[420px] drop-shadow-[0_0_25px_#E2A16F] opacity-95 hover:opacity-100 transition"
        />

        <button
          className="px-8 py-3 bg-[#E2A16F] text-white text-lg rounded-xl shadow-xl hover:scale-[1.05] transition flex items-center gap-3"
          onClick={() => navigate("/login")}
        >
          Get Started
          <span className="text-xl">➤</span>
        </button>
      </div>
    </div>
  );
};

export default Home;
