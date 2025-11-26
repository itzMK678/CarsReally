import React from "react";
import { useTranslation } from "react-i18next";
import { Languages } from "lucide-react";
import { Link } from "react-router-dom";

const SpOption = () => {
  const { t, i18n } = useTranslation();

  const toggleLanguage = () => {
    const nextLang = i18n.language === "en" ? "lt" : "en";
    i18n.changeLanguage(nextLang);
    document.body.dir = "ltr"; // Lithuanian uses LTR
  };

  return (
    <div className="">
      <div
        className="flex-end w-[170px] flex items-center bg-[#00F9FF] text-black px-5 py-2 rounded-[8px] cursor-pointer hover:bg-[#00a6ff] hover:text-black"
        onClick={toggleLanguage}
      >
        <Languages className="mr-2" />
        {t("Language")}
      </div>
<div>
      <Link
        to="/Booking"
        className="w-[170px] mt-1 flex items-center bg-[#00F9FF] text-black px-5 py-2 rounded-[8px] cursor-pointer hover:bg-[#00a6ff] hover:text-black"
      >
        {t("book_event")}
      </Link>
      </div>
    </div>
  );
};

export default SpOption;
