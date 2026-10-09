// src/components/HeroSection.jsx
import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import racingVideo from "../assets/Racing.mp4";
import { ChevronRight } from "lucide-react";

const HeroSection = () => {
  const { t } = useTranslation();

  return (
    <section className="relative h-screen w-full overflow-hidden flex items-center justify-center">
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

      {/* Dim Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/90" />

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white">
        <h1 className="text-5xl md:text-7xl font-extrabold drop-shadow-[0_0_12px_#00F9FF]">
          {t("Ignite_the_Streets")}
        </h1>
        <p className="mt-5 text-lg md:text-2xl text-gray-200 max-w-2xl drop-shadow-[0_0_10px_rgba(0,0,0,0.8)]">
          {t("Discover_the_best_Automotive_Events_in_Area")}
        </p>

        <div className="mt-8 flex flex-wrap gap-4 justify-center">
          <Link
            to="/event"
            className="flex items-center gap-2 px-8 py-3.5 bg-[#00F9FF] hover:bg-cyan-400 text-black font-bold rounded-[8px] transition duration-200 shadow-[0_0_15px_rgba(0,249,255,0.5)] cursor-pointer"
          >
            {t("learn_what_new")} 
          </Link>

          <Link
            to="/booking"
            className="px-8 py-3.5 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-[8px] border border-white/20 transition duration-200 backdrop-blur-md cursor-pointer"
          >
            {t("book_event")}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
