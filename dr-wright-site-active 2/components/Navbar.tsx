"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <header className="border-b">
            <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
                {/* Logo / Name */}
                <Link href="/" className="text-lg font-bold">
                    Dr. Wright
                </Link>

                {/* Desktop Links */}
                <div className="hidden items-center gap-6 md:flex">
                    <Link href="/">Home</Link>
                    <Link href="/about">About</Link>
                    <Link href="/services">Services</Link>
                    <Link href="/reviews">Reviews</Link>
                    <Link href="/contact">Contact</Link>

                    <Link
                        href="/contact"
                        className="rounded-lg bg-black px-4 py-2 text-white"
                    >
                        Schedule Now
                    </Link>
                </div>

                {/* Mobile Button */}
                <button
                    className="md:hidden border rounded px-3 py-2"
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    ☰
                </button>
            </nav>

            {/* Mobile Menu */}
            {menuOpen && (
                <div className="border-t md:hidden">
                    <div className="flex flex-col gap-3 px-4 py-4">
                        <Link href="/" onClick={() => setMenuOpen(false)}>Home</Link>
                        <Link href="/about" onClick={() => setMenuOpen(false)}>About</Link>
                        <Link href="/services" onClick={() => setMenuOpen(false)}>Services</Link>
                        <Link href="/reviews" onClick={() => setMenuOpen(false)}>Reviews</Link>
                        <Link href="/contact" onClick={() => setMenuOpen(false)}>Contact</Link>

                        <Link
                            href="/contact"
                            className="rounded-lg bg-black px-4 py-2 text-white text-center"
                            onClick={() => setMenuOpen(false)}
                        >
                            Schedule Now
                        </Link>
                    </div>
                </div>
            )}
        </header>
    );
}
