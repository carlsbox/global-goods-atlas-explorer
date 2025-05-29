
# AI Document Extraction Template for Global Goods Data

## INSTRUCTIONS FOR AI EXTRACTION BOT

You are tasked with extracting structured data about a global good (digital public good, open source software, or similar tool/platform) from provided documents. Use this template as your guide to extract and structure the information.

### EXTRACTION GUIDELINES:
1. Extract information only from the provided documents
2. If information is not found, use null or empty values as specified
3. Provide confidence scores for each major section (1-10, where 10 = highly confident)
4. Follow the exact data types and formats specified below
5. When unsure, prefer conservative extraction over speculation
6. Look for multiple mentions of the same information to increase confidence
7. Pay attention to official names, proper capitalization, and exact URLs

### OUTPUT FORMAT:
Provide your extraction as a JSON object following the exact structure shown at the end of this template.

---

## DATA EXTRACTION FIELDS

### BASIC INFORMATION (REQUIRED)
- **ID** (string): Extract or generate a unique identifier (lowercase, hyphens only)
  - Look for: official product codes, GitHub repo names, domain names
  - Format: "tool-name" or "organization-tool"
  - Validation: Must match pattern `^[a-z0-9-]+$`

- **Name** (string): Official product/tool name
  - Look for: official branding, headers, titles, "About" sections
  - Validation: Required, 1-100 characters

- **Logo** (string|null): URL to official logo image
  - Look for: official media kits, press pages, GitHub readme files
  - Format: Complete URL starting with http/https

### WEBSITE INFORMATION
Extract official website links and their purposes:

- **Website.main** (object|null):
  - url (string): Primary official website
  - description (string): Brief description of the site's purpose

- **Website.docs** (object|null):
  - url (string): Documentation site
  - description (string): "User and developer documentation" or similar

- **Website.source_code** (object|null):
  - url (string): Main code repository (GitHub, GitLab, etc.)
  - description (string): "Main code repository" or similar

- **Website.demo** (object|null):
  - url (string): Live demo or trial instance
  - description (string): "Test [tool name] online" or similar

### CLASSIFICATION AND TYPE
- **GlobalGoodsType** (array of strings): Type of global good
  - Look for: software type, platform type, tool category
  - Valid values: ["software", "platform", "framework", "api", "dataset", "standard"]
  - Default: ["software"]

- **License** (string): Software license identifier
  - Look for: LICENSE files, README sections, legal pages
  - Valid values: See reference table below
  - Common patterns: "MIT", "Apache 2.0", "GPL v3", "BSD"

### CONTACT INFORMATION
- **Contact** (array of objects): Key contact persons
  - name (string): Full name
  - email (string): Email address
  - role (string): Title or role in organization

### CLASSIFICATIONS
Extract classification codes from the following systems:

- **Classifications.SDGs** (array of strings): UN Sustainable Development Goals
  - Look for: SDG mentions, sustainability goals, UN goals
  - Valid codes: "SDG-1" through "SDG-17" (see reference table)

- **Classifications.WHO** (array of strings): World Health Organization classifications
  - Look for: WHO standards, health classifications
  - Valid codes: See WHO reference table below

- **Classifications.WMO** (array of strings): World Meteorological Organization
  - Look for: Climate/weather data, meteorological standards
  - Valid codes: See WMO reference table below

- **Classifications.DPI** (array of strings): Digital Public Infrastructure classifications
  - Look for: DPI mentions, digital infrastructure categories
  - Valid codes: See DPI reference table below

### STANDARDS AND INTEROPERABILITY
- **StandardsAndInteroperability.HealthStandards** (array of strings):
  - Look for: HL7, FHIR, ICD, SNOMED, GS1, health data standards
  - Common values: ["HL7 FHIR", "ICD-10", "SNOMED CT", "GS1"]

- **StandardsAndInteroperability.Interoperability** (array of strings):
  - Look for: API standards, data exchange formats
  - Common values: ["REST", "SOAP", "ADX", "JSON", "XML"]

- **StandardsAndInteroperability.ClimateStandards** (array of strings):
  - Look for: Climate data standards, environmental formats
  - Common values: ["GRIB", "NetCDF", "CF Convention"]

### PRODUCT OVERVIEW
- **ProductOverview.Summary** (string): Brief 1-2 sentence description
- **ProductOverview.Description** (string): Detailed description (2-3 paragraphs)
- **ProductOverview.PrimaryFunctionality** (string): Main purpose/function
- **ProductOverview.Users** (string): Target user groups
- **ProductOverview.Languages** (array of strings): Supported languages
  - Look for: UI languages, localization support
  - Format: ISO 639-1 codes ("en", "fr", "es", etc.)
- **ProductOverview.Screenshots** (array of objects):
  - url (string): Screenshot URL
  - description (string): Description of what's shown

### REACH AND IMPLEMENTATION
- **Reach.SummaryOfReach** (string): Overview of global usage
- **Reach.NumberOfImplementations** (number): Count of deployments/implementations
- **Reach.ImplementationMapOverview** (object|null):
  - url (string): Link to implementation map
  - description (string): Description of the map
- **Reach.ImplementationCountries** (array of strings): ISO country codes
  - Look for: deployment lists, country mentions, case studies
  - Format: ISO 3166-1 alpha-2 codes ("us", "uk", "ke", etc.)

### MATURITY INFORMATION
- **Maturity.SummaryOfMaturity** (string): Overall maturity assessment
- **Maturity.Scores** (array of objects): Annual maturity scores
  - year (number): Year of assessment
  - global_utility (number): 1-10 scale
  - community_support (number): 1-10 scale
  - maturity_of_gg (number): 1-10 scale
  - inclusive_design (number): 1-10 scale
  - climate_resilience (number): 1-10 scale
  - low_carbon (number): 1-10 scale

### COMMUNITY INFORMATION
- **Community.DescriptionOfCommunity** (string): Community overview
- **Community.HostAnchorOrganization** (object):
  - name (string): Organization name
  - url (string): Organization website
  - description (string): Organization description
  - country (array of strings): ISO country codes
- **Community.InceptionYear** (number): Year founded/started
- **Community.SizeOfCommunity** (number): Community size estimate
- **Community.Links** (object):
  - Community (object|null): { url, description }
  - MailingList (object|null): { url, description }
- **Community.Events** (object):
  - description (string): Event overview
  - schedule (string): Events calendar URL
  - recent (array): Recent events
- **Community.Policies** (object): Various policy links

### ADDITIONAL SECTIONS
- **ClimateAndHealthIntegration.Description** (string)
- **InclusiveDesign.Description** (string)
- **InclusiveDesign.UserInput** (string)
- **InclusiveDesign.OfflineSupport** (string)
- **EnvironmentalImpact.LowCarbon** (string)
- **TotalCostOfOwnership** (object): { Description, url }
- **Sustainability** (object): { Description, KeyFundersSupporters }
- **Resources** (object): Various documentation links
- **LinkedInitiatives** (object): Related initiatives

---

## REFERENCE LOOKUP TABLES

### LICENSE CODES
```
apache-2.0: Apache License 2.0
mit: MIT License
bsd-2-clause: BSD 2-Clause License
bsd-3-clause: BSD 3-Clause License
gpl-2.0: GNU General Public License v2.0
gpl-3.0: GNU General Public License v3.0
mpl-2.0: Mozilla Public License 2.0
cc-by-4.0: Creative Commons Attribution 4.0
```

### SDG CODES
```
SDG-1: No Poverty
SDG-2: Zero Hunger
SDG-3: Good Health and Well-being
SDG-4: Quality Education
SDG-5: Gender Equality
SDG-6: Clean Water and Sanitation
SDG-7: Affordable and Clean Energy
SDG-8: Decent Work and Economic Growth
SDG-9: Industry, Innovation and Infrastructure
SDG-10: Reduced Inequality
SDG-11: Sustainable Cities and Communities
SDG-12: Responsible Consumption and Production
SDG-13: Climate Action
SDG-14: Life Below Water
SDG-15: Life on Land
SDG-16: Peace, Justice and Strong Institutions
SDG-17: Partnerships for the Goals
```

### DPI CODES
```
DPI_BD1: Logistics Management Information Services
DPI_BD2: Shared Health Record
DPI_BD3: Health Management Information System
DPI_BD4: Finance and Insurance System
DPI_RG1: Terminology Services
DPI_RG2: Client Registry
DPI_RG3: Facility Registry
DPI_RG4: Health Workforce Registry
DPI_RG5: Product Catalogue
```

### WMO CODES
```
WMO_A1: Modelling & Reanalysis
WMO_A2: Observations
WMO_A3: Climate Data Repositories
WMO_A4: Open Data Platforms
WMO_B1: Climate data integration and interoperability
WMO_B2: Statistical analysis & modelling
WMO_C1: Programming-based
WMO_C2: Interactive dashboard
WMO_C3: GIS
WMO_D1: Decision Support Systems
WMO_D2: Climate Risk Platforms
```

---

## EXTRACTION CONFIDENCE SCORING

For each major section, provide a confidence score (1-10):

```json
{
  "extraction_confidence": {
    "basic_info": 8,
    "website_info": 7,
    "classifications": 5,
    "product_overview": 9,
    "reach_info": 6,
    "community_info": 8,
    "overall_confidence": 7
  }
}
```

---

## COMMON EXTRACTION CHALLENGES

### Handle These Patterns:
1. **Multiple names**: Use the most official/formal name
2. **Outdated information**: Prefer recent documents
3. **Marketing vs. technical content**: Prefer technical accuracy
4. **Missing URLs**: Set to null rather than guessing
5. **Unclear licensing**: Look for LICENSE files, legal pages
6. **Country mentions**: Distinguish between development location and deployment countries
7. **Version-specific info**: Use current/latest version information

### Fallback Strategies:
- If exact classification codes not found, leave arrays empty
- If implementation count unclear, use 0
- If dates unclear, use null for optional fields
- If organization details missing, use empty strings for required fields

---

## EXPECTED JSON OUTPUT STRUCTURE

```json
{
  "ID": "example-tool",
  "Name": "Example Global Good",
  "Logo": "https://example.org/logo.png",
  "Website": {
    "main": {
      "url": "https://example.org",
      "description": "Official site for Example Global Good"
    },
    "docs": {
      "url": "https://docs.example.org",
      "description": "User and developer documentation"
    },
    "source_code": {
      "url": "https://github.com/example/example-tool",
      "description": "Main code repository"
    },
    "demo": {
      "url": "https://demo.example.org",
      "description": "Test Example Global Good online"
    }
  },
  "GlobalGoodsType": ["software"],
  "License": "apache-2.0",
  "Contact": [
    {
      "name": "Jane Smith",
      "email": "jane@example.org",
      "role": "Project Lead"
    }
  ],
  "Classifications": {
    "SDGs": ["SDG-3", "SDG-9"],
    "WHO": [],
    "WMO": [],
    "DPI": ["DPI_BD3"]
  },
  "StandardsAndInteroperability": {
    "HealthStandards": ["HL7 FHIR"],
    "Interoperability": ["REST"],
    "ClimateStandards": []
  },
  "ProductOverview": {
    "Summary": "Brief description of the tool",
    "Description": "Detailed description...",
    "PrimaryFunctionality": "Main function",
    "Users": "Target users",
    "Languages": ["en", "fr"],
    "Screenshots": []
  },
  "Reach": {
    "SummaryOfReach": "Global reach summary",
    "NumberOfImplementations": 0,
    "ImplementationMapOverview": null,
    "ImplementationCountries": []
  },
  "Maturity": {
    "SummaryOfMaturity": "Maturity assessment",
    "Scores": []
  },
  "ClimateAndHealthIntegration": {
    "Description": ""
  },
  "Community": {
    "DescriptionOfCommunity": "",
    "HostAnchorOrganization": {
      "name": "",
      "url": "",
      "description": "",
      "country": []
    },
    "InceptionYear": 0,
    "SizeOfCommunity": 0,
    "Links": {},
    "Events": {
      "description": "",
      "schedule": "",
      "recent": []
    },
    "Policies": {
      "Description": "",
      "Governance": { "url": "", "description": "" },
      "TermsOfUse": { "url": "", "description": "" },
      "UserAgreement": { "url": "", "description": "" },
      "PrivacyPolicy": { "url": "", "description": "" },
      "DoNoHarm": { "url": "", "description": "" },
      "PIICollected": { "url": "", "description": "" },
      "NPIIUsed": { "url": "", "description": "" }
    }
  },
  "InclusiveDesign": {
    "Description": "",
    "UserInput": "",
    "OfflineSupport": ""
  },
  "EnvironmentalImpact": {
    "LowCarbon": ""
  },
  "TotalCostOfOwnership": {
    "Description": "",
    "url": ""
  },
  "Sustainability": {
    "Description": "",
    "KeyFundersSupporters": []
  },
  "Resources": {
    "Articles": [],
    "ProductDocumentation": [],
    "UserRequirements": [],
    "EndUserDocumentation": [],
    "ImplementerDocumentation": [],
    "DeveloperDocumentation": [],
    "OperatorDocumentation": [],
    "InstallationDocumentation": []
  },
  "LinkedInitiatives": {
    "Initiative": []
  },
  "extraction_confidence": {
    "basic_info": 8,
    "website_info": 7,
    "classifications": 5,
    "product_overview": 9,
    "reach_info": 6,
    "community_info": 8,
    "overall_confidence": 7
  }
}
```

---

## FINAL INSTRUCTIONS

1. Extract data systematically section by section
2. Validate against reference tables when possible
3. Provide confidence scores for major sections
4. Use null/empty values when information is not available
5. Return only the JSON object as your final output
6. Include the extraction_confidence object
