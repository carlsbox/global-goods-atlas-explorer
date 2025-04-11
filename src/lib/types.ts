
export interface GlobalGood {
  id: string;
  name: string;
  description: string;
  website?: string;
  github?: string;
  sector: string[];
  countries: string[];
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
  whoSystemClassification?: {
    primary?: string[];
    additional?: string[];
  };
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
  code: string;
  name: string;
  region: string;
  lat: number;
  lng: number;
  globalGoods: string[];
}
