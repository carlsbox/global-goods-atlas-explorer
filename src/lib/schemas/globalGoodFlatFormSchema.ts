
import { z } from 'zod';

// Define the GlobalGoodFlat form schema that matches the exact structure
export const globalGoodFlatFormSchema = z.object({
  ID: z.string().optional(),
  Name: z.string().optional(),
  Logo: z.string().optional(),
  ClimateHealth: z.boolean().optional(),
  Website: z.object({
    main: z.object({
      name: z.string(),
      url: z.string(),
      description: z.string(),
    }).optional(),
    docs: z.object({
      name: z.string(),
      url: z.string(),
      description: z.string(),
    }).optional(),
    source_code: z.object({
      name: z.string(),
      url: z.string(),
      description: z.string(),
    }).optional(),
    demo: z.object({
      name: z.string(),
      url: z.string(),
      description: z.string(),
    }).optional(),
  }).optional(),
  GlobalGoodsType: z.array(z.object({
    code: z.string(),
    title: z.string(),
    description: z.string(),
  })).default([]),
  License: z.object({
    id: z.string(),
    name: z.string(),
    url: z.string(),
    description: z.string(),
  }).optional(),
  Contact: z.array(z.object({
    name: z.string(),
    email: z.string(),
    role: z.string(),
  })).default([]),
  Classifications: z.object({
    SDGs: z.array(z.object({
      code: z.string(),
      title: z.string(),
    })).default([]),
    WHO: z.array(z.object({
      code: z.string(),
      title: z.string(),
      group_code: z.string(),
      group_name: z.string(),
      authority: z.string(),
    })).default([]),
    WMO: z.array(z.any()).default([]),
    DPI: z.array(z.object({
      code: z.string(),
      title: z.string(),
      group_code: z.string(),
      group_name: z.string(),
      authority: z.string(),
    })).default([]),
  }).default({
    SDGs: [],
    WHO: [],
    WMO: [],
    DPI: [],
  }),
  StandardsAndInteroperability: z.object({
    HealthStandards: z.array(z.object({
      code: z.string(),
      domain: z.string(),
      link: z.string(),
      name: z.string(),
      description: z.string(),
    })).default([]),
    Interoperability: z.array(z.object({
      code: z.string(),
      type: z.string(),
      link: z.string(),
      name: z.string(),
      description: z.string(),
    })).default([]),
    ClimateStandards: z.array(z.any()).default([]),
  }).default({
    HealthStandards: [],
    Interoperability: [],
    ClimateStandards: [],
  }),
  ProductOverview: z.object({
    Summary: z.string().optional(),
    Description: z.string().optional(),
    PrimaryFunctionality: z.string().optional(),
    Users: z.string().optional(),
    Languages: z.array(z.object({
      code: z.string(),
      name: z.string(),
    })).default([]),
    Screenshots: z.array(z.object({
      url: z.string(),
      description: z.string(),
    })).default([]),
  }).optional(),
  Reach: z.object({
    SummaryOfReach: z.string(),
    NumberOfImplementations: z.number(),
    ImplementationMapOverview: z.object({
      url: z.string(),
      description: z.string(),
    }).nullable(),
    ImplementationCountries: z.array(z.object({
      iso_code: z.string(),
      type: z.string(),
      names: z.object({
        en: z.object({
          short: z.string(),
          formal: z.string(),
        }),
      }),
    })),
  }),
  Maturity: z.object({
    SummaryOfMaturity: z.string().optional(),
    Scores: z.array(z.object({
      year: z.number().optional(),
      global_utility: z.number().optional(),
      community_support: z.number().optional(),
      maturity_of_gg: z.number().optional(),
      inclusive_design: z.number().optional(),
      climate_resilience: z.number().optional(),
      low_carbon: z.number().optional(),
    })).default([]),
  }).optional(),
  ClimateAndHealthIntegration: z.object({
    Description: z.string(),
  }),
  Community: z.object({
    DescriptionOfCommunity: z.string(),
    HostAnchorOrganization: z.object({
      name: z.string(),
      url: z.string(),
      description: z.string(),
      country: z.array(z.string()),
    }),
    InceptionYear: z.number(),
    SizeOfCommunity: z.number(),
    Links: z.object({
      Community: z.object({
        url: z.string(),
        description: z.string(),
      }).optional(),
      MailingList: z.object({
        url: z.string(),
        description: z.string(),
      }).optional(),
    }),
    Events: z.object({
      description: z.string(),
      schedule: z.string(),
      recent: z.array(z.object({
        event: z.string(),
        date: z.string(),
        url: z.string(),
      })),
    }),
    Policies: z.object({
      Description: z.string(),
      Governance: z.object({
        url: z.string(),
        description: z.string(),
      }),
      TermsOfUse: z.object({
        url: z.string(),
        description: z.string(),
      }),
      UserAgreement: z.object({
        url: z.string(),
        description: z.string(),
      }),
      PrivacyPolicy: z.object({
        url: z.string(),
        description: z.string(),
      }),
      DoNoHarm: z.object({
        url: z.string(),
        description: z.string(),
      }),
      PIICollected: z.object({
        url: z.string(),
        description: z.string(),
      }),
      NPIIUsed: z.object({
        url: z.string(),
        description: z.string(),
      }),
    }),
  }),
  InclusiveDesign: z.object({
    Description: z.string(),
    UserInput: z.string(),
    OfflineSupport: z.string(),
  }),
  EnvironmentalImpact: z.object({
    LowCarbon: z.string(),
  }),
  TotalCostOfOwnership: z.object({
    Description: z.string(),
    url: z.string(),
  }),
  Sustainability: z.object({
    Description: z.string(),
    KeyFundersSupporters: z.array(z.object({
      name: z.string(),
      url: z.string(),
      description: z.string(),
    })),
  }),
  Resources: z.object({
    Articles: z.array(z.object({
      description: z.string(),
      url: z.string(),
    })),
    ProductDocumentation: z.array(z.object({
      description: z.string(),
      url: z.string(),
    })),
    UserRequirements: z.array(z.object({
      description: z.string(),
      url: z.string(),
    })),
    EndUserDocumentation: z.array(z.object({
      description: z.string(),
      url: z.string(),
    })),
    ImplementerDocumentation: z.array(z.object({
      description: z.string(),
      url: z.string(),
    })),
    DeveloperDocumentation: z.array(z.object({
      description: z.string(),
      url: z.string(),
    })),
    OperatorDocumentation: z.array(z.object({
      description: z.string(),
      url: z.string(),
    })),
    InstallationDocumentation: z.array(z.object({
      description: z.string(),
      url: z.string(),
    })),
  }),
  LinkedInitiatives: z.object({
    Initiative: z.array(z.object({
      collectionInitiative: z.object({
        label: z.string(),
        logo_url: z.string(),
        site_url: z.string(),
        description: z.string(),
      }),
      tool_url: z.string(),
    })),
  }),
});

export type GlobalGoodFlatFormValues = z.infer<typeof globalGoodFlatFormSchema>;
