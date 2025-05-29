
import { GlobalGoodFlat } from '@/lib/types/globalGoodFlat';
import { LanguageCode } from '@/lib/types';

// Enhanced CMS Global Good format that matches the complete structure
export interface EnhancedCMSGlobalGood extends GlobalGoodFlat {
  // This interface now directly extends GlobalGoodFlat to ensure 1:1 mapping
}

/**
 * Enhanced transform from CMS to application format
 * Now handles the complete data structure without loss
 */
export function transformEnhancedCMSGlobalGoodToFlat(
  cmsGood: EnhancedCMSGlobalGood,
  language: LanguageCode = 'en'
): GlobalGoodFlat {
  // Since the CMS format now matches the app format exactly,
  // we can do a direct pass-through with validation
  
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
    GlobalGoodsType: cmsGood.GlobalGoodsType || [],
    License: {
      id: cmsGood.License?.id || '',
      name: cmsGood.License?.name || '',
      url: cmsGood.License?.url || '',
      description: cmsGood.License?.description || ''
    },
    Contact: cmsGood.Contact || [],
    Classifications: {
      SDGs: cmsGood.Classifications?.SDGs || [],
      WHO: cmsGood.Classifications?.WHO || [],
      WMO: cmsGood.Classifications?.WMO || [],
      DPI: cmsGood.Classifications?.DPI || []
    },
    StandardsAndInteroperability: {
      HealthStandards: cmsGood.StandardsAndInteroperability?.HealthStandards || [],
      Interoperability: cmsGood.StandardsAndInteroperability?.Interoperability || [],
      ClimateStandards: cmsGood.StandardsAndInteroperability?.ClimateStandards || []
    },
    ProductOverview: {
      Summary: cmsGood.ProductOverview?.Summary || '',
      Description: cmsGood.ProductOverview?.Description || '',
      PrimaryFunctionality: cmsGood.ProductOverview?.PrimaryFunctionality || '',
      Users: cmsGood.ProductOverview?.Users || '',
      Languages: cmsGood.ProductOverview?.Languages || [],
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
      Initiative: cmsGood.LinkedInitiatives?.Initiative || []
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
  // Direct mapping since formats now match
  return { ...appGood };
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
