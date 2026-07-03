import React from "react";
// import { io } from "socket.io-client";
// const socket = io("http://localhost:5000");
import { useNavigate } from "react-router-dom";

const UpcomingEvents = ({ imageUrl, eventName, year, eventstartingDate, startTime, location, description }) => {
const navigate = useNavigate();

const handleViewDetails = () => {
  navigate("/event-details", {
    state: { imageUrl, eventName, year, eventstartingDate, startTime, location, description },
  });
};


  return (
    <div className="mt-20 flex flex-col sm:flex-row bg-black/30 backdrop-blur-lg rounded-2xl border border-white/10 shadow-lg hover:border-[#00F9FF] transition transform max-w-4xl mx-auto ">
      
      {/* Left Image Section */}
      <div
        className="relative w-full sm:w-1/3 h-60 sm:h-auto rounded-l-2xl bg-cover bg-center"
        style={{ backgroundImage: `url(${imageUrl})` }}
      >
        {/* Date & Month Overlay */}
        <div className="border-white flex absolute -top-8 left-4 bg-black/50 backdrop-blur-sm px-3 py-2 rounded-lg text-center">
        
          <p className="text-md mt-4 ml-1 uppercase font-bold text-[#00F9FF]">{eventstartingDate}</p>
        </div>
      </div>

      {/* Right Content Section */}
      <div className="flex flex-col justify-between p-4 sm:p-6 w-full sm:w-2/3">
        <div>
          <h2 className="text-2xl font-bold mb-2 text-[#00F9FF]">{eventName}</h2>

          {/* Time */}
          <div className="flex items-center gap-2 mb-1 text-sm text-gray-300">
            <svg className="w-4 h-4 text-[#00F9FF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p>{startTime} • {eventstartingDate}, {year}</p>
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

        {/* View Details Button */}
       <button
  onClick={handleViewDetails}
  className="mt-4 w-full py-2 bg-[#00F9FF] text-black font-semibold rounded-lg hover:bg-blue-400 transition"
>
  View Details
</button>
      </div>
    </div>
  );
};
export default UpcomingEvents;