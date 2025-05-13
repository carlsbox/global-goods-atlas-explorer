
import { LanguageType } from '@/contexts/LanguageContext';
import { CountryData, CountryTranslations } from '../types';

// Updated function to load countries data with translations
export async function loadCountriesData(language: LanguageType = 'en') {
  try {
    // Load base country data
    const baseData = await import('../../data/countries/countries.json');
    const countries: CountryData[] = (baseData as any).default.countries;
    
    // Try to load translations if not English
    if (language !== 'en') {
      try {
        const translationsModule = await import(`../../data/countries/translations/${language}.json`);
        const translations: CountryTranslations = translationsModule.default;
        
        // Apply translations to country names
        return countries.map(country => {
          if (translations[country.code]?.name) {
            // Create a new object with the translated name
            return {
              ...country,
              name: {
                ...country.name,
                short: translations[country.code].name
              }
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
