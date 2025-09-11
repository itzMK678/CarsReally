// src/components/Navbar.jsx
import React from "react";
import { Link } from "react-router-dom";
import { Languages } from 'lucide-react';
const Navbar = () => {
  return (
    <nav className="fixed  w-full z-50 text-white bg-black/80 backdrop-blur-md">
      <div className=" max-w-7xl mx-auto px-6 py-4 flex items-center justify-between  ">
        
        {/* Left - Logo */}
        <div className="w-1/3 text-2xl font-bold tracking-wide cursor-pointer text-[#00F9FF] drop-shadow-[0_0_2px_#00F9FF]">
          CarsReally
        </div>

        {/* Center - Menu Options */}
        <div className="w-1/3 flex justify-center space-x-10 ">
          <a
            href="/"
            className=" text-[15px] hover:text-[#00F9FF] hover:drop-shadow-[0_0_6px_#BC13FE] transition"
          >
           Home
          </a>
          <a
            href="#past"
            className=" text-[15px] hover:text-[#00F9FF] hover:drop-shadow-[0_0_6px_#BC13FE] transition"
          >
           Events
          </a>
          <a
            href="#today"
            className="text-[15px] hover:text-[#00F9FF] hover:drop-shadow-[0_0_6px_#00F9FF] transition"
          >
           Service
          </a>
          <a
            href="#upcoming"
            className="text-[15px] hover:text-[#00F9FF] hover:drop-shadow-[0_0_6px_#FF007F] transition"
          >
            Contact
          </a>
          
        </div>

        {/* Right - Button */}
        <div className="w-1/3 flex justify-end">
         <div className="text-[#00F9FF] border-[0.1px] border-[#00F9FF] p-2  flex items-center mr-3 rounded-full cursor-pointer hover:bg-[#00F9FF] hover:text-black "> <Languages /></div>
         <Link to="Booking"  className="bg-[#00F9FF] text-black px-5 py-2 rounded-[8PX] hover:bg-[#00a6ff] hover:text-black ">
Book Your Event
          
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
