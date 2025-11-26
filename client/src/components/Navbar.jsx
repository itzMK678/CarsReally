// src/components/Navbar.jsx
import React from "react";
import { Link } from "react-router-dom";
import { Languages } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useState } from "react";

const Navbar = () => {
  const { t, i18n } = useTranslation(); // ✅ Get t & i18n here
 const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleLanguage = () => {
    const nextLang = i18n.language === "en" ? "lt" : "en";
    i18n.changeLanguage(nextLang);
    document.body.dir = "ltr"; // Lithuanian uses LTR
  };

  return (
    <nav className="fixed w-full z-50 text-white bg-black/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Left - Logo */}
        <div className="w-1/3 text-2xl font-bold tracking-wide cursor-pointer text-[#00F9FF] drop-shadow-[0_0_2px_#00F9FF]">
          {t("logo")}
        </div>

        {/* Center - Menu Options */}
        <div className=" relative bg-[#00F9FF] text-black  border-[0.1px] border-[#00F9FF] p-1.5 px-3  rounded-[8px] justify-center space-x-10 hover:bg-[#00F9FF] hover:text-black cursor-pointer md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          Site Menu
         <div className={`${isMenuOpen ? 'block' : 'hidden'} bg-[#00F9FF] text-black rounded-[8px] absolute -left-4 flex flex-col border-[0.1px] border-[#00F9FF] items-center space-y-4 hover:bg-[#00F9FF] hover:text-black cursor-pointer`}>
          
    <Link
      to="/"
      className="text-[15px] px-10 py-2 rounded-[8px] hover:text-[#00F9FF] hover:drop-shadow-[0_0_6px_#BC13FE] transition hover:bg-black"
    >
      {t("home")}
    </Link>

    <Link
      to="/event"
        className="text-[15px] px-10 py-2 rounded-[8px] hover:text-[#00F9FF] hover:drop-shadow-[0_0_6px_#BC13FE] transition hover:bg-black"
    >
      {t("events")}
    </Link>

    <Link
      to="/services"
        className="text-[15px] px-10 py-2 rounded-[8px] hover:text-[#00F9FF] hover:drop-shadow-[0_0_6px_#BC13FE] transition hover:bg-black"
    >
      {t("service")}
    </Link>

    <Link
      to="/contact"
        className="text-[15px] px-10 py-2 rounded-[8px] hover:text-[#00F9FF] hover:drop-shadow-[0_0_6px_#BC13FE] transition hover:bg-black"
    >
      {t("contact")}
    </Link>
  </div>
        </div>
       
        <div className=" hidden w-1/3  justify-center space-x-10 md:flex">
        
          <Link
            to="/"
            className="text-[15px] hover:text-[#00F9FF] hover:drop-shadow-[0_0_6px_#BC13FE] transition"
          >
            {t("home")}
          </Link>

          <Link
            to="/event"
            className="text-[15px] hover:text-[#00F9FF] hover:drop-shadow-[0_0_6px_#BC13FE] transition"
          >
            {t("events")}
          </Link>

          <Link
            to="/services"
            className="text-[15px] hover:text-[#00F9FF] hover:drop-shadow-[0_0_6px_#00F9FF] transition"
          >
            {t("service")}
          </Link>

          <Link
            to="/contact"
            className="text-[15px] hover:text-[#00F9FF] hover:drop-shadow-[0_0_6px_#FF007F] transition"
          >
            {t("contact")}
          </Link>
        </div>

        {/* Right - Button */}
        <div className="w-1/3 flex justify-end">
          <div
            className="text-[#00F9FF] border-[0.1px] border-[#00F9FF] p-2 flex items-center mr-3 rounded-full cursor-pointer hover:bg-[#00F9FF] hover:text-black"
            onClick={toggleLanguage}
          >
            <Languages />
          </div>

          <Link
            to="/Booking"
            className="bg-[#00F9FF] text-black px-5 py-2 rounded-[8px] hover:bg-[#00a6ff] hover:text-black"
          >
            {t("book_event")}
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
