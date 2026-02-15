import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import english from "./translation/english.json";
import arabic from "./translation/arabic.json";

i18n
  .use(initReactI18next) // pass i18n down to react-i18next
  .init({
    resources: {
      en: { translation: english },
      ar: { translation: arabic },
    },
    lng: "en", // default language
    fallbackLng: "en",
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
