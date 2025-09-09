// src/components/Hero.jsx
import React from "react";
import racingVideo from "../assets/Racing.mp4";
const HeroSection = () => {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Video */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src={racingVideo} type="video/mp4" />
        
      </video>

    
      <div className="absolute top-0 left-0 w-full h-full bg-black/50"></div>

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white">
        <h1 className="text-5xl md:text-7xl font-extrabold drop-shadow-[0_0_12px_#00F9FF]">
          Ignite the Streets
        </h1>
        <p className="mt-4 text-lg md:text-2xl drop-shadow-[0_0_10px_#00F9FF]">
          Discover the best Automotive Events in Area
        </p>
        <a
          href="#create"
          className="mt-6 px-6 py-3 bg-[#00F9FF] border-white text-black font-semibold rounded-[8px]  transition drop-shadow-[0_0_12px_#00F9FF] hover:bg-white hover:text-[#00F9FF]"
        >
          Discover About Events
        </a>
      </div>
    </section>
  );
};

export default HeroSection;
