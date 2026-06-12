import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { HiMenu, HiX } from "react-icons/hi";
import { Logo } from "../Logo/Logo";

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = [
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Experience", href: "#experience" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/90 backdrop-blur-md shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <a href="/">
          <Logo />
        </a>

        <ul className="hidden md:flex space-x-8">
          {menuItems.map((item, index) => (
            <motion.li
              key={item.name}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <a
                href={item.href}
                className="text-gray-800 hover:text-teal transition-colors duration-300 font-medium"
              >
                {item.name}
              </a>
            </motion.li>
          ))}
        </ul>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-3xl text-teal z-50"
          aria-label="Toggle menu"
        >
          {menuOpen ? <HiX /> : <HiMenu />}
        </button>

        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            className="fixed top-0 right-0 h-screen w-64 bg-white shadow-2xl md:hidden flex flex-col items-center justify-center space-y-8"
          >
            {menuItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="text-xl text-gray-800 hover:text-teal transition-colors duration-300 font-medium"
              >
                {item.name}
              </a>
            ))}
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
};
