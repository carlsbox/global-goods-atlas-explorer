
/**
 * Maturity information for a global good.
 */
export interface Maturity {
  /** Summary of maturity */
  level?: string;
  /** Maturity scores */
  scores?: Record<string, number>;
} 
