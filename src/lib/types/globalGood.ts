
import { MultilingualText } from './commonTypes';
import { Classification } from './classification';

export interface MaturityScores {
  global_utility?: number;
  community_support?: number;
  maturity_of_gg?: number;
  inclusive_design?: number;
  climate_resilience?: number;
  low_carbon?: number;
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
    scores?: MaturityScores;
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
