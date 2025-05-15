
import { MultilingualText } from '../commonTypes';
import { Classification } from './classification';
import { CoreMetadata } from './coreMetadata';
import { Classifications } from './classifications';
import { StandardsAndInteroperability } from './standardsAndInteroperability';
import { ProductOverview } from './productOverview';
import { Reach } from './reach';
import { Maturity } from './maturity';
import { ClimateAndHealthIntegration } from './climateAndHealthIntegration';
import { Community } from './community';
import { InclusiveDesign } from './inclusiveDesign';
import { EnvironmentalImpact } from './environmentalImpact';
import { TotalCostOfOwnership } from './totalCostOfOwnership';
import { Sustainability } from './sustainability';
import { Resources } from './resources';
import { LinkedInitiatives } from './linkedInitiatives';

export interface MaturityScores {
  global_utility?: number;
  community_support?: number;
  maturity_of_gg?: number;
  inclusive_design?: number;
  climate_resilience?: number;
  low_carbon?: number;
}

/**
 * Represents a Global Good as defined in the globalgood-data.schema.json.
 */
export interface GlobalGood {
  /** Core metadata for the global good */
  coreMetadata: CoreMetadata;
  /** Classifications for the global good */
  classifications?: Classifications;
  /** Standards and interoperability information */
  standardsAndInteroperability?: StandardsAndInteroperability;
  /** Product overview information */
  productOverview?: ProductOverview;
  /** Reach information */
  reach?: Reach;
  /** Maturity information */
  maturity?: Maturity;
  /** Climate and health integration information */
  climateAndHealthIntegration?: ClimateAndHealthIntegration;
  /** Community information */
  community?: Community;
  /** Inclusive design information */
  inclusiveDesign?: InclusiveDesign;
  /** Environmental impact information */
  environmentalImpact?: EnvironmentalImpact;
  /** Total cost of ownership information */
  totalCostOfOwnership?: TotalCostOfOwnership;
  /** Sustainability information */
  sustainability?: Sustainability;
  /** Resources information */
  resources?: Resources;
  /** Linked initiatives information */
  linkedInitiatives?: LinkedInitiatives;
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
  sdgs?: string[];
  healthStandards?: string[];
  licenses?: string[];
  implementers?: string[];
  supporters?: string[];
  countries?: string[];
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
  // Adding the missing low_carbon property that exists in the data
  low_carbon?: {
    considered?: boolean;
    description?: string;
  };
}
