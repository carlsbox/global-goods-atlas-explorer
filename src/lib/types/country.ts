export interface CountryData {
  iso_code: string; // ISO code (e.g., "KE" for Kenya)
  type: string;     // State, Observer, Associated State, etc.
  short: string;    // Short/common name
  formal: string;   // Formal/official name
}


// Interface for country translations
export interface CountryTranslations {
  [iso_code: string]: {
    short?: string;
    formal?: string;
  };
}