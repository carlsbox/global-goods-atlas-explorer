/**
 * Core metadata for a global good.
 */
export interface CoreMetadata {
  /** Unique identifier for the global good */
  id: string;
  /** Name of the global good */
  name: string;
  /** Logo URL */
  logo: string;
  /** Array of website links */
  website: Array<{
    id: string;
    name: string;
    url: string;
    description: string;
  }>;
  /** Array of global goods types */
  globalGoodsType: Array<{
    code: string;
    title: string;
    description: string;
  }>;
  /** Array of source code links */
  sourceCode: Array<{
    id: string;
    name: string;
    url: string;
    description: string;
  }>;
  /** Array of license information */
  license: Array<{
    id: string;
    name: string;
    url: string;
    description: string;
  }>;
  /** Array of demo links */
  demoLink?: Array<{
    id: string;
    name: string;
    url: string;
    description: string;
  }>;
  /** Array of contact information */
  contact: Array<{
    name: string;
    email: string;
    role: string;
  }>;
} 