"use client";

import Link from "next/link";

export default function Hero() {
    return (
        <section className="w-full max-w-4xl mx-auto text-center py-16 md:py-24 px-4">
            <h1 className="text-3xl md:text-5xl font-bold mb-4">
                Build a clean UI with Next.js ⚡ 
            </h1>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                This is a simple landing page with a navbar, hero section, and footer. Perfect to practice your Nex.js basics and layout structure.
            </p>

            <div className="flex justify-center gap-4">
                <Link
                    href="#get-started"
                    className="px-6 py-3 rounded-md bg-black text-white text-sm font-medium"
                >
                    Get Started
                </Link>
                <Link
                    href="#features"
                    className="px-6 py-3 rounded-md border text-sm font-medium"
                >
                    View Features
                </Link>
            </div>
        </section>
    )
}