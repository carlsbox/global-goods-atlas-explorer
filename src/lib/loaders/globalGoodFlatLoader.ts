import { GlobalGoodFlat } from '../types/globalGoodFlat';
import { getLicenseById, getProductLanguageByCode, getStandardByCode, getGlobalGoodsTypeByCode, getCollectionInitiativeById } from './referenceDataLoader';
import { resolveClassificationsByAuthority } from './classificationsReferenceLoader';
import { loadCountriesData } from './countryLoader';
import { referenceDataCache } from '@/lib/cache/ReferenceDataCache';

interface GlobalGoodIndexEnhanced {
  ID: string;
  Name: string;
  Summary?: string;
  Logo?: string;
  ClimateHealth?: boolean;
  NumberOfImplementations?: number;
  GlobalGoodType?: string[]; // Now just codes
  Countries?: string[]; // Just ISO codes
  Classifications?: {
    SDGs?: string[]; // Just codes
    WHO?: string[]; // Just codes
    WMO?: string[]; // Just codes
    DPI?: string[]; // Just codes
  };
  Standards?: {
    Health?: string[]; // Just codes
    Interop?: string[]; // Just codes
    Climate?: string[]; // Just codes
  };
}

let globalGoodsIndexCache: GlobalGoodIndexEnhanced[] | null = null;
const individualFileCache = new Map<string, GlobalGoodFlat>();

async function fetchGlobalGoodsIndex(): Promise<GlobalGoodIndexEnhanced[]> {
  return referenceDataCache.get(
    'globalGoodsIndex',
    async () => {
      const res = await fetch('/data/global-goods/index.json');
      if (!res.ok) throw new Error('Failed to fetch global goods index');
      return res.json();
    },
    { ttl: 5 * 60 * 1000 } // 5 minutes cache for index
  );
}

// Helper function to resolve index item references
async function resolveIndexReferences(indexItem: GlobalGoodIndexEnhanced) {
  try {
    // Resolve GlobalGoodType codes
    const globalGoodTypes = indexItem.GlobalGoodType ? await Promise.all(
      indexItem.GlobalGoodType.map(async (code) => {
        const type = await getGlobalGoodsTypeByCode(code);
        return type ? {
          code: type.code,
          title: type.title,
          description: type.description
        } : {
          code,
          title: code,
          description: ''
        };
      })
    ) : [];

    // Resolve classification codes
    const classifications = indexItem.Classifications ? await resolveClassificationsByAuthority({
      SDGs: indexItem.Classifications.SDGs || [],
      WHO: indexItem.Classifications.WHO || [],
      WMO: indexItem.Classifications.WMO || [],
      DPI: indexItem.Classifications.DPI || []
    }) : {
      SDGs: [],
      WHO: [],
      WMO: [],
      DPI: []
    };

    // Resolve standards codes
    const healthStandards = indexItem.Standards?.Health ? await Promise.all(
      indexItem.Standards.Health.map(async (code) => {
        const standard = await getStandardByCode(code);
        return standard ? {
          code: standard.code,
          domain: standard.domain,
          link: standard.link,
          name: standard.name,
          description: standard.description
        } : {
          code,
          domain: 'Health',
          link: '',
          name: code,
          description: ''
        };
      })
    ) : [];

    const interopStandards = indexItem.Standards?.Interop ? await Promise.all(
      indexItem.Standards.Interop.map(async (code) => {
        const standard = await getStandardByCode(code);
        return standard ? {
          code: standard.code,
          type: standard.type,
          link: standard.link,
          name: standard.name,
          description: standard.description
        } : {
          code,
          type: 'interoperability',
          link: '',
          name: code,
          description: ''
        };
      })
    ) : [];

    const climateStandards = indexItem.Standards?.Climate ? await Promise.all(
      indexItem.Standards.Climate.map(async (code) => {
        const standard = await getStandardByCode(code);
        return standard ? {
          code: standard.code,
          domain: standard.domain,
          link: standard.link,
          name: standard.name,
          description: standard.description
        } : {
          code,
          domain: 'Climate',
          link: '',
          name: code,
          description: ''
        };
      })
    ) : [];

    // Resolve country codes
    const implementationCountries = indexItem.Countries ? await (async () => {
      try {
        const countriesData = await loadCountriesData('en');
        const countryMap = new Map(countriesData.map(country => [country.iso_code || country.code, country]));
        
        return indexItem.Countries!.map((isoCode) => {
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
        });
      } catch (error) {
        console.warn('Failed to resolve implementation countries:', error);
        return indexItem.Countries!.map((isoCode) => ({
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
    })() : [];

    return {
      globalGoodTypes,
      classifications,
      healthStandards,
      interopStandards,
      climateStandards,
      implementationCountries
    };
  } catch (error) {
    console.error('Error resolving index references:', error);
    return {
      globalGoodTypes: [],
      classifications: { SDGs: [], WHO: [], WMO: [], DPI: [] },
      healthStandards: [],
      interopStandards: [],
      climateStandards: [],
      implementationCountries: []
    };
  }
}

async function fetchIndividualGlobalGood(id: string): Promise<GlobalGoodFlat | undefined> {
  return referenceDataCache.get(
    `globalGood:${id}`,
    async () => {
      const res = await fetch(`/data/global-goods/individual/${id}.json`);
      if (!res.ok) {
        console.warn(`Individual file not found for global good: ${id}`);
        return undefined;
      }
      const rawData = await res.json();
      
      // Transform the raw data to resolve references
      const transformedData = await transformRawDataToFlat(rawData);
      return transformedData;
    },
    { ttl: 10 * 60 * 1000 } // 10 minutes cache for individual goods
  );
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
    ClimateHealth: rawData.ClimateHealth,
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
  
  // For index items, we need to resolve references on-demand
  const resolvedItems = await Promise.all(
    index.map(async (indexItem) => {
      const resolved = await resolveIndexReferences(indexItem);
      
      return {
        ID: indexItem.ID,
        Name: indexItem.Name,
        Logo: indexItem.Logo,
        ClimateHealth: indexItem.ClimateHealth,
        Website: {},
        GlobalGoodsType: resolved.globalGoodTypes,
        License: { id: '', name: '', url: '', description: '' },
        Contact: [],
        Classifications: resolved.classifications,
        StandardsAndInteroperability: {
          HealthStandards: resolved.healthStandards,
          Interoperability: resolved.interopStandards,
          ClimateStandards: resolved.climateStandards
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
          NumberOfImplementations: indexItem.NumberOfImplementations || 0,
          ImplementationMapOverview: null,
          ImplementationCountries: resolved.implementationCountries
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
      };
    })
  );

  return resolvedItems;
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

// Simple type mapping to avoid async lookups for featured goods
const GLOBAL_GOOD_TYPE_TITLES: Record<string, string> = {
  'software': 'Software',
  'content': 'Content',
  'standard': 'Standard',
  'data': 'Data',
  'curriculum': 'Curriculum',
  'advocacy_training_CHW': 'Advocacy Training CHW',
  'advocacy_training_content': 'Advocacy Training Content',
  'chw_guidelines': 'CHW Guidelines',
  'curriculum_content': 'Curriculum Content',
  'guidelines': 'Guidelines',
  'health_education_training': 'Health Education Training',
  'job_aids': 'Job Aids',
  'planning_documents': 'Planning Documents',
  'reference_content': 'Reference Content'
};

/**
 * Load featured global goods for the home page with minimal processing
 * Only resolves the data needed for card display
 */
export async function loadFeaturedGlobalGoods(count?: number): Promise<GlobalGoodFlat[]> {
  try {
    const response = await fetch('/data/global-goods/index.json');
    if (!response.ok) {
      throw new Error(`Failed to fetch global goods index: ${response.statusText}`);
    }
    
    const indexData = await response.json();
    
    // Randomly select 3-5 items (or use provided count)
    const itemCount = count || Math.floor(Math.random() * 3) + 3; // Random between 3-5
    const shuffled = [...indexData].sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, itemCount);
    
    // Map with minimal processing - just resolve type titles
    return selected.map((item: any) => ({
      ...item,
      // Map type codes to titles without async lookup
      GlobalGoodsType: Array.isArray(item.GlobalGoodType) 
        ? item.GlobalGoodType.map((type: string) => ({
            code: type,
            title: GLOBAL_GOOD_TYPE_TITLES[type] || type,
            description: ''
          }))
        : [],
      // Keep other fields as-is for card display
      Name: item.Name,
      Logo: item.Logo,
      // Map Summary from index.json to ProductOverview structure
      ProductOverview: {
        Summary: item.Summary || '',
        Description: item.Summary || '' // Use Summary as Description since index doesn't have full description
      },
      Reach: item.Reach,
      Website: item.Website
    }));
  } catch (error) {
    console.error('Error loading featured global goods:', error);
    return [];
  }
}
