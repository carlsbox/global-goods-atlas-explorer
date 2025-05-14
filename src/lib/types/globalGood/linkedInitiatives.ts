/**
 * Linked initiatives information for a global good.
 */
export interface LinkedInitiatives {
  /** Initiatives array */
  initiative?: Array<{
    collectionInitiative: {
      label: string;
      logoUrl: string;
      siteUrl: string;
      description: string;
    };
    toolUrl: string;
  }>;
} 