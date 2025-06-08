"use client";

import { Eye, EyeOff, Mail, Lock, CheckCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const { login } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Check if user was redirected from registration using window.location
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const registered = urlParams.get("registered");
      const email = urlParams.get("email");

      if (registered === "true") {
        setSuccessMessage(
          "Account created successfully! Please sign in with your credentials."
        );
        if (email) {
          setFormData((prev) => ({ ...prev, email: decodeURIComponent(email) }));
        }

        // Clear the success message after 5 seconds
        const timer = setTimeout(() => {
          setSuccessMessage("");
        }, 5000);

        return () => clearTimeout(timer);
      }
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (error) setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccessMessage(""); // Clear success message when attempting login

    // Validation
    if (!formData.email || !formData.password) {
      setError("Please fill in all fields");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Login failed");
      }

      // Store token
      localStorage.setItem("authToken", data.token);

      // Redirect to home or dashboard
      router.push("/");
    } catch (error: any) {
      setError(error.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#FFD8CA] rounded-xl p-6 w-full h-full">
      <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>

      {/* Success Message */}
      {successMessage && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm flex items-start mb-4">
          <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
          <span>{successMessage}</span>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm mb-4">
          {error}
        </div>
      )}

      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="flex items-center border rounded-lg px-3 py-2 bg-white">
          <Mail className="w-4 h-4 text-gray-400" />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Userexample@gmail.com"
            className="ml-2 w-full outline-none bg-transparent"
            disabled={loading}
          />
        </div>
        <div className="flex items-center border rounded-lg px-3 py-2 bg-white relative">
          <Lock className="w-4 h-4 text-gray-400" />
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            placeholder="Password"
            className="ml-2 w-full outline-none bg-transparent pr-10"
            disabled={loading}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 text-gray-500 hover:text-gray-700"
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
          disabled={loading}
          className="w-full mt-2 bg-orange-500 hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed text-white py-2 rounded-lg font-semibold"
        >
          {loading ? "Logging in..." : "Login"}
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