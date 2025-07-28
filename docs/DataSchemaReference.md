
# Global Goods Data Schema Reference

## Overview

This document defines the complete data schema for global goods, including field specifications, data types, and structural requirements.

## Primary Data Types

### GlobalGoodFlat Interface

The `GlobalGoodFlat` interface represents the complete structure of a global good after reference resolution.

#### Core Identity Fields
- **ID** (string, required): Unique identifier, lowercase with hyphens
- **Name** (string, required): Display name of the global good
- **Logo** (string, optional): URL to logo image

#### Website Information
```typescript
Website: {
  main?: { name: string; url: string; description: string; }
  docs?: { name: string; url: string; description: string; }
  source_code?: { name: string; url: string; description: string; }
  demo?: { name: string; url: string; description: string; }
}
```

#### Type Classification
```typescript
GlobalGoodsType: Array<{
  code: string;           // e.g., "software", "content", "service"
  title: string;          // e.g., "Software"
  description: string;    // Full description
}>
```

#### License Information
```typescript
License: {
  id: string;             // License identifier
  name: string;           // License name
  url: string;            // License URL
  description: string;    // License description
}
```

#### Contact Information
```typescript
Contact: Array<{
  name: string;           // Contact person name
  email: string;          // Contact email
  role: string;           // Role/position
}>
```

#### Classifications System
```typescript
Classifications: {
  SDGs: Array<{ code: string; title: string; description?: string; }>
  WHO: Array<{ 
    code: string; 
    title: string; 
    description?: string;
    group_code?: string;
    group_name?: string;
    authority?: string;
  }>
  WMO: Array<{ code: string; title: string; ... }>  // Same as WHO
  DPI: Array<{ code: string; title: string; ... }>  // Same as WHO
}
```

#### Standards and Interoperability
```typescript
StandardsAndInteroperability: {
  HealthStandards: Array<{
    code: string;           // Standard code
    domain: string;         // Domain area
    link: string;           // Reference URL
    name: string;           // Standard name
    description: string;    // Description
  }>
  Interoperability: Array<{
    code: string;           // Standard code
    type: string;           // Type of standard
    link: string;           // Reference URL
    name: string;           // Standard name
    description: string;    // Description
  }>
  ClimateStandards: Array<any>;  // Similar structure
}
```

## Index Schema

The index file contains a simplified subset of data for performance:

```typescript
IndexEntry: {
  ID: string;                    // Global good identifier
  Name: string;                  // Display name
  Summary: string;               // Brief description
  Logo?: string;                 // Logo URL
  GlobalGoodType: string[];      // Type codes only
  Countries: string[];           // Country ISO codes
  Classifications: {
    SDGs: string[];              // SDG codes only
    WHO: string[];               // WHO codes only
    WMO: string[];               // WMO codes only
    DPI: string[];               // DPI codes only
  }
  Standards: {
    Health: string[];            // Health standard codes
    Interop: string[];           // Interoperability codes
    Climate: string[];           // Climate standard codes
  }
}
```

## Reference Data Schemas

### Global Goods Types
```typescript
GlobalGoodsType: {
  code: string;                  // Unique code identifier
  title: string;                 // Display title
  description: string;           // Detailed description
}
```

### Licenses
```typescript
License: {
  id: string;                    // License identifier
  name: string;                  // License name
  url: string;                   // License URL
  description: string;           // License description
}
```

### Classifications
```typescript
Classification: {
  code: string;                  // Classification code
  title: string;                 // Display title
  description?: string;          // Optional description
  group_code?: string;           // Parent group code
  group_name?: string;           // Parent group name
  authority?: string;            // Issuing authority
}
```

### Standards
```typescript
Standard: {
  code: string;                  // Standard code
  name: string;                  // Standard name
  description: string;           // Description
  domain: string;                // Domain (Health, Climate, etc.)
  type: string;                  // Type (exchange, protocol, etc.)
  link: string;                  // Reference URL
}
```

### Countries
```typescript
Country: {
  iso_code: string;              // ISO country code
  type: string;                  // Type (Country, Territory)
  short: string;                 // Short name
  formal: string;                // Formal name
  un_code?: string;              // UN country code
}
```

### Product Languages
```typescript
ProductLanguage: {
  code: string;                  // Language code (ISO 639-1)
  name: string;                  // English name
  nativeName: string;            // Native name
}
```

### Collection Initiatives
```typescript
CollectionInitiative: {
  id: string;                    // Initiative identifier
  label: string;                 // Display label
  logo_url: string;              // Logo URL
  site_url: string;              // Website URL
  description: string;           // Description
}
```

## Data Relationships

### Reference Resolution Pattern
1. **Storage**: Data stored with reference codes (e.g., "mit", "SDG-3")
2. **Loading**: Reference codes resolved to full objects
3. **Display**: Full objects used in user interface

### Cross-References
- Global goods reference countries, standards, classifications
- Classifications group by authority (SDG, WHO, WMO, DPI)
- Standards group by domain (Health, Climate, Interoperability)
- Countries link to implementation locations

## Field Requirements

### Required Fields
- **ID**: Must be unique, lowercase, hyphen-separated
- **Name**: Must be non-empty string
- **Website**: At least one website entry recommended
- **GlobalGoodsType**: At least one type required
- **License**: License information required
- **Classifications**: At least one classification recommended

### Optional Fields
- **Logo**: Image URL
- **Contact**: Contact information
- **Screenshots**: Product screenshots
- **Documentation**: Various documentation types

### Validation Rules
- IDs must match pattern: `^[a-z0-9-]+$`
- URLs must be valid HTTP/HTTPS URLs
- Email addresses must be valid format
- Country codes must exist in reference data
- Classification codes must exist in reference data
- Standard codes must exist in reference data

## Data Transformation

### Index to Detail
- Index provides basic information for browsing
- Detail files contain complete specifications
- Progressive loading bridges the gap

### Reference Resolution
- Codes in storage transformed to objects for display
- Reference data cached for performance
- Missing references handled gracefully

### Data Management
- JSON format supports direct file editing
- Data validation ensures integrity
- Reference resolution provides enrichment
