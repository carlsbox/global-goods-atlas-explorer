/**
 * Standards and interoperability information for a global good.
 */
export interface StandardsAndInteroperability {
  /** Health standards */
  healthStandards?: Array<{
    code: string;
    domain: string;
    link: string;
    name: string;
    description: string;
  }>;
  /** Interoperability standards */
  interoperability?: Array<{
    code: string;
    domain?: string;
    type?: string;
    link: string;
    name: string;
    description: string;
  }>;
  /** Climate standards */
  climateStandards?: Array<{
    code: string;
    domain: string;
    link: string;
    name: string;
    description: string;
  }>;
} 