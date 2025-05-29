
import { GlobalGoodFlat } from '@/lib/types/globalGoodFlat';

// This uses the reference data from context instead of making individual API calls
export async function transformRawDataToFlatOptimized(rawData: any): Promise<GlobalGoodFlat> {
  // Get reference data from localStorage cache
  const referenceCache = localStorage.getItem('reference-data-cache');
  const referenceData = referenceCache ? JSON.parse(referenceCache) : null;

  // Helper function to resolve license
  const resolveLicense = (licenseId: string) => {
    if (!referenceData?.licenses) return { id: licenseId, name: licenseId, url: '', description: '' };
    const license = referenceData.licenses.find((l: any) => l.id === licenseId);
    return license || { id: licenseId, name: licenseId, url: '', description: '' };
  };

  // Helper function to resolve classifications
  const resolveClassifications = (classifications: any) => {
    if (!referenceData?.classifications) return { SDGs: [], WHO: [], WMO: [], DPI: [] };
    
    const resolveCategory = (codes: string[] = [], category: string) => {
      const categoryData = referenceData.classifications[category] || [];
      return codes.map(code => {
        const item = categoryData.find((c: any) => c.code === code);
        return item || { code, title: code, description: '' };
      });
    };

    return {
      SDGs: resolveCategory(classifications?.SDGs, 'sdgs'),
      WHO: resolveCategory(classifications?.WHO, 'who'),
      WMO: resolveCategory(classifications?.WMO, 'wmo'),
      DPI: resolveCategory(classifications?.DPI, 'dpi')
    };
  };

  // Helper function to resolve global goods types
  const resolveGlobalGoodsTypes = (types: string[] = []) => {
    if (!referenceData?.globalGoodsTypes) return types.map(code => ({ code, title: code, description: '' }));
    return types.map(code => {
      const type = referenceData.globalGoodsTypes.find((t: any) => t.code === code);
      return type || { code, title: code, description: '' };
    });
  };

  // Helper function to resolve countries
  const resolveCountries = (countryCodes: string[] = []) => {
    if (!referenceData?.countries) {
      return countryCodes.map(code => ({
        iso_code: code,
        type: 'State',
        names: { en: { short: code.toUpperCase(), formal: code.toUpperCase() } }
      }));
    }
    
    return countryCodes.map(code => {
      const country = referenceData.countries[code.toLowerCase()];
      if (country) {
        return {
          iso_code: country.iso_code || code,
          type: country.type || 'State',
          names: {
            en: {
              short: country.short || code.toUpperCase(),
              formal: country.formal || code.toUpperCase()
            }
          }
        };
      }
      return {
        iso_code: code,
        type: 'State',
        names: { en: { short: code.toUpperCase(), formal: code.toUpperCase() } }
      };
    });
  };

  // Helper function to resolve standards
  const resolveStandards = (standardCodes: string[] = [], domain: string) => {
    if (!referenceData?.standards) {
      return standardCodes.map(code => ({
        code,
        domain,
        link: '',
        name: code,
        description: ''
      }));
    }
    
    return standardCodes.map(code => {
      const standard = referenceData.standards[code];
      return standard ? {
        code: standard.code,
        domain: standard.domain || domain,
        link: standard.link || '',
        name: standard.name || code,
        description: standard.description || ''
      } : {
        code,
        domain,
        link: '',
        name: code,
        description: ''
      };
    });
  };

  // Transform the data using cached references
  const license = typeof rawData.License === 'string' ? resolveLicense(rawData.License) : rawData.License || { id: '', name: '', url: '', description: '' };
  
  const classifications = resolveClassifications(rawData.Classifications);
  
  const globalGoodsType = Array.isArray(rawData.GlobalGoodsType) && rawData.GlobalGoodsType.length > 0 && typeof rawData.GlobalGoodsType[0] === 'string'
    ? resolveGlobalGoodsTypes(rawData.GlobalGoodsType)
    : rawData.GlobalGoodsType || [];

  const implementationCountries = rawData.Reach?.ImplementationCountries && Array.isArray(rawData.Reach.ImplementationCountries) && typeof rawData.Reach.ImplementationCountries[0] === 'string'
    ? resolveCountries(rawData.Reach.ImplementationCountries)
    : rawData.Reach?.ImplementationCountries || [];

  const healthStandards = rawData.StandardsAndInteroperability?.HealthStandards && Array.isArray(rawData.StandardsAndInteroperability.HealthStandards) && typeof rawData.StandardsAndInteroperability.HealthStandards[0] === 'string'
    ? resolveStandards(rawData.StandardsAndInteroperability.HealthStandards, 'Health')
    : rawData.StandardsAndInteroperability?.HealthStandards || [];

  const interoperabilityStandards = rawData.StandardsAndInteroperability?.Interoperability && Array.isArray(rawData.StandardsAndInteroperability.Interoperability) && typeof rawData.StandardsAndInteroperability.Interoperability[0] === 'string'
    ? resolveStandards(rawData.StandardsAndInteroperability.Interoperability, 'Interoperability')
    : rawData.StandardsAndInteroperability?.Interoperability || [];

  const climateStandards = rawData.StandardsAndInteroperability?.ClimateStandards && Array.isArray(rawData.StandardsAndInteroperability.ClimateStandards) && typeof rawData.StandardsAndInteroperability.ClimateStandards[0] === 'string'
    ? resolveStandards(rawData.StandardsAndInteroperability.ClimateStandards, 'Climate')
    : rawData.StandardsAndInteroperability?.ClimateStandards || [];

  return {
    ID: rawData.ID || '',
    Name: rawData.Name || '',
    Logo: rawData.Logo,
    Website: rawData.Website || {},
    GlobalGoodsType: globalGoodsType,
    License: license,
    Contact: rawData.Contact || [],
    Classifications: classifications,
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
      Languages: rawData.ProductOverview?.Languages || [],
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
      Initiative: rawData.LinkedInitiatives?.Initiative || []
    }
  };
}
