/**
 * Reach information for a global good.
 */
export interface Reach {
  /** Summary of reach */
  summaryOfReach?: string;
  /** Number of implementations */
  numberOfImplementations?: number;
  /** Implementation map overview */
  implementationMapOverview?: Array<{
    url: string;
    description: string;
  }>;
  /** Implementations */
  implementations?: Array<{
    isoCode: string;
    type: string;
    names: {
      [lang: string]: {
        short: string;
        formal: string;
      };
    };
  }>;
} 