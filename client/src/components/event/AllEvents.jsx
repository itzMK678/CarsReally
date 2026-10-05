import React from "react";
import Event1 from "../../assets/Event1.jpeg";
import Event2 from "../../assets/Event2.jpeg";
import Event3 from "../../assets/Event3.jpeg";
import UpcomingEvents from "../UpcomingEvents";

const AllEvents = () => {
  const events = [
    {
      eventName: "Night Drift Challenge",
      title: "Night Drift Challenge",
      year: "2026",
      eventstartingDate: "22 September",
      startTime: "8:00 PM",
      location: "Los Angeles, CA",
      imageUrl: Event1,
      image: Event1,
      eventType: "Stage Rally",
      description:
        "An electrifying night of speed, adrenaline, and neon lights as top racers drift through the city streets.",
    },
    {
      eventName: "Supercar Expo",
      title: "Supercar Expo",
      year: "2026",
      eventstartingDate: "05 August",
      startTime: "10:00 AM",
      location: "New York, NY",
      imageUrl: Event2,
      image: Event2,
      eventType: "Hill Climb",
      description:
        "Experience the world's most luxurious supercars up close with live showcases, test drives, and networking opportunities.",
    },
    {
      eventName: "Street Racing Fest",
      title: "Street Racing Fest",
      year: "2026",
      eventstartingDate: "10 November",
      startTime: "7:30 PM",
      location: "Miami, FL",
      imageUrl: Event3,
      image: Event3,
      eventType: "Rallycross",
      description:
        "Feel the heat of underground racing culture with fast cars, loud music, and unforgettable Miami vibes.",
    },
  ];

  return (
    <div className="py-6">
      <div className="text-center mb-8">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-3">
          Our <span className="text-[#00F9FF]">Featured</span> Rallies
        </h2>
        <p className="text-gray-400 max-w-xl mx-auto">
          Explore upcoming sanctioned races and enthusiast rallies.
        </p>
      </div>

      <div className="space-y-6">
        {events.map((event, index) => (
          <UpcomingEvents key={index} {...event} />
        ))}
      </div>
    </div>
  );
};

export default AllEvents;