// src/pages/Services.jsx
import React from "react";
import { Link } from "react-router-dom";
import Quality from "../components/Quality";
import Service from "../assets/Services.jpg";
import Stats from "../components/home/Stats";
import { Check, ShieldCheck, Sparkles } from "lucide-react";

const Services = () => {
  const withoutPremium = [
    "Register your events easily",
    "Your Event name will be displayed on your event page",
    "We will Guide you organize your event",
    "Your event will be Shown on our website",
  ];

  const withPremium = [
    "Your own custom poster displayed on the homepage",
    "Automated notifications sent on event day",
    "Exclusive VIP Badge displayed on your event",
    "Priority support and featured banner visibility",
  ];

  return (
    <div className="py-16 bg-gradient-to-r from-black to-blue-950 min-h-screen flex flex-col justify-center items-center">
      {/* Hero Section */}
      <div
        className="relative w-full h-[300px] flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: `url(${Service})` }}
      >
        <div className="absolute inset-0 bg-black/60" />

        <div className="relative z-10 flex flex-col items-center text-center px-4">
          <p className="text-5xl md:text-6xl font-bold text-white text-stroke">
            Services
          </p>
          <p className="mt-4 text-xl font-semibold text-gray-200 max-w-2xl">
            Services designed to give your motorsport event maximum reach and impact
          </p>
        </div>
      </div>

      {/* Comparison Section */}
      <div className="w-fit mx-auto gap-16 my-3 px-6 py-12">
        {/* Standard Services */}
        <div className="my-6 bg-white/10 w-full max-w-[800px] backdrop-blur-lg rounded-2xl p-6 shadow-lg border border-white/20 relative">
          <h2 className="absolute -top-6 left-10 md:left-30 text-3xl md:text-4xl font-bold text-white mb-6 text-center">
            Standard Services
          </h2>

          <div className="space-y-4 mt-4">
            {withoutPremium.map((point, index) => (
              <div
                key={index}
                data-aos="fade-left"
                className="bg-white/10 font-semibold rounded-lg px-4 py-3 text-white flex items-center gap-3 hover:bg-white/20 transition"
              >
                
                <span>{point}</span>
              </div>
            ))}
          </div>
        </div>

        {/* VIP Services */}
        <div className="my-6 w-full max-w-[800px] mt-16 bg-cyan-900/30 backdrop-blur-lg rounded-2xl p-6 shadow-lg border border-[#00F9FF]/40 relative">
          <h2 className="absolute -top-6 left-10 md:left-30 text-3xl md:text-4xl font-bold text-white mb-6 text-center">
            VIP Services
          </h2>

          <div className="space-y-4 mt-4">
            {withPremium.map((point, index) => (
              <div
                key={index}
                data-aos="fade-right"
                className="bg-cyan-600/20 font-semibold rounded-lg px-4 py-3 text-cyan-100 flex items-center gap-3 border border-cyan-500/20 hover:bg-cyan-600/30 transition"
              >
               
                <span>{point}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Quality />
      <Stats />

      {/* VIP Subscription Card */}
      <div className="text-center mb-12 mt-12 px-4 max-w-xl mx-auto">
        <h1 className="text-4xl font-bold text-white">VIP Subscription</h1>
        <p className="mt-3 text-gray-300 text-sm">
          Upgrade your event package for premier placement and dedicated support.
        </p>

        <div className="mt-8 bg-black/50 backdrop-blur-xl border border-[#00F9FF]/40 rounded-2xl p-8 shadow-2xl text-left space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div>
              <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                <ShieldCheck className="text-[#00F9FF]" /> VIP Pass
              </h3>
              <p className="text-gray-400 text-xs mt-1">Full premium promotion bundle</p>
            </div>
            <div className="text-right">
              <span className="text-3xl font-extrabold text-[#00F9FF]">$10</span>
              <span className="text-gray-400 text-xs"> / event</span>
            </div>
          </div>

          <ul className="space-y-2.5 text-sm text-gray-300">
            <li className="flex items-center gap-2">
              <Check size={16} className="text-[#00F9FF]" /> Prominent homepage hero feature
            </li>
            <li className="flex items-center gap-2">
              <Check size={16} className="text-[#00F9FF]" /> Verified VIP badge on all listings
            </li>
            <li className="flex items-center gap-2">
              <Check size={16} className="text-[#00F9FF]" /> Direct spectator booking notifications
            </li>
          </ul>

          <div className="pt-2">
            <Link
              to="/booking"
              className="block w-full text-center py-3 bg-[#00F9FF] hover:bg-cyan-400 text-black font-bold rounded-xl transition duration-200 shadow-[0_0_15px_rgba(0,249,255,0.4)]"
            >
              Book an Event with VIP Perks
            </Link>
            <p className="text-center text-xs text-gray-400 mt-2">
              Inquiries or custom sponsorship packages? <Link to="/contact" className="text-[#00F9FF] underline">Contact our team</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;