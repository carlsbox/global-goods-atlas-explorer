# Content Management Guide

This guide documents all configuration and content locations in the Global Goods Atlas project. Use this as a reference for adding, editing, or managing content.

> 📋 **For detailed Global Good JSON schema documentation**, see the [Global Good JSON Creation Guide](./docs/GlobalGoodJSONGuide.md)

## 📋 Quick Reference Table

| Content Type | Location | Format | Description |
|--------------|----------|--------|-------------|
| **Global Goods Data** |
| Index (Summary) | `/public/data/global-goods/index.json` | JSON | Summary of all global goods |
| Individual Goods | `/public/data/global-goods/individual/*.json` | JSON | Detailed global good data |
| **Reference Data** |
| Global Good Types | `/public/data/reference/globalGoodsTypes.json` | JSON | Software, Content, Service types |
| Licenses | `/public/data/reference/licenses.json` | JSON | License definitions |
| Countries | `/public/data/reference/countries.json` | JSON | Country codes and names |
| Product Languages | `/public/data/reference/productLanguages.json` | JSON | Language codes |
| Collection Initiatives | `/public/data/reference/collectionInitiatives.json` | JSON | Initiative definitions |
| **Classifications** |
| SDGs | `/public/data/reference/classifications/sdgs.json` | JSON | Sustainable Development Goals |
| WHO Systems | `/public/data/reference/classifications/who.json` | JSON | WHO health systems |
| DPI Classifications | `/public/data/reference/classifications/dpi.json` | JSON | Digital Public Infrastructure |
| WMO Categories | `/public/data/reference/classifications/wmo.json` | JSON | Weather/climate categories |
| **Standards** |
| Health Standards | `/public/data/reference/standards/health.json` | JSON | Health interoperability standards |
| Interoperability | `/public/data/reference/standards/interoperability.json` | JSON | General interoperability standards |
| Climate Standards | `/public/data/reference/standards/climate.json` | JSON | Climate data standards |
| **Use Cases** |
| Use Case Files | `/src/data/use-cases/*.json` | JSON | Individual use case definitions |
| **Configuration** |
| Site Configuration | `/src/globalgoodsconfig.json` | JSON | Site settings, features, SEO |
| **Internationalization** |
| Translation Files | `/src/i18n/locales/[lang]/*.json` | JSON | UI translations |
| Page Content | `/src/content/pages/*.json` | JSON | Static page content |
| **Assets** |
| Global Good Logos | `/public/uploads/gg_logos/*.{png,svg,webp}` | Images | Product logos |
| Screenshots | `/public/uploads/gg_screenshots/*.png` | Images | Product screenshots |
| Placeholder Images | `/public/uploads/*.{jpg,jpeg}` | Images | Default/placeholder images |

---

## 📦 Global Goods Data

### Adding a New Global Good

1. **Create individual file**: `/public/data/global-goods/individual/[product_id].json`
2. **Update index**: Add entry to `/public/data/global-goods/index.json`
3. **Add logo**: Place in `/public/uploads/gg_logos/[product_name].{png,svg,webp}`
4. **Add screenshots**: Place in `/public/uploads/gg_screenshots/[product_name]_*.png`

### Individual Global Good Structure

```json
{
  "id": "unique_identifier",
  "name": "Product Name",
  "summary": "Brief description",
  "description": "Full description",
  "website": "https://example.com",
  "repositoryUrl": "https://github.com/...",
  "globalGoodType": ["software"],
  "licenseId": ["mit"],
  "logo": "/uploads/gg_logos/product.png",
  "screenshots": ["/uploads/gg_screenshots/product_01.png"],
  "languages": ["en", "fr"],
  "countries": ["KE", "NG"],
  "reach": {
    "totalDeployments": 50,
    "countriesCount": 10,
    "usersReached": 1000000
  },
  "maturity": {
    "globalUtility": 8,
    "communitySupport": 7,
    "easeOfAdaptation": 9,
    "scaleability": 8
  },
  "classifications": {
    "sdg": ["3", "9"],
    "who": ["HS_1", "HS_2"],
    "dpi": ["DPI_1"],
    "wmo": ["WMO_1"]
  },
  "standards": {
    "health": ["FHIR", "ICD11"],
    "interoperability": ["ADX", "JSON"],
    "climate": ["CF", "WMO_BUFR"]
  }
}
```

### Required Fields
- `id`: Unique identifier (lowercase, hyphens for spaces)
- `name`: Display name
- `summary`: One-line description
- `globalGoodType`: Array from reference data
- `licenseId`: Array from reference data

---

## 📚 Reference Data

### Global Good Types (`/public/data/reference/globalGoodsTypes.json`)
```json
{
  "software": {
    "id": "software",
    "name": "Software",
    "description": "Open source software applications"
  }
}
```

### Licenses (`/public/data/reference/licenses.json`)
```json
{
  "mit": {
    "id": "mit",
    "name": "MIT License",
    "url": "https://opensource.org/licenses/MIT",
    "osiApproved": true
  }
}
```

### Countries (`/public/data/reference/countries.json`)
```json
{
  "KE": {
    "code": "KE",
    "name": "Kenya",
    "region": "Africa",
    "subregion": "Eastern Africa"
  }
}
```

### Classifications
Each classification file follows this pattern:
```json
{
  "classification_id": {
    "id": "classification_id",
    "code": "CLASS_1",
    "name": "Classification Name",
    "description": "Description text",
    "authority": "sdg|who|dpi|wmo"
  }
}
```

### Standards
Each standard file follows this pattern:
```json
{
  "standard_id": {
    "id": "standard_id",
    "name": "Standard Name",
    "description": "Description",
    "url": "https://standard.org",
    "category": "health|interoperability|climate"
  }
}
```

---

## 📝 Use Cases

> 📋 **For detailed Use Case JSON schema documentation**, see the [Use Case JSON Creation Guide](./docs/UseCaseJSONGuide.md)

### Location
`/src/data/use-cases/[use-case-id].json`

### Structure
```json
{
  "id": "use-case-identifier",
  "title": {
    "en": "English Title",
    "fr": "Titre Français",
    "es": "Título Español"
  },
  "purpose": {
    "en": "Purpose description",
    "fr": "Description du but",
    "es": "Descripción del propósito"
  },
  "scope": {
    "includes": { "en": [], "fr": [], "es": [] },
    "excludes": { "en": [], "fr": [], "es": [] }
  },
  "actors": { "en": [], "fr": [], "es": [] },
  "preconditions": { "en": [], "fr": [], "es": [] },
  "process_steps": { "en": [], "fr": [], "es": [] },
  "postconditions": { "en": [], "fr": [], "es": [] },
  "data_requirements": { "en": [], "fr": [], "es": [] },
  "standards": ["FHIR", "ADX"],
  "technology_components": { "en": [], "fr": [], "es": [] },
  "global_goods": ["dhis2", "openmrs"],
  "challenges": { "en": [], "fr": [], "es": [] },
  "sustainability_considerations": { "en": [], "fr": [], "es": [] }
}
```

---

## ⚙️ Site Configuration

### Main Configuration (`/src/globalgoodsconfig.json`)
```json
{
  "siteName": "Global Goods Atlas",
  "domain": "globalgoodsatlas.org",
  "baseUrl": "https://globalgoodsatlas.org",
  "analytics": {
    "googleAnalyticsId": "G-XXXXXXXXXX"
  },
  "features": {
    "enableSearch": true,
    "enableMap": true,
    "enableExport": true
  },
  "seo": {
    "defaultTitle": "Global Goods Atlas",
    "defaultDescription": "Description",
    "defaultImage": "/og-image.png",
    "defaultKeywords": ["global goods", "health"]
  },
  "map": {
    "geoJsonUrl": "/data/map_country-data-110m.json"
  },
  "ui": {
    "standardsBadges": {
      "health": {
        "background": "bg-red-100",
        "text": "text-red-800"
      }
    }
  }
}
```

---

## 🌍 Internationalization (i18n)

### Translation Files Structure
```
/src/i18n/locales/
├── en/                     # English
│   ├── translation.json    # Common UI strings
│   ├── pages/
│   │   ├── home.json
│   │   ├── about.json
│   │   ├── globalGoods.json
│   │   └── ...
├── fr/                     # French
│   └── [same structure]
└── es/                     # Spanish
    └── [same structure]
```

### Adding Translations
1. Add key-value pairs to appropriate JSON file
2. Use consistent key naming: `section.subsection.key`
3. Include translations for all supported languages

### Translation File Example
```json
{
  "home.hero.title": "Welcome to Global Goods Atlas",
  "home.hero.subtitle": "Discover digital solutions",
  "common.button.learnMore": "Learn More"
}
```

---

## 📄 Static Page Content

### Location
`/src/content/pages/*.json`

### Available Pages
- `home.json` - Homepage content
- `about.json` - About page content
- `navigation.json` - Navigation labels
- `privacy.json` - Privacy policy
- `terms.json` - Terms of service

### Structure
```json
{
  "en": {
    "page.section.content": "English content"
  },
  "fr": {
    "page.section.content": "Contenu français"
  },
  "es": {
    "page.section.content": "Contenido español"
  }
}
```

---

## 🖼️ Assets Management

### Logo Requirements
- **Format**: PNG, SVG, or WebP
- **Location**: `/public/uploads/gg_logos/`
- **Naming**: Use product ID or recognizable name
- **Size**: Recommended 400x400px minimum

### Screenshot Requirements
- **Format**: PNG
- **Location**: `/public/uploads/gg_screenshots/`
- **Naming**: `[product]_[number].png`
- **Size**: 1280x720px recommended

### Adding Assets
1. Optimize images before upload (compress, resize)
2. Use consistent naming conventions
3. Update corresponding JSON files with asset paths

---

## 🔄 Content Update Workflow

### Step 1: Identify Content Type
Determine which type of content you're updating using the Quick Reference Table above.

### Step 2: Locate Files
Navigate to the appropriate directory based on content type.

### Step 3: Make Changes
Edit JSON files following the documented structure and validation rules.

### Step 4: Validate
1. Ensure JSON is valid (use a JSON validator)
2. Check required fields are present
3. Verify reference codes exist in reference data

### Step 5: Test
1. Clear browser cache
2. Reload application
3. Verify changes appear correctly

### Step 6: Generate Index (if needed)
For global goods changes:
```bash
npm run generate:index
```

---

## ✅ Validation Rules

### Global Goods
- `id` must be unique and lowercase
- `globalGoodType` must match values in `/public/data/reference/globalGoodsTypes.json`
- `licenseId` must match values in `/public/data/reference/licenses.json`
- Country codes must be ISO 3166-1 alpha-2
- Language codes must be ISO 639-1

### Classifications
- SDG values: "1" through "17"
- WHO codes must start with "HS_"
- DPI codes must start with "DPI_"
- WMO codes must start with "WMO_"

### Standards
- Must belong to category: health, interoperability, or climate
- Must have unique ID within category

---

## 🛠️ Utility Scripts

### Generate Index
```bash
npm run generate:index
```
Updates the global goods index from individual files.

### Generate Sitemap
```bash
npm run generate:sitemap
```
Creates sitemap.xml for SEO.

### Validate Content (if available)
```bash
npm run validate:content
```
Checks all JSON files for validity and required fields.

---

## 📋 Common Tasks

### Adding a New Global Good
1. Create JSON file in `/public/data/global-goods/individual/`
2. Add logo to `/public/uploads/gg_logos/`
3. Add screenshots to `/public/uploads/gg_screenshots/`
4. Run `npm run generate:index`
5. Test in application

### Adding a New Use Case
1. Create JSON file in `/src/data/use-cases/`
2. Include all three language versions
3. Reference existing global goods by ID
4. Add relevant standards and classifications

### Adding a New Translation
1. Identify missing translation key
2. Add to appropriate file in `/src/i18n/locales/[lang]/`
3. Add for all supported languages
4. Key will be automatically available in app

### Updating Site Configuration
1. Edit `/src/globalgoodsconfig.json`
2. Changes take effect on next build/refresh
3. Test thoroughly as config affects entire site

---

## 🐛 Troubleshooting

### Content Not Appearing
- Clear browser cache and localStorage
- Check JSON validity
- Verify file paths are correct
- Check browser console for errors

### Missing References
- Ensure reference codes exist in reference data files
- Check for typos in IDs
- Verify reference data files are loading

### Translation Issues
- Check key exists in all language files
- Verify language code is correct
- Clear browser language preferences

### Image Issues
- Verify file path starts with `/`
- Check file exists in public folder
- Ensure correct file extension
- Optimize large images

---

## 📚 Additional Resources

- [Data Schema Reference](/docs/DataSchemaReference.md)
- [API Data Flow Documentation](/docs/APIDataFlowDocumentation.md)
- [Global Goods Data Specification](/docs/GlobalGoodsDataSpecification.md)
- [Reference Data Systems](/docs/ReferenceDataSystems.md)
- [Data Validation Rules](/docs/DataValidationRules.md)