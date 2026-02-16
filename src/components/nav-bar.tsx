"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        setVisible(false);
      } else {
        setVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <nav className={`fixed bg-white border-b border-gray-200 shadow-sm px-4 py-4 inset-x-0 top-0 z-50 transition-transform duration-300 ease-in-out ${visible ? "translate-y-0" : "-translate-y-full"}`}>
      <div className="max-w-8xl md:pl-12 mx-auto flex justify-between items-center">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-gray-700 focus:outline-none"
        >
          ☰
        </button>

        <div className="hidden md:flex gap-6">
          <Link href="/" className="text-xl md:text-2xl py-2 text-gray-800 hover:text-green-700 hover:underline">
            About
          </Link>

          <Link href="/" className="text-xl md:text-2xl py-2 text-gray-800 hover:text-green-700 hover:underline">
            Events
          </Link>
        </div>

        <div className="flex items-center">
          <Link href="/" className="py-2 text-xl md:text-2xl font-bold text-green-800">
            Cita Lomendehe
          </Link>
        </div>
      </div>

      {isOpen && (
        <div className="flex flex-col gap-2 mt-3 md:hidden pr-4">
          <Link href="/" className="block py-2 text-gray-800 hover:text-green-700 hover:underline">
            About
          </Link>

          <Link href="/" className="block py-2 text-gray-800 hover:text-green-700 hover:underline">
            Events
          </Link>
        </div>
      )}
    </nav>
  );
}