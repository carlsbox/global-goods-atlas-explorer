
/**
 * Community information for a global good.
 */
export interface Community {
  /** Description of the community */
  DescriptionOfCommunity?: string;
  /** Host anchor organization */
  HostAnchorOrganization?: {
    name: string;
    url: string;
    description: string;
    country: string[];
  };
  /** Inception year */
  InceptionYear?: number;
  /** Size of the community */
  SizeOfCommunity?: number;
  /** Size estimate (for backward compatibility) */
  size_estimate?: number;
  /** Platform information (for backward compatibility) */
  platform?: {
    url: string;
    description?: string;
  };
  /** Community links */
  Links?: {
    Community?: {
      url: string;
      description: string;
    };
    MailingList?: {
      url: string;
      description: string;
    };
  };
  /** Events */
  Events?: {
    description?: string;
    schedule?: string;
    recent?: Array<{
      event: string;
      date: string;
      url: string;
    }>;
  };
  /** Policies */
  Policies?: {
    Description?: string;
    Governance?: {
      url: string;
      description: string;
    };
    TermsOfUse?: {
      url: string;
      description: string;
    };
    UserAgreement?: {
      url: string;
      description: string;
    };
    PrivacyPolicy?: {
      url: string;
      description: string;
    };
    DoNoHarm?: {
      description: string;
      url: string;
    };
    PIICollected?: {
      description: string;
      url: string;
    };
    NPIIUsed?: {
      description: string;
      url: string;
    };
  };
}
