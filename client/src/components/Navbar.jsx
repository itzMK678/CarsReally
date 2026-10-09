// src/components/Navbar.jsx
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Languages, Menu, X, Shield } from "lucide-react";
import { useTranslation } from "react-i18next";

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleLanguage = () => {
    const nextLang = i18n.language === "en" ? "lt" : "en";
    i18n.changeLanguage(nextLang);
    document.body.dir = "ltr";
  };

  const navLinks = [
    { to: "/", label: t("home") },
    { to: "/event", label: t("events") },
    { to: "/services", label: t("service") },
    { to: "/contact", label: t("contact") },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 text-white bg-black/80 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-3.5 flex items-center justify-between">
        {/* Left - Logo */}
        <Link
          to="/"
          className="text-2xl font-black tracking-wider text-[#00F9FF] drop-shadow-[0_0_10px_rgba(0,249,255,0.6)] cursor-pointer"
        >
          {t("logo")}
        </Link>

        {/* Center - Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.to;
            return (
              <Link
                key={link.to}
                to={link.to}
                className={`text-sm font-semibold transition duration-200 ${
                  isActive
                    ? "text-[#00F9FF] drop-shadow-[0_0_8px_rgba(0,249,255,0.8)]"
                    : "text-gray-300 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* Right - Desktop Actions */}
        <div className="hidden md:flex items-center space-x-4">
          {/* Admin shortcut */}
          <Link
            to="/login"
            className="text-gray-400 hover:text-[#00F9FF] transition p-2"
            title="Admin Portal"
          >
            <Shield size={18} />
          </Link>

          {/* Language Switcher */}
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/20 text-xs font-semibold text-gray-200 hover:text-black hover:bg-[#00F9FF] hover:border-[#00F9FF] transition cursor-pointer"
            title="Toggle Language (EN / LT)"
          >
            <Languages size={15} />
            <span className="uppercase">{i18n.language || "EN"}</span>
          </button>

          {/* Book Event CTA */}
          <Link
            to="/booking"
            className="bg-[#00F9FF] hover:bg-cyan-400 text-black font-bold text-sm px-5 py-2 rounded-[8px] transition duration-200 shadow-[0_0_12px_rgba(0,249,255,0.4)]"
          >
            {t("book_event")}
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center space-x-2">
          <button
            onClick={toggleLanguage}
            className="p-2 text-xs font-bold text-[#00F9FF] border border-[#00F9FF]/40 rounded-lg uppercase"
          >
            {i18n.language || "EN"}
          </button>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 text-white hover:text-[#00F9FF] focus:outline-none cursor-pointer"
            aria-label="Toggle Navigation Menu"
          >
            {isMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMenuOpen && (
        <div className="md:hidden bg-black/95 border-b border-white/10 px-6 py-6 space-y-4 backdrop-blur-xl animate-in slide-in-from-top duration-300">
          <div className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setIsMenuOpen(false)}
                className="text-base font-semibold text-gray-200 hover:text-[#00F9FF] py-1"
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/login"
              onClick={() => setIsMenuOpen(false)}
              className="text-base font-semibold text-gray-400 hover:text-[#00F9FF] py-1 flex items-center gap-2"
            >
              <Shield size={16} /> Admin Portal
            </Link>
          </div>

          <div className="pt-4 border-t border-white/10">
            <Link
              to="/booking"
              onClick={() => setIsMenuOpen(false)}
              className="block w-full text-center bg-[#00F9FF] text-black font-bold py-2.5 rounded-xl shadow-lg"
            >
              {t("book_event")}
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
