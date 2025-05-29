
import { GlobalGoodFlat } from '../types/globalGoodFlat';

interface GlobalGoodIndexEnhanced {
  ID: string;
  Name: string;
  Summary?: string;
  Logo?: string;
  GlobalGoodType?: Array<{
    code?: string;
    title?: string;
    description?: string;
  }>;
  Countries?: string[];
  Classifications?: {
    SDGs?: Array<{
      code: string;
      title: string;
    }>;
    WHO?: Array<{
      code: string;
      title: string;
      group_code: string;
      group_name: string;
      authority: string;
    }>;
    WMO?: Array<any>;
    DPI?: Array<{
      code: string;
      title: string;
      group_code: string;
      group_name: string;
      authority: string;
    }>;
  };
  StandardsAndInteroperability?: {
    HealthStandards?: Array<{
      code: string;
      domain: string;
      link: string;
      name: string;
      description: string;
    }>;
    Interoperability?: Array<{
      code: string;
      type: string;
      link: string;
      name: string;
      description: string;
    }>;
    ClimateStandards?: Array<any>;
  };
  ImplementationCountries?: Array<{
    iso_code: string;
    type: string;
    names: {
      en: {
        short: string;
        formal: string;
      };
    };
  }>;
}

let globalGoodsIndexCache: GlobalGoodIndexEnhanced[] | null = null;
const individualFileCache = new Map<string, GlobalGoodFlat>();

async function fetchGlobalGoodsIndex(): Promise<GlobalGoodIndexEnhanced[]> {
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
    GlobalGoodsType: indexItem.GlobalGoodType?.map(type => ({
      code: type.code || '',
      title: type.title || '',
      description: type.description || ''
    })) || [],
    License: { id: '', name: '', url: '', description: '' },
    Contact: [],
    Classifications: {
      SDGs: indexItem.Classifications?.SDGs || [],
      WHO: indexItem.Classifications?.WHO || [],
      WMO: indexItem.Classifications?.WMO || [],
      DPI: indexItem.Classifications?.DPI || []
    },
    StandardsAndInteroperability: {
      HealthStandards: indexItem.StandardsAndInteroperability?.HealthStandards || [],
      Interoperability: indexItem.StandardsAndInteroperability?.Interoperability || [],
      ClimateStandards: indexItem.StandardsAndInteroperability?.ClimateStandards || []
    },
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
      ImplementationCountries: indexItem.ImplementationCountries || indexItem.Countries?.map(code => ({
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
