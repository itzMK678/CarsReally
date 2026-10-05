import React, { useState, useEffect } from "react";
import io from "socket.io-client";

import HeroSection from "../components/HeroSection";
import PartnersSection from "../components/PatnersSection";
import ad from "../assets/Advertisement.jpg";
import BestEvents from "../components/home/BestEvents";
import UpcomingEvents from "../components/UpcomingEvents";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const FALLBACK_EVENTS = [
  {
    _id: "demo-1",
    imageUrl: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800",
    eventName: "Apex Horizon Rally",
    eventstartingDate: "2026-10-15",
    startTime: "10:00 AM",
    location: "Silverstone Circuit, UK",
    description: "High-octane tarmac and gravel stages featuring the finest vintage and modern rally cars.",
  },
  {
    _id: "demo-2",
    imageUrl: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800",
    eventName: "Alpine Snow Drift",
    eventstartingDate: "2026-11-20",
    startTime: "06:00 PM",
    location: "Innsbruck, Austria",
    description: "Night ice trial pushing drivers and machines to the edge of grip and precision.",
  },
];

const Homepage = () => {
  const [events, setEvents] = useState(FALLBACK_EVENTS);

  useEffect(() => {
    // Attempt fetch from backend
    fetch(`${API_URL}/trueEvents`)
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setEvents(data);
        }
      })
      .catch((err) => {
        // Fallback to demo events gracefully
        console.warn("Backend not available, using offline rally events:", err.message);
      });

    // Real-time socket listener
    let socket;
    try {
      socket = io(API_URL, { reconnectionAttempts: 2, timeout: 3000 });
      socket.on("eventUpdated", (updatedEvent) => {
        if (!updatedEvent.Permission) return;
        setEvents((prevEvents) => {
          const exists = prevEvents.find((ev) => ev._id === updatedEvent._id);
          if (exists) {
            return prevEvents.map((ev) =>
              ev._id === updatedEvent._id ? updatedEvent : ev
            );
          }
          return [updatedEvent, ...prevEvents];
        });
      });
    } catch {
      // Socket failed, non-fatal
    }

    return () => {
      if (socket) socket.disconnect();
    };
  }, []);

  return (
    <>
      <HeroSection />
      <PartnersSection />
      <BestEvents />

      {/* Banner */}
      <div
        className="w-full h-[220px] bg-cover bg-center flex items-center justify-center relative border-y border-white/10"
        style={{ backgroundImage: `url(${ad})` }}
      >
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Upcoming Events Section */}
      <div className="py-20 bg-gradient-to-r from-black to-blue-950 px-4">
        <p className="text-center text-4xl md:text-5xl font-bold text-white mb-3">
          Our <span className="text-[#00d3f3]">Upcoming</span> Events
        </p>
        <p className="text-center text-gray-400 mb-8 max-w-xl mx-auto">
          Sanctioned races, time-attacks, and enthusiast rallies approved by CarsReally.
        </p>

        {events.length === 0 ? (
          <p className="text-center text-white py-12">No approved events found.</p>
        ) : (
          events.map((event) => {
            const startDate = new Date(event.eventstartingDate);
            const isValidDate = !isNaN(startDate.getTime());

            const formattedDate = isValidDate
              ? `${startDate.getDate()} ${startDate.toLocaleString("default", {
                  month: "long",
                })}`
              : event.eventstartingDate || "Upcoming";

            const yearVal = isValidDate ? startDate.getFullYear() : "2026";

            return (
              <UpcomingEvents
                key={event._id || event.eventName}
                imageUrl={event.imageUrl}
                eventName={event.eventName}
                year={yearVal}
                eventstartingDate={formattedDate}
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
