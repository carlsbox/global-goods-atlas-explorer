
import { MultilingualText } from './commonTypes';

export interface GlobalGood {
  id: string;
  name: MultilingualText | string;
  summary: MultilingualText | string;
  description: MultilingualText | string;
  details?: MultilingualText | string;
  logo?: string;
  website?: string;
  sectors?: string[];
  countries?: string[];
  lastUpdated?: string;
  
  // Core metadata
  coreMetadata?: {
    id?: string;
    website?: Array<{
      id: string;
      name: string;
      url: string;
      description: string;
    }>;
    globalGoodsType?: string[];
    sourceCode?: Array<{
      id: string;
      name: string;
      url: string;
      description: string;
    }>;
    license?: string[];
    demoLink?: string[];
    contact?: Array<{
      name: string;
      email: string;
      role: string;
    }>;
  };
  
  // Product overview
  productOverview?: {
    primaryFunctionality?: string;
    users?: string;
    languages?: Array<{
      code: string;
      name: string;
    }>;
    screenshots?: Array<{
      url: string;
      description: string;
    }>;
  };
  
  // Reach information
  reach?: {
    countries?: string[];
  };
  
  // Additional fields with defaults
  sdgs?: string[];
  classifications?: string[];
  standards?: string[];
  maturity?: any;
  technical?: any;
  licensing?: any;
  community?: any;
  sustainability?: any;
}
