// src/components/EventCardHorizontal.jsx
import React from "react";

const UpcomingEvents = ({ image, title, year, day, month, time, location, description }) => {
  return (
    <div className="mt-20 flex flex-col sm:flex-row bg-black/30 backdrop-blur-lg rounded-2xl border border-white/10 shadow-lg hover:border-[#00F9FF] transition transform  max-w-4xl mx-auto">
      
      
      <div className="relative w-full sm:w-1/3">
        <img src={image} alt={title} className="h-48 rounded-l-2xl sm:h-60 w-full object-cover" />
        
        {/* Date & Month at Bottom */}
        
          <p className="absolute z-10 -top-18 right-35 text-[220px] font-bold text-[#00F9FF]">{day}</p>
          <p className="absolute z-10 bottom-2 -left-25 text-[40px] font-bold text-[#00F9FF] uppercase">{month}</p>
        
      </div>

      {/* Right Content Section */}
      <div className="flex flex-col justify-between p-4 sm:p-6 w-full sm:w-2/3">
        <div>
          {/* Title */}
          <h2 className="text-2xl font-bold mb-2 text-[#00F9FF]">{title}</h2>

          {/* Time */}
          <div className="flex items-center gap-2 mb-1 text-sm text-gray-300">
            <svg className="w-4 h-4 text-[#00F9FF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p>{time} • {year}</p>
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
          <p className="text-gray-300 text-sm">{description}</p>
        </div>

        {/* Button */}
        <button className="mt-4 w-full py-2 bg-[#00F9FF] text-black font-semibold rounded-lg hover:bg-blue-400 transition">
          View Details
        </button>
      </div>
    </div>
  );
};

export default UpcomingEvents;
