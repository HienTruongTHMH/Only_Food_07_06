"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import SearchModal from "./SearchModal";
import { Menu, X, User, Heart, UserPlus, LogIn, Search } from "lucide-react";

export default function Navbar() {
  const [pagesOpen, setPagesOpen] = useState(false);
  const [recipeOpen, setRecipeOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const recipeRef = useRef<HTMLDivElement>(null);
  const pagesRef = useRef<HTMLDivElement>(null);
  const userRef = useRef<HTMLDivElement>(null); 

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
      if (
        userRef.current &&
        !userRef.current.contains(event.target as Node)
      ) {
        setUserMenuOpen(false);
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
        <Link href="/" className="flex items-center hover:opacity-80 transition-opacity">
          <Image
            src="/images/logo.png"
            alt="Only Food Logo - Click to go home"
            width={40}
            height={40}
            className="sm:w-[50px] sm:h-[50px] cursor-pointer"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-8">
          <Link href="/" className="text-red-500 hover:text-red-600 font-medium">
            Trang Chủ
          </Link>

          <div className="relative" ref={recipeRef}>
            <button
              className="flex items-center text-gray-700 hover:text-gray-900 font-medium"
              onClick={() => setRecipeOpen(!recipeOpen)}
            >
              Công Thức
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
                  href="/recipes/category/trang-mieng"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => setRecipeOpen(false)}
                >
                  Tráng Miệng
                </Link>
                <Link
                  href="/recipes/category/mon-chinh"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => setRecipeOpen(false)}
                >
                  Món Chính
                </Link>
                <Link
                  href="/recipes/category/canh-soup"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => setRecipeOpen(false)}
                >
                  Canh & Soup
                </Link>
                <Link
                  href="/recipes/category/do-uong"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => setRecipeOpen(false)}
                >
                  Đồ Uống
                </Link>
                <Link
                  href="/recipes/category/mon-an-vat"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => setRecipeOpen(false)}
                >
                  Món Ăn Vặt
                </Link>
              </div>
            </div>
          </div>
        </nav>

        {/* Right Icons */}
        <div className="flex items-center space-x-4">
          {/* Enhanced Search Button */}
          <button
            onClick={() => setSearchOpen(true)}
            className="group relative p-2 text-gray-600 hover:text-orange-600 transition-all duration-200 hover:bg-orange-50 rounded-full"
            aria-label="Search recipes"
          >
            <Search className="h-5 w-5 group-hover:scale-110 transition-transform duration-200" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-orange-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
          </button>

          {/* Favorites Icon */}
          <Link
            href="/favorites"
            className="hidden sm:block p-2 text-gray-600 hover:text-red-500 transition-all duration-200 hover:bg-red-50 rounded-full group"
            aria-label="Your favorites"
          >
            <Heart className="h-5 w-5 group-hover:scale-110 transition-transform duration-200" />
          </Link>

          {/* User Menu */}
          <div className="relative" ref={userRef}>
            <button
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              className="hidden sm:block p-2 text-gray-600 hover:text-gray-900 transition-all duration-200 hover:bg-gray-100 rounded-full group"
              aria-label="User menu"
            >
              <User className="h-5 w-5 group-hover:scale-110 transition-transform duration-200" />
            </button>
            
            {/* User Dropdown Menu */}
            <div
              className={`absolute right-0 z-10 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 transition-all duration-200 origin-top-right ${
                userMenuOpen
                  ? "scale-100 opacity-100 pointer-events-auto"
                  : "scale-95 opacity-0 pointer-events-none"
              }`}
            >
              <div className="py-1">
                <Link
                  href="/login"
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => setUserMenuOpen(false)}
                >
                  <LogIn className="h-4 w-4 mr-2" />
                  Login
                </Link>
                <Link
                  href="/register"
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => setUserMenuOpen(false)}
                >
                  <UserPlus className="h-4 w-4 mr-2" />
                  Register
                </Link>
                <Link
                  href="/profile"
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => setUserMenuOpen(false)}
                >
                  <User className="h-4 w-4 mr-2" />
                  Profile
                </Link>
                <hr className="my-1" />
                <Link
                  href="/favorites"
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => setUserMenuOpen(false)}
                >
                  <Heart className="h-4 w-4 mr-2" />
                  My Favorites
                </Link>
              </div>
            </div>
          </div>

          {/* Mobile menu button */}
          <button
            className="lg:hidden text-gray-700 hover:text-gray-900"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle mobile menu"
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
              {/* Mobile Search Button */}
              <button
                onClick={() => {
                  setSearchOpen(true);
                  setMobileMenuOpen(false);
                }}
                className="flex items-center w-full py-2 text-gray-700 hover:text-orange-600"
              >
                <Search className="h-4 w-4 mr-2" />
                Tìm kiếm món ăn
              </button>
              
              <hr className="my-2" />
              
              <Link
                href="/"
                className="block py-2 text-red-500 hover:text-red-600 font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                🏠 Home Page
              </Link>
              
              <Link
                href="/recipes"
                className="block py-2 text-gray-700 hover:text-gray-900"
                onClick={() => setMobileMenuOpen(false)}
              >
                🍽️ All Recipes
              </Link>
              
              <hr className="my-2" />
              
              <Link
                href="/login"
                className="flex items-center py-2 text-gray-700 hover:text-gray-900"
                onClick={() => setMobileMenuOpen(false)}
              >
                <LogIn className="h-4 w-4 mr-2" />
                Login
              </Link>
              
              <Link
                href="/register"
                className="flex items-center py-2 text-gray-700 hover:text-gray-900"
                onClick={() => setMobileMenuOpen(false)}
              >
                <UserPlus className="h-4 w-4 mr-2" />
                Register
              </Link>
              
              <Link
                href="/profile"
                className="flex items-center py-2 text-gray-700 hover:text-gray-900"
                onClick={() => setMobileMenuOpen(false)}
              >
                <User className="h-4 w-4 mr-2" />
                Profile
              </Link>
              
              <Link
                href="/favorites"
                className="flex items-center py-2 text-gray-700 hover:text-gray-900"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Heart className="h-4 w-4 mr-2" />
                Favorites
              </Link>
            </div>
          </div>
        )}
      </header>
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}