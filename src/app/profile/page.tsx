"use client";
import axios from "axios";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface User {
    username: string;
    email: string;
}

export default function ProfilePage() {
    const [user, setUser] = useState<User | null>(null);
    const router = useRouter();

    useEffect(() => {
        const getUserDetails = async () => {
            try {
                const res = await axios.get("/api/users/me");
                console.log("API Response:", res.data)
                setUser(res.data.data);
            } catch (error) {
                console.error("Error fetching user:", error);
                router.push("/login");
            }
        };

        getUserDetails();
    }, [router]);

    const logout = async () => {
        try {
            await axios.get("/api/users/logout");
            toast.success("Logged out successfully.");
            router.push("/login");
        } catch (error) {
            console.error("Error  during logout:", error);
            toast.error("Something went wrong during logout.");
    }

  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-teal-700 px-4">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-xl p-6 sm:p-8">
        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Your Profile</h2>
          <p className="text-sm text-gray-500">Account details</p>
        </div>

        <hr className="border-gray-200 mb-4" />

        {/* Profile details */}
        <div className="text-sm space-y-3 mb-6">
          <div className="flex items-center justify-between">
            <span className="text-gray-500">Name</span>
            <span className="text-gray-800 font-medium">{user?.username}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-gray-500">Email</span>
            <span className="text-gray-800 font-medium">
              {user?.email}
            </span>
          </div>
        </div>

        {/* Logout button */}
        <button
          type="button"
          onClick={logout}
          className="w-full py-2.5 rounded-md bg-red-500 hover:bg-red-600 text-white text-sm font-semibold transition shadow-sm"
        >
          Logout
        </button>
      </div>
    </main>
  );
}
