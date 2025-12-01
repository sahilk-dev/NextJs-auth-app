"use client";

import Link from "next/link";

export default function Navbar() {
    return (
        <nav className="w-full flex items-center justify-between p-4 border-b">
            <div className="text-xl font-bold">MyLogo</div>

            <div className="hidden md:flex gap-15 text-sm">
                <Link href="/">Home</Link>
                <Link href="/features">Features</Link>
                <Link href="/pricing">Pricing</Link>
                <Link href="/contact">Contact</Link>
            </div>

            <button className="text-sm bg-black text-white px-4 py-2 rounded">
                Sign In
            </button>
        </nav>
    )
}
