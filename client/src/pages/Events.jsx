import React, { useState } from "react";
import ClientCalendar from "../components/event/ClientCalendar";
import EventsImage from "../assets/Calender.jpeg";
import AllEvents from "../components/event/AllEvents";

const Events = () => {
  const [activeTab, setActiveTab] = useState("ClientCalendar");

  return (
    <div className="pt-16 min-h-screen bg-gradient-to-r from-black to-blue-950">
      {/* Header Section */}
      <div
        className="relative w-full h-[320px] flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: `url(${EventsImage})` }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/60" />

        {/* Header Text */}
        <div className="relative z-10 flex flex-col items-center text-center px-4">
          <p className="text-5xl md:text-6xl font-bold text-white text-stroke">
            Rally & Car Events
          </p>
          <p className="mt-4 text-lg md:text-xl font-semibold text-gray-200 max-w-2xl">
            Explore upcoming motorsport rallies, car exhibitions, and client event schedules.
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="absolute bottom-4 flex bg-gray-900/80 backdrop-blur-md p-1 border border-white/20 rounded-xl z-10">
          <button
            className={`px-5 py-2 font-semibold rounded-lg transition cursor-pointer ${
              activeTab === "ClientCalendar"
                ? "bg-[#00f9ff] text-black shadow-[0_0_10px_#00f9ff]"
                : "text-gray-300 hover:text-white"
            }`}
            onClick={() => setActiveTab("ClientCalendar")}
          >
            Client Calendar
          </button>

          <button
            className={`px-5 py-2 font-semibold rounded-lg transition cursor-pointer ${
              activeTab === "AllEvents"
                ? "bg-[#00f9ff] text-black shadow-[0_0_10px_#00f9ff]"
                : "text-gray-300 hover:text-white"
            }`}
            onClick={() => setActiveTab("AllEvents")}
          >
            All Events
          </button>
        </div>
      </div>

      {/* Render Tab Content */}
      <div className="p-4 md:p-8">
        {activeTab === "ClientCalendar" ? <ClientCalendar /> : <AllEvents />}
      </div>
    </div>
  );
};

export default Events;
