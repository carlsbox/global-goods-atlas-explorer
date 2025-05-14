/**
 * Sustainability information for a global good.
 */
export interface Sustainability {
  /** Description of sustainability */
  description?: string;
  /** Key funders and supporters */
  keyFundersSupporters?: Array<{
    name: string;
    url: string;
    description: string;
  }>;
} 