
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
}

export interface CountryData {
  code: string;
  name: string;
  region: string;
  lat: number;
  lng: number;
  globalGoods: string[];
}
