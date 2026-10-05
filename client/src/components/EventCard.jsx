// src/components/EventCard.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

const EventCard = ({
  title,
  eventName,
  year,
  day,
  month,
  eventstartingDate,
  time,
  startTime,
  location,
  description,
  image,
  imageUrl,
  eventType,
}) => {
  const navigate = useNavigate();

  const finalTitle = title || eventName || "Featured Event";
  const finalImage =
    imageUrl ||
    image ||
    "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800";
  const finalTime = time || startTime || "TBA";
  const finalDate =
    eventstartingDate ||
    (month && day ? `${day} ${month}` : "Upcoming");
  const finalYear = year || new Date().getFullYear();

  const handleViewDetails = () => {
    navigate("/event-details", {
      state: {
        imageUrl: finalImage,
        image: finalImage,
        eventName: finalTitle,
        title: finalTitle,
        year: finalYear,
        eventstartingDate: finalDate,
        startTime: finalTime,
        time: finalTime,
        location: location || "TBD",
        description: description || "No description provided.",
        eventType: eventType || "Rally Event",
      },
    });
  };

  return (
    <div className="flex flex-col justify-between text-white max-w-sm w-full mx-auto bg-black/40 backdrop-blur-lg rounded-2xl border border-white/10 shadow-lg hover:border-[#00F9FF] transition duration-300 overflow-hidden group">
      {/* Event Thumbnail */}
      {finalImage && (
        <div className="relative w-full h-48 overflow-hidden bg-gray-900">
          <img
            src={finalImage}
            alt={finalTitle}
            className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
          />
          <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-md text-xs font-semibold text-[#00F9FF] border border-white/10">
            {finalDate}
          </div>
        </div>
      )}

      <div className="p-6 flex flex-col flex-1 justify-between">
        <div>
          <h2 className="text-xl font-bold mb-3 text-[#00F9FF] line-clamp-1">
            {finalTitle}
          </h2>

          {/* Date & Time */}
          <div className="flex items-center gap-2 mb-2 text-sm text-gray-300">
            <svg className="w-4 h-4 text-[#00F9FF] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p className="line-clamp-1">{finalDate}, {finalYear} • {finalTime}</p>
          </div>

          {/* Location */}
          <div className="flex items-center gap-2 mb-3 text-sm text-gray-300">
            <svg className="w-4 h-4 text-[#00F9FF] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <p className="line-clamp-1">{location}</p>
          </div>

          {/* Description */}
          <p className="text-gray-300 text-sm mb-4 line-clamp-2">{description}</p>
        </div>

        {/* View Details Button */}
        <button
          onClick={handleViewDetails}
          className="cursor-pointer mt-4 w-full py-2.5 bg-[#00F9FF] hover:bg-cyan-400 text-black font-semibold rounded-lg transition duration-200 shadow-[0_0_10px_rgba(0,249,255,0.2)]"
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default EventCard;
