// src/components/EventCard.jsx
import React from "react";

const EventCard = ({ title, date, time, location, description }) => {
  return (
    <div className="text-white max-w-sm mx-auto bg-black backdrop-blur-lg rounded-2xl border border-[#00F9FF]/50 shadow-lg hover:shadow-[0_0_12px_#00F9FF] transition transform  p-6 ">
      
      
      <h2 className="text-2xl font-bold mb-4 text-[#00F9FF] ">
        {title}
      </h2>

      {/* Date & Time */}
      <div className="flex items-center gap-2 mb-2 text-sm text-gray-300">
        <svg className="w-4 h-4 text-[#00F9FF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <p>{date} • {time}</p>
      </div>

      {/* Location */}
      <div className="flex items-center gap-2 mb-3 text-sm text-gray-300">
        <svg className="w-4 h-4 text-[#00F9FF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        <p>{location}</p>
      </div>

      {/* Description */}
      <p className="text-gray-300 text-sm mb-4">{description}</p>

      {/* Button */}
      <button className="cursor-pointer mt-auto item-end w-full py-2 bg-[#00F9FF] text-black font-semibold rounded-lg hover:bg-blue-400 transition ">
        View Details
      </button>
    </div>
  );
};

export default EventCard;
