import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { users } from "../data/fakedata";

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = ()=>{
    // Implement sign-up logic here
    const exists = users.find((u) => u.email === email);

     if (exists) {
      alert("User already exists, please login instead!");
      return;
    }

    users.push({ name, email, password });
    alert("Registration Successful! Please login.");
    navigate("/dashboard");
  }

  return (
   <div className="w-screen h-screen bg-[#EBDCCB] flex items-center justify-center p-4">

    {/* Register Card */}
    <div className="w-full max-w-md bg-[#FDF5EA] rounded-2xl shadow-xl p-8 border border-[#E2A16F]/30">
      <h1 className="text-3xl font-bold text-center text-[#4b3b1c] mb-6">
        Create Account
      </h1>

      {/* Full Name */}
      <input
        type="text"
        placeholder="Full Name"
        className="w-full px-4 py-3 mt-3 rounded-lg bg-white border border-[#E2A16F]/40 text-[#4b3b1c] placeholder-[#4b3b1c]/50 
        focus:border-[#E2A16F] focus:ring-2 focus:ring-[#E2A16F] outline-none transition"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      {/* Email */}
      <input
        type="email"
        placeholder="Email"
        className="w-full px-4 py-3 mt-3 rounded-lg bg-white border border-[#E2A16F]/40 text-[#4b3b1c] placeholder-[#4b3b1c]/50 
        focus:border-[#E2A16F] focus:ring-2 focus:ring-[#E2A16F] outline-none transition"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      {/* Password */}
      <input
        type="password"
        placeholder="Password"
        className="w-full px-4 py-3 mt-3 rounded-lg bg-white border border-[#E2A16F]/40 text-[#4b3b1c] placeholder-[#4b3b1c]/50 
        focus:border-[#E2A16F] focus:ring-2 focus:ring-[#E2A16F] outline-none transition"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      {/* SignUp Button */}
      <button
        onClick={handleSignUp}
        className="w-full mt-6 bg-[#E2A16F] text-white py-3 rounded-lg font-semibold hover:scale-[1.02] transition shadow-md"
      >
        Sign Up
      </button>

      <p className="text-center text-[#4b3b1c] opacity-80 text-sm mt-5">
        Already have an account?{" "}
        <span
          className="font-semibold text-[#E2A16F] cursor-pointer hover:underline"
          onClick={() => navigate("/login")}
        >
          Login
        </span>
      </p>
    </div>
    
  </div>
  );
};

export default Register;
