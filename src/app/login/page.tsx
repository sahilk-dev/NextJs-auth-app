"use client";
import Link from "next/link";
import React, {useEffect} from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";


export default function LoginPage() {
    const router = useRouter();
    const [user, setUser] = React.useState({
        email:"",
        password: "",
    })
    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    const onLogin = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/users/login", user);
            console.log("Login successful", response.data);
            toast.success("Login successful");
            router.push("/profile");
        } catch (error:any) {
            console.log("Login failed", error.message);
            toast.error("Invalid credentials");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if(user.email.length > 0 && user.password.length > 0){
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [user])


    return (
        <div className="bg-linear-to-br from-gray-900 to-gray-800 min-h-screen flex items-center justify-center">
            <div className="bg-white text-gray-900 rounded-2xl shadow-2xl p-8">
                <h1 className="text-3xl font-bold text-center mb-6 text-teal-600">
                    {loading ? "Processing..." : "Log In"}
                </h1>
                {/* <hr className="mb-6" /> */}
                
                <div className="space-y-4">
                    <div>
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
                    </div>

                    <div>
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
                </div>

                <button
                    type="submit"
                    onClick={onLogin}
                    className="w-full mt-4 bg-teal-600 hover:bg-teal-700 text-white font-semibold py-2 rounded-lg"
                >
                    Login
                </button>

                <p className="text-center text-sm font-semibold mt-5">
                    Don&apos;t have an account?{" "}
                    <Link href="/signup" className="text-blue-500 hover:underline font-semibold">
                        Sign Up
                    </Link>
                </p>
            </div>
        </div>
    )
}