import { LanguageType } from '@/contexts/LanguageContext';
import { CountryData, CountryTranslations } from '../types';

// Updated function to load countries data with translations
export async function loadCountriesData(language: LanguageType = 'en') {
  try {
    // Load base country data
    const baseData = await import('../../i18n/locales/en/country.json');
    const countries: CountryData[] = (baseData as any).default.countries;
    
    // Try to load translations if not English
    if (language !== 'en') {
      try {
        const translationsModule = await import(`../../i18n/${language}/countries.json`);
        
        const translations: CountryTranslations = translationsModule.default;
        
        // Apply translations to country names
        return countries.map(country => {
          if (translations[country.iso_code]?.short || translations[country.iso_code]?.formal) {
            // Create a new object with the translated short and/or formal name
            return {
              ...country,
              short: translations[country.iso_code].short || country.short,
              formal: translations[country.iso_code].formal || country.formal
            };
          }
          return country;
        });
      } catch (e) {
        console.warn(`No translations found for countries in language: ${language}`);
      }
    }
    
    return countries;
  } catch (err) {
    console.error('Failed to load countries data', err);
    return [];
  }
}
