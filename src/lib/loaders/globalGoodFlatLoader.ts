
import { GlobalGoodFlat } from '../types/globalGoodFlat';

interface GlobalGoodIndex {
  ID: string;
  Name: string;
  Summary?: string;
  Logo?: string;
  GlobalGoodsType?: Array<{
    code?: string;
    title?: string;
    description?: string;
  }>;
  Countries?: string[];
}

let globalGoodsIndexCache: GlobalGoodIndex[] | null = null;
const individualFileCache = new Map<string, GlobalGoodFlat>();

async function fetchGlobalGoodsIndex(): Promise<GlobalGoodIndex[]> {
  if (globalGoodsIndexCache) return globalGoodsIndexCache;
  
  try {
    const res = await fetch('/data/global-goods/index.json');
    if (!res.ok) throw new Error('Failed to fetch global goods index');
    const data = await res.json();
    globalGoodsIndexCache = data;
    return data;
  } catch (err) {
    console.error('Error fetching global goods index:', err);
    return [];
  }
}

async function fetchIndividualGlobalGood(id: string): Promise<GlobalGoodFlat | undefined> {
  if (individualFileCache.has(id)) {
    return individualFileCache.get(id);
  }
  
  try {
    const res = await fetch(`/data/global-goods/individual/${id}.json`);
    if (!res.ok) {
      console.warn(`Individual file not found for global good: ${id}`);
      return undefined;
    }
    const data = await res.json();
    
    individualFileCache.set(id, data);
    return data;
  } catch (err) {
    console.error(`Error fetching individual global good ${id}:`, err);
    return undefined;
  }
}

export async function loadGlobalGoodFlat(id: string): Promise<GlobalGoodFlat | undefined> {
  return await fetchIndividualGlobalGood(id);
}

export async function loadAllGlobalGoodsFlat(): Promise<GlobalGoodFlat[]> {
  const index = await fetchGlobalGoodsIndex();
  
  return index.map(indexItem => ({
    ID: indexItem.ID,
    Name: indexItem.Name,
    Logo: indexItem.Logo,
    Website: {},
    GlobalGoodsType: indexItem.GlobalGoodsType?.map(type => ({
      code: type.code || '',
      title: type.title || '',
      description: type.description || ''
    })) || [],
    License: { id: '', name: '', url: '', description: '' },
    Contact: [],
    Classifications: { SDGs: [], WHO: [], WMO: [], DPI: [] },
    StandardsAndInteroperability: { HealthStandards: [], Interoperability: [], ClimateStandards: [] },
    ProductOverview: {
      Summary: indexItem.Summary || '',
      Description: '',
      PrimaryFunctionality: '',
      Users: '',
      Languages: [],
      Screenshots: []
    },
    Reach: {
      SummaryOfReach: '',
      NumberOfImplementations: 0,
      ImplementationMapOverview: null,
      ImplementationCountries: indexItem.Countries?.map(code => ({
        iso_code: code,
        type: 'Country',
        names: { en: { short: code, formal: code } }
      })) || []
    },
    Maturity: { SummaryOfMaturity: '', Scores: [] },
    ClimateAndHealthIntegration: { Description: '' },
    Community: {
      DescriptionOfCommunity: '',
      HostAnchorOrganization: { name: '', url: '', description: '', country: [] },
      InceptionYear: 0,
      SizeOfCommunity: 0,
      Links: {},
      Events: { description: '', schedule: '', recent: [] },
      Policies: {
        Description: '',
        Governance: { url: '', description: '' },
        TermsOfUse: { url: '', description: '' },
        UserAgreement: { url: '', description: '' },
        PrivacyPolicy: { url: '', description: '' },
        DoNoHarm: { url: '', description: '' },
        PIICollected: { url: '', description: '' },
        NPIIUsed: { url: '', description: '' }
      }
    },
    InclusiveDesign: { Description: '', UserInput: '', OfflineSupport: '' },
    EnvironmentalImpact: { LowCarbon: '' },
    TotalCostOfOwnership: { Description: '', url: '' },
    Sustainability: { Description: '', KeyFundersSupporters: [] },
    Resources: {
      Articles: [],
      ProductDocumentation: [],
      UserRequirements: [],
      EndUserDocumentation: [],
      ImplementerDocumentation: [],
      DeveloperDocumentation: [],
      OperatorDocumentation: [],
      InstallationDocumentation: []
    },
    LinkedInitiatives: { Initiative: [] }
  }));
}

export async function loadGlobalGoodFlatWithDetails(id: string): Promise<GlobalGoodFlat | undefined> {
  return await fetchIndividualGlobalGood(id);
}

export async function preloadGlobalGoods(ids: string[]): Promise<void> {
  const promises = ids.map(id => fetchIndividualGlobalGood(id));
  await Promise.allSettled(promises);
}

export function clearGlobalGoodsCache(): void {
  globalGoodsIndexCache = null;
  individualFileCache.clear();
}
