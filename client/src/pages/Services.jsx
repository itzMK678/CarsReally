import React from "react";
import Quality from "../components/Quality";
import Service from "../assets/Services.jpg";
import Stats from "../components/home/Stats"
const Services = () => {
  const withoutPremium = [
    "Register your events easily",
    "Your Event name will be displayed on your event page",
    "We will Guide you organize your event",
    "Your event will be Shown on our website",
  ];

  const withPremium = [
    "Your own poster will be displayed instead of company poster",
    "You will get notifications on event day",
    "VIP tag will be shown on your event",
    "Priority support and visibility",
  ];

  return (
    <div className="py-10 bg-gradient-to-r from-black to-blue-950">
      {/* ✅ Hero Section */}
      <div
        className="relative w-full h-[300px] flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: `url(${Service})` }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50" />

        {/* Centered Content */}
        <div className="relative z-10 flex flex-col items-center text-center px-4">
          <p className="text-6xl font-bold text-white text-stroke">
            Services
          </p>
          <p className="mt-4 text-xl font-semibold text-white max-w-2xl">
           Service that we provide to make your event memorable
          </p>
        </div>
      </div>

      {/* ✅ Comparison Section */}
      <div className="max-w-5xl mx-auto gap-16 my-3 px-6 py-12">
        {/* Without Premium */}
        <div className="my-6 bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-lg border border-white/20 relative">
          <h2 className="absolute -top-6 left-30 text-4xl font-bold text-white mb-6 text-center">
            Our Services 
          </h2>
          <div className="space-y-6">
            {withoutPremium.map((point, index) => (
              <div
                key={index}
                data-aos="fade-left"
                className="bg-white/20 font-semibold rounded-[8px] px-4 py-3 text-white text-center hover:bg-white/30 transition"
              >
                {point}
              </div>
            ))}
          </div>
        </div>

        {/* With Premium */}
        <div className="my-6 mt-35 bg-cyan-700/20 backdrop-blur-lg rounded-2xl p-6 shadow-lg border border-cyan-400 relative">
          <h2 className="absolute -top-6 left-30 text-4xl font-bold text-cyan-300 mb-6 text-center">
           Our Vip Service
          </h2>
          <div className="space-y-4">
            {withPremium.map((point, index) => (
              <div
                key={index}
                data-aos="fade-right"
                className="bg-cyan-600/40 font-semibold rounded-[8px] px-4 py-3 text-purple-100 text-center hover:bg-cyan-600/60 transition"
              >
                {point}
              </div>
            ))}
          </div>
        </div>
      </div>

      <Quality />
      <Stats/>
      {/*Subscription Part */}
        <div className="flex flex-col items-center justify-center w-screen py-12 bg-black/40 backdrop-blur-lg rounded-2xl border border-white/10 max-w-2xl mx-auto shadow-lg">
      {/* Heading */}
      <h2 className="text-3xl font-bold text-[#00F9FF] mb-4">
        Join Our VIP List
      </h2>
      <p className="text-white text-sm mb-6 text-center max-w-sm">
        Get exclusive notifications, event updates, and VIP privileges right in your inbox.
      </p>

      
      <div className="flex w-full max-w-md bg-white/10 rounded-[8px] overflow-hidden border border-white/20">
        <input
          type="email"
          placeholder="Enter your email"
          className="flex-1 px-4 py-3 bg-transparent text-white placeholder-gray-300 focus:outline-none"
        />
        <button className="cursor-pointer bg-[#00F9FF] text-black font-semibold px-5 py-3 hover:bg-blue-400 transition">
          VIP Subscription
        </button>
      </div>
    </div>
    </div>
  );
};

export default Services;
