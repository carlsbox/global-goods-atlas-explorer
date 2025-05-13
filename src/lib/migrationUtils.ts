
import { Classification } from './types';

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
