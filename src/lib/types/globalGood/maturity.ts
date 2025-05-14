/**
 * Maturity information for a global good.
 */
export interface Maturity {
  /** Summary of maturity */
  summaryOfMaturity?: string;
  /** Maturity scores */
  scores?: Array<{
    year: number;
    globalUtility?: number;
    communitySupport?: number;
    maturityOfGg?: number;
    inclusiveDesign?: number;
    climateResilience?: number;
    lowCarbon?: number;
  }>;
} 