
export interface CountryData {
  code: string;        // ISO code (e.g., "KE" for Kenya)
  type: string;        // State etc
  name: {
    short: string;     // Default short name (usually English)
    formal: string;    // Default Formal name (usually English)
  };
  region: string;      // Geographic region
  lat: number;         // Latitude coordinate
  lng: number;         // Longitude coordinate
}

// Interface for country translations
export interface CountryTranslations {
  [code: string]: {
    name: string;
  };
}
