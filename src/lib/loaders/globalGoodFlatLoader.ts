
import { GlobalGoodFlat } from '../types/globalGoodFlat';

let globalGoodsCache: GlobalGoodFlat[] | null = null;

async function fetchGlobalGoodsDB(): Promise<GlobalGoodFlat[]> {
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

export async function loadGlobalGoodFlat(id: string): Promise<GlobalGoodFlat | undefined> {
  const db = await fetchGlobalGoodsDB();
  return db.find(good => good.ID === id);
}

export async function loadAllGlobalGoodsFlat(): Promise<GlobalGoodFlat[]> {
  return await fetchGlobalGoodsDB();
}
