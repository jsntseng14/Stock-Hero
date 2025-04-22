"use client";

import SearchBar from "./SearchBar";
import LoginAlert from "./LoginAlert";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md border-b border-gray-200 w-full">
      <div className="w-full px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        {/* Logo + Title wrapped in Link */}
        <Link
          href="/"
          className="flex items-center gap-2 text-2xl font-bold text-gray-800 whitespace-nowrap transition-transform duration-200 hover:scale-105 hover:text-blue-600 cursor-pointer"
        >
          <Image
            src="/assets/willow-logo.png"
            alt="Willow Logo"
            width={40}
            height={40}
          />
          <span>Chillow Trade</span>
          <Image
            src="/assets/chase-logo.png"
            alt="Chase Logo"
            width={47}
            height={47}
          />
        </Link>


        {/* Right Side */}
        <div className="flex flex-grow max-w-md justify-end items-center gap-4">
          {/* SearchBar expands with available space */}
          <div className="hidden sm:block flex-grow max-w-md">
            <SearchBar />
          </div>

          <LoginAlert
            lastLoginTime="2024-03-01T10:00:00Z"
            currentLoginTime="2024-03-20T08:00:00Z"
            lastLoginIP="192.168.1.1"
            currentLoginIP="10.0.0.2"
          />

          <button className="bg-blue-100 text-blue-600 px-4 py-2 rounded hover:bg-blue-200 transition whitespace-nowrap">
            Login/Sign Up
          </button>
        </div>
      </div>
    </nav>
  );
}
