import { useQuery } from '@tanstack/react-query';
import { loadGlobalGoodsIndexForMap } from '../loaders/globalGoodIndexLoader';
import { GlobalGoodFlat } from '../types/globalGoodFlat';

/**
 * Transform the lightweight index data to the GlobalGoodFlat format expected by map components
 * This provides compatibility while avoiding heavy reference resolution
 */
function transformIndexToFlat(indexData: any[]): GlobalGoodFlat[] {
  return indexData.map(item => ({
    ID: item.ID,
    Name: item.Name,
    Logo: item.Logo || '/uploads/logo-Placeholder.jpg',
    
    // Map GlobalGoodTypeResolved (titles) to GlobalGoodsType format
    GlobalGoodsType: item.GlobalGoodTypeResolved || [],
    
    // ProductOverview - only include the summary for the map
    ProductOverview: {
      Summary: item.Summary || '',
      Description: '',
      PrimaryFunctionality: '',
      Users: '',
      Languages: [],
      Screenshots: []
    },
    
    // Reach - use Countries array directly as ImplementationCountries
    Reach: {
      SummaryOfReach: '',
      NumberOfImplementations: item.Countries?.length || 0,
      ImplementationMapOverview: { url: '', description: '' },
      ImplementationCountries: (item.Countries || []).map((code: string) => ({
        iso_code: code,
        type: 'deployment',
        names: { en: code }
      }))
    },
    
    // Empty/default values for other fields not needed by the map
    AlternateName: '',
    Description: '',
    Website: {
      main: { name: '', url: '', description: '' }
    },
    License: { id: '', name: '', url: '', description: '' },
    ContactInfo: {
      Email: '',
      Phone: '',
      Address: '',
      ContactName: ''
    },
    Contact: [],
    Languages: [],
    Classifications: {
      SDGs: [],
      WHO: [],
      WMO: [],
      DPI: []
    },
    Standards: {
      Health: [],
      Interop: [],
      Climate: []
    },
    StandardsAndInteroperability: {
      HealthStandards: [],
      Interoperability: [],
      ClimateStandards: []
    },
    LinkedInitiatives: { Initiative: [] },
    TotalCostOwnership: {
      InitialCost: '',
      OngoingCost: '',
      Infrastructure: '',
      Training: '',
      Support: ''
    },
    TotalCostOfOwnership: {
      Description: '',
      url: ''
    },
    Sustainability: {
      Description: '',
      KeyFundersSupporters: []
    },
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
    MaturityScores: {},
    Maturity: {
      SummaryOfMaturity: '',
      Scores: []
    },
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
    EnvironmentalImpact: {
      LowCarbon: ''
    },
    ClimateAndHealthIntegration: {
      Description: ''
    },
    UsageRestrictions: '',
    RegistryBadge: '',
    LastUpdated: '',
    InclusiveDesign: {
      Description: '',
      UserInput: '',
      OfflineSupport: ''
    },
    Screenshots: [],
    Videos: [],
    Documentation: [],
    Tags: []
  }));
}

/**
 * Hook to load global goods index data optimized for the map page
 * Uses lightweight loading without resolving all references
 */
export function useGlobalGoodsIndex() {
  return useQuery({
    queryKey: ['globalGoodsIndex'],
    queryFn: async () => {
      const indexData = await loadGlobalGoodsIndexForMap();
      return transformIndexToFlat(indexData);
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
}