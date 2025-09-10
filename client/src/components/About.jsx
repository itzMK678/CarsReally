// src/pages/About.jsx
import React from "react";
import EventCard from "../components/EventCard";
import StatsSection from "./Stats";
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
      <div className="max-w-5xl mx-auto text-center">
        
        <h1 className="text-5xl md:text-6xl font-extrabold mb-6 ">
          About CarsReally
        </h1>

        {/* Punchline */}
        <p className="text-lg md:text-xl mb-10 drop-shadow-[0_0_8px_#FF007F]">
          Discover the best automotive events in your area — from thrilling car
          shows to high-speed racing experiences.
        </p>

        {/* Content */}
       
         <div className="text-center mb-16">
        
      </div>
      
      {/* Features Grid */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

{/* Card1 */}
  <div className="relative rounded-2xl p-8 border border-[#00F9FF]/40  backdrop-blur-xl shadow-lg hover:shadow-[0_0_25px_#00F9FF] transition transform hover:-translate-y-2">
    {/* Neon border overlay */}
    <div className="absolute inset-0 rounded-2xl  opacity-10 pointer-events-none" />
    
    <div className="flex justify-center mb-6">
      <div className="w-16 h-16 bg-[#00F9FF]/20 border border-[#00F9FF] rounded-full flex items-center justify-center ">
        <svg
          className="w-8 h-8 text-[#00F9FF]"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
          />
        </svg>
      </div>
    </div>
    <h2 className="text-2xl font-semibold text-[#00F9FF] text-center mb-4 ">
      Professional Events
    </h2>
    <p className="text-gray-200 text-center">
      Expertly organized rally events with professional timing, safety measures,
      and support crews.
    </p>
  </div>

  {/* Card 2*/}
  <div className="relative rounded-2xl p-8 border border-[#00F9FF]/40   transition transform hover:-translate-y-2">
    <div className=" rounded-2xl  " />

    <div className="flex justify-center mb-6">
      <div className="w-16 h-16 bg-[#00F9FF]/20 border border-[#00F9FF] rounded-full flex items-center justify-center ">
        <svg
          className="w-8 h-8 text-[#00F9FF]"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
          />
        </svg>
      </div>
    </div>
    <h2 className="text-2xl font-semibold text-[#00F9FF] text-center mb-4 ">
      Real-time Tracking
    </h2>
    <p className="text-gray-200 text-center">
      Live timing and tracking systems to monitor progress and ensure
      participant safety throughout events.
    </p>
  </div>

  {/* Card 3                                                                                                                                                                                                                                                                     */}
  <div className="relative rounded-2xl p-8 border border-[#00F9FF]/40  ">
    <div className="absolute inset-0 rounded-2xl " />

    <div className="flex justify-center mb-6">
      <div className="w-16 h-16 bg-[#00F9FF]/20 border border-[#00F9FF] rounded-full flex items-center justify-center ">
        <svg
          className="w-8 h-8 text-[#00F9FF]"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
      </div>
    </div>
    <h2 className="text-2xl font-semibold text-[#00F9FF] text-center mb-4 ">
      Community Driven
    </h2>
    <p className="text-gray-200 text-center">
      Join a passionate community of rally enthusiasts and connect with fellow
      drivers and co-drivers.
    </p>
  </div>
</div>

      </div>
       </section>
<section>
    
</section>
   </div>
  );
};

export default About;
