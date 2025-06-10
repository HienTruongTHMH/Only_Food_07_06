"use client";

import { Eye, EyeOff, User, Mail, Lock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Check for email from EmailSendSection
    const emailFromParams = searchParams.get('email');
    if (emailFromParams) {
      setFormData(prev => ({
        ...prev,
        email: emailFromParams
      }));
    }

    // Check if user was redirected from registration
    const registered = searchParams.get("registered");
    const email = searchParams.get("email");
    
    if (registered === "true") {
      setSuccessMessage(`Đăng ký thành công! Vui lòng đăng nhập với email: ${email}`);
    }
  }, [searchParams]);

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

    // Validation
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      setError("All fields are required");
      setLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Registration failed");
      }

      // Registration successful - redirect to login with success message
      router.push("/login?registered=true&email=" + encodeURIComponent(formData.email));
      
    } catch (error: any) {
      setError(error.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#FFD8CA] rounded-xl p-6 w-full h-full">
      <h2 className="text-2xl font-semibold text-center mb-6">Register Account</h2>

      {/* Success Message */}
      {successMessage && (
        <div className="bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded-lg text-sm mb-4">
          {successMessage}
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm mb-4">
          {error}
        </div>
      )}

      <form className="space-y-4" onSubmit={handleSubmit}>
        {/* Full Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Full Name
          </label>
          <div className="flex items-center border rounded-lg px-3 py-2 bg-white">
            <User className="w-4 h-4 text-gray-400" />
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter your full name"
              className="ml-2 w-full outline-none bg-transparent"
              disabled={loading}
              required
            />
          </div>
        </div>

        {/* Email Address */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email Address
          </label>
          <div className="flex items-center border rounded-lg px-3 py-2 bg-white">
            <Mail className="w-4 h-4 text-gray-400" />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter your email"
              className="ml-2 w-full outline-none bg-transparent"
              disabled={loading}
              required
            />
          </div>
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Password
          </label>
          <div className="flex items-center border rounded-lg px-3 py-2 bg-white relative">
            <Lock className="w-4 h-4 text-gray-400" />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Enter your password"
              className="ml-2 w-full outline-none bg-transparent pr-10"
              disabled={loading}
              required
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
        </div>

        {/* Confirm Password */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Confirm Password
          </label>
          <div className="flex items-center border rounded-lg px-3 py-2 bg-white relative">
            <Lock className="w-4 h-4 text-gray-400" />
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              placeholder="Confirm your password"
              className="ml-2 w-full outline-none bg-transparent pr-10"
              disabled={loading}
              required
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 text-gray-500 hover:text-gray-700"
              aria-label={showConfirmPassword ? "Hide password" : "Show password"}
            >
              {showConfirmPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full mt-4 bg-orange-500 hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed text-white py-2 rounded-lg font-semibold"
        >
          {loading ? "Creating Account..." : "Register"}
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

      <p className="text-center text-gray-600 text-sm mt-6">
        Already have an account?{" "}
        <Link
          href="/login"
          className="text-orange-500 hover:text-orange-600 font-semibold hover:underline"
        >
          Sign in here
        </Link>
      </p>
    </div>
  );
};

export default RegisterForm;