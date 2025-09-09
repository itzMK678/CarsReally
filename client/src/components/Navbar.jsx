// src/components/Navbar.jsx
import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-black text-white shadow-lg fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        
        {/* Left - Logo */}
        <div className="w-1/3 text-2xl font-bold tracking-wide cursor-pointer text-[#00F9FF] drop-shadow-[0_0_2px_#00F9FF]">
          CarsReally
        </div>

        {/* Center - Menu Options */}
        <div className="w-1/3 flex justify-center space-x-10 ">
          <a
            href="#past"
            className=" text-[15px] hover:text-[#00F9FF] hover:drop-shadow-[0_0_6px_#BC13FE] transition"
          >
            Past Event
          </a>
          <a
            href="#today"
            className="text-[15px] hover:text-[#00F9FF] hover:drop-shadow-[0_0_6px_#00F9FF] transition"
          >
            Today Event
          </a>
          <a
            href="#upcoming"
            className="text-[15px] hover:text-[#FF007F] hover:drop-shadow-[0_0_6px_#FF007F] transition"
          >
            Upcoming Event
          </a>
        </div>

        {/* Right - Button */}
        <div className="w-1/3 flex justify-end">
          <a
            href="#create"
            className="bg-[#00F9FF] text-black px-5 py-2 rounded-[8PX] hover:bg-[#00a6ff] hover:text-black "
          >
            Create Your Event
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
