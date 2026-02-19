import React, { useState } from "react";
import { FiMenu, FiX, FiSearch, FiUser } from "react-icons/fi";
import { FaShoppingCart } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { useUser, UserButton } from "@clerk/clerk-react";
import logo from "../assets/OIP-removebg-preview.png";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { isSignedIn } = useUser();

  return (
    <header className="bg-[#2f5b4f] text-white relative">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">

        {/* Logo */}
        <div className="flex items-center gap-2">
          <img src={logo} alt="logo" className="w-8 h-8 object-contain" />
          <span className="hidden md:block font-semibold text-sm">
            Pooja-OxyCare
          </span>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 text-sm">
          <NavLink to="/" className={({ isActive }) =>
            isActive ? "text-yellow-300 font-semibold" : "text-white"
          }>Home</NavLink>

          <NavLink to="/shop" className={({ isActive }) =>
            isActive ? "text-yellow-300 font-semibold" : "text-white"
          }>Shop</NavLink>

          <NavLink to="/about" className={({ isActive }) =>
            isActive ? "text-yellow-300 font-semibold" : "text-white"
          }>About us</NavLink>

          <NavLink to="/contact" className={({ isActive }) =>
            isActive ? "text-yellow-300 font-semibold" : "text-white"
          }>Contact us</NavLink>
        </nav>

        {/* Desktop Icons */}
        <div className="hidden md:flex items-center gap-4 relative">
          <FiSearch className="cursor-pointer" />
          {isSignedIn ? (
            <UserButton afterSignOutUrl="/" />
          ) : (
            <div className="relative">
              <button
                aria-label="profile"
                className="hover:text-yellow-300"
                onClick={() => setShowUserMenu((s) => !s)}
              >
                <FiUser size={18} />
              </button>
              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-36 bg-white text-black rounded shadow-lg py-1">
                  <NavLink to="/sign-in" className="block px-3 py-2 hover:bg-gray-100" onClick={() => setShowUserMenu(false)}>Sign In</NavLink>
                  <NavLink to="/sign-up" className="block px-3 py-2 hover:bg-gray-100" onClick={() => setShowUserMenu(false)}>Sign Up</NavLink>
                </div>
              )}
            </div>
          )}
          <NavLink to="/shop" className="text-white">
            <FaShoppingCart className="cursor-pointer" aria-label="cart" />
          </NavLink>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="menu"
        >
          {open ? <FiX size={22} /> : <FiMenu size={22} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {open && (
        <div className="md:hidden bg-[#2f5b4f] text-white border-t border-white/20">
          <nav className="flex flex-col px-6 py-4 gap-4">
            <NavLink to="/" onClick={() => setOpen(false)}
              className={({ isActive }) =>
                isActive ? "text-yellow-300 font-semibold" : ""
              }>Home</NavLink>

            <NavLink to="/shop" onClick={() => setOpen(false)}
              className={({ isActive }) =>
                isActive ? "text-yellow-300" : ""
              }>Shop</NavLink>

            <NavLink to="/about" onClick={() => setOpen(false)}
              className={({ isActive }) =>
                isActive ? "text-yellow-300" : ""
              }>About us</NavLink>

            <NavLink to="/contact" onClick={() => setOpen(false)}
              className={({ isActive }) =>
                isActive ? "text-yellow-300" : ""
              }>Contact us</NavLink>
            <NavLink to="/sign-in" onClick={() => setOpen(false)} className={({ isActive }) => isActive ? "text-yellow-300" : ""}>Sign In</NavLink>
            <NavLink to="/sign-up" onClick={() => setOpen(false)} className={({ isActive }) => isActive ? "text-yellow-300" : ""}>Sign Up</NavLink>
          </nav>
        </div>
      )}
    </header>
  );
}
