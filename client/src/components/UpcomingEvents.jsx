import React from "react";
import { useNavigate } from "react-router-dom";

const UpcomingEvents = ({
  imageUrl,
  image,
  eventName,
  title,
  year,
  eventstartingDate,
  startTime,
  time,
  location,
  description,
  eventType,
}) => {
  const navigate = useNavigate();

  const finalName = eventName || title || "Motorsport Event";
  const finalImage = imageUrl || image || "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800";
  const finalTime = startTime || time || "TBA";
  const finalDate = eventstartingDate || "Upcoming";
  const finalYear = year || new Date().getFullYear();

  const handleViewDetails = () => {
    navigate("/event-details", {
      state: {
        imageUrl: finalImage,
        image: finalImage,
        eventName: finalName,
        title: finalName,
        year: finalYear,
        eventstartingDate: finalDate,
        startTime: finalTime,
        time: finalTime,
        location: location || "TBD",
        description: description || "No description provided.",
        eventType: eventType || "Rally",
      },
    });
  };

  return (
    <div className="mt-10 flex flex-col sm:flex-row bg-black/40 backdrop-blur-lg rounded-2xl border border-white/10 shadow-lg hover:border-[#00F9FF] transition transform max-w-4xl mx-auto overflow-hidden">
      {/* Left Image Section */}
      <div
        className="relative w-full sm:w-1/3 min-h-[200px] sm:min-h-auto bg-cover bg-center"
        style={{ backgroundImage: `url(${finalImage})` }}
      >
        {/* Date Overlay */}
        <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/20">
          <p className="text-xs uppercase font-bold text-[#00F9FF]">{finalDate}</p>
        </div>
      </div>

      {/* Right Content Section */}
      <div className="flex flex-col justify-between p-5 sm:p-6 w-full sm:w-2/3">
        <div>
          <h2 className="text-2xl font-bold mb-2 text-[#00F9FF]">{finalName}</h2>

          {/* Time & Year */}
          <div className="flex items-center gap-2 mb-2 text-sm text-gray-300">
            <svg className="w-4 h-4 text-[#00F9FF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p>{finalTime} • {finalDate}{finalYear ? `, ${finalYear}` : ""}</p>
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
          <p className="text-gray-300 text-sm line-clamp-3">{description}</p>
        </div>

        {/* View Details Button */}
        <button
          onClick={handleViewDetails}
          className="mt-5 w-full py-2.5 bg-[#00F9FF] hover:bg-cyan-400 text-black font-semibold rounded-lg transition cursor-pointer shadow-[0_0_10px_rgba(0,249,255,0.3)]"
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default UpcomingEvents;