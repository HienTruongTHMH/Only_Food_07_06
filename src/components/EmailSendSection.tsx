"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

const EmailSendSection = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validate email
    if (!email.trim()) {
      setError("Please enter an email before signing up");
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Vui lòng nhập email hợp lệ");
      return;
    }

    // Redirect to register page with email pre-filled
    router.push(`/register?email=${encodeURIComponent(email)}`);
  };

  return (
    <div className="flex flex-col w-full bg-[#FFD8CA] justify-center items-center text-center py-16 px-6 md:px-8 rounded-xl shadow-xl">
      <h1 className="text-3xl sm:text-4xl font-bold text-orange-800 mb-3">
        Join Our Only-Food Community
      </h1>
      <p className="text-gray-700 text-base mb-8 max-w-md">
        Become a member to explore thousands of unique recipes and share your culinary passion.
      </p>
      
      <form onSubmit={handleSubmit} className="w-full max-w-sm">
        <div className="flex bg-white rounded-lg shadow-md overflow-hidden">
          <input
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (error) setError(""); // Clear error when user starts typing
            }}
            className="flex-grow p-3 text-gray-800 focus:outline-none placeholder-gray-500"
          />
          <button 
            type="submit"
            className="bg-orange-600 hover:bg-orange-700 text-white px-5 py-3 font-semibold transition-colors duration-200 ease-in-out whitespace-nowrap"
          >
            Sign Up
          </button>
        </div>
        
        {/* Error message */}
        {error && (
          <p className="text-red-600 text-sm mt-2 text-left">
            {error}
          </p>
        )}
      </form>
    </div>
  );
};

export default EmailSendSection;