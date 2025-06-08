"use client";

import { Lock, Mail, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    fullName: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { login } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          fullName: formData.fullName,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Auto-login after successful registration
        await login(formData.email, formData.password);
      } else {
        setError(data.error || "Registration failed");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="bg-[#FFD8CA] rounded-xl p-6 w-full h-full">
      <h2 className="text-2xl font-semibold text-center mb-6">
        Register Account
      </h2>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="flex items-center border rounded-lg px-3 py-2 bg-white">
          <User className="w-4 h-4 text-gray-400" />
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleChange}
            className="ml-2 w-full outline-none bg-transparent"
            required
          />
        </div>
        <div className="flex items-center border rounded-lg px-3 py-2 bg-white">
          <Mail className="w-4 h-4 text-gray-400" />
          <input
            type="email"
            name="email"
            placeholder="Userexample@gmail.com"
            value={formData.email}
            onChange={handleChange}
            className="ml-2 w-full outline-none bg-transparent"
            required
          />
        </div>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Lock className="w-5 h-5 text-gray-400" />
          </div>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="ml-2 w-full outline-none bg-transparent"
            required
          />
          {/* <button
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
          </button> */}
        </div>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Lock className="w-5 h-5 text-gray-400" />
          </div>
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="ml-2 w-full outline-none bg-transparent"
            required
          />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="w-full mt-2 bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-lg font-semibold disabled:opacity-50"
        >
          {isLoading ? "Creating Account..." : "Register"}
        </button>
      </form>

      <div className="my-6 flex items-center">
        <div className="flex-grow border-t border-gray-300"></div>
        <span className="mx-4 text-sm text-gray-500">Or sign up with</span>
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
        Already have an account?{" "}
        <Link
          href="/login"
          className="text-orange-500 hover:text-orange-600 font-semibold hover:underline"
        >
          Login Here
        </Link>
      </p>
    </div>
  );
};

export default RegisterForm;