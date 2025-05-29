
import { LanguageCode } from '@/lib/types';
import { CountryData, CountryTranslations } from '../types/country';

// Updated function to load countries data with translations from reference location
export async function loadCountriesData(language: LanguageCode = 'en') {
  try {
    // Load base country data from reference location
    const response = await fetch('/data/reference/countries.json');
    if (!response.ok) throw new Error('Failed to load countries reference data');
    const countriesObject = await response.json();
    
    // Convert object format to array format for compatibility
    const countries: CountryData[] = Object.entries(countriesObject).map(([code, country]: [string, any]) => ({
      code: code,
      iso_code: country.iso_code,
      type: country.type,
      name: {
        short: country.short,
        official: country.formal
      },
      un_code: country.un_code
    }));
    
    // Try to load translations if not English
    if (language !== 'en') {
      try {
        const translationsModule = await import(`../../i18n/${language}/countries.json`);
        
        const translations: CountryTranslations = translationsModule.default;
        
        // Apply translations to country names
        return countries.map(country => {
          if (translations[country.iso_code || ''] && 
              (translations[country.iso_code || ''].short || 
               translations[country.iso_code || ''].formal)) {
            // Create a new country object with translated names if available
            return {
              ...country,
              name: {
                ...country.name,
                short: translations[country.iso_code || ''].short || country.name.short,
                official: translations[country.iso_code || ''].formal || country.name.official
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
