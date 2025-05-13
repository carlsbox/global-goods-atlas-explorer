
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
