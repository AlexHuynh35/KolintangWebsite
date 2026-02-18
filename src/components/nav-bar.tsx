"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isTouchingHero, setIsTouchingHero] = useState(true);
  const [isInHero, setIsInHero] = useState(true);

  useEffect(() => {
    const hero = document.getElementById("hero");

    if (!hero) return;

    const observerOne = new IntersectionObserver(
      ([entry]) => {
        setIsTouchingHero(entry.isIntersecting);
      },
      {
        root: null,
        threshold: 0,
      }
    );

    const observerTwo = new IntersectionObserver(
      ([entry]) => {
        setIsInHero(entry.isIntersecting);
      },
      {
        root: null,
        threshold: 0.3,
      }
    );

    observerOne.observe(hero);
    observerTwo.observe(hero);

    return () => {
      observerOne.disconnect();
      observerTwo.disconnect();
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 0) {
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
    <nav className={`fixed px-4 py-4 inset-x-0 top-0 z-50
      transition-transform duration-100 ease-in-out ${isTouchingHero || visible ? "translate-y-0" : "-translate-y-full"}
      transition-colors duration-100 ease-in-out ${!isInHero || isOpen ? "bg-white border-b border-gray-200 shadow-sm" : "bg-transparent"}
    `}>
      <div className="max-w-8xl md:pr-6 mx-auto flex justify-end items-center">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`md:hidden text-xl ${!isInHero || isOpen ? "text-gray-800" : "text-white"} focus:outline-none`}
        >
          ☰
        </button>

        <div className="hidden md:flex gap-6">
          <Link href="/" className={`text-xl md:text-2xl py-2 hover:text-green-700 hover:underline ${!isInHero || isOpen ? "text-gray-800" : "text-white"}`}>
            Home
          </Link>

          <Link href="/about" className={`text-xl md:text-2xl py-2 hover:text-green-700 hover:underline ${!isInHero || isOpen ? "text-gray-800" : "text-white"}`}>
            About
          </Link>

          <Link href="/events" className={`text-xl md:text-2xl py-2 hover:text-green-700 hover:underline ${!isInHero || isOpen ? "text-gray-800" : "text-white"}`}>
            Events
          </Link>
        </div>
      </div>

      {isOpen && (
        <div className="flex flex-col justify-end gap-2 mt-3 md:hidden pr-4">
          <Link href="/" className={`block text-right text-xl py-2 hover:text-green-700 hover:underline ${!isInHero || isOpen ? "text-gray-800" : "text-white"}`}>
            Home
          </Link>

          <Link href="/about" className={`block text-right text-xl py-2 hover:text-green-700 hover:underline ${!isInHero || isOpen ? "text-gray-800" : "text-white"}`}>
            About
          </Link>

          <Link href="/events" className={`block text-right text-xl py-2 hover:text-green-700 hover:underline ${!isInHero || isOpen ? "text-gray-800" : "text-white"}`}>
            Events
          </Link>
        </div>
      )}
    </nav>
  );
}