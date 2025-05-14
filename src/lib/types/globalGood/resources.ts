/**
 * Resources information for a global good.
 */
export interface Resources {
  /** Articles */
  articles?: Array<{
    description: string;
    url: string;
  }>;
  /** Product documentation */
  productDocumentation?: Array<{
    description: string;
    url: string;
  }>;
  /** User requirements */
  userRequirements?: Array<{
    description: string;
    url: string;
  }>;
  /** End user documentation */
  endUserDocumentation?: Array<{
    description: string;
    url: string;
  }>;
  /** Implementer documentation */
  implementerDocumentation?: Array<{
    description: string;
    url: string;
  }>;
  /** Developer documentation */
  developerDocumentation?: Array<{
    description: string;
    url: string;
  }>;
  /** Operator documentation */
  operatorDocumentation?: Array<{
    description: string;
    url: string;
  }>;
  /** Installation documentation */
  installationDocumentation?: Array<{
    description: string;
    url: string;
  }>;
} 