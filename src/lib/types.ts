
export interface GlobalGood {
  id: string;
  name: string;
  description: string;
  website?: string;
  github?: string;
  sector: string[];
  countries: string[]; // Will now store country codes instead of names
  technologies: string[];
  implementers?: string[];
  supporters?: string[];
  licenses?: string[];
  lastUpdated: string;
  logo?: string;
  sdgs?: string[];
  maturity?: string;
  summary?: string;
  tags?: string[];
  healthStandards?: string[];
  classificationCodes?: string[]; // New field replacing whoSystemClassification
}

export interface UseCase {
  id: string;
  title: string;
  description: string;
  country: string;
  sector: string;
  globalGoods: string[]; // References global goods by ID
  organization: string;
  year: string;
  link?: string;
  results?: string;
  // New fields for the detailed use case page
  challenge?: string;
  solution?: string;
  impact?: string;
  lessons?: string[];
  contacts?: {
    name: string;
    email?: string;
    organization: string;
    role?: string;
  }[];
  resources?: {
    title: string;
    url: string;
    type: string;
  }[];
  sdgs?: string[];
  images?: string[];
  featuredImage?: string;
}

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

export interface Classification {
  code: string;
  title: string;
  group_code: string;
  group_name: string;
  authority: string;
}

export interface ClassificationTranslations {
  [code: string]: {
    title?: string;
  };
  group_names?: {
    [code: string]: string;
  };
  authority_names?: {
    [code: string]: string;
  };
}

// New interface for country translations
export interface CountryTranslations {
  [code: string]: {
    name: string;
  };
}
