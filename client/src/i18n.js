import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./locales/en.json";
import lt from "./locales/lt.json";

i18n
  .use(initReactI18next)
  .init({
    lng: "en", // default language
    fallbackLng: "en",
    resources: {
      en: { translation: en },
      lt: { translation: lt },
    },
    interpolation: {
      escapeValue: false, // react already escapes by default
    },
  });

export default i18n;
