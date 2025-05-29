
interface ClassificationItem {
  code: string;
  title: string;
  description?: string;
  group_code?: string;
  group_name?: string;
  authority?: string;
}

interface ClassificationData {
  [key: string]: ClassificationItem;
}

// Cache for classification data
const classificationCache: { [key: string]: ClassificationData } = {};

/**
 * Load classification data by authority (sdgs, who, wmo, dpi)
 */
export async function loadClassificationsByAuthority(authority: string): Promise<ClassificationData> {
  if (classificationCache[authority]) {
    return classificationCache[authority];
  }

  try {
    const response = await fetch(`/data/reference/classifications/${authority}.json`);
    if (!response.ok) {
      console.warn(`Failed to load ${authority} classifications:`, response.status);
      return {};
    }
    
    const data = await response.json();
    classificationCache[authority] = data;
    return data;
  } catch (error) {
    console.error(`Error loading ${authority} classifications:`, error);
    return {};
  }
}

/**
 * Get classification item by code from any authority
 */
export async function getClassificationByCode(code: string): Promise<ClassificationItem | null> {
  // Determine authority from code prefix
  const authority = getAuthorityFromCode(code);
  if (!authority) return null;

  const data = await loadClassificationsByAuthority(authority);
  return data[code] || null;
}

/**
 * Resolve array of classification codes to full objects
 */
export async function resolveClassificationCodes(codes: string[]): Promise<ClassificationItem[]> {
  const resolved = await Promise.all(
    codes.map(code => getClassificationByCode(code))
  );
  return resolved.filter(Boolean) as ClassificationItem[];
}

/**
 * Group classification codes by authority and resolve them
 */
export async function resolveClassificationsByAuthority(classifications: {
  SDGs: string[];
  WHO: string[];
  WMO: string[];
  DPI: string[];
}): Promise<{
  SDGs: ClassificationItem[];
  WHO: ClassificationItem[];
  WMO: ClassificationItem[];
  DPI: ClassificationItem[];
}> {
  const [sdgs, who, wmo, dpi] = await Promise.all([
    resolveClassificationCodes(classifications.SDGs),
    resolveClassificationCodes(classifications.WHO),
    resolveClassificationCodes(classifications.WMO),
    resolveClassificationCodes(classifications.DPI)
  ]);

  return { SDGs: sdgs, WHO: who, WMO: wmo, DPI: dpi };
}

/**
 * Determine authority from classification code
 */
function getAuthorityFromCode(code: string): string | null {
  if (code.startsWith('SDG-')) return 'sdgs';
  if (code.startsWith('WHO_')) return 'who';
  if (code.startsWith('WMO_')) return 'wmo';
  if (code.startsWith('DPI_')) return 'dpi';
  return null;
}

/**
 * Clear classification cache
 */
export function clearClassificationCache(): void {
  Object.keys(classificationCache).forEach(key => {
    delete classificationCache[key];
  });
}
