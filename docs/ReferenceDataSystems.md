
# Reference Data Systems

## Overview

The Global Goods platform uses a comprehensive reference data system to normalize and enrich global good information. This system prevents data duplication, ensures consistency, and enables dynamic content updates.

## Reference Data Architecture

### Centralized Storage
All reference data is stored in `public/data/reference/` with dedicated files for each data type:

- **Global Types**: `globalGoodsTypes.json`
- **Licenses**: `licenses.json`
- **Standards**: `standards/` directory with `health.json`, `interoperability.json`, `climate.json`
- **Countries**: `countries.json`
- **Languages**: `productLanguages.json`
- **Initiatives**: `collectionInitiatives.json`
- **Classifications**: `classifications/` directory

### Loading Strategy
1. **Application Startup**: All reference data loads into React Context
2. **Caching**: Data cached in browser localStorage (24-hour expiry)
3. **Memory Cache**: Reference data kept in memory during session
4. **Fallback**: Fresh load if cache invalid or missing

## Reference Data Types

### Global Goods Types
Defines the category of each global good:

**Available Types:**
- `software`: Free and open-source software tools
- `content`: Resources, toolkits, or data standards
- `service`: Software-as-a-service tools
- `climate`: Climate data products and platforms
- `data`: Open data collections
- `ai_model`: Open artificial intelligence models

**Usage Pattern:**
```
Storage: ["software", "climate"]
Display: [
  { code: "software", title: "Software", description: "A free and open-source..." },
  { code: "climate", title: "Climate Data Product", description: "Open data sets..." }
]
```

### License System
Tracks open source and open data licenses:

**Common Licenses:**
- `mit`: MIT License
- `apache-2.0`: Apache License 2.0
- `gpl-3.0`: GNU General Public License v3.0
- `cc-by-4.0`: Creative Commons Attribution 4.0
- `cc0-1.0`: Creative Commons Zero

**Resolution:**
```
Storage: "mit"
Display: {
  id: "mit",
  name: "MIT License",
  url: "https://opensource.org/licenses/MIT",
  description: "A permissive license..."
}
```

### Classification Systems
Four major classification authorities provide taxonomies:

#### Sustainable Development Goals (SDGs)
- **Authority**: United Nations
- **Codes**: SDG-1 through SDG-17
- **Purpose**: Link to UN Sustainable Development Goals

#### World Health Organization (WHO)
- **Authority**: WHO
- **Groups**: B1-B4 (Business Domain Services)
- **Purpose**: Health information system categories

#### Digital Public Infrastructure (DPI)
- **Authority**: DPI-H
- **Groups**: BD (Business Domain), RG (Registry Services)
- **Purpose**: Digital health infrastructure classification

#### World Meteorological Organization (WMO)
- **Authority**: WMO
- **Groups**: A-E (Climate data sources through standards)
- **Purpose**: Climate and weather data classification

### Standards and Interoperability
Technical standards grouped by domain:

#### Health Standards
- **FHIR**: Fast Healthcare Interoperability Resources
- **HL7**: Health Level 7 protocols
- **ICD-10**: International Classification of Diseases
- **SNOMED**: Systematized Nomenclature of Medicine

#### Interoperability Standards
- **REST**: Representational State Transfer
- **JSON**: JavaScript Object Notation
- **XML**: Extensible Markup Language
- **OAuth**: Open Authorization

#### Climate Standards
- Climate-specific protocols and formats
- Environmental data exchange standards

### Geographic Reference
Country information for implementation tracking:

**Data Structure:**
- **ISO Codes**: Standard country identifiers
- **Names**: Short and formal country names
- **Types**: Country, Territory, Region classifications
- **UN Codes**: United Nations country codes

### Language Support
Product language capabilities:

**Language Codes:**
- **ISO 639-1**: Two-letter language codes
- **Native Names**: Language names in their own script
- **English Names**: Standardized English translations

### Collection Initiatives
Partner organizations and initiatives:

**Initiative Types:**
- Digital health collaboratives
- Open source foundations
- International health organizations
- Climate data consortiums

## Reference Resolution Process

### Code-to-Object Resolution
1. **Input**: Reference code (e.g., "SDG-3", "mit", "ke")
2. **Lookup**: Find in appropriate reference data
3. **Enrichment**: Convert to full object with metadata
4. **Caching**: Store resolved object for reuse

### Authority-Based Grouping
Classifications are grouped by issuing authority:
```typescript
resolveClassificationsByAuthority({
  SDGs: ["SDG-3", "SDG-17"],
  WHO: ["WHO_B1", "WHO_B4"],
  DPI: ["DPI_BD2"],
  WMO: []
})
```

### Fallback Handling
When reference codes are not found:
1. **Log Warning**: Record missing reference
2. **Create Stub**: Generate basic object with code
3. **Continue Processing**: Don't fail entire operation
4. **Report Issues**: Track for data quality review

## Data Quality Assurance

### Reference Validation
- All codes must exist in reference data
- URLs must be valid and accessible
- Email addresses must follow proper format
- Country codes must be valid ISO codes

### Consistency Checks
- Reference data versions stay synchronized
- Cross-references maintain integrity
- Missing references are reported

### Update Procedures
1. **Reference Data Changes**: Update central reference files
2. **Cache Invalidation**: Clear browser caches
3. **Validation**: Verify all global goods still resolve
4. **Testing**: Confirm display and functionality

## Performance Considerations

### Loading Optimization
- Reference data loads once at startup
- Progressive enhancement for missing data
- Lazy loading for large reference sets

### Caching Strategy
- Memory cache during session
- Browser localStorage for persistence
- Server-side caching for reference files

### Batch Resolution
- Resolve multiple codes in single operations
- Group by authority for efficient processing
- Cache resolved objects for reuse

## Future Enhancements

### Dynamic Reference Data
- API-driven reference updates
- Real-time synchronization
- Version management

### Multilingual Support
- Localized reference data
- Language-specific enrichment
- Cultural adaptation

### Extended Taxonomies
- Additional classification systems
- Custom organization taxonomies
- Domain-specific standards
