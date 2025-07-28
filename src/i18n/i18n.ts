
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

// Import about page translations
import aboutEN from './locales/en/pages/about.json';
import aboutFR from './locales/fr/pages/about.json';
import aboutES from './locales/es/pages/about.json';

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

// Import Cookie Consent translations
import cookieEN from './locales/en/pages/cookie.json';
import cookieFR from './locales/fr/pages/cookie.json';
import cookieES from './locales/es/pages/cookie.json';

// Import Privacy Policy page translations
import privacyEN from './locales/en/pages/privacy.json';
import privacyFR from './locales/fr/pages/privacy.json';
import privacyES from './locales/es/pages/privacy.json';

// Import Terms of Service page translations
import termsEN from './locales/en/pages/terms.json';
import termsFR from './locales/fr/pages/terms.json';
import termsES from './locales/es/pages/terms.json';

// Import Navigation translations
import navigationEN from './locales/en/pages/navigation.json';
import navigationFR from './locales/fr/pages/navigation.json';
import navigationES from './locales/es/pages/navigation.json';

// Import Climate Services page translations
import climateServicesEN from './locales/en/pages/climateServices.json';
import climateServicesFR from './locales/fr/pages/climateServices.json';
import climateServicesES from './locales/es/pages/climateServices.json';

// Define the resources structure with namespaces
const resources = {
  en: {
    translation: translationEN,
    home: homeEN,
    about: aboutEN,
    notFound: notFoundEN,
    globalGoods: globalGoodsEN,
    globalGoodDetails: globalGoodDetailsEN,
    useCases: useCasesEN,
    map: mapEN,
    cookie: cookieEN,
    privacy: privacyEN,
    terms: termsEN,
    navigation: navigationEN,
    climateServices: climateServicesEN
  },
  fr: {
    translation: translationFR,
    home: homeFR,
    about: aboutFR,
    notFound: notFoundFR,
    globalGoods: globalGoodsFR,
    globalGoodDetails: globalGoodDetailsFR,
    useCases: useCasesFR,
    map: mapFR,
    cookie: cookieFR,
    privacy: privacyFR,
    terms: termsFR,
    navigation: navigationFR,
    climateServices: climateServicesFR
  },
  es: {
    translation: translationES,
    home: homeES,
    about: aboutES,
    notFound: notFoundES,
    globalGoods: globalGoodsES,
    globalGoodDetails: globalGoodDetailsES,
    useCases: useCasesES,
    map: mapES,
    cookie: cookieES,
    privacy: privacyES,
    terms: termsES,
    navigation: navigationES,
    climateServices: climateServicesES
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
    ns: ['translation', 'home', 'about', 'notFound', 'globalGoods', 'globalGoodDetails', 'useCases', 'map', 'cookie', 'privacy', 'terms', 'navigation', 'climateServices'],
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
