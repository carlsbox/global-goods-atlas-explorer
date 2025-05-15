
/**
 * Maturity information for a global good.
 */
export interface Maturity {
  /** Summary of maturity level */
  level?: string;
  /** Detailed maturity scores */
  scores?: {
    global_utility?: number;
    community_support?: number;
    maturity_of_gg?: number;
    inclusive_design?: number;
    climate_resilience?: number;
    low_carbon?: number;
  };
  /** Summary of overall maturity assessment */
  summaryOfMaturity?: string;
  /** Additional maturity assessment information */
  description?: string;
}
