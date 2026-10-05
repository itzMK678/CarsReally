import React from "react";
import EventCard from "../EventCard";
import { useTranslation } from "react-i18next";

const BestEvents = () => {
  const { t } = useTranslation();
  const events = [
    {
      title: "Night Drift Challenge",
      eventName: "Night Drift Challenge",
      day: "22",
      month: "Sept",
      year: "2026",
      time: "8:00 PM",
      location: "Los Angeles, CA",
      image: "https://images.pexels.com/photos/1402787/pexels-photo-1402787.jpeg",
      imageUrl: "https://images.pexels.com/photos/1402787/pexels-photo-1402787.jpeg",
      eventType: "Stage Rally",
      description:
        "An electrifying night of speed, adrenaline, and neon lights as top racers drift through the city streets.",
    },
    {
      title: "Supercar Expo",
      eventName: "Supercar Expo",
      day: "05",
      month: "Aug",
      year: "2026",
      time: "10:00 AM",
      location: "New York, NY",
      image: "https://images.pexels.com/photos/210019/pexels-photo-210019.jpeg",
      imageUrl: "https://images.pexels.com/photos/210019/pexels-photo-210019.jpeg",
      eventType: "Hill Climb",
      description:
        "Experience the world's most luxurious supercars up close with live showcases, test drives, and networking opportunities.",
    },
    {
      title: "Street Racing Fest",
      eventName: "Street Racing Fest",
      day: "10",
      month: "Nov",
      year: "2026",
      time: "7:30 PM",
      location: "Miami, FL",
      image: "https://images.pexels.com/photos/358070/pexels-photo-358070.jpeg",
      imageUrl: "https://images.pexels.com/photos/358070/pexels-photo-358070.jpeg",
      eventType: "Rallycross",
      description:
        "Feel the heat of underground racing culture with fast cars, loud music, and unforgettable Miami vibes.",
    },
  ];

  return (
    <div className="flex flex-col bg-gradient-to-r from-black to-blue-950">
      <section className="py-16 px-6">
        <div className="text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {t("our_best_events")}
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-10">
            {t("best_events_desc")}
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
          {events.map((event, index) => (
            <EventCard key={index} {...event} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default BestEvents;
