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
        <div className="flex items-center border rounded-lg px-3 py-2 bg-white">
          <Lock className="w-4 h-4 text-gray-400" />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="ml-2 w-full outline-none bg-transparent"
            required
          />
        </div>
        <div className="flex items-center border rounded-lg px-3 py-2 bg-white">
          <Lock className="w-4 h-4 text-gray-400" />
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

      <div className="text-center my-4 text-gray-500">Or continue with</div>
      <div className="flex justify-center gap-4">
        <button className="bg-white px-10 rounded-full p-2 hover:shadow">
          <Image src="/images/google.png" alt="Google" width={20} height={20} />
        </button>
        <button className="bg-white px-10 rounded-full p-2 hover:shadow">
          <Image
            src="/images/facebook.png"
            alt="Facebook"
            width={20}
            height={20}
          />
        </button>
      </div>
      <span className="text-center text-gray-500 block mt-4">
        Already have an account?{" "}
        <Link href="/login" className="text-orange-500">
          Login
        </Link>
      </span>
    </div>
  );
};

export default RegisterForm;