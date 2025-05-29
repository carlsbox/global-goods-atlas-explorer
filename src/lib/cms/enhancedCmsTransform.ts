import { GlobalGoodFlat } from '@/lib/types/globalGoodFlat';
import { LanguageCode } from '@/lib/types';
import { 
  getLicenseById, 
  getProductLanguageByCode, 
  getCollectionInitiativeById 
} from '@/lib/loaders/referenceDataLoader';
import { resolveClassificationsByAuthority } from '@/lib/loaders/classificationsReferenceLoader';

// Enhanced CMS Global Good format that now uses reference IDs
export interface EnhancedCMSGlobalGood {
  ID: string;
  Name: string;
  Logo?: string;
  Website: {
    main?: {
      name: string;
      url: string;
      description: string;
    };
    docs?: {
      name: string;
      url: string;
      description: string;
    };
    source_code?: {
      name: string;
      url: string;
      description: string;
    };
    demo?: {
      name: string;
      url: string;
      description: string;
    };
  };
  // GlobalGoodsType can be either array of strings or array of objects for backward compatibility
  GlobalGoodsType: string[] | Array<{
    code: string;
    title: string;
    description: string;
  }>;
  License: string;
  Contact: Array<{
    name: string;
    email: string;
    role: string;
  }>;
  Classifications: {
    SDGs: string[];
    WHO: string[];
    WMO: string[];
    DPI: string[];
  };
  StandardsAndInteroperability: {
    HealthStandards: string[] | Array<{
      code: string;
      domain: string;
      link: string;
      name: string;
      description: string;
    }>;
    Interoperability: string[] | Array<{
      code: string;
      type: string;
      link: string;
      name: string;
      description: string;
    }>;
    ClimateStandards: Array<any>;
  };
  ProductOverview: {
    Summary: string;
    Description: string;
    PrimaryFunctionality: string;
    Users: string;
    Languages: string[];
    Screenshots: Array<{
      url: string;
      description: string;
    }>;
  };
  Reach: {
    SummaryOfReach: string;
    NumberOfImplementations: number;
    ImplementationMapOverview: {
      url: string;
      description: string;
    } | null;
    ImplementationCountries: Array<{
      iso_code: string;
      type: string;
      names: {
        en: {
          short: string;
          formal: string;
        };
      };
    }>;
  };
  Maturity: {
    SummaryOfMaturity: string;
    Scores: Array<{
      year: number;
      global_utility: number;
      community_support: number;
      maturity_of_gg: number;
      inclusive_design: number;
      climate_resilience: number;
      low_carbon: number;
    }>;
  };
  ClimateAndHealthIntegration: {
    Description: string;
  };
  Community: {
    DescriptionOfCommunity: string;
    HostAnchorOrganization: {
      name: string;
      url: string;
      description: string;
      country: string[];
    };
    InceptionYear: number;
    SizeOfCommunity: number;
    Links: {
      Community?: {
        url: string;
        description: string;
      };
      MailingList?: {
        url: string;
        description: string;
      };
    };
    Events: {
      description: string;
      schedule: string;
      recent: Array<{
        event: string;
        date: string;
        url: string;
      }>;
    };
    Policies: {
      Description: string;
      Governance: {
        url: string;
        description: string;
      };
      TermsOfUse: {
        url: string;
        description: string;
      };
      UserAgreement: {
        url: string;
        description: string;
      };
      PrivacyPolicy: {
        url: string;
        description: string;
      };
      DoNoHarm: {
        url: string;
        description: string;
      };
      PIICollected: {
        url: string;
        description: string;
      };
      NPIIUsed: {
        url: string;
        description: string;
      };
    };
  };
  InclusiveDesign: {
    Description: string;
    UserInput: string;
    OfflineSupport: string;
  };
  EnvironmentalImpact: {
    LowCarbon: string;
  };
  TotalCostOfOwnership: {
    Description: string;
    url: string;
  };
  Sustainability: {
    Description: string;
    KeyFundersSupporters: Array<{
      name: string;
      url: string;
      description: string;
    }>;
  };
  Resources: {
    Articles: Array<{
      description: string;
      url: string;
    }>;
    ProductDocumentation: Array<{
      description: string;
      url: string;
    }>;
    UserRequirements: Array<{
      description: string;
      url: string;
    }>;
    EndUserDocumentation: Array<{
      description: string;
      url: string;
    }>;
    ImplementerDocumentation: Array<{
      description: string;
      url: string;
    }>;
    DeveloperDocumentation: Array<{
      description: string;
      url: string;
    }>;
    OperatorDocumentation: Array<{
      description: string;
      url: string;
    }>;
    InstallationDocumentation: Array<{
      description: string;
      url: string;
    }>;
  };
  LinkedInitiatives: {
    Initiative: Array<{
      collectionInitiative: string;
      tool_url: string;
    }>;
  };
}

/**
 * Enhanced transform from CMS to application format with reference resolution
 */
export async function transformEnhancedCMSGlobalGoodToFlat(
  cmsGood: EnhancedCMSGlobalGood,
  language: LanguageCode = 'en'
): Promise<GlobalGoodFlat> {
  // Resolve license reference
  const license = await getLicenseById(cmsGood.License);
  
  // Resolve language references
  const languages = await Promise.all(
    cmsGood.ProductOverview.Languages.map(async (code) => {
      const lang = await getProductLanguageByCode(code);
      return lang ? { code: lang.code, name: lang.name } : { code, name: code };
    })
  );
  
  // Resolve classification references
  const resolvedClassifications = await resolveClassificationsByAuthority(cmsGood.Classifications);
  
  // Resolve collection initiative references
  const initiatives = await Promise.all(
    cmsGood.LinkedInitiatives.Initiative.map(async (initiative) => {
      const collectionInitiative = await getCollectionInitiativeById(initiative.collectionInitiative);
      return {
        collectionInitiative: collectionInitiative || {
          label: initiative.collectionInitiative,
          logo_url: '',
          site_url: '',
          description: ''
        },
        tool_url: initiative.tool_url
      };
    })
  );

  // Handle GlobalGoodsType transformation - support both formats
  let globalGoodsType: Array<{ code: string; title: string; description: string; }> = [];
  if (Array.isArray(cmsGood.GlobalGoodsType)) {
    if (cmsGood.GlobalGoodsType.length > 0) {
      if (typeof cmsGood.GlobalGoodsType[0] === 'string') {
        // Array of strings - convert to objects
        globalGoodsType = (cmsGood.GlobalGoodsType as string[]).map(code => ({
          code,
          title: code.charAt(0).toUpperCase() + code.slice(1),
          description: `${code.charAt(0).toUpperCase() + code.slice(1)} type global good`
        }));
      } else {
        // Array of objects - use as is
        globalGoodsType = cmsGood.GlobalGoodsType as Array<{ code: string; title: string; description: string; }>;
      }
    }
  }

  // Handle standards transformation - support both formats
  let healthStandards: Array<{ code: string; domain: string; link: string; name: string; description: string; }> = [];
  let interoperabilityStandards: Array<{ code: string; type: string; link: string; name: string; description: string; }> = [];

  if (Array.isArray(cmsGood.StandardsAndInteroperability?.HealthStandards)) {
    if (cmsGood.StandardsAndInteroperability.HealthStandards.length > 0) {
      if (typeof cmsGood.StandardsAndInteroperability.HealthStandards[0] === 'string') {
        // Array of strings - convert to objects
        healthStandards = (cmsGood.StandardsAndInteroperability.HealthStandards as string[]).map(code => ({
          code,
          domain: 'Health',
          link: '',
          name: code,
          description: `${code} health standard`
        }));
      } else {
        // Array of objects - use as is
        healthStandards = cmsGood.StandardsAndInteroperability.HealthStandards as Array<{ code: string; domain: string; link: string; name: string; description: string; }>;
      }
    }
  }

  if (Array.isArray(cmsGood.StandardsAndInteroperability?.Interoperability)) {
    if (cmsGood.StandardsAndInteroperability.Interoperability.length > 0) {
      if (typeof cmsGood.StandardsAndInteroperability.Interoperability[0] === 'string') {
        // Array of strings - convert to objects
        interoperabilityStandards = (cmsGood.StandardsAndInteroperability.Interoperability as string[]).map(code => ({
          code,
          type: 'exchange',
          link: '',
          name: code,
          description: `${code} interoperability standard`
        }));
      } else {
        // Array of objects - use as is
        interoperabilityStandards = cmsGood.StandardsAndInteroperability.Interoperability as Array<{ code: string; type: string; link: string; name: string; description: string; }>;
      }
    }
  }
  
  const transformed: GlobalGoodFlat = {
    ID: cmsGood.ID || '',
    Name: cmsGood.Name || '',
    Logo: cmsGood.Logo,
    Website: {
      main: cmsGood.Website?.main,
      docs: cmsGood.Website?.docs,
      source_code: cmsGood.Website?.source_code,
      demo: cmsGood.Website?.demo
    },
    GlobalGoodsType: globalGoodsType,
    License: license ? {
      id: license.id,
      name: license.name,
      url: license.url,
      description: license.description
    } : {
      id: cmsGood.License,
      name: cmsGood.License,
      url: '',
      description: ''
    },
    Contact: cmsGood.Contact || [],
    Classifications: resolvedClassifications,
    StandardsAndInteroperability: {
      HealthStandards: healthStandards,
      Interoperability: interoperabilityStandards,
      ClimateStandards: cmsGood.StandardsAndInteroperability?.ClimateStandards || []
    },
    ProductOverview: {
      Summary: cmsGood.ProductOverview?.Summary || '',
      Description: cmsGood.ProductOverview?.Description || '',
      PrimaryFunctionality: cmsGood.ProductOverview?.PrimaryFunctionality || '',
      Users: cmsGood.ProductOverview?.Users || '',
      Languages: languages,
      Screenshots: cmsGood.ProductOverview?.Screenshots || []
    },
    Reach: {
      SummaryOfReach: cmsGood.Reach?.SummaryOfReach || '',
      NumberOfImplementations: cmsGood.Reach?.NumberOfImplementations || 0,
      ImplementationMapOverview: cmsGood.Reach?.ImplementationMapOverview || null,
      ImplementationCountries: cmsGood.Reach?.ImplementationCountries || []
    },
    Maturity: {
      SummaryOfMaturity: cmsGood.Maturity?.SummaryOfMaturity || '',
      Scores: cmsGood.Maturity?.Scores || []
    },
    ClimateAndHealthIntegration: {
      Description: cmsGood.ClimateAndHealthIntegration?.Description || ''
    },
    Community: {
      DescriptionOfCommunity: cmsGood.Community?.DescriptionOfCommunity || '',
      HostAnchorOrganization: {
        name: cmsGood.Community?.HostAnchorOrganization?.name || '',
        url: cmsGood.Community?.HostAnchorOrganization?.url || '',
        description: cmsGood.Community?.HostAnchorOrganization?.description || '',
        country: cmsGood.Community?.HostAnchorOrganization?.country || []
      },
      InceptionYear: cmsGood.Community?.InceptionYear || 0,
      SizeOfCommunity: cmsGood.Community?.SizeOfCommunity || 0,
      Links: {
        Community: cmsGood.Community?.Links?.Community,
        MailingList: cmsGood.Community?.Links?.MailingList
      },
      Events: {
        description: cmsGood.Community?.Events?.description || '',
        schedule: cmsGood.Community?.Events?.schedule || '',
        recent: cmsGood.Community?.Events?.recent || []
      },
      Policies: {
        Description: cmsGood.Community?.Policies?.Description || '',
        Governance: {
          url: cmsGood.Community?.Policies?.Governance?.url || '',
          description: cmsGood.Community?.Policies?.Governance?.description || ''
        },
        TermsOfUse: {
          url: cmsGood.Community?.Policies?.TermsOfUse?.url || '',
          description: cmsGood.Community?.Policies?.TermsOfUse?.description || ''
        },
        UserAgreement: {
          url: cmsGood.Community?.Policies?.UserAgreement?.url || '',
          description: cmsGood.Community?.Policies?.UserAgreement?.description || ''
        },
        PrivacyPolicy: {
          url: cmsGood.Community?.Policies?.PrivacyPolicy?.url || '',
          description: cmsGood.Community?.Policies?.PrivacyPolicy?.description || ''
        },
        DoNoHarm: {
          url: cmsGood.Community?.Policies?.DoNoHarm?.url || '',
          description: cmsGood.Community?.Policies?.DoNoHarm?.description || ''
        },
        PIICollected: {
          url: cmsGood.Community?.Policies?.PIICollected?.url || '',
          description: cmsGood.Community?.Policies?.PIICollected?.description || ''
        },
        NPIIUsed: {
          url: cmsGood.Community?.Policies?.NPIIUsed?.url || '',
          description: cmsGood.Community?.Policies?.NPIIUsed?.description || ''
        }
      }
    },
    InclusiveDesign: {
      Description: cmsGood.InclusiveDesign?.Description || '',
      UserInput: cmsGood.InclusiveDesign?.UserInput || '',
      OfflineSupport: cmsGood.InclusiveDesign?.OfflineSupport || ''
    },
    EnvironmentalImpact: {
      LowCarbon: cmsGood.EnvironmentalImpact?.LowCarbon || ''
    },
    TotalCostOfOwnership: {
      Description: cmsGood.TotalCostOfOwnership?.Description || '',
      url: cmsGood.TotalCostOfOwnership?.url || ''
    },
    Sustainability: {
      Description: cmsGood.Sustainability?.Description || '',
      KeyFundersSupporters: cmsGood.Sustainability?.KeyFundersSupporters || []
    },
    Resources: {
      Articles: cmsGood.Resources?.Articles || [],
      ProductDocumentation: cmsGood.Resources?.ProductDocumentation || [],
      UserRequirements: cmsGood.Resources?.UserRequirements || [],
      EndUserDocumentation: cmsGood.Resources?.EndUserDocumentation || [],
      ImplementerDocumentation: cmsGood.Resources?.ImplementerDocumentation || [],
      DeveloperDocumentation: cmsGood.Resources?.DeveloperDocumentation || [],
      OperatorDocumentation: cmsGood.Resources?.OperatorDocumentation || [],
      InstallationDocumentation: cmsGood.Resources?.InstallationDocumentation || []
    },
    LinkedInitiatives: {
      Initiative: initiatives
    }
  };

  return transformed;
}

/**
 * Transform application format back to CMS format
 */
export function transformAppGlobalGoodToEnhancedCMS(
  appGood: GlobalGoodFlat
): EnhancedCMSGlobalGood {
  return {
    ID: appGood.ID,
    Name: appGood.Name,
    Logo: appGood.Logo,
    Website: appGood.Website,
    GlobalGoodsType: appGood.GlobalGoodsType.map(type => type.code),
    License: appGood.License.id,
    Contact: appGood.Contact,
    Classifications: {
      SDGs: appGood.Classifications.SDGs.map(sdg => sdg.code),
      WHO: appGood.Classifications.WHO.map(who => who.code),
      WMO: appGood.Classifications.WMO.map((wmo: any) => wmo.code || ''),
      DPI: appGood.Classifications.DPI.map(dpi => dpi.code)
    },
    StandardsAndInteroperability: {
      HealthStandards: appGood.StandardsAndInteroperability.HealthStandards.map(std => std.code),
      Interoperability: appGood.StandardsAndInteroperability.Interoperability.map(std => std.code),
      ClimateStandards: appGood.StandardsAndInteroperability.ClimateStandards
    },
    ProductOverview: {
      ...appGood.ProductOverview,
      Languages: appGood.ProductOverview.Languages.map(lang => lang.code)
    },
    Reach: appGood.Reach,
    Maturity: appGood.Maturity,
    ClimateAndHealthIntegration: appGood.ClimateAndHealthIntegration,
    Community: appGood.Community,
    InclusiveDesign: appGood.InclusiveDesign,
    EnvironmentalImpact: appGood.EnvironmentalImpact,
    TotalCostOfOwnership: appGood.TotalCostOfOwnership,
    Sustainability: appGood.Sustainability,
    Resources: appGood.Resources,
    LinkedInitiatives: {
      Initiative: appGood.LinkedInitiatives.Initiative.map(initiative => ({
        collectionInitiative: initiative.collectionInitiative.label,
        tool_url: initiative.tool_url
      }))
    }
  };
}

/**
 * Validate global good data structure
 */
export function validateGlobalGoodData(data: any): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!data.ID) errors.push('ID is required');
  if (!data.Name) errors.push('Name is required');
  
  // Validate ID format
  if (data.ID && !/^[a-z0-9-]+$/.test(data.ID)) {
    errors.push('ID must contain only lowercase letters, numbers, and hyphens');
  }

  // Validate required nested objects
  if (!data.Website) errors.push('Website object is required');
  if (!data.GlobalGoodsType || !Array.isArray(data.GlobalGoodsType)) {
    errors.push('GlobalGoodsType must be an array');
  }
  if (!data.License) errors.push('License object is required');
  if (!data.ProductOverview) errors.push('ProductOverview object is required');

  // Validate Classifications structure
  if (data.Classifications) {
    if (!Array.isArray(data.Classifications.SDGs)) {
      errors.push('Classifications.SDGs must be an array');
    }
    if (!Array.isArray(data.Classifications.WHO)) {
      errors.push('Classifications.WHO must be an array');
    }
    if (!Array.isArray(data.Classifications.WMO)) {
      errors.push('Classifications.WMO must be an array');
    }
    if (!Array.isArray(data.Classifications.DPI)) {
      errors.push('Classifications.DPI must be an array');
    }
  }

  // Validate maturity scores
  if (data.Maturity?.Scores) {
    data.Maturity.Scores.forEach((score: any, index: number) => {
      if (typeof score.year !== 'number') {
        errors.push(`Maturity score ${index + 1}: year must be a number`);
      }
      ['global_utility', 'community_support', 'maturity_of_gg', 'inclusive_design', 'climate_resilience', 'low_carbon'].forEach(field => {
        if (score[field] !== undefined && (typeof score[field] !== 'number' || score[field] < 0 || score[field] > 10)) {
          errors.push(`Maturity score ${index + 1}: ${field} must be a number between 0 and 10`);
        }
      });
    });
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}
