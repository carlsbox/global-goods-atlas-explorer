
export interface UseCase {
  id: string;
  title: string;
  purpose: string; // markdown supported
  classifications: {
    sdg?: string;
    who_system?: string;
    wmo_category?: string;
  };
  scope: string; // markdown supported
  actors: string; // markdown supported
  preconditions: string; // markdown supported
  process_steps: string; // markdown supported
  postconditions: string; // markdown supported
  data_requirements: string; // markdown supported
  standards: string[]; // Now simplified to just array of standard codes
  technology_components: string; // markdown supported
  global_goods: Array<{
    id: string;
    name: string;
    url: string;
  }>;
  challenges: string; // markdown supported
  sustainability_considerations: string; // markdown supported
  // Legacy fields for backwards compatibility during transition
  country?: string;
  sector?: string;
  organization?: string;
  year?: string;
  link?: string;
  results?: string;
  description?: string;
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
  challenge?: string;
  solution?: string;
}
