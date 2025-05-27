import { LanguageCode, GlobalGood } from '@/lib/types';

// Interface for the lightweight index data
export interface GlobalGoodIndexItem {
  id: string;
  name: string;
  summary: string;
  logo?: string;
  sectors?: string[];
  countries?: string[];
  lastUpdated?: string;
}

let indexCache: GlobalGoodIndexItem[] | null = null;
const individualCache = new Map<string, any>();

// Load the lightweight index for catalog/list views
export async function loadGlobalGoodsIndex(): Promise<GlobalGoodIndexItem[]> {
  if (indexCache) return indexCache;
  
  try {
    const response = await fetch('/data/global-goods/index.json');
    if (!response.ok) throw new Error('Failed to fetch global goods index');
    const data = await response.json();
    indexCache = data;
    return data;
  } catch (error) {
    console.error('Error loading global goods index:', error);
    // Fallback to legacy loader if index fails
    return await loadGlobalGoodsIndexFallback();
  }
}

// Fallback to extract index data from legacy file
async function loadGlobalGoodsIndexFallback(): Promise<GlobalGoodIndexItem[]> {
  try {
    const response = await fetch('/data/global-goods/globalgood_db.json');
    if (!response.ok) throw new Error('Failed to fetch legacy global goods data');
    const data = await response.json();
    
    return data.map((item: any) => ({
      id: item.CoreMetadata?.ID || item.ID,
      name: item.CoreMetadata?.Name || item.Name,
      summary: item.ProductOverview?.Summary || '',
      logo: item.CoreMetadata?.Logo || item.Logo,
      sectors: item.CoreMetadata?.GlobalGoodsType?.map((type: any) => 
        typeof type === 'string' ? type : type.title
      ) || [],
      countries: item.Reach?.ImplementationCountries?.map((country: any) => 
        country.iso_code
      ) || [],
      lastUpdated: new Date().toISOString()
    }));
  } catch (error) {
    console.error('Error loading fallback index:', error);
    return [];
  }
}

// Load individual global good with full data
export async function loadIndividualGlobalGood(id: string): Promise<any | null> {
  // Check cache first
  if (individualCache.has(id)) {
    return individualCache.get(id);
  }
  
  try {
    // Try to load from individual file
    const response = await fetch(`/data/global-goods/individual/${id}.json`);
    if (response.ok) {
      const data = await response.json();
      individualCache.set(id, data);
      return data;
    }
  } catch (error) {
    console.warn(`Individual file not found for ${id}, falling back to legacy`);
  }
  
  // Fallback to legacy loader
  return await loadFromLegacyFile(id);
}

// Fallback to legacy file for individual items
async function loadFromLegacyFile(id: string): Promise<any | null> {
  try {
    const response = await fetch('/data/global-goods/globalgood_db.json');
    if (!response.ok) throw new Error('Failed to fetch legacy data');
    const data = await response.json();
    
    const item = data.find((good: any) => 
      (good.CoreMetadata?.ID || good.ID) === id
    );
    
    if (item) {
      individualCache.set(id, item);
    }
    
    return item || null;
  } catch (error) {
    console.error(`Error loading ${id} from legacy file:`, error);
    return null;
  }
}

// Process raw data to GlobalGood format (similar to existing logic)
function extractSelectedLanguageFields(obj: any, language: string): any {
  if (obj === null || obj === undefined) return obj;
  if (typeof obj !== 'object') return obj;

  if (Object.keys(obj).length > 0 && Object.keys(obj).every(key => key.length === 2)) {
    return obj[language] ?? obj[Object.keys(obj)[0]] ?? '';
  }

  if (Array.isArray(obj)) {
    return obj.map(item => extractSelectedLanguageFields(item, language));
  }
  
  const result: any = {};
  for (const key in obj) {
    result[key] = extractSelectedLanguageFields(obj[key], language);
  }
  return result;
}

// Main function to load a global good with language processing
export async function loadGlobalGood(id: string, language: LanguageCode): Promise<GlobalGood | undefined> {
  const rawData = await loadIndividualGlobalGood(id);
  if (!rawData) return undefined;

  // Process for language
  const mapped = extractSelectedLanguageFields(rawData, language);

  // Transform to GlobalGood format (keeping existing logic)
  const result: GlobalGood = {
    id: mapped.CoreMetadata?.ID || mapped.ID || id,
    name: mapped.CoreMetadata?.Name || mapped.Name || '',
    summary: mapped.ProductOverview?.Summary || '',
    description: mapped.ProductOverview?.Description || '',
    details: mapped.ProductOverview?.Details || '',
    logo: mapped.CoreMetadata?.Logo || mapped.Logo || '',
    website: mapped.CoreMetadata?.Website?.[0]?.url || '',
    source_code: mapped.CoreMetadata?.SourceCode?.length ? {
      primary: mapped.CoreMetadata.SourceCode[0].url,
      additional: mapped.CoreMetadata.SourceCode.slice(1).map((sc: any) => sc.url)
    } : undefined,
    demo_link: mapped.CoreMetadata?.DemoLink?.[0]?.url || '',
    sectors: mapped.CoreMetadata?.GlobalGoodsType?.map((type: any) => 
      typeof type === 'string' ? type : type.title
    ),
    sector: mapped.CoreMetadata?.GlobalGoodsType?.map((type: any) => 
      typeof type === 'string' ? type : type.title
    ),
    
    // Create proper nested structure
    coreMetadata: {
      id: mapped.CoreMetadata?.ID || mapped.ID || id,
      name: mapped.CoreMetadata?.Name || mapped.Name || '',
      logo: mapped.CoreMetadata?.Logo || mapped.Logo || '',
      website: mapped.CoreMetadata?.Website || [],
      globalGoodsType: mapped.CoreMetadata?.GlobalGoodsType || [],
      sourceCode: mapped.CoreMetadata?.SourceCode || [],
      license: mapped.CoreMetadata?.License || [],
      demoLink: mapped.CoreMetadata?.DemoLink,
      contact: mapped.CoreMetadata?.Contact || []
    },
    
    productOverview: {
      summary: mapped.ProductOverview?.Summary || '',
      description: mapped.ProductOverview?.Description || '',
      details: mapped.ProductOverview?.Details || '',
      primaryFunctionality: mapped.ProductOverview?.PrimaryFunctionality || '',
      users: mapped.ProductOverview?.Users || '',
      languages: mapped.ProductOverview?.Languages || [],
      screenshots: mapped.ProductOverview?.Screenshots || []
    },
    
    reach: mapped.Reach ? {
      summary: mapped.Reach.SummaryOfReach || '',
      implementations: mapped.Reach.NumberOfImplementations || 0,
      countries: mapped.Reach.ImplementationCountries?.map((imp: any) => imp.iso_code) || []
    } : undefined,
    
    maturity: mapped.Maturity ? {
      level: mapped.Maturity.SummaryOfMaturity || '',
      scores: mapped.Maturity.Scores?.[0] || {}
    } : undefined,
    
    contact: {
      name: mapped.CoreMetadata?.Contact?.[0]?.name,
      email: mapped.CoreMetadata?.Contact?.[0]?.email
    },
    
    countries: mapped.Reach?.ImplementationCountries?.map((imp: any) => imp.iso_code) || []
  };

  return result;
}

// Load all global goods using hybrid approach
export async function loadAllGlobalGoods(language: LanguageCode = 'en'): Promise<GlobalGood[]> {
  const indexItems = await loadGlobalGoodsIndex();
  
  // For catalog view, we can use lightweight data from index
  // For full details, individual files will be loaded on demand
  const globalGoods = await Promise.all(
    indexItems.map(async (indexItem) => {
      // Convert index item to basic GlobalGood structure for catalog
      const basicGlobalGood: GlobalGood = {
        id: indexItem.id,
        name: indexItem.name,
        summary: indexItem.summary,
        description: '',
        details: '',
        logo: indexItem.logo,
        sectors: indexItem.sectors,
        countries: indexItem.countries,
        coreMetadata: {
          id: indexItem.id,
          name: indexItem.name,
          logo: indexItem.logo || '',
          website: [],
          globalGoodsType: indexItem.sectors?.map(s => ({ code: s, title: s })) || [],
          sourceCode: [],
          license: [],
          contact: []
        },
        productOverview: {
          summary: indexItem.summary,
          description: '',
          details: '',
          primaryFunctionality: '',
          users: '',
          languages: [],
          screenshots: []
        }
      };
      
      return basicGlobalGood;
    })
  );
  
  return globalGoods;
}

// Clear caches (useful for admin operations)
export function clearGlobalGoodsCache() {
  indexCache = null;
  individualCache.clear();
}
