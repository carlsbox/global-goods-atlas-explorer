# Global Good Database JSON Structure Documentation

This document describes the structure of the `globalgood_db.json` file, which contains an array of global good objects. Each object represents a digital public good or tool, with rich metadata for cataloging and discovery.

---

## Top-Level Structure

The file is a JSON array of objects:

```json
[
  { ... },
  { ... },
  ...
]
```

Each object has the following fields:

---

### Field Reference

| Field                        | Type                | Description |
|------------------------------|---------------------|-------------|
| `ID`                         | string              | Unique identifier for the global good. |
| `Name`                       | string              | Name of the global good/tool. |
| `Logo`                       | string (URL)        | URL to the logo image. |
| `Website`                    | object              | Links to main site, documentation, source code, demo, etc. |
| `GlobalGoodsType`            | array of objects    | Types/classifications (e.g., software, standard). |
| `License`                    | object              | License information. |
| `Contact`                    | array of objects    | Contact persons or teams. |
| `Classifications`            | object              | SDGs, WHO, WMO, DPI codes and titles. |
| `StandardsAndInteroperability`| object             | Standards supported and interoperability info. |
| `ProductOverview`            | object              | Summary, description, users, languages, screenshots. |
| `Reach`                      | object              | Usage, number of implementations, countries, maps. |
| `Maturity`                   | object              | Maturity summary and scoring by year. |
| `ClimateAndHealthIntegration`| object              | Description of climate-health integration. |
| `Community`                  | object              | Community, host, inception, size, links, events, policies. |
| `InclusiveDesign`            | object              | Accessibility, offline support, user input. |
| `EnvironmentalImpact`        | object              | Environmental impact, e.g., low carbon. |
| `TotalCostOfOwnership`       | object              | Cost and TCO documentation. |
| `Sustainability`             | object              | Funding and sustainability info. |
| `Resources`                  | object              | Documentation, articles, user/dev/operator docs, etc. |
| `LinkedInitiatives`          | object              | Related initiatives and registries. |

---

## Field Details

### `Website` (object)
- `main`, `docs`, `source_code`, `demo`: Each is an object with:
  - `name`: string
  - `url`: string
  - `description`: string

### `GlobalGoodsType` (array of objects)
- `code`: string
- `title`: string
- `description`: string

### `License` (object)
- `id`: string
- `name`: string
- `url`: string
- `description`: string

### `Contact` (array of objects)
- `name`: string
- `email`: string
- `role`: string

### `Classifications` (object)
- `SDGs`, `WHO`, `WMO`, `DPI`: Each is an array of objects with:
  - `code`: string
  - `title`: string
  - (optional) `group_code`, `group_name`, `authority`: string

### `StandardsAndInteroperability` (object)
- `HealthStandards`, `Interoperability`, `ClimateStandards`: Each is an array of objects with fields like:
  - `code`: string
  - `domain`/`type`: string
  - `link`: string
  - `name`: string
  - `description`: string

### `ProductOverview` (object)
- `Summary`: string
- `Description`: string
- `PrimaryFunctionality`: string
- `Users`: string
- `Languages`: array of objects `{ code, name }`
- `Screenshots`: array of objects `{ url, description }`

### `Reach` (object)
- `SummaryOfReach`: string
- `NumberOfImplementations`: integer
- `ImplementationMapOverview`: array of objects `{ url, description }`
- `ImplementationCountries`: array of objects:
  - `iso_code`: string
  - `type`: string
  - `names`: object `{ en: { short, formal } }`

### `Maturity` (object)
- `SummaryOfMaturity`: string
- `Scores`: array of objects (by year):
  - `year`: integer
  - `global_utility`, `community_support`, `maturity_of_gg`, `inclusive_design`, `climate_resilience`, `low_carbon`: integer

### `ClimateAndHealthIntegration` (object)
- `Description`: string

### `Community` (object)
- `DescriptionOfCommunity`: string
- `HostAnchorOrganization`: object `{ name, url, description, country }`
- `InceptionYear`: integer
- `SizeOfCommunity`: integer
- `Links`: object (e.g., `Community`, `MailingList`)
- `Events`: object (e.g., `description`, `schedule`, `recent`)
- `Policies`: object (e.g., `Description`, `Governance`, `TermsOfUse`, etc.)

### `InclusiveDesign` (object)
- `Description`: string
- `UserInput`: string
- `OfflineSupport`: string

### `EnvironmentalImpact` (object)
- `LowCarbon`: string

### `TotalCostOfOwnership` (object)
- `Description`: string
- `url`: string

### `Sustainability` (object)
- `Description`: string
- `KeyFundersSupporters`: array of objects `{ name, url, description }`

### `Resources` (object)
- `Articles`, `ProductDocumentation`, `UserRequirements`, `EndUserDocumentation`, `ImplementerDocumentation`, `DeveloperDocumentation`, `OperatorDocumentation`, `InstallationDocumentation`: Each is an array of objects `{ description, url }`

### `LinkedInitiatives` (object)
- `Initiative`: array of objects:
  - `collectionInitiative`: object `{ label, logo_url, site_url, description }`
  - `tool_url`: string

---

## Example Entry

```json
{
  "ID": "meditrack",
  "Name": "MediTrack",
  "Logo": "https://meditrack.org/logo.svg",
  "Website": { ... },
  "GlobalGoodsType": [ ... ],
  "License": { ... },
  "Contact": [ ... ],
  "Classifications": { ... },
  "StandardsAndInteroperability": { ... },
  "ProductOverview": { ... },
  "Reach": { ... },
  "Maturity": { ... },
  "ClimateAndHealthIntegration": { ... },
  "Community": { ... },
  "InclusiveDesign": { ... },
  "EnvironmentalImpact": { ... },
  "TotalCostOfOwnership": { ... },
  "Sustainability": { ... },
  "Resources": { ... },
  "LinkedInitiatives": { ... }
}
```

---

For more details, see the full JSON file or contact the data maintainers.
