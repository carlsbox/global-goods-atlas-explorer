
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';

// Import common translations
import translationEN from './locales/en/translation.json';
import translationFR from './locales/fr/translation.json';
import translationES from './locales/es/translation.json';

// Import page-specific translations
import homeEN from './locales/en/pages/home.json';
import homeFR from './locales/fr/pages/home.json';
import homeES from './locales/es/pages/home.json';

// Define the resources structure with namespaces
const resources = {
  en: {
    translation: translationEN,
    home: homeEN
  },
  fr: {
    translation: translationFR,
    home: homeFR
  },
  es: {
    translation: translationES,
    home: homeES
  }
};

i18n
  // load translations using http (default public/locales)
  .use(Backend)
  // detect user language
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next
  .use(initReactI18next)
  // init i18n
  .init({
    resources,
    fallbackLng: 'en',
    ns: ['translation', 'home'],
    defaultNS: 'translation',
    interpolation: {
      escapeValue: false // React already safes from xss
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage']
    }
  });

export default i18n;
