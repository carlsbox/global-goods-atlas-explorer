
import { Classification, GlobalGood, MultilingualText } from './types';
import { ensureMultilingualText } from './translationUtils';

/**
 * Converts a legacy global good to the new standardized format
 * This handles the transition from old flat structure to new structured format
 */
export function convertLegacyGlobalGood(legacyGood: any): GlobalGood {
  // Create a base object with the required fields
  const standardizedGood: GlobalGood = {
    id: legacyGood.id || `gg-${Date.now()}`,
    name: ensureMultilingualText(legacyGood.name),
    summary: ensureMultilingualText(legacyGood.summary),
    description: ensureMultilingualText(legacyGood.description),
    details: ensureMultilingualText(legacyGood.details),
    sector: legacyGood.sector || [],
    countries: legacyGood.countries || [],
    technologies: legacyGood.technologies || [],
    lastUpdated: legacyGood.lastUpdated || new Date().toISOString()
  };

  // Copy over optional fields if they exist
  if (legacyGood.logo) standardizedGood.logo = legacyGood.logo;
  if (legacyGood.website) standardizedGood.website = legacyGood.website;
  if (legacyGood.github) standardizedGood.github = legacyGood.github;
  if (legacyGood.source_code) standardizedGood.source_code = legacyGood.source_code;
  if (legacyGood.demo_link) standardizedGood.demo_link = legacyGood.demo_link;
  if (legacyGood.features) standardizedGood.features = legacyGood.features;
  if (legacyGood.impacts) standardizedGood.impacts = legacyGood.impacts;
  if (legacyGood.classificationCodes) standardizedGood.classificationCodes = legacyGood.classificationCodes;
  if (legacyGood.classifications) standardizedGood.classifications = legacyGood.classifications;
  if (legacyGood.sdgs) standardizedGood.sdgs = legacyGood.sdgs;
  if (legacyGood.healthStandards) standardizedGood.healthStandards = legacyGood.healthStandards;
  if (legacyGood.standards) standardizedGood.standards = legacyGood.standards;
  if (legacyGood.licenses) standardizedGood.licenses = legacyGood.licenses;
  if (legacyGood.implementers) standardizedGood.implementers = legacyGood.implementers;
  if (legacyGood.supporters) standardizedGood.supporters = legacyGood.supporters;
  if (legacyGood.reach) standardizedGood.reach = legacyGood.reach;
  if (legacyGood.maturity) standardizedGood.maturity = legacyGood.maturity;

  return standardizedGood;
}

/**
 * Maps old WHO classification codes to new format
 * E.g., "D6 | D6 Health management information systems (HMIS)" -> "WHO_D6"
 */
export function mapLegacyClassificationToNewCode(legacyCode: string): string | null {
  // Extract the code part, like "D6" from "D6 | D6 Health management information systems (HMIS)"
  const match = legacyCode.match(/^([A-Z][0-9]+)/);
  if (!match) return null;
  
  const codePrefix = match[1];
  return `WHO_${codePrefix}`;
}

/**
 * Convert legacy global good WHO classifications to new format
 */
export function convertLegacyGlobalGoodClassifications(
  whoSystemClassification?: { primary?: string[], additional?: string[] }
): string[] {
  if (!whoSystemClassification) return [];
  
  const codes: string[] = [];
  
  // Convert primary codes
  if (whoSystemClassification.primary) {
    for (const legacy of whoSystemClassification.primary) {
      const code = mapLegacyClassificationToNewCode(legacy);
      if (code) codes.push(code);
    }
  }
  
  // Convert additional codes
  if (whoSystemClassification.additional) {
    for (const legacy of whoSystemClassification.additional) {
      const code = mapLegacyClassificationToNewCode(legacy);
      if (code) codes.push(code);
    }
  }
  
  return codes;
}

/**
 * Group classifications by authority and group
 */
export function groupClassificationsByHierarchy(
  classifications: Classification[]
): Record<string, Record<string, Classification[]>> {
  return classifications.reduce(
    (acc: Record<string, Record<string, Classification[]>>, item) => {
      if (!acc[item.authority]) acc[item.authority] = {};
      if (!acc[item.authority][item.group_code]) acc[item.authority][item.group_code] = [];
      acc[item.authority][item.group_code].push(item);
      return acc;
    },
    {}
  );
}

/**
 * Extract translations from a multilingual Global Good
 * @returns Object with translations for each supported language
 */
export function extractTranslations(good: GlobalGood): Record<string, any> {
  const languages = ['fr', 'es']; // Languages other than English
  const result: Record<string, any> = {};
  
  // For each language, extract translatable fields
  for (const lang of languages) {
    result[lang] = {};
    
    // Process multilingual text fields
    for (const field of ['name', 'summary', 'description', 'details']) {
      if (good[field as keyof GlobalGood] && 
          typeof good[field as keyof GlobalGood] === 'object' &&
          (good[field as keyof GlobalGood] as any)[lang]) {
        result[lang][field] = (good[field as keyof GlobalGood] as any)[lang];
      }
    }
    
    // Process other translatable fields (if needed in the future)
  }
  
  return result;
}
