import React, { useState } from "react";
import ClientCalendar from "../components/event/ClientCalendar";
import EventsImage from "../assets/Calender.jpeg";
import AllEvents from "../components/event/AllEvents";
import Detail from "../components/Detail"

const Events = () => {
  const [activeTab, setActiveTab] = useState("ClientCalendar"); // default tab

  let content;
  switch (activeTab) {
    case "ClientCalendar":
      content = <ClientCalendar />;
      break;
    case "AllEvents":
      content = <AllEvents />;
      break;
    default:
      content = <ClientCalendar />;
  }

  return (
    <>
      <div className="pt-10 min-h-screen bg-gradient-to-r from-black to-blue-950">
        {/* Header Section */}
        <div
          className="relative w-full h-[300px] flex items-center justify-center bg-cover bg-center"
          style={{ backgroundImage: `url(${EventsImage})` }}
        >
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/50" />

          {/* Header Text */}
          <div className="relative z-10 flex flex-col items-center text-center px-4">
            <p className="text-6xl font-bold text-white text-stroke">Events</p>
            <p className="mt-4 text-xl font-semibold text-white max-w-2xl">
              Service that we provide to make your event memorable
            </p>
          </div>

          {/* Tab Buttons */}
          <div className="absolute bottom-4 flex bg-gray-100 w-fit rounded-[8px] z-10">
            <button
              className={`p-2 m-1 w-[150px] rounded-l-[8px] cursor-pointer ${
                activeTab === "ClientCalendar"
                  ? "bg-[#00f9ff]"
                  : "bg-[#1ecfd2]"
              }`}
              onClick={() => setActiveTab("ClientCalendar")}
            >
              Client Calendar
            </button>

            <button
              className={`p-2 m-1 w-[150px] rounded-r-[8px] cursor-pointer ${
                activeTab === "AllEvents" ? "bg-[#00f9ff]" : "bg-[#1ecfd2]"
              }`}
              onClick={() => setActiveTab("AllEvents")}
            >
              All Events
            </button>
          </div>
        </div>
<Detail/>
        {/* Render Tab Content */}
        <div className="p-6">{content}</div>
      </div>
    </>
  );
};

export default Events;
