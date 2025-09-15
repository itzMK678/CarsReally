import React from "react";
import { useTranslation } from "react-i18next";
import patner1 from "../assets/patner1.jpg"
import patner2 from "../assets/patner2.jpg"
import patner3 from "../assets/patner3.jpg"
import patner4 from "../assets/patner4.jpg"
import patner5 from "../assets/patner5.jpg"
import patner6 from "../assets/patner6.jpg"
import patner7 from "../assets/patner7.jpg"
import patner8 from "../assets/patner8.jpg"
import { t } from "i18next";
const PartnersSlider = () => {
   const { t, i18n } = useTranslation();
  const partners = [
   patner1,
   patner2,
   patner3,
   patner4,
   patner5,
   patner6,
   patner7,
   patner8,
  ];

  return (
    <section className="bg-black py-12">
      <div className="max-w-6xl mx-auto px-6 text-center">
        {/* Section Title */}
        <h2 className="text-3xl md:text-4xl font-bold text-white">
          {t("our")} <span className="text-cyan-400">{t("Partners")}</span>
        </h2>
        <p className="text-gray-300 mt-3">
          {t("trusted_by")}
        </p>

        {/* Auto-Scrolling Container */}
        <div className="relative overflow-hidden mt-10">
          <div className="flex animate-slide space-x-12">
            {[...partners, ...partners].map((logo, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-40 h-24 flex items-center justify-center bg-white/5 backdrop-blur-sm rounded-xl hover:bg-cyan-500/20 transition duration-300"
              >
                <img
                  src={logo}
                  alt={`Partner ${index + 1}`}
                  className="h-full w-full p-1 object-contain opacity-80 hover:opacity-100 transition"
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
