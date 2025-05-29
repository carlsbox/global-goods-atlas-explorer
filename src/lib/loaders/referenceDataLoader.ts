
interface License {
  id: string;
  name: string;
  url: string;
  description: string;
}

interface ProductLanguage {
  code: string;
  name: string;
  nativeName: string;
}

interface CollectionInitiative {
  id: string;
  label: string;
  logo_url: string;
  site_url: string;
  description: string;
}

let licensesCache: License[] | null = null;
let productLanguagesCache: ProductLanguage[] | null = null;
let collectionInitiativesCache: CollectionInitiative[] | null = null;

export async function loadLicenses(): Promise<License[]> {
  if (licensesCache) return licensesCache;
  
  try {
    const response = await fetch('/data/reference/licenses.json');
    if (!response.ok) throw new Error('Failed to load licenses');
    licensesCache = await response.json();
    return licensesCache;
  } catch (error) {
    console.error('Error loading licenses:', error);
    return [];
  }
}

export async function loadProductLanguages(): Promise<ProductLanguage[]> {
  if (productLanguagesCache) return productLanguagesCache;
  
  try {
    const response = await fetch('/data/reference/productLanguages.json');
    if (!response.ok) throw new Error('Failed to load product languages');
    productLanguagesCache = await response.json();
    return productLanguagesCache;
  } catch (error) {
    console.error('Error loading product languages:', error);
    return [];
  }
}

export async function loadCollectionInitiatives(): Promise<CollectionInitiative[]> {
  if (collectionInitiativesCache) return collectionInitiativesCache;
  
  try {
    const response = await fetch('/data/reference/collectionInitiatives.json');
    if (!response.ok) throw new Error('Failed to load collection initiatives');
    collectionInitiativesCache = await response.json();
    return collectionInitiativesCache;
  } catch (error) {
    console.error('Error loading collection initiatives:', error);
    return [];
  }
}

export async function getLicenseById(id: string): Promise<License | undefined> {
  const licenses = await loadLicenses();
  return licenses.find(license => license.id === id);
}

export async function getProductLanguageByCode(code: string): Promise<ProductLanguage | undefined> {
  const languages = await loadProductLanguages();
  return languages.find(lang => lang.code === code);
}

export async function getCollectionInitiativeById(id: string): Promise<CollectionInitiative | undefined> {
  const initiatives = await loadCollectionInitiatives();
  return initiatives.find(initiative => initiative.id === id);
}

export function clearReferenceDataCache(): void {
  licensesCache = null;
  productLanguagesCache = null;
  collectionInitiativesCache = null;
}
