/**
 * Product overview information for a global good.
 */
import { MultilingualText } from '../commonTypes';

export interface ProductOverview {
  /** Summary of the product */
  summary: MultilingualText | string;
  /** Description of the product */
  description?: MultilingualText | string;
  /** Primary functionality */
  primaryFunctionality?: string;
  /** Users of the product */
  users?: string;
  /** Supported languages */
  languages?: Array<{
    code: string;
    name: string;
  }>;
  /** Screenshots */
  screenshots?: Array<{
    url: string;
    description: string;
  }>;
} 