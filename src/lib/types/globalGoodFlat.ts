
// New type definition that matches the exact JSON structure
export interface GlobalGoodFlat {
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
  GlobalGoodsType: Array<{
    code: string;
    title: string;
    description: string;
  }>;
  License: {
    id: string;
    name: string;
    url: string;
    description: string;
  };
  Contact: Array<{
    name: string;
    email: string;
    role: string;
  }>;
  Classifications: {
    SDGs: Array<{
      code: string;
      title: string;
    }>;
    WHO: Array<{
      code: string;
      title: string;
      group_code: string;
      group_name: string;
      authority: string;
    }>;
    WMO: Array<any>;
    DPI: Array<{
      code: string;
      title: string;
      group_code: string;
      group_name: string;
      authority: string;
    }>;
  };
  StandardsAndInteroperability: {
    HealthStandards: Array<{
      code: string;
      domain: string;
      link: string;
      name: string;
      description: string;
    }>;
    Interoperability: Array<{
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
    Languages: Array<{
      code: string;
      name: string;
    }>;
    Screenshots: Array<{
      url: string;
      description: string;
    }>;
  };
  Reach: {
    SummaryOfReach: string;
    NumberOfImplementations: number;
    ImplementationMapOverview: Array<{
      url: string;
      description: string;
    }>;
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
      collectionInitiative: {
        label: string;
        logo_url: string;
        site_url: string;
        description: string;
      };
      tool_url: string;
    }>;
  };
}
