import React, { useState, useEffect } from "react";
// import io from "socket.io-client";

import HeroSection from "../components/HeroSection";
import PartnersSection from "../components/PatnersSection";
import ad from "../assets/Advertisement.jpg";
import BestEvents from "../components/home/BestEvents";
import UpcomingEvents from "../components/UpcomingEvents";

// ✅ connect to socket server
// const socket = io("http://localhost:5000");

const Homepage = () => {
  // const [events, setEvents] = useState([]);
const [events] = useState([
  {
    _id: "1",
    imageUrl: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800",
    eventName: "Tech Conference",
    eventstartingDate: "2026-10-15",
    startTime: "10:00 AM",
    location: "Lahore",
    description: "Annual technology conference.",
  },
  {
    _id: "2",
    imageUrl: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800",
    eventName: "Music Festival",
    eventstartingDate: "2026-11-20",
    startTime: "6:00 PM",
    location: "Karachi",
    description: "Live music with top artists.",
  },
]);
  // useEffect(() => {
  //   // Fetch approved events initially
  //   fetch("http://localhost:5000/trueEvents")
  //     .then((res) => res.json())
  //     .then((data) => setEvents(data))
  //     .catch((err) => console.error("❌ Error fetching events:", err));

  //   // 🔥 Listen for real-time updates
  //   socket.on("eventUpdated", (updatedEvent) => {
  //     console.log("📢 Event update received:", updatedEvent);

  //     setEvents((prevEvents) => {
  //       // If the updated event already exists, replace it
  //       const exists = prevEvents.find((ev) => ev._id === updatedEvent._id);
  //       if (exists) {
  //         return prevEvents.map((ev) =>
  //           ev._id === updatedEvent._id ? updatedEvent : ev
  //         );
  //       }
  //       // Otherwise, add it (new event)
  //       return [...prevEvents, updatedEvent];
  //     });
  //   });

  //   // Cleanup on unmount
  //   return () => {
  //     socket.off("eventUpdated");
  //   };
  // }, []);

  return (
    <>
      <HeroSection />
      <PartnersSection />
      <BestEvents />

      <div
        className="w-fit-screen h-[200px] bg-cover bg-center flex items-center justify-center relative"
        style={{ backgroundImage: `url(${ad})` }}
      ></div>

      <div className="py-20 bg-gradient-to-r from-black to-blue-950">
        <p className="text-center text-5xl font-bold text-white mb-4">
          Our <span className="text-[#00d3f3]">Up-coming</span> Events
        </p>

        {events.length === 0 ? (
          <p className="text-center text-white">No events found</p>
        ) : (
          events.map((event, index) => {
            const startDate = new Date(event.eventstartingDate);

            return (
              <UpcomingEvents
                key={index}
                imageUrl={event.imageUrl}
                eventName={event.eventName}
                year={startDate.getFullYear()}
                eventstartingDate={`${startDate.getDate()} ${startDate.toLocaleString(
                  "default",
                  { month: "long" }
                )}`}
                startTime={event.startTime}
                location={event.location}
                description={event.description}
              />
            );
          })
        )}
      </div>
    </>
  );
};

export default Homepage;
