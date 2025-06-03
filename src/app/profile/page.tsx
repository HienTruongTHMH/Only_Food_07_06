"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

export default function ProfilePage() {
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    const saved = localStorage.getItem("profileData");
    const parsedData = JSON.parse(saved || "{}");
    if (saved) {
      setFormData({
        fullName: parsedData.fullName,
        username: parsedData.username,
        email: parsedData.email,
        password: parsedData.password,
      });
    }
  }, []);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = () => {
    localStorage.setItem("profileData", JSON.stringify(formData));
    alert("Đã lưu thông tin!");
  };

  const handleChangePhoto = () => {
    console.log("Change photo clicked");
  };

  const handleDeletePhoto = () => {
    console.log("Delete photo clicked");
  };

  const handleDisconnect = (platform: string) => {
    console.log(`Disconnect ${platform}`);
  };

  const handleUnsubscribe = () => {
    console.log("Unsubscribe from newsletter");
  };

  const handleSignOut = () => {
    console.log("Sign out");
  };

  const handleDeleteAccount = () => {
    console.log("Delete account");
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-200">
        <h1 className="text-2xl font-bold text-gray-900">Profile</h1>
        <button
          onClick={handleSave}
          className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-md font-medium transition-colors"
        >
          SAVE
        </button>
      </div>

      {/* Profile Photo Section */}
      <div className="flex items-center gap-4 mb-8">
        <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-200">
          <Image
            src="/avatar.svg"
            alt="Profile"
            width={80}
            height={80}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex gap-3">
          <button
            onClick={handleChangePhoto}
            className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
          >
            Change photo
          </button>
          <button
            onClick={handleDeletePhoto}
            className="border border-gray-300 hover:border-gray-400 text-gray-700 hover:text-gray-900 px-4 py-2 rounded-md text-sm font-medium transition-colors"
          >
            Delete
          </button>
        </div>
      </div>

      {/* Form Fields */}
      <div className="space-y-6 mb-8">
        {/* First Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
              Full Name
            </label>
            <div className="relative">
              <svg
                className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              <input
                type="text"
                value={formData.fullName}
                onChange={(e) => handleInputChange("fullName", e.target.value)}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
              Username
            </label>
            <div className="relative">
              <svg
                className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M16 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0zM12 14a7 7 0 0 0-7 7h14a7 7 0 0 0-7-7z" />
              </svg>
              <input
                type="text"
                value={formData.username}
                onChange={(e) => handleInputChange("username", e.target.value)}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Second Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
              Email
            </label>
            <div className="relative">
              <svg
                className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
              Password
            </label>
            <div className="relative">
              <svg
                className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <circle cx="12" cy="16" r="1" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => handleInputChange("password", e.target.value)}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>
      </div>
      {/* Connected Accounts */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Connected Accounts
        </h2>
        <div className="space-y-4">
          {/* Facebook */}
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-md">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
                <span className="text-white font-bold text-sm">f</span>
              </div>
              <div>
                <div className="font-medium text-blue-600">facebook</div>
                <div className="text-sm text-gray-500">Suzan Milor</div>
              </div>
            </div>
            <button
              onClick={() => handleDisconnect("facebook")}
              className="text-orange-500 hover:text-orange-600 text-sm font-medium cursor-pointer"
            >
              Disconnect
            </button>
          </div>

          {/* Google */}
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-md">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-white border border-gray-300 rounded flex items-center justify-center">
                <span className="text-red-500 font-bold text-sm">G</span>
              </div>
              <div>
                <div className="font-medium text-gray-700">Google</div>
                <div className="text-sm text-gray-500">suzan@gmail.com</div>
              </div>
            </div>
            <button
              onClick={() => handleDisconnect("google")}
              className="text-orange-500 hover:text-orange-600 text-sm font-medium cursor-pointer"
            >
              Disconnect
            </button>
          </div>
        </div>
      </div>

      {/* Newsletter */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Newsletter</h2>
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-600">
            You are currently <span className="text-blue-600">subscribed</span>{" "}
            to our <span className="text-orange-500">newsletter</span>
          </div>
          <button
            onClick={handleUnsubscribe}
            className="border border-gray-300 hover:border-gray-400 text-gray-700 hover:text-gray-900 px-4 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer"
          >
            Unsubscribe
          </button>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="flex items-center justify-between pt-6 border-t border-gray-200">
        <button
          onClick={handleSignOut}
          className="flex items-center gap-2 text-gray-600 hover:text-orange-500 transition-colors duration-300 text-sm font-medium cursor-pointer"
        >
          <svg
            className="w-4 h-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16,17 21,12 16,7" />
            <line x1="21" y1="12" x2="9" y2="12" />
          </svg>
          Sign out
        </button>
        <button
          onClick={handleDeleteAccount}
          className="text-red-500 hover:text-red-600 text-sm font-medium cursor-pointer"
        >
          Delete Account
        </button>
      </div>
    </div>
  );
}