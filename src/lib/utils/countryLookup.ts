
import countryData from '@/i18n/locales/en/country.json';

export interface EnhancedCountryData {
  iso_code: string;
  type: string;
  short: string;
  formal: string;
  un_code?: string | number;
}

/**
 * Get country data by ISO 2-letter code
 */
export function getCountryByIso2(isoCode: string): EnhancedCountryData | null {
  const code = isoCode.toLowerCase();
  const country = countryData[code as keyof typeof countryData];
  
  if (!country) return null;
  
  return {
    iso_code: country.iso_code,
    type: country.type,
    short: country.short,
    formal: country.formal,
    un_code: (country as any).un_code
  };
}

/**
 * Get country data by UN code (numeric)
 */
export function getCountryByUnCode(unCode: string | number): EnhancedCountryData | null {
  const targetCode = String(unCode);
  
  for (const [key, country] of Object.entries(countryData)) {
    if ((country as any).un_code && String((country as any).un_code) === targetCode) {
      return {
        iso_code: country.iso_code,
        type: country.type,
        short: country.short,
        formal: country.formal,
        un_code: (country as any).un_code
      };
    }
  }
  
  return null;
}

/**
 * Get country data by any code (ISO2, ISO3, or UN code)
 */
export function getCountryByAnyCode(code: string | number): EnhancedCountryData | null {
  const codeStr = String(code).toLowerCase();
  
  // Try ISO2 first
  let country = getCountryByIso2(codeStr);
  if (country) return country;
  
  // Try UN code
  country = getCountryByUnCode(code);
  if (country) return country;
  
  // Try ISO3 or other variations
  for (const [key, countryInfo] of Object.entries(countryData)) {
    if (countryInfo.iso_code.toLowerCase() === codeStr) {
      return {
        iso_code: countryInfo.iso_code,
        type: countryInfo.type,
        short: countryInfo.short,
        formal: countryInfo.formal,
        un_code: (countryInfo as any).un_code
      };
    }
  }
  
  return null;
}

/**
 * Create a mapping from UN codes to ISO2 codes for the WorldMap
 */
export function createUnCodeToIso2Mapping(): Map<string, string> {
  const mapping = new Map<string, string>();
  
  for (const [iso2, country] of Object.entries(countryData)) {
    if ((country as any).un_code) {
      mapping.set(String((country as any).un_code), iso2);
    }
  }
  
  return mapping;
}

/**
 * Get all countries as an array
 */
export function getAllCountries(): EnhancedCountryData[] {
  return Object.entries(countryData).map(([iso2, country]) => ({
    iso_code: country.iso_code,
    type: country.type,
    short: country.short,
    formal: country.formal,
    un_code: (country as any).un_code
  }));
}
