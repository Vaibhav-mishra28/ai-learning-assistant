import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {users} from "../data/fakedata.js";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = ()=>{
    const user = users.find(user => user.email === email && user.password === password);
    if(user){
      alert("Login Successful");
      // Redirect to home or dashboard
      navigate("/dashboard");
    }
    else{
      alert("Invalid Credentials");
    }
  }

  return (
    <div className="w-screen h-screen bg-[#EBDCCB] flex items-center justify-center p-4">

    {/* Login Card */}
    <div className="w-full max-w-md bg-[#FDF5EA] rounded-2xl shadow-xl p-8 border border-[#E2A16F]/30">
      <h1 className="text-3xl font-bold text-center text-[#4b3b1c] mb-6">
        Welcome Back
      </h1>

      {/* Email */}
      <input
        type="email"
        placeholder="Enter Email"
        className="w-full px-4 py-3 mt-3 rounded-lg bg-white border border-[#E2A16F]/40 text-[#4b3b1c] placeholder-[#4b3b1c]/50 
        focus:border-[#E2A16F] focus:ring-2 focus:ring-[#E2A16F] outline-none transition"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      {/* Password */}
      <input
        type="password"
        placeholder="Enter Password"
        className="w-full px-4 py-3 mt-3 rounded-lg bg-white border border-[#E2A16F]/40 text-[#4b3b1c] placeholder-[#4b3b1c]/50 
        focus:border-[#E2A16F] focus:ring-2 focus:ring-[#E2A16F] outline-none transition"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      {/* Login Button */}
      <button
        onClick={handleLogin}
        className="w-full mt-6 bg-[#E2A16F] text-white py-3 rounded-lg font-semibold hover:scale-[1.02] transition shadow-md"
      >
        Login
      </button>

      <p className="text-center text-[#4b3b1c] opacity-80 text-sm mt-5">
        Don’t have an account?{" "}
        <span
          className="font-semibold text-[#E2A16F] cursor-pointer hover:underline"
          onClick={() => navigate("/signup")}
        >
          Sign Up
        </span>
      </p>
    </div>
  </div>
  );
};

export default Login;
