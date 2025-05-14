/**
 * Community information for a global good.
 */
export interface Community {
  /** Description of the community */
  descriptionOfCommunity?: string;
  /** Host anchor organization */
  hostAnchorOrganization?: {
    name: string;
    url: string;
    description: string;
    country: string[];
  };
  /** Inception year */
  inceptionYear?: number;
  /** Size of the community */
  sizeOfCommunity?: number;
  /** Community links */
  links?: {
    community?: Array<{
      url: string;
      description: string;
    }>;
    mailingList?: Array<{
      url: string;
      description: string;
    }>;
  };
  /** Events */
  events?: {
    description?: string;
    schedule?: string;
    recent?: Array<{
      event: string;
      date: string;
      url: string;
    }>;
  };
  /** Policies */
  policies?: {
    description?: string;
    governance?: Array<{
      url: string;
      description: string;
    }>;
    termsOfUse?: Array<{
      url: string;
      description: string;
    }>;
    userAgreement?: Array<{
      url: string;
      description: string;
    }>;
    privacyPolicy?: Array<{
      url: string;
      description: string;
    }>;
    doNoHarm?: Array<{
      description: string;
      url: string;
    }>;
    piiCollected?: Array<{
      description: string;
      url: string;
    }>;
    npiiUsed?: Array<{
      description: string;
      url: string;
    }>;
  };
} 