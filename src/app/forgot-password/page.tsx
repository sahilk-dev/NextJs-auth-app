"use client"

import { useState, FormEvent } from "react"
import { useRouter } from "next/navigation";
import axios from "axios"

export default function ForgotPasswordPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage(null);
        setError(null);
        
        try {
            const res = await axios.post("/api/users/forgot-password", { email });
            setMessage(res.data.message || "If this email exists, a reset link has been sent.")
            router.push("/reset-password")
        } catch (err: any) {
            console.error(err)
            setError(err.response?.data?.error || "Something went wrong. Please try again.")
        } finally {
            setLoading(false);
        }
    }

    return(
        <main className="min-h-screen flex items-center justify-center g-linear-to-br from-gray-900 to-gray-800 px-4">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6 sm:p-8">
                <h1 className="text-2xl font-semibold text-gray-900 text-center">
                    Forgot your password
                </h1>
                <p className="mt-2 text-sm text-gray-500 text-center">
                    Enter the email associated with your account and we&apos;il send you a link to reset your password.
                </p>

                <form onSubmit={handleSubmit} className="mt-6 space-x-4">
                    <div className="space-y-1">
                        <label className="block text-sm font-medium text-gray-700">
                            Email address
                        </label>
                        <input
                            type="email"
                            placeholder="you@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>

                    {message && (
                        <p className="text-xs text-green-600">
                            {message}
                        </p>
                    )}

                    {error && (
                        <p className="text-xs text-red-600">
                            {error}
                        </p>
                    )}

                    <button
                        type="submit"
                        className="w-full mt-2 py-2.5 rounded-full bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-semibold shadow-sm transition disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                        {loading ? "Sending link..." : "Send reset link"}
                    </button>
                </form>
            </div>
        </main>
    )
}