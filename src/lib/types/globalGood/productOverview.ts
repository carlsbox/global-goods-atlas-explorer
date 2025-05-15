
/**
 * Product overview information for a global good.
 */
export interface ProductOverview {
  /** Summary of the product */
  summary?: string;
  /** Description of the product */
  description?: string;
  /** Detailed information about the product */
  details?: string;
  /** Primary functionality information */
  primaryFunctionality?: string;
  /** Users information */
  users?: string;
  /** Languages supported by the product */
  languages?: string[];
  /** Screenshots of the product */
  screenshots?: string[];
} 
