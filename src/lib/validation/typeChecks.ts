
import { GlobalGood } from '@/lib/types';

/**
 * Type validation functions to ensure data consistency
 * Run these checks during development to catch type mismatches early
 */

export function validateGlobalGoodStructure(data: any): data is GlobalGood {
  // Check required fields
  if (!data.id || !data.name || !data.coreMetadata) {
    console.error('Missing required fields in GlobalGood:', data);
    return false;
  }

  // Check coreMetadata structure
  if (!data.coreMetadata.globalGoodsType || !Array.isArray(data.coreMetadata.globalGoodsType)) {
    console.error('Invalid globalGoodsType structure:', data.coreMetadata.globalGoodsType);
    return false;
  }

  // Validate globalGoodsType items have required fields
  for (const type of data.coreMetadata.globalGoodsType) {
    if (!type.code || !type.title || typeof type.description === 'undefined') {
      console.error('Invalid globalGoodsType item structure:', type);
      return false;
    }
  }

  return true;
}

export function validateReactQueryConfig(config: any): boolean {
  // Check for deprecated properties
  if ('cacheTime' in config) {
    console.error('Deprecated property "cacheTime" found. Use "gcTime" instead.');
    return false;
  }

  return true;
}

/**
 * Development-only function to check component props
 */
export function validateComponentProps<T>(
  componentName: string,
  props: any,
  requiredProps: (keyof T)[]
): boolean {
  for (const prop of requiredProps) {
    if (!(prop in props)) {
      console.error(`Missing required prop "${String(prop)}" in component ${componentName}`);
      return false;
    }
  }
  return true;
}
