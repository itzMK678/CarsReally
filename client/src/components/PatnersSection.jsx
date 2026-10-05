import React from "react";
import { useTranslation } from "react-i18next";
import partner1 from "../assets/patner1.jpg";
import partner2 from "../assets/patner2.jpg";
import partner3 from "../assets/patner3.jpg";
import partner4 from "../assets/patner4.jpg";
import partner5 from "../assets/patner5.jpg";
import partner6 from "../assets/patner6.jpg";
import partner7 from "../assets/patner7.jpg";
import partner8 from "../assets/patner8.jpg";

const PartnersSlider = () => {
  const { t } = useTranslation();
  const partners = [
    partner1,
    partner2,
    partner3,
    partner4,
    partner5,
    partner6,
    partner7,
    partner8,
  ];

  return (
    <section className="bg-black py-16 border-b border-white/10">
      <div className="max-w-6xl mx-auto px-6 text-center">
        {/* Section Title */}
        <h2 className="text-3xl md:text-4xl font-bold text-white">
          {t("our")}{" "}
          <span className="text-[#00F9FF] capitalize">{t("partners")}</span>
        </h2>
        <p className="text-gray-300 mt-3 max-w-xl mx-auto">
          {t("trusted_by")}
        </p>

        {/* Auto-Scrolling Container */}
        <div className="relative overflow-hidden mt-10">
          <div className="flex animate-slide space-x-12">
            {[...partners, ...partners].map((logo, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-40 h-24 flex items-center justify-center bg-white/5 backdrop-blur-sm rounded-xl hover:bg-cyan-500/20 border border-white/5 transition duration-300"
              >
                <img
                  src={logo}
                  alt={`Official Partner ${index + 1}`}
                  className="h-full w-full p-2 object-contain opacity-80 hover:opacity-100 transition"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartnersSlider;
