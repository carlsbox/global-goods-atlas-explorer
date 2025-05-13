
import { GlobalGood, MultilingualText } from '@/lib/types';
import { extractTranslations, convertLegacyGlobalGood } from '@/lib/migrationUtils';

/**
 * Converts a global good to standardized format with base file and translation files
 * @param globalGood The global good to convert
 * @returns Object containing base data and translations
 */
export function convertGlobalGoodToStandardFormat(globalGood: GlobalGood): {
  base: GlobalGood;
  translations: Record<string, Record<string, any>>;
} {
  // Ensure the global good is in the standardized format
  const standardizedGood = { ...globalGood };
  
  // Extract translations for supported languages
  const translations = extractTranslations(standardizedGood);
  
  // Create a base object without language-specific content
  const baseGood: GlobalGood = { ...standardizedGood };
  
  // Return both the base object and translations
  return {
    base: baseGood,
    translations
  };
}

/**
 * Utility function to convert an old format global good to the new format
 * This can be called from the browser console for testing
 */
export function convertGlobalGoodData(legacyData: any): {
  base: GlobalGood;
  translations: Record<string, Record<string, any>>;
} {
  // First convert to standard GlobalGood object
  const standardGood = convertLegacyGlobalGood(legacyData);
  
  // Then extract translations
  return convertGlobalGoodToStandardFormat(standardGood);
}

/**
 * Example usage in browser console:
 * 
 * // Import the function
 * import { convertGlobalGoodData } from './utils/dataConverter.ts'
 * 
 * // Get legacy data
 * const legacyData = await fetch('/data/global-goods/example.json').then(r => r.json())
 * 
 * // Convert data
 * const converted = convertGlobalGoodData(legacyData)
 * 
 * // Log results
 * console.log(converted.base) // Base data (English)
 * console.log(converted.translations) // Translations for other languages
 */
