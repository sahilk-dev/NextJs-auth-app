"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import Image from "next/image";


export default function SignupPage() {
    const router = useRouter();
    const [user, setUser] = React.useState({
        email:"",
        password: "",
        username: "",
    })
    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    const onSignup = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/users/signup", user);
            toast.success("Signup successful");
            console.log("Signup success", response.data);
            router.push("/login")
        } catch (error:any) {
            console.log("Signup failed", error.message);

            toast.error(error.message);
        } finally {
            setLoading(false)
        }
    }

    useEffect(()=> {
        if(user.email.length > 0 && user.password.length > 0 && user.username.length > 0) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [user]);


    return (
        <div className="bg-linear-to-br from-gray-900 to-gray-800 min-h-screen flex items-center justify-center">
            <div className="bg-white text-gray-900 rounded-2xl shadow-2xl p-8">
                <h1 className="text-3xl font-bold text-center mb-6 text-teal-600">
                    {loading ? "Processing" : "Signup"}
                </h1>
                    <div className="space-y-4">
                        <label htmlFor="username" className="block text-sm font-medium mb-1 text-gray-700">
                            Username
                        </label>
                        <input
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            id="username"
                            type="text"
                            value={user.username}
                            onChange={(e) => setUser({...user, username: e.target.value})}
                            placeholder="Enter your username"
                        />

                        <label htmlFor="email" className="block text-sm font-medium mb-1 text-gray-700">
                            Email
                        </label>
                        <input
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            id="email"
                            type="text"
                            value={user.email}
                            onChange={(e) => setUser({...user, email: e.target.value})}
                            placeholder="Enter your email"
                        />

                        <label htmlFor="password" className="block text-sm font-medium mb-1 text-gray-700">
                            Password
                        </label>
                        <input
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            id="password"
                            type="text"
                            value={user.password}
                            onChange={(e) => setUser({...user, password: e.target.value})}
                            placeholder="Enter your password"
                        />
                    </div>
                    <button
                        type="submit"
                        onClick={onSignup}
                        className="w-full mt-4 bg-teal-600 hover:bg-teal-700 text-white font-semibold py-2 rounded-lg"
                    >
                        {buttonDisabled ? "No signup" : "Signup"}
                    </button>
                    <p className="text-center text-sm font-semibold mt-5">
                        Already have an account?{" "}
                    <Link href="/login" className="text-blue-500 hover:underline font-semibold">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    )
}