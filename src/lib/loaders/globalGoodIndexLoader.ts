import { GlobalGoodIndexEnhanced } from './globalGoodFlatLoader';
import { loadGlobalGoodsTypes } from './referenceDataLoader';

// Helper function to construct data paths
const getDataPath = (path: string) => `/data/${path}`;

// Cache for the index data
let indexCache: GlobalGoodIndexEnhanced[] | null = null;
let typeResolver: Map<string, string> | null = null;

/**
 * Fetch the raw index.json file with minimal processing
 * This is much faster than resolving all references
 */
export async function fetchGlobalGoodsIndexLight(): Promise<GlobalGoodIndexEnhanced[]> {
  if (indexCache) {
    return indexCache;
  }

  try {
    const response = await fetch(getDataPath('global-goods/index.json'));
    if (!response.ok) {
      throw new Error(`Failed to fetch global goods index: ${response.statusText}`);
    }
    
    const data = await response.json();
    indexCache = data;
    return data;
  } catch (error) {
    console.error('Error fetching global goods index:', error);
    throw error;
  }
}

/**
 * Get a type resolver for GlobalGoodType codes to titles
 * This is the only resolution we do for the map page
 */
async function getTypeResolver(): Promise<Map<string, string>> {
  if (typeResolver) {
    return typeResolver;
  }

  const types = await loadGlobalGoodsTypes();
  typeResolver = new Map(
    types.map(type => [type.code, type.title])
  );
  
  return typeResolver;
}

/**
 * Load the global goods index with minimal processing for the map page
 * Only resolves GlobalGoodType codes to titles for display
 */
export async function loadGlobalGoodsIndexForMap() {
  const [index, resolver] = await Promise.all([
    fetchGlobalGoodsIndexLight(),
    getTypeResolver()
  ]);

  // Map the index data to include resolved type titles
  return index.map(item => ({
    ...item,
    GlobalGoodTypeResolved: item.GlobalGoodType?.map(code => 
      resolver.get(code) || code
    ) || []
  }));
}

/**
 * Clear the cache (useful for development or data updates)
 */
export function clearIndexCache() {
  indexCache = null;
  typeResolver = null;
}