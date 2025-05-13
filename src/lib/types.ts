export interface MultilingualText {
  [language: string]: string;
}

export interface GlobalGood {
  id: string;
  name: MultilingualText | string;
  summary: MultilingualText | string;
  description: MultilingualText | string;
  details: MultilingualText | string;
  logo?: string;
  website?: string;
  source_code?: {
    primary: string;
    additional?: string[];
  };
  demo_link?: string;
  sectors?: string[];
  features?: string[];
  impacts?: string[];
  technologies?: string[];
  classificationCodes?: string[];
  classifications?: {
    who: {
      primary: Classification;
      additional: Classification[];
    };
  };
  sdgs?: string[];
  healthStandards?: string[];
  standards?: {
    health?: string[];
    interoperability?: string[];
  };
  licenses?: string[];
  implementers?: string[];
  supporters?: string[];
  countries?: string[];
  reach?: {
    summary: string;
    implementations: number;
    countries: string[];
  };
  maturity?: {
    level: string;
    scores?: {
      global_utility?: number;
      community_support?: number;
      maturity_of_gg?: number;
      inclusive_design?: number;
      climate_resilience?: number;
      low_carbon?: number;
    };
  } | string;
  climate_integration?: {
    enabled: boolean;
    description?: string;
  };
  types?: Array<{
    code: string;
    title: MultilingualText | string;
  }>;
  tags?: string[];
  languages?: string[];
  community?: {
    overview?: string;
    anchored?: boolean;
    anchor_description?: string;
    anchor_countries?: string[];
    inception_year?: number;
    size_estimate?: number;
    platform?: {
      url?: string;
      governance?: boolean;
      governance_link?: string;
    };
    engagement?: string;
    events?: {
      schedule?: string;
      recent?: any[];
    };
    mailing_list?: {
      exists: boolean;
      link?: string;
    };
  };
  inclusive_design?: {
    user_input?: boolean;
    description?: string;
    offline_support?: boolean;
    offline_support_description?: string;
  };
  low_carbon?: {
    considered: boolean;
    description?: string;
  };
  cost_of_ownership?: {
    has_model: boolean;
  };
  sustainability?: {
    description?: string;
    funders?: string[];
  };
  resources?: {
    articles?: any[];
    documentation?: {
      product?: any[];
      user_reqs?: any[];
      end_user?: any[];
      implementer?: any[];
      developer?: any[];
      operator?: any[];
      installer?: any[];
    };
    deployment_tools?: {
      uses: boolean;
      description?: string;
      link?: string;
    };
  };
  policies?: {
    terms?: string;
    user_agreement?: string;
    privacy?: string;
    do_no_harm?: boolean;
    pii_collected?: boolean;
    npii_used?: boolean;
  };
  linked_initiatives?: Array<{
    label: string;
    logo_url?: string;
    site_url: string;
  }>;
  contact?: {
    name?: string;
    email?: string;
  };
  lastUpdated?: string;
  // For backward compatibility with old code
  sector?: string[];
  github?: string;
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
