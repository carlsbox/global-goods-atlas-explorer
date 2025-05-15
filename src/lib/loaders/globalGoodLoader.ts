import { LanguageType } from '@/contexts/LanguageContext';
import { GlobalGood } from '../types/globalGood/globalGood';

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

export async function loadGlobalGood(id: string, language: LanguageType): Promise<GlobalGood | undefined> {
  const db = await fetchGlobalGoodsDB();
  const item = db.find(good => good.CoreMetadata && good.CoreMetadata.ID === id);
  if (!item) return undefined;

  // Recursively process the object to only keep the selected language for multilingual fields
  const mapped = extractSelectedLanguageFields(item, language);

  // Explicitly set top-level fields for UI/type safety
  const result: GlobalGood = {
    ...mapped,
    id: mapped.CoreMetadata?.ID || mapped.coreMetadata?.ID || id,
    name: mapped.CoreMetadata?.Name || mapped.coreMetadata?.Name || '',
    summary: mapped.ProductOverview?.Summary || mapped.productOverview?.Summary || '',
    description: mapped.ProductOverview?.Description || mapped.productOverview?.Description || '',
    details: mapped.ProductOverview?.Details || mapped.productOverview?.Details || '',
    logo: mapped.CoreMetadata?.Logo || mapped.coreMetadata?.Logo || '',
    website: mapped.CoreMetadata?.Website?.[0]?.url || mapped.coreMetadata?.Website?.[0]?.url || '',
    source_code: mapped.CoreMetadata?.SourceCode?.length ? {
      primary: mapped.CoreMetadata.SourceCode[0].url,
      additional: mapped.CoreMetadata.SourceCode.slice(1).map((sc: any) => sc.url)
    } : undefined,
    demo_link: mapped.CoreMetadata?.DemoLink?.[0]?.url || '',
    sectors: mapped.CoreMetadata?.GlobalGoodsType?.map((type: any) => typeof type === 'string' ? type : type.title),
    sector: mapped.CoreMetadata?.GlobalGoodsType?.map((type: any) => typeof type === 'string' ? type : type.title),
  };

  return result;
}

export async function loadAllGlobalGoods(language: LanguageType = 'en'): Promise<GlobalGood[]> {
  const db = await fetchGlobalGoodsDB();
  return db.map(item => {
    // Map nested fields to flat structure expected by GlobalGood type
    const result: GlobalGood = {
      // Flat fields
      id: item.CoreMetadata?.ID || '',
      name: item.CoreMetadata?.Name,
      summary: item.ProductOverview?.Summary,
      description: item.ProductOverview?.Description,
      logo: item.CoreMetadata?.Logo,
      website: item.CoreMetadata?.Website?.[0]?.url,
      source_code: item.CoreMetadata?.SourceCode?.length ? {
        primary: item.CoreMetadata.SourceCode[0].url,
        additional: item.CoreMetadata.SourceCode.slice(1).map((sc: any) => sc.url)
      } : undefined,
      demo_link: item.CoreMetadata?.DemoLink?.[0]?.url,
      sectors: item.CoreMetadata?.GlobalGoodsType?.map((type: any) => typeof type === 'string' ? type : type.title),
      sector: item.CoreMetadata?.GlobalGoodsType?.map((type: any) => typeof type === 'string' ? type : type.title),
      // Spread the rest of the original object for future use
      ...item
    };
    return result;
  });
}
