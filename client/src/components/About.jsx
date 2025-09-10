// src/pages/About.jsx
import React from "react";
import EventCard from "../components/EventCard";
import StatsSection from "./Stats";
import Quality from "./Quality";
import ContactBox from "./ContactBox";

const About = () => {
  const events = [
  {
    title: "Night Drift Challenge",
    date: "Sept 22, 2025",
    time: "8:00 PM",
    location: "Los Angeles, CA",
    image: "https://images.pexels.com/photos/1402787/pexels-photo-1402787.jpeg",
    description:
      "An electrifying night of speed, adrenaline, and neon lights as top racers drift through the city streets.",
  },
  {
    title: "Supercar Expo 2025",
    date: "Oct 5, 2025",
    time: "10:00 AM",
    location: "New York, NY",
    image: "https://images.pexels.com/photos/210019/pexels-photo-210019.jpeg",
    description:
      "Experience the world's most luxurious supercars up close with live showcases, test drives, and networking opportunities.",
  },
  {
    title: "Street Racing Fest",
    date: "Nov 10, 2025",
    time: "7:30 PM",
    location: "Miami, FL",
    image: "https://images.pexels.com/photos/358070/pexels-photo-358070.jpeg",
    description:
      "Feel the heat of underground racing culture with fast cars, loud music, and unforgettable Miami vibes.",
  },
];


  return (
    <div className="flex flex-col bg-black">
        <StatsSection/>
 <section className="min-h-screen  py-16 px-6">
       <div className="text-center">
        <h2 className="text-5xl font-bold text-white mb-4">Upcoming Rally Events</h2>
        <p className="text-lg text-gray-600  mx-auto mb-8">
          Don't miss out on these exciting rally adventures. Register now and secure your spot!
        </p>
        
      </div>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
        {events.map((event, index) => (
          <EventCard key={index} {...event} />
        ))}
      </div>
    </section>

    <section className="min-h-screen  text-white flex items-center justify-center px-6 ">
      <div className="group max-w-5xl mx-auto text-center">
        
        <h1 className="text-5xl md:text-6xl font-extrabold mb-6 ">
          About CarsReally
        </h1>
        <p className="text-lg md:text-xl mb-10 drop-shadow-[0_0_8px_#FF007F]">
          Why we are best and why to beleive us
        </p>
  
<Quality />
<ContactBox />
      </div>
       </section>
<section>
    
</section>
   </div>
  );
};

export default About;
