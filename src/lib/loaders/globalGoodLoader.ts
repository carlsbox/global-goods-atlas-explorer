import { LanguageType } from '@/contexts/LanguageContext';
import { GlobalGood } from '../types';

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

function stubMultilingualField(fieldValue: any, language: string): { [lang: string]: string } {
  // Always return English value, but keyed by requested language
  if (!fieldValue) return { [language]: '' };
  if (typeof fieldValue === 'object' && fieldValue.en) {
    return { [language]: fieldValue.en };
  }
  return { [language]: fieldValue };
}

export async function loadGlobalGood(id: string, language: LanguageType): Promise<GlobalGood | undefined> {
  const db = await fetchGlobalGoodsDB();
  const item = db.find(good => good.CoreMetadata && good.CoreMetadata.ID === id);
  if (!item) return undefined;

  // List of multilingual fields to stub (expand as needed)
  const multilingualFields = ['name', 'summary', 'description', 'details'];
  const result: any = { ...item };

  multilingualFields.forEach(field => {
    if (item[field]) {
      result[field] = stubMultilingualField(item[field], language);
    }
  });

  return result as GlobalGood;
}

export async function loadAllGlobalGoods(language: LanguageType = 'en'): Promise<GlobalGood[]> {
  const db = await fetchGlobalGoodsDB();
  return db.map(item => {
    const result: any = { ...item };
    ['name', 'summary', 'description', 'details'].forEach(field => {
      if (item[field]) {
        result[field] = stubMultilingualField(item[field], language);
      }
    });
    return result as GlobalGood;
  });
}
