"use client";

import SearchBar from "./SearchBar";
import LoginAlert from "./LoginAlert";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md border-b border-gray-200 w-full">
      <div className="w-full px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl font-bold text-blue-600 whitespace-nowrap">
          Stock Hero
        </div>

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
            Login
          </button>
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition whitespace-nowrap">
            Settings
          </button>
        </div>
      </div>
    </nav>
  );
}
