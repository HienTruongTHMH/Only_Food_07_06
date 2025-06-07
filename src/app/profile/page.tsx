"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface UserProfile {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  _count?: {
    favorites: number;
    comments: number;
    reviews: number;
  };
}

export default function ProfilePage() {
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
  });
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const token = localStorage.getItem('authToken');
        
        if (!token) {
          // User not logged in, load from localStorage as fallback
          const saved = localStorage.getItem("profileData");
          if (saved) {
            const parsedData = JSON.parse(saved);
            setFormData({
              fullName: parsedData.fullName || "",
              username: parsedData.username || "",
              email: parsedData.email || "",
              password: parsedData.password || "",
            });
          }
          setLoading(false);
          return;
        }

        // Fetch from API
        const response = await fetch('/api/user/profile', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          if (response.status === 401) {
            localStorage.removeItem('authToken');
            router.push('/login');
            return;
          }
          throw new Error('Failed to load profile');
        }

        const data = await response.json();
        setUserProfile(data.user);
        setFormData({
          fullName: data.user.name || "",
          username: data.user.name || "", // Use name as username for now
          email: data.user.email || "",
          password: "", // Don't populate password field
        });
      } catch (error) {
        console.error("Error loading profile:", error);
        setError("Failed to load profile. Please try again.");
        
        // Fallback to localStorage
        const saved = localStorage.getItem("profileData");
        if (saved) {
          try {
            const parsedData = JSON.parse(saved);
            setFormData({
              fullName: parsedData.fullName || "",
              username: parsedData.username || "",
              email: parsedData.email || "",
              password: parsedData.password || "",
            });
          } catch (fallbackError) {
            console.error("Fallback error:", fallbackError);
          }
        }
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [router]);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    setError(null);
    
    try {
      const token = localStorage.getItem('authToken');
      
      if (!token) {
        // Save to localStorage as fallback
        localStorage.setItem("profileData", JSON.stringify(formData));
        alert("Đã lưu thông tin!");
        setSaving(false);
        return;
      }

      // Save to API
      const response = await fetch('/api/user/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: formData.fullName,
          email: formData.email,
        }),
      });

      if (!response.ok) {
        if (response.status === 401) {
          localStorage.removeItem('authToken');
          router.push('/login');
          return;
        }
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to save profile');
      }

      const data = await response.json();
      setUserProfile(data.user);
      alert("Profile updated successfully!");
    } catch (error: any) {
      console.error("Error saving profile:", error);
      setError(error.message || "Failed to save profile. Please try again.");
    } finally {
      setSaving(false);
    }
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

  const handleSignOut = async () => {
    try {
      // Clear auth token
      localStorage.removeItem('authToken');
      localStorage.removeItem('profileData'); // Clear old localStorage data too
      
      // Redirect to home page
      router.push('/');
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };

  const handleDeleteAccount = async () => {
    if (!confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      return;
    }
    
    try {
      const token = localStorage.getItem('authToken');
      
      if (!token) {
        localStorage.removeItem('profileData');
        router.push('/');
        return;
      }

      // TODO: Implement delete account API
      console.log("Delete account - API not implemented yet");
      
      // For now, just sign out
      handleSignOut();
    } catch (error) {
      console.error("Delete account error:", error);
      setError("Failed to delete account. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto bg-white p-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (error && !userProfile && !formData.email) {
    return (
      <div className="max-w-2xl mx-auto bg-white p-8">
        <div className="text-center">
          <p className="text-red-500 text-lg">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto bg-white p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-200">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Profile</h1>
          {userProfile && (
            <p className="text-sm text-gray-500 mt-1">
              {userProfile._count && (
                <>
                  {userProfile._count.favorites} favorites • {userProfile._count.comments} comments • {userProfile._count.reviews} reviews
                </>
              )}
            </p>
          )}
          {error && (
            <p className="text-red-500 text-sm mt-1">{error}</p>
          )}
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="bg-orange-500 hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-2 rounded-md font-medium transition-colors"
        >
          {saving ? "SAVING..." : "SAVE"}
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