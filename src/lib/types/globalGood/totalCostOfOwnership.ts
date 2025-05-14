/**
 * Total cost of ownership information for a global good.
 */
export interface TotalCostOfOwnership {
  /** Description of total cost of ownership */
  description?: string;
  /** URLs for cost of ownership details */
  url?: Array<{
    url: string;
    description: string;
  }>;
} 