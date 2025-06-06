"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import SearchModal from "./SearchModal";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [pagesOpen, setPagesOpen] = useState(false);
  const [recipeOpen, setRecipeOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const recipeRef = useRef<HTMLDivElement>(null);
  const pagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        recipeRef.current &&
        !recipeRef.current.contains(event.target as Node)
      ) {
        setRecipeOpen(false);
      }
      if (
        pagesRef.current &&
        !pagesRef.current.contains(event.target as Node)
      ) {
        setPagesOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <header className="flex items-center justify-between px-4 sm:px-6 py-4 bg-white">
        {/* Logo */}
        <div className="flex items-center">
          <Image
            src="/images/logo.png"
            alt="logo"
            width={40}
            height={40}
            className="sm:w-[50px] sm:h-[50px]"
          />
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-8">
          <Link href="/" className="text-red-500 hover:text-red-600">
            Home Page
          </Link>

          <div className="relative" ref={recipeRef}>
            <button
              className="flex items-center text-gray-700 hover:text-gray-900"
              onClick={() => setRecipeOpen(!recipeOpen)}
            >
              Recipe Page
              <svg
                className="ml-1 h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            <div
              className={`absolute z-10 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 transition-all duration-200 origin-top-left ${
                recipeOpen
                  ? "scale-100 opacity-100 pointer-events-auto"
                  : "scale-95 opacity-0 pointer-events-none"
              }`}
            >
              <div className="py-1">
                <Link
                  href="/recipe/123"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  All Recipes
                </Link>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Desserts
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Main Dishes
                </a>
              </div>
            </div>
          </div>

          <div className="relative" ref={pagesRef}>
            <button
              className="flex items-center text-gray-700 hover:text-gray-900"
              onClick={() => setPagesOpen(!pagesOpen)}
            >
              Pages
              <svg
                className="ml-1 h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            <div
              className={`absolute z-10 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 transition-all duration-200 origin-top-left ${
                pagesOpen
                  ? "scale-100 opacity-100 pointer-events-auto"
                  : "scale-95 opacity-0 pointer-events-none"
              }`}
            >
              <div className="py-1">
                <Link
                  href="/login"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Register
                </Link>
                <Link
                  href="/favorites"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Favorites
                </Link>
                <Link
                  href="/profile"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Profile
                </Link>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  About
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Blog Page
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Search Results
                </a>
              </div>
            </div>
          </div>
        </nav>

        {/* Right Icons */}
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setSearchOpen(true)}
            className="text-gray-700 hover:text-gray-900"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>

          <Link
            href="/profile"
            className="hidden sm:block text-gray-700 hover:text-black"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </Link>

          {/* Mobile menu button */}
          <button
            className="lg:hidden text-gray-700 hover:text-gray-900"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-white shadow-lg border-t lg:hidden z-50">
            <div className="px-4 py-2 space-y-2">
              <Link
                href="/"
                className="block py-2 text-red-500 hover:text-red-600"
              >
                Home Page
              </Link>
              <Link
                href="/recipe/123"
                className="block py-2 text-gray-700 hover:text-gray-900"
              >
                Recipe Page
              </Link>
              <Link
                href="/login"
                className="block py-2 text-gray-700 hover:text-gray-900"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="block py-2 text-gray-700 hover:text-gray-900"
              >
                Register
              </Link>
              <Link
                href="/favorites"
                className="block py-2 text-gray-700 hover:text-gray-900"
              >
                Favorites
              </Link>
              <Link
                href="/profile"
                className="block py-2 text-gray-700 hover:text-gray-900"
              >
                Profile
              </Link>
            </div>
          </div>
        )}
      </header>
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
