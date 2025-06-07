"use client";

import { Lock, Mail, Eye, EyeOff } from "lucide-react"; // Added Eye and EyeOff for password visibility
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react"; // Added useState

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="bg-gradient-to-br from-orange-100 via-red-100 to-pink-100 rounded-xl p-6 sm:p-8 md:p-10 w-full max-w-md mx-auto shadow-xl h-full flex flex-col justify-center">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800">Welcome Back!</h2>
        <p className="text-gray-600 mt-2">Login to continue your journey.</p>
      </div>
      <form className="space-y-6">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Mail className="w-5 h-5 text-gray-400" />
          </div>
          <input
            type="email"
            placeholder="your.email@example.com"
            className="pl-10 pr-3 py-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent outline-none transition-shadow duration-200"
          />
        </div>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Lock className="w-5 h-5 text-gray-400" />
          </div>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            className="pl-10 pr-10 py-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent outline-none transition-shadow duration-200"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? (
              <EyeOff className="w-5 h-5" />
            ) : (
              <Eye className="w-5 h-5" />
            )}
          </button>
        </div>
        <button
          type="submit"
          className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-semibold text-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5"
        >
          Login
        </button>
      </form>

      <div className="my-6 flex items-center">
        <div className="flex-grow border-t border-gray-300"></div>
        <span className="mx-4 text-sm text-gray-500">Or continue with</span>
        <div className="flex-grow border-t border-gray-300"></div>
      </div>

      <div className="flex justify-center gap-4">
        <button className="bg-white p-3 rounded-full shadow-md hover:shadow-lg transition-shadow duration-200 flex items-center justify-center w-12 h-12">
          <Image src="/images/google.png" alt="Google" width={24} height={24} />
        </button>
        <button className="bg-white p-3 rounded-full shadow-md hover:shadow-lg transition-shadow duration-200 flex items-center justify-center w-12 h-12">
          <Image
            src="/images/facebook.png"
            alt="Facebook"
            width={24}
            height={24}
          />
        </button>
      </div>

      <p className="text-center text-gray-600 text-sm mt-8">
        Don&apos;t have an account yet?{" "}
        <Link
          href="/register"
          className="text-orange-500 hover:text-orange-600 font-semibold hover:underline"
        >
          Register Now
        </Link>
      </p>
    </div>
  );
};

export default LoginForm;