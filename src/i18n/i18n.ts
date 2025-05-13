
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

// Import NotFound page translations
import notFoundEN from './locales/en/pages/notFound.json';
import notFoundFR from './locales/fr/pages/notFound.json';
import notFoundES from './locales/es/pages/notFound.json';

// Import Global Goods page translations
import globalGoodsEN from './locales/en/pages/globalGoods.json';
import globalGoodsFR from './locales/fr/pages/globalGoods.json';
import globalGoodsES from './locales/es/pages/globalGoods.json';

// Import Global Good Details page translations
import globalGoodDetailsEN from './locales/en/pages/globalGoodDetails.json';
import globalGoodDetailsFR from './locales/fr/pages/globalGoodDetails.json';
import globalGoodDetailsES from './locales/es/pages/globalGoodDetails.json';

// Import Use Cases page translations
import useCasesEN from './locales/en/pages/useCases.json';
import useCasesFR from './locales/fr/pages/useCases.json';
import useCasesES from './locales/es/pages/useCases.json';

// Import Map page translations
import mapEN from './locales/en/pages/map.json';
import mapFR from './locales/fr/pages/map.json';
import mapES from './locales/es/pages/map.json';

// Import Admin pages translations
import adminEN from './locales/en/pages/admin.json';
import adminFR from './locales/fr/pages/admin.json';
import adminES from './locales/es/pages/admin.json';

// Define the resources structure with namespaces
const resources = {
  en: {
    translation: translationEN,
    home: homeEN,
    notFound: notFoundEN,
    globalGoods: globalGoodsEN,
    globalGoodDetails: globalGoodDetailsEN,
    useCases: useCasesEN,
    map: mapEN,
    admin: adminEN
  },
  fr: {
    translation: translationFR,
    home: homeFR,
    notFound: notFoundFR,
    globalGoods: globalGoodsFR,
    globalGoodDetails: globalGoodDetailsFR,
    useCases: useCasesFR,
    map: mapFR,
    admin: adminFR
  },
  es: {
    translation: translationES,
    home: homeES,
    notFound: notFoundES,
    globalGoods: globalGoodsES,
    globalGoodDetails: globalGoodDetailsES,
    useCases: useCasesES,
    map: mapES,
    admin: adminES
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
    ns: ['translation', 'home', 'notFound', 'globalGoods', 'globalGoodDetails', 'useCases', 'map', 'admin'],
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
