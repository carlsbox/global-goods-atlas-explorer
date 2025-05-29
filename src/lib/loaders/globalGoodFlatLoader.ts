import { GlobalGoodFlat } from '../types/globalGoodFlat';
import { getLicenseById, getProductLanguageByCode, getStandardByCode, getGlobalGoodsTypeByCode, getCollectionInitiativeById } from './referenceDataLoader';
import { resolveClassificationsByAuthority } from './classificationsReferenceLoader';
import { loadCountriesData } from './countryLoader';

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
    const rawData = await res.json();
    
    // Transform the raw data to resolve references
    const transformedData = await transformRawDataToFlat(rawData);
    
    individualFileCache.set(id, transformedData);
    return transformedData;
  } catch (err) {
    console.error(`Error fetching individual global good ${id}:`, err);
    return undefined;
  }
}

async function transformRawDataToFlat(rawData: any): Promise<GlobalGoodFlat> {
  // Resolve license reference if it's a string
  let license = rawData.License;
  if (typeof license === 'string') {
    const licenseData = await getLicenseById(license);
    license = licenseData ? {
      id: licenseData.id,
      name: licenseData.name,
      url: licenseData.url,
      description: licenseData.description
    } : {
      id: license,
      name: license,
      url: '',
      description: ''
    };
  }

  // Resolve classification references if they're string arrays
  let classifications = rawData.Classifications;
  if (classifications && 
      (Array.isArray(classifications.SDGs) || 
       Array.isArray(classifications.WHO) || 
       Array.isArray(classifications.WMO) || 
       Array.isArray(classifications.DPI))) {
    
    const classificationCodes = {
      SDGs: Array.isArray(classifications.SDGs) ? classifications.SDGs : [],
      WHO: Array.isArray(classifications.WHO) ? classifications.WHO : [],
      WMO: Array.isArray(classifications.WMO) ? classifications.WMO : [],
      DPI: Array.isArray(classifications.DPI) ? classifications.DPI : []
    };
    
    classifications = await resolveClassificationsByAuthority(classificationCodes);
  }

  // Resolve GlobalGoodsType codes to full objects
  let globalGoodsType = rawData.GlobalGoodsType || [];
  if (Array.isArray(globalGoodsType) && globalGoodsType.length > 0 && typeof globalGoodsType[0] === 'string') {
    const resolvedTypes = await Promise.all(
      globalGoodsType.map(async (typeCode: string) => {
        const typeData = await getGlobalGoodsTypeByCode(typeCode);
        return typeData ? {
          code: typeData.code,
          title: typeData.title,
          description: typeData.description
        } : {
          code: typeCode,
          title: typeCode,
          description: ''
        };
      })
    );
    globalGoodsType = resolvedTypes;
  }

  // Resolve language codes to full language objects
  let languages = rawData.ProductOverview?.Languages || [];
  if (Array.isArray(languages) && languages.length > 0 && typeof languages[0] === 'string') {
    const resolvedLanguages = await Promise.all(
      languages.map(async (langCode: string) => {
        const languageData = await getProductLanguageByCode(langCode);
        return languageData ? {
          code: languageData.code,
          name: languageData.name,
          nativeName: languageData.nativeName
        } : {
          code: langCode,
          name: langCode,
          nativeName: langCode
        };
      })
    );
    languages = resolvedLanguages;
  }

  // Resolve LinkedInitiatives collection initiative IDs to full objects
  let linkedInitiatives = rawData.LinkedInitiatives?.Initiative || [];
  if (Array.isArray(linkedInitiatives) && linkedInitiatives.length > 0) {
    const resolvedInitiatives = await Promise.all(
      linkedInitiatives.map(async (initiative: any) => {
        if (typeof initiative.collectionInitiative === 'string') {
          const initiativeData = await getCollectionInitiativeById(initiative.collectionInitiative);
          return {
            collectionInitiative: initiativeData ? {
              label: initiativeData.label,
              logo_url: initiativeData.logo_url,
              site_url: initiativeData.site_url,
              description: initiativeData.description
            } : {
              label: initiative.collectionInitiative,
              logo_url: '',
              site_url: '',
              description: ''
            },
            tool_url: initiative.tool_url
          };
        }
        return initiative;
      })
    );
    linkedInitiatives = resolvedInitiatives;
  }

  // Resolve standards codes to full standard objects
  let healthStandards = rawData.StandardsAndInteroperability?.HealthStandards || [];
  if (Array.isArray(healthStandards) && healthStandards.length > 0 && typeof healthStandards[0] === 'string') {
    const resolvedHealthStandards = await Promise.all(
      healthStandards.map(async (standardCode: string) => {
        const standardData = await getStandardByCode(standardCode);
        return standardData ? {
          code: standardData.code,
          domain: standardData.domain,
          link: standardData.link,
          name: standardData.name,
          description: standardData.description
        } : {
          code: standardCode,
          domain: 'Health',
          link: '',
          name: standardCode,
          description: ''
        };
      })
    );
    healthStandards = resolvedHealthStandards;
  }

  let interoperabilityStandards = rawData.StandardsAndInteroperability?.Interoperability || [];
  if (Array.isArray(interoperabilityStandards) && interoperabilityStandards.length > 0 && typeof interoperabilityStandards[0] === 'string') {
    const resolvedInteropStandards = await Promise.all(
      interoperabilityStandards.map(async (standardCode: string) => {
        const standardData = await getStandardByCode(standardCode);
        return standardData ? {
          code: standardData.code,
          type: standardData.type,
          link: standardData.link,
          name: standardData.name,
          description: standardData.description
        } : {
          code: standardCode,
          type: 'interoperability',
          link: '',
          name: standardCode,
          description: ''
        };
      })
    );
    interoperabilityStandards = resolvedInteropStandards;
  }

  let climateStandards = rawData.StandardsAndInteroperability?.ClimateStandards || [];
  if (Array.isArray(climateStandards) && climateStandards.length > 0 && typeof climateStandards[0] === 'string') {
    const resolvedClimateStandards = await Promise.all(
      climateStandards.map(async (standardCode: string) => {
        const standardData = await getStandardByCode(standardCode);
        return standardData ? {
          code: standardData.code,
          domain: standardData.domain,
          link: standardData.link,
          name: standardData.name,
          description: standardData.description
        } : {
          code: standardCode,
          domain: 'Climate',
          link: '',
          name: standardCode,
          description: ''
        };
      })
    );
    climateStandards = resolvedClimateStandards;
  }

  // Transform ImplementationCountries from ISO codes to country objects
  let implementationCountries = rawData.Reach?.ImplementationCountries || [];
  if (Array.isArray(implementationCountries) && implementationCountries.length > 0) {
    // Check if the first item is a string (ISO code) - if so, transform all
    if (typeof implementationCountries[0] === 'string') {
      try {
        const countriesData = await loadCountriesData('en');
        const countryMap = new Map(countriesData.map(country => [country.iso_code || country.code, country]));
        
        implementationCountries = implementationCountries
          .map((isoCode: string) => {
            const countryData = countryMap.get(isoCode);
            if (countryData) {
              return {
                iso_code: countryData.iso_code || countryData.code,
                type: countryData.type || 'State',
                names: {
                  en: {
                    short: countryData.name.short,
                    formal: countryData.name.official
                  }
                }
              };
            }
            // Fallback for unknown ISO codes
            return {
              iso_code: isoCode,
              type: 'State',
              names: {
                en: {
                  short: isoCode.toUpperCase(),
                  formal: isoCode.toUpperCase()
                }
              }
            };
          })
          .filter(Boolean); // Remove any null/undefined entries
      } catch (error) {
        console.warn('Failed to transform implementation countries:', error);
        // Fallback transformation if country data loading fails
        implementationCountries = implementationCountries.map((isoCode: string) => ({
          iso_code: isoCode,
          type: 'State',
          names: {
            en: {
              short: isoCode.toUpperCase(),
              formal: isoCode.toUpperCase()
            }
          }
        }));
      }
    }
  }

  // Return the transformed data
  return {
    ID: rawData.ID || '',
    Name: rawData.Name || '',
    Logo: rawData.Logo,
    Website: rawData.Website || {},
    GlobalGoodsType: globalGoodsType,
    License: license,
    Contact: rawData.Contact || [],
    Classifications: classifications || {
      SDGs: [],
      WHO: [],
      WMO: [],
      DPI: []
    },
    StandardsAndInteroperability: {
      HealthStandards: healthStandards,
      Interoperability: interoperabilityStandards,
      ClimateStandards: climateStandards
    },
    ProductOverview: {
      Summary: rawData.ProductOverview?.Summary || '',
      Description: rawData.ProductOverview?.Description || '',
      PrimaryFunctionality: rawData.ProductOverview?.PrimaryFunctionality || '',
      Users: rawData.ProductOverview?.Users || '',
      Languages: languages,
      Screenshots: rawData.ProductOverview?.Screenshots || []
    },
    Reach: {
      SummaryOfReach: rawData.Reach?.SummaryOfReach || '',
      NumberOfImplementations: rawData.Reach?.NumberOfImplementations || 0,
      ImplementationMapOverview: rawData.Reach?.ImplementationMapOverview || null,
      ImplementationCountries: implementationCountries
    },
    Maturity: {
      SummaryOfMaturity: rawData.Maturity?.SummaryOfMaturity || '',
      Scores: rawData.Maturity?.Scores || []
    },
    ClimateAndHealthIntegration: {
      Description: rawData.ClimateAndHealthIntegration?.Description || ''
    },
    Community: {
      DescriptionOfCommunity: rawData.Community?.DescriptionOfCommunity || '',
      HostAnchorOrganization: {
        name: rawData.Community?.HostAnchorOrganization?.name || '',
        url: rawData.Community?.HostAnchorOrganization?.url || '',
        description: rawData.Community?.HostAnchorOrganization?.description || '',
        country: rawData.Community?.HostAnchorOrganization?.country || []
      },
      InceptionYear: rawData.Community?.InceptionYear || 0,
      SizeOfCommunity: rawData.Community?.SizeOfCommunity || 0,
      Links: {
        Community: rawData.Community?.Links?.Community,
        MailingList: rawData.Community?.Links?.MailingList
      },
      Events: {
        description: rawData.Community?.Events?.description || '',
        schedule: rawData.Community?.Events?.schedule || '',
        recent: rawData.Community?.Events?.recent || []
      },
      Policies: {
        Description: rawData.Community?.Policies?.Description || '',
        Governance: {
          url: rawData.Community?.Policies?.Governance?.url || '',
          description: rawData.Community?.Policies?.Governance?.description || ''
        },
        TermsOfUse: {
          url: rawData.Community?.Policies?.TermsOfUse?.url || '',
          description: rawData.Community?.Policies?.TermsOfUse?.description || ''
        },
        UserAgreement: {
          url: rawData.Community?.Policies?.UserAgreement?.url || '',
          description: rawData.Community?.Policies?.UserAgreement?.description || ''
        },
        PrivacyPolicy: {
          url: rawData.Community?.Policies?.PrivacyPolicy?.url || '',
          description: rawData.Community?.Policies?.PrivacyPolicy?.description || ''
        },
        DoNoHarm: {
          url: rawData.Community?.Policies?.DoNoHarm?.url || '',
          description: rawData.Community?.Policies?.DoNoHarm?.description || ''
        },
        PIICollected: {
          url: rawData.Community?.Policies?.PIICollected?.url || '',
          description: rawData.Community?.Policies?.PIICollected?.description || ''
        },
        NPIIUsed: {
          url: rawData.Community?.Policies?.NPIIUsed?.url || '',
          description: rawData.Community?.Policies?.NPIIUsed?.description || ''
        }
      }
    },
    InclusiveDesign: {
      Description: rawData.InclusiveDesign?.Description || '',
      UserInput: rawData.InclusiveDesign?.UserInput || '',
      OfflineSupport: rawData.InclusiveDesign?.OfflineSupport || ''
    },
    EnvironmentalImpact: {
      LowCarbon: rawData.EnvironmentalImpact?.LowCarbon || ''
    },
    TotalCostOfOwnership: {
      Description: rawData.TotalCostOfOwnership?.Description || '',
      url: rawData.TotalCostOfOwnership?.url || ''
    },
    Sustainability: {
      Description: rawData.Sustainability?.Description || '',
      KeyFundersSupporters: rawData.Sustainability?.KeyFundersSupporters || []
    },
    Resources: {
      Articles: rawData.Resources?.Articles || [],
      ProductDocumentation: rawData.Resources?.ProductDocumentation || [],
      UserRequirements: rawData.Resources?.UserRequirements || [],
      EndUserDocumentation: rawData.Resources?.EndUserDocumentation || [],
      ImplementerDocumentation: rawData.Resources?.ImplementerDocumentation || [],
      DeveloperDocumentation: rawData.Resources?.DeveloperDocumentation || [],
      OperatorDocumentation: rawData.Resources?.OperatorDocumentation || [],
      InstallationDocumentation: rawData.Resources?.InstallationDocumentation || []
    },
    LinkedInitiatives: {
      Initiative: linkedInitiatives
    }
  };
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
