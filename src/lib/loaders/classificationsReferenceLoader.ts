
interface ClassificationItem {
  code: string;
  title: string;
  description?: string;
  group_code?: string;
  group_name?: string;
  authority?: string;
}

// Cache for classification data
const classificationCache: { [key: string]: ClassificationItem[] } = {};

/**
 * Load classification data by authority (sdgs, who, wmo, dpi)
 */
export async function loadClassificationsByAuthority(authority: string): Promise<ClassificationItem[]> {
  if (classificationCache[authority]) {
    return classificationCache[authority];
  }

  try {
    const response = await fetch(`/data/reference/classifications/${authority}.json`);
    if (!response.ok) {
      console.warn(`Failed to load ${authority} classifications:`, response.status);
      return [];
    }
    
    const data = await response.json();
    
    // Handle both array and object formats for backward compatibility
    let classifications: ClassificationItem[];
    if (Array.isArray(data)) {
      classifications = data;
    } else if (data && typeof data === 'object') {
      // Convert object format to array (for legacy data)
      classifications = Object.values(data);
    } else {
      classifications = [];
    }

    // Ensure authority field is set if missing
    classifications = classifications.map(item => ({
      ...item,
      authority: item.authority || getAuthorityDisplayName(authority)
    }));

    classificationCache[authority] = classifications;
    return classifications;
  } catch (error) {
    console.error(`Error loading ${authority} classifications:`, error);
    return [];
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
  return data.find(item => item.code === code) || null;
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
 * Get display name for authority
 */
function getAuthorityDisplayName(authority: string): string {
  switch (authority) {
    case 'sdgs': return 'SDG';
    case 'who': return 'WHO';
    case 'wmo': return 'WMO';
    case 'dpi': return 'DPI-H';
    default: return authority.toUpperCase();
  }
}

/**
 * Clear classification cache
 */
export function clearClassificationCache(): void {
  Object.keys(classificationCache).forEach(key => {
    delete classificationCache[key];
  });
}
