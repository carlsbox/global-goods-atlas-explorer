
// Import will now be fetched dynamically from reference data
let countryData: any = null;

async function loadCountryData() {
  if (!countryData) {
    try {
      const response = await fetch('/data/reference/countries.json');
      if (!response.ok) throw new Error('Failed to load countries reference data');
      countryData = await response.json();
    } catch (error) {
      console.error('Error loading country data:', error);
      countryData = {};
    }
  }
  return countryData;
}

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
export async function getCountryByIso2(isoCode: string): Promise<EnhancedCountryData | null> {
  const data = await loadCountryData();
  const code = isoCode.toLowerCase();
  const country = data[code];
  
  if (!country) return null;
  
  return {
    iso_code: country.iso_code,
    type: country.type,
    short: country.short,
    formal: country.formal,
    un_code: country.un_code
  };
}

/**
 * Get country data by UN code (numeric)
 */
export async function getCountryByUnCode(unCode: string | number): Promise<EnhancedCountryData | null> {
  const data = await loadCountryData();
  const targetCode = String(unCode);
  
  for (const [key, country] of Object.entries(data)) {
    if ((country as any).un_code && String((country as any).un_code) === targetCode) {
      return {
        iso_code: (country as any).iso_code,
        type: (country as any).type,
        short: (country as any).short,
        formal: (country as any).formal,
        un_code: (country as any).un_code
      };
    }
  }
  
  return null;
}

/**
 * Get country data by any code (ISO2, ISO3, or UN code)
 */
export async function getCountryByAnyCode(code: string | number): Promise<EnhancedCountryData | null> {
  const codeStr = String(code).toLowerCase();
  
  // Try ISO2 first
  let country = await getCountryByIso2(codeStr);
  if (country) return country;
  
  // Try UN code
  country = await getCountryByUnCode(code);
  if (country) return country;
  
  // Try ISO3 or other variations
  const data = await loadCountryData();
  for (const [key, countryInfo] of Object.entries(data)) {
    if ((countryInfo as any).iso_code.toLowerCase() === codeStr) {
      return {
        iso_code: (countryInfo as any).iso_code,
        type: (countryInfo as any).type,
        short: (countryInfo as any).short,
        formal: (countryInfo as any).formal,
        un_code: (countryInfo as any).un_code
      };
    }
  }
  
  return null;
}

/**
 * Create a mapping from UN codes to ISO2 codes for the WorldMap
 */
export async function createUnCodeToIso2Mapping(): Promise<Map<string, string>> {
  const data = await loadCountryData();
  const mapping = new Map<string, string>();
  
  for (const [iso2, country] of Object.entries(data)) {
    if ((country as any).un_code) {
      mapping.set(String((country as any).un_code), iso2);
    }
  }
  
  return mapping;
}

/**
 * Get all countries as an array
 */
export async function getAllCountries(): Promise<EnhancedCountryData[]> {
  const data = await loadCountryData();
  return Object.entries(data).map(([iso2, country]) => ({
    iso_code: (country as any).iso_code,
    type: (country as any).type,
    short: (country as any).short,
    formal: (country as any).formal,
    un_code: (country as any).un_code
  }));
}
