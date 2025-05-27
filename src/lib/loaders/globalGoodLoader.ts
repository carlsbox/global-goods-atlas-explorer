import { LanguageCode } from '@/lib/types';
import { GlobalGood } from '../types/globalGood';

let globalGoodsCache: any[] | null = null;

async function fetchGlobalGoodsDB(): Promise<any[]> {
  if (globalGoodsCache) return globalGoodsCache;
  try {
    const res = await fetch('/data/global-goods/globalgood_db.json');
    if (!res.ok) throw new Error('Failed to fetch global goods DB');
    const data = await res.json();
    globalGoodsCache = data;
    return data;
  } catch (err) {
    console.error('Error fetching global goods DB:', err);
    return [];
  }
}

function extractSelectedLanguageFields(obj: any, language: string): any {
  if (obj === null || obj === undefined) return obj;
  if (typeof obj !== 'object') return obj;

  // If this is a multilingual field (object with language keys)
  if (Object.keys(obj).length > 0 && Object.keys(obj).every(key => key.length === 2)) {
    return obj[language] ?? obj[Object.keys(obj)[0]] ?? '';
  }

  // Recursively process arrays and objects
  if (Array.isArray(obj)) {
    return obj.map(item => extractSelectedLanguageFields(item, language));
  }
  const result: any = {};
  for (const key in obj) {
    result[key] = extractSelectedLanguageFields(obj[key], language);
  }
  return result;
}

export async function loadGlobalGood(id: string, language: LanguageCode): Promise<GlobalGood | undefined> {
  const db = await fetchGlobalGoodsDB();
  const item = db.find(good => good.CoreMetadata && good.CoreMetadata.ID === id);
  if (!item) return undefined;

  // Recursively process the object to only keep the selected language for multilingual fields
  const mapped = extractSelectedLanguageFields(item, language);

  // Explicitly set top-level fields for UI/type safety
  const result: GlobalGood = {
    id: mapped.CoreMetadata?.ID || id,
    name: mapped.CoreMetadata?.Name || '',
    summary: mapped.ProductOverview?.Summary || '',
    description: mapped.ProductOverview?.Description || '',
    details: mapped.ProductOverview?.Details || '',
    logo: mapped.CoreMetadata?.Logo || '',
    website: mapped.CoreMetadata?.Website?.[0]?.url || '',
    source_code: mapped.CoreMetadata?.SourceCode?.length ? {
      primary: mapped.CoreMetadata.SourceCode[0].url,
      additional: mapped.CoreMetadata.SourceCode.slice(1).map((sc: any) => sc.url)
    } : undefined,
    demo_link: mapped.CoreMetadata?.DemoLink?.[0]?.url || '',
    sectors: mapped.CoreMetadata?.GlobalGoodsType?.map((type: any) => typeof type === 'string' ? type : type.title),
    sector: mapped.CoreMetadata?.GlobalGoodsType?.map((type: any) => typeof type === 'string' ? type : type.title),
    
    // Create proper nested structure for coreMetadata
    coreMetadata: {
      id: mapped.CoreMetadata?.ID || id,
      name: mapped.CoreMetadata?.Name || '',
      logo: mapped.CoreMetadata?.Logo || '',
      website: mapped.CoreMetadata?.Website || [],
      globalGoodsType: mapped.CoreMetadata?.GlobalGoodsType || [],
      sourceCode: mapped.CoreMetadata?.SourceCode || [],
      license: mapped.CoreMetadata?.License || [],
      demoLink: mapped.CoreMetadata?.DemoLink,
      contact: mapped.CoreMetadata?.Contact || []
    },
    
    // Create proper nested structure for productOverview
    productOverview: {
      summary: mapped.ProductOverview?.Summary || '',
      description: mapped.ProductOverview?.Description || '',
      details: mapped.ProductOverview?.Details || '',
      primaryFunctionality: mapped.ProductOverview?.PrimaryFunctionality || '',
      users: mapped.ProductOverview?.Users || '',
      languages: mapped.ProductOverview?.Languages || [],
      screenshots: mapped.ProductOverview?.Screenshots || []
    },
    
    // Set reach data if available
    reach: mapped.Reach ? {
      summary: mapped.Reach.SummaryOfReach || '',
      implementations: mapped.Reach.NumberOfImplementations || 0,
      countries: mapped.Reach.Implementations?.map((imp: any) => imp.iso_code) || []
    } : undefined,
    
    // Set other fields with proper fallbacks
    maturity: mapped.Maturity ? {
      level: mapped.Maturity.SummaryOfMaturity || '',
      scores: mapped.Maturity.Scores?.[0] || {}
    } : undefined,
    
    // Import contact info
    contact: {
      name: mapped.CoreMetadata?.Contact?.[0]?.name,
      email: mapped.CoreMetadata?.Contact?.[0]?.email
    },
    
    // Get countries from Reach or fall back to the countries property
    countries: mapped.Reach?.Implementations?.map((imp: any) => imp.iso_code) || mapped.countries || []
  };

  return result;
}

export async function loadAllGlobalGoods(language: LanguageCode = 'en'): Promise<GlobalGood[]> {
  const db = await fetchGlobalGoodsDB();
  return db.map(item => {
    // Process the item for the selected language
    const mappedItem = extractSelectedLanguageFields(item, language);
    
    // Map nested fields to flat structure expected by GlobalGood type
    const result: GlobalGood = {
      // Flat fields
      id: mappedItem.CoreMetadata?.ID || '',
      name: mappedItem.CoreMetadata?.Name || '',
      summary: mappedItem.ProductOverview?.Summary || '',
      description: mappedItem.ProductOverview?.Description || '',
      details: mappedItem.ProductOverview?.Details || '', // Add the missing details property
      logo: mappedItem.CoreMetadata?.Logo || '',
      website: mappedItem.CoreMetadata?.Website?.[0]?.url || '',
      source_code: mappedItem.CoreMetadata?.SourceCode?.length ? {
        primary: mappedItem.CoreMetadata.SourceCode[0].url,
        additional: mappedItem.CoreMetadata.SourceCode.slice(1).map((sc: any) => sc.url)
      } : undefined,
      demo_link: mappedItem.CoreMetadata?.DemoLink?.[0]?.url || '',
      sectors: mappedItem.CoreMetadata?.GlobalGoodsType?.map((type: any) => typeof type === 'string' ? type : type.title),
      sector: mappedItem.CoreMetadata?.GlobalGoodsType?.map((type: any) => typeof type === 'string' ? type : type.title),
      
      // Create proper nested structure for coreMetadata
      coreMetadata: {
        id: mappedItem.CoreMetadata?.ID || '',
        name: mappedItem.CoreMetadata?.Name || '',
        logo: mappedItem.CoreMetadata?.Logo || '',
        website: mappedItem.CoreMetadata?.Website || [],
        globalGoodsType: mappedItem.CoreMetadata?.GlobalGoodsType || [],
        sourceCode: mappedItem.CoreMetadata?.SourceCode || [],
        license: mappedItem.CoreMetadata?.License || [],
        demoLink: mappedItem.CoreMetadata?.DemoLink,
        contact: mappedItem.CoreMetadata?.Contact || []
      },
      
      // Create proper nested structure for productOverview
      productOverview: {
        summary: mappedItem.ProductOverview?.Summary || '',
        description: mappedItem.ProductOverview?.Description || '',
        details: mappedItem.ProductOverview?.Details || '',
        primaryFunctionality: mappedItem.ProductOverview?.PrimaryFunctionality || '',
        users: mappedItem.ProductOverview?.Users || '',
        languages: mappedItem.ProductOverview?.Languages || [],
        screenshots: mappedItem.ProductOverview?.Screenshots || []
      },
      
      // Set reach data if available
      reach: mappedItem.Reach ? {
        summary: mappedItem.Reach.SummaryOfReach || '',
        implementations: mappedItem.Reach.NumberOfImplementations || 0,
        countries: mappedItem.Reach.Implementations?.map((imp: any) => imp.iso_code) || []
      } : undefined,
      
      // Set other fields with proper fallbacks
      maturity: mappedItem.Maturity ? {
        level: mappedItem.Maturity.SummaryOfMaturity || '',
        scores: mappedItem.Maturity.Scores?.[0] || {}
      } : undefined,
      
      // Import contact info
      contact: {
        name: mappedItem.CoreMetadata?.Contact?.[0]?.name,
        email: mappedItem.CoreMetadata?.Contact?.[0]?.email
      },
      
      // Get countries from Reach or fall back to the countries property
      countries: mappedItem.Reach?.Implementations?.map((imp: any) => imp.iso_code) || mappedItem.countries || []
    };
    
    return result;
  });
}
