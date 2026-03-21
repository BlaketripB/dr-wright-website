"use client";

import Link from "next/link";
import { useState } from "react";
import { isSchedulingEnabled } from "@/lib/features";

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

          {isSchedulingEnabled && (
            <Link
              href="/schedule"
              className="rounded-full bg-black px-5 py-2 font-semibold text-white"
            >
              Schedule
            </Link>
          )}
        </div>

        {/* Mobile Button */}
        <button
          type="button"
          className="rounded border px-3 py-2 md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-expanded={menuOpen}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          ☰
        </button>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="border-t md:hidden">
          <div className="flex flex-col gap-3 px-4 py-4">
            <Link href="/" onClick={() => setMenuOpen(false)}>
              Home
            </Link>
            <Link href="/about" onClick={() => setMenuOpen(false)}>
              About
            </Link>
            <Link href="/services" onClick={() => setMenuOpen(false)}>
              Services
            </Link>
            <Link href="/reviews" onClick={() => setMenuOpen(false)}>
              Reviews
            </Link>
            <Link href="/contact" onClick={() => setMenuOpen(false)}>
              Contact
            </Link>

            {isSchedulingEnabled && (
              <Link
                href="/schedule"
                className="rounded-lg bg-black px-4 py-2 text-center font-semibold text-white"
                onClick={() => setMenuOpen(false)}
              >
                Schedule
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
