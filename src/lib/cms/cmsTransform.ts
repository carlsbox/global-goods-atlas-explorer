
import { GlobalGoodFlat } from '@/lib/types/globalGoodFlat';
import { UseCase } from '@/lib/types/useCase';
import { LanguageCode } from '@/lib/types';

// CMS Global Good format (non-multilingual)
export interface CMSGlobalGood {
  id: string;
  name: string;
  logo?: string;
  website: {
    main_name?: string;
    main_url?: string;
    main_description?: string;
    docs_name?: string;
    docs_url?: string;
    docs_description?: string;
    source_name?: string;
    source_url?: string;
    source_description?: string;
    demo_name?: string;
    demo_url?: string;
    demo_description?: string;
  };
  global_goods_type: Array<{
    code: string;
    title: string;
    description: string;
  }>;
  license: {
    id: string;
    name: string;
    url?: string;
    description?: string;
  };
  contact: Array<{
    name: string;
    email: string;
    role: string;
  }>;
  classifications: {
    sdgs: string[];
    who: string[];
    wmo: string[];
    dpi: string[];
  };
  product_overview: {
    summary: string;
    description: string;
    primary_functionality: string;
    users: string;
    languages: Array<{
      code: string;
      name: string;
    }>;
    screenshots: Array<{
      url: string;
      description: string;
    }>;
  };
  standards_interoperability: {
    health_standards: Array<{
      code: string;
      domain: string;
      link?: string;
      name: string;
      description: string;
    }>;
    interoperability: Array<{
      code: string;
      type: string;
      link?: string;
      name: string;
      description: string;
    }>;
  };
  reach: {
    summary_of_reach: string;
    number_of_implementations: number;
    implementation_countries: string[];
  };
  community: {
    description_of_community: string;
    host_anchor_organization: {
      name: string;
      url?: string;
      description: string;
      country: string[];
    };
    inception_year: number;
    size_of_community: number;
  };
  sustainability: {
    description: string;
    key_funders_supporters: Array<{
      name: string;
      url?: string;
      description: string;
    }>;
  };
}

// CMS Use Case format (multilingual)
export interface CMSUseCase {
  id: string;
  title: { [key in LanguageCode]: string };
  purpose: { [key in LanguageCode]: string };
  classifications: {
    sdg?: string;
    who_system?: string;
    wmo_category?: string;
  };
  scope: { [key in LanguageCode]: string };
  actors: { [key in LanguageCode]: string };
  preconditions: { [key in LanguageCode]: string };
  process_steps: { [key in LanguageCode]: string };
  postconditions: { [key in LanguageCode]: string };
  data_requirements: { [key in LanguageCode]: string };
  standards: string[]; // Updated to match the new format - just array of codes
  technology_components: { [key in LanguageCode]: string };
  global_goods: Array<{
    id: string;
    name: string;
    url?: string;
  }>;
  challenges: { [key in LanguageCode]: string };
  sustainability_considerations: { [key in LanguageCode]: string };
}

/**
 * Transform CMS Global Good to application format
 */
export function transformCMSGlobalGoodToFlat(
  cmsGood: CMSGlobalGood,
  language: LanguageCode = 'en'
): GlobalGoodFlat {
  return {
    ID: cmsGood.id,
    Name: cmsGood.name,
    Logo: cmsGood.logo,
    Website: {
      main: cmsGood.website.main_url ? {
        name: cmsGood.website.main_name || '',
        url: cmsGood.website.main_url,
        description: cmsGood.website.main_description || ''
      } : undefined,
      docs: cmsGood.website.docs_url ? {
        name: cmsGood.website.docs_name || '',
        url: cmsGood.website.docs_url,
        description: cmsGood.website.docs_description || ''
      } : undefined,
      source_code: cmsGood.website.source_url ? {
        name: cmsGood.website.source_name || '',
        url: cmsGood.website.source_url,
        description: cmsGood.website.source_description || ''
      } : undefined,
      demo: cmsGood.website.demo_url ? {
        name: cmsGood.website.demo_name || '',
        url: cmsGood.website.demo_url,
        description: cmsGood.website.demo_description || ''
      } : undefined
    },
    GlobalGoodsType: cmsGood.global_goods_type || [],
    License: {
      id: cmsGood.license.id,
      name: cmsGood.license.name,
      url: cmsGood.license.url || '',
      description: cmsGood.license.description || ''
    },
    Contact: cmsGood.contact || [],
    Classifications: {
      SDGs: cmsGood.classifications.sdgs.map(code => ({ code, title: '' })),
      WHO: cmsGood.classifications.who.map(code => ({ 
        code, 
        title: '', 
        group_code: '', 
        group_name: '', 
        authority: '' 
      })),
      WMO: cmsGood.classifications.wmo.map(code => ({ 
        code, 
        title: '', 
        group_code: '', 
        group_name: '', 
        authority: '' 
      })),
      DPI: cmsGood.classifications.dpi.map(code => ({ 
        code, 
        title: '', 
        group_code: '', 
        group_name: '', 
        authority: '' 
      }))
    },
    StandardsAndInteroperability: {
      HealthStandards: cmsGood.standards_interoperability.health_standards.map(standard => ({
        ...standard,
        link: standard.link || ''
      })),
      Interoperability: cmsGood.standards_interoperability.interoperability.map(standard => ({
        ...standard,
        link: standard.link || ''
      })),
      ClimateStandards: []
    },
    ProductOverview: {
      Summary: cmsGood.product_overview.summary,
      Description: cmsGood.product_overview.description,
      PrimaryFunctionality: cmsGood.product_overview.primary_functionality,
      Users: cmsGood.product_overview.users,
      Languages: cmsGood.product_overview.languages || [],
      Screenshots: cmsGood.product_overview.screenshots || []
    },
    Reach: {
      SummaryOfReach: cmsGood.reach.summary_of_reach,
      NumberOfImplementations: cmsGood.reach.number_of_implementations || 0,
      ImplementationMapOverview: null,
      ImplementationCountries: cmsGood.reach.implementation_countries.map(iso_code => ({
        iso_code,
        type: 'Country',
        names: { en: { short: iso_code, formal: iso_code } }
      }))
    },
    Maturity: { SummaryOfMaturity: '', Scores: [] },
    ClimateAndHealthIntegration: { Description: '' },
    Community: {
      DescriptionOfCommunity: cmsGood.community.description_of_community,
      HostAnchorOrganization: {
        name: cmsGood.community.host_anchor_organization.name,
        url: cmsGood.community.host_anchor_organization.url || '',
        description: cmsGood.community.host_anchor_organization.description,
        country: cmsGood.community.host_anchor_organization.country
      },
      InceptionYear: cmsGood.community.inception_year || 0,
      SizeOfCommunity: cmsGood.community.size_of_community || 0,
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
    Sustainability: {
      Description: cmsGood.sustainability.description,
      KeyFundersSupporters: cmsGood.sustainability.key_funders_supporters.map(supporter => ({
        name: supporter.name,
        url: supporter.url || '',
        description: supporter.description
      }))
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
    LinkedInitiatives: { Initiative: [] }
  };
}

/**
 * Transform CMS Use Case to application format
 */
export function transformCMSUseCaseToApp(
  cmsUseCase: CMSUseCase,
  language: LanguageCode = 'en'
): UseCase {
  // Get text for the specified language with fallback to English
  const getText = (field: { [key in LanguageCode]: string } | undefined): string => {
    if (!field) return '';
    return field[language] || field.en || '';
  };

  return {
    id: cmsUseCase.id,
    title: getText(cmsUseCase.title),
    purpose: getText(cmsUseCase.purpose),
    classifications: cmsUseCase.classifications,
    scope: getText(cmsUseCase.scope),
    actors: getText(cmsUseCase.actors),
    preconditions: getText(cmsUseCase.preconditions),
    process_steps: getText(cmsUseCase.process_steps),
    postconditions: getText(cmsUseCase.postconditions),
    data_requirements: getText(cmsUseCase.data_requirements),
    standards: cmsUseCase.standards, // Updated - just pass through the string array
    technology_components: getText(cmsUseCase.technology_components),
    global_goods: cmsUseCase.global_goods.map(good => ({
      id: good.id,
      name: good.name,
      url: good.url || ''
    })),
    challenges: getText(cmsUseCase.challenges),
    sustainability_considerations: getText(cmsUseCase.sustainability_considerations)
  };
}

/**
 * Transform application Global Good to CMS format
 */
export function transformAppGlobalGoodToCMS(
  appGood: GlobalGoodFlat
): CMSGlobalGood {
  return {
    id: appGood.ID,
    name: appGood.Name,
    logo: appGood.Logo,
    website: {
      main_name: appGood.Website.main?.name,
      main_url: appGood.Website.main?.url,
      main_description: appGood.Website.main?.description,
      docs_name: appGood.Website.docs?.name,
      docs_url: appGood.Website.docs?.url,
      docs_description: appGood.Website.docs?.description,
      source_name: appGood.Website.source_code?.name,
      source_url: appGood.Website.source_code?.url,
      source_description: appGood.Website.source_code?.description,
      demo_name: appGood.Website.demo?.name,
      demo_url: appGood.Website.demo?.url,
      demo_description: appGood.Website.demo?.description
    },
    global_goods_type: appGood.GlobalGoodsType || [],
    license: appGood.License,
    contact: appGood.Contact || [],
    classifications: {
      sdgs: appGood.Classifications.SDGs.map(sdg => sdg.code),
      who: appGood.Classifications.WHO.map(who => who.code),
      wmo: appGood.Classifications.WMO.map((wmo: any) => wmo.code || ''),
      dpi: appGood.Classifications.DPI.map(dpi => dpi.code)
    },
    product_overview: {
      summary: appGood.ProductOverview.Summary,
      description: appGood.ProductOverview.Description,
      primary_functionality: appGood.ProductOverview.PrimaryFunctionality,
      users: appGood.ProductOverview.Users,
      languages: appGood.ProductOverview.Languages || [],
      screenshots: appGood.ProductOverview.Screenshots || []
    },
    standards_interoperability: {
      health_standards: appGood.StandardsAndInteroperability.HealthStandards || [],
      interoperability: appGood.StandardsAndInteroperability.Interoperability || []
    },
    reach: {
      summary_of_reach: appGood.Reach.SummaryOfReach,
      number_of_implementations: appGood.Reach.NumberOfImplementations || 0,
      implementation_countries: appGood.Reach.ImplementationCountries.map(country => country.iso_code)
    },
    community: {
      description_of_community: appGood.Community.DescriptionOfCommunity,
      host_anchor_organization: appGood.Community.HostAnchorOrganization,
      inception_year: appGood.Community.InceptionYear || 0,
      size_of_community: appGood.Community.SizeOfCommunity || 0
    },
    sustainability: {
      description: appGood.Sustainability.Description,
      key_funders_supporters: appGood.Sustainability.KeyFundersSupporters || []
    }
  };
}
