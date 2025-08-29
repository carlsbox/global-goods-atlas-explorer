
import { referenceDataCache } from '@/lib/cache/ReferenceDataCache';

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

interface Standard {
  code: string;
  name: string;
  description: string;
  domain: string;
  type: string;
  link: string;
}

interface GlobalGoodsType {
  code: string;
  title: string;
  description: string;
}

interface Country {
  iso_code: string;
  type: string;
  short: string;
  formal: string;
  un_code?: string;
}

// Using centralized cache instead of module-level variables
export async function loadLicenses(): Promise<License[]> {
  return referenceDataCache.get('licenses', async () => {
    const response = await fetch('/data/reference/licenses.json');
    if (!response.ok) throw new Error('Failed to load licenses');
    return response.json();
  });
}

export async function loadProductLanguages(): Promise<ProductLanguage[]> {
  return referenceDataCache.get('productLanguages', async () => {
    const response = await fetch('/data/reference/productLanguages.json');
    if (!response.ok) throw new Error('Failed to load product languages');
    return response.json();
  });
}

export async function loadCollectionInitiatives(): Promise<CollectionInitiative[]> {
  return referenceDataCache.get('collectionInitiatives', async () => {
    const response = await fetch('/data/reference/collectionInitiatives.json');
    if (!response.ok) throw new Error('Failed to load collection initiatives');
    return response.json();
  });
}

export async function loadStandards(): Promise<Record<string, Standard>> {
  return referenceDataCache.get('standards', async () => {
    // Load all modular standards files
    const [healthResponse, interopResponse, climateResponse] = await Promise.all([
      fetch('/data/reference/standards/health.json'),
      fetch('/data/reference/standards/interoperability.json'),
      fetch('/data/reference/standards/climate.json')
    ]);

    if (!healthResponse.ok || !interopResponse.ok || !climateResponse.ok) {
      throw new Error('Failed to load one or more standards files');
    }

    const [healthStandards, interopStandards, climateStandards] = await Promise.all([
      healthResponse.json(),
      interopResponse.json(),
      climateResponse.json()
    ]);

    // Combine arrays into a unified object with code as key
    const standardsObject: Record<string, Standard> = {};
    
    // Process health standards
    healthStandards.forEach((standard: Standard) => {
      standardsObject[standard.code] = standard;
    });
    
    // Process interoperability standards
    interopStandards.forEach((standard: Standard) => {
      standardsObject[standard.code] = standard;
    });
    
    // Process climate standards (normalize domain)
    climateStandards.forEach((standard: Standard) => {
      standardsObject[standard.code] = {
        ...standard,
        domain: standard.domain === 'Climate' ? 'Weather and Climate' : standard.domain
      };
    });

    return standardsObject;
  });
}

export async function loadGlobalGoodsTypes(): Promise<GlobalGoodsType[]> {
  return referenceDataCache.get('globalGoodsTypes', async () => {
    const response = await fetch('/data/reference/globalGoodsTypes.json');
    if (!response.ok) throw new Error('Failed to load global goods types');
    return response.json();
  });
}

export async function loadCountries(): Promise<Record<string, Country>> {
  return referenceDataCache.get('countries', async () => {
    const response = await fetch('/data/reference/countries.json');
    if (!response.ok) throw new Error('Failed to load countries');
    return response.json();
  });
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

export async function getStandardByCode(code: string): Promise<Standard | undefined> {
  const standards = await loadStandards();
  return standards[code];
}

export async function getStandardsByType(type: string): Promise<Standard[]> {
  const standards = await loadStandards();
  return Object.values(standards).filter(standard => standard.type === type);
}

export async function getStandardsByDomain(domain: string): Promise<Standard[]> {
  const standards = await loadStandards();
  return Object.values(standards).filter(standard => standard.domain === domain);
}

export async function getGlobalGoodsTypeByCode(code: string): Promise<GlobalGoodsType | undefined> {
  const types = await loadGlobalGoodsTypes();
  return types.find(type => type.code === code);
}

export async function getCountryByCode(code: string): Promise<Country | undefined> {
  const countries = await loadCountries();
  return countries[code.toLowerCase()];
}

export async function clearReferenceDataCache(): Promise<void> {
  // Clear all caches using the centralized cache manager
  await referenceDataCache.clear();
}
