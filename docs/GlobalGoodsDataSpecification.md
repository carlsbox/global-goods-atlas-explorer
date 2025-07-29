
# Global Goods Data Storage Specification

## Overview

The Global Goods platform uses a sophisticated two-tier data architecture designed for performance, scalability, and maintainability. This document provides a conceptual overview of how global goods data is stored, organized, and accessed.

## Architecture Principles

### 1. Two-Tier Data Structure
- **Index Layer**: Lightweight summary data for fast browsing and filtering
- **Detail Layer**: Complete data for individual global goods with full specifications

### 2. Reference Data Normalization
- Centralized reference data to avoid duplication
- Dynamic resolution of codes to full objects
- Cached reference data for performance

### 3. Progressive Loading
- Basic data loads first for immediate user feedback
- Detailed data loads in background for complete information
- Skeleton states during loading transitions

## Data Storage Locations

### Primary Data Files
```
public/data/global-goods/
├── index.json                    # Lightweight index of all global goods
└── individual/
    ├── dhis2.json               # Complete DHIS2 specification
    ├── commcare.json            # Complete CommCare specification
    ├── openmrs.json             # Complete OpenMRS specification
    └── meditrack.json           # Complete MediTrack specification
```

### Reference Data Files
```
public/data/reference/
├── globalGoodsTypes.json        # Software, Content, Service, etc.
├── licenses.json                # Open source licenses
├── standards/                   # Modular standards by domain
│   ├── health.json             # Health-related standards
│   ├── interoperability.json  # Interoperability standards  
│   └── climate.json            # Climate and weather standards
├── countries.json               # Country codes and names
├── collectionInitiatives.json   # Partner organizations
└── classifications/
    ├── sdgs.json               # Sustainable Development Goals
    ├── who.json                # WHO health classifications
    ├── dpi.json                # Digital Public Infrastructure
    └── wmo.json                # World Meteorological Organization
```

## Data Flow Architecture

### 1. Index-First Loading
```
User Request → Index Load → Basic Display → Detail Load → Full Display
```

### 2. Reference Resolution
```
Raw Data with Codes → Reference Lookup → Enriched Objects → User Display
```

### 3. Caching Strategy
```
Reference Data → Memory Cache → 24hr Browser Cache → Fresh Load
```

## Key Concepts

### Global Good Identification
- Each global good has a unique `ID` (e.g., "dhis2", "commcare")
- IDs are lowercase, hyphen-separated for URL compatibility
- IDs are used to link index entries to individual files

### Reference Code System
- Classifications use authority-specific codes (SDG-3, WHO_B1, DPI_BD2)
- Standards use domain-specific codes (FHIR, REST, JSON)
- Countries use ISO codes (ke, ug, in, ng)
- Languages use language codes (en, fr, es)

### Data Consistency
- Index data is a subset of individual file data
- Individual files are the source of truth
- Reference data provides enrichment without duplication

## Performance Optimizations

### Progressive Loading Pattern
1. **Phase 1**: Load index data for immediate display
2. **Phase 2**: Show basic global good information
3. **Phase 3**: Load complete data in background
4. **Phase 4**: Update display with full information

### Reference Data Caching
- All reference data loads once at application start
- Cached in React Context for global access
- Browser localStorage cache with 24-hour expiry
- Memory-resident during session

### Lazy Loading Sections
- Technical specifications load on demand
- Resource documentation loads when accessed
- Community information loads progressively

## Data Governance

### File Organization
- Each global good maintains its own individual file
- Reference data is centralized and versioned
- Index file is automatically generated from individual files

### Data Integrity
- TypeScript interfaces enforce structure
- Validation rules ensure data quality
- Reference resolution validates code existence

### Version Control
- All data files are version controlled
- Changes are tracked through Git history
- Index rebuilding maintains consistency

## Future Considerations

### Data Management
- JSON-based structure supports direct file editing
- Validation system ensures data quality
- Reference system provides content relationships

### Scalability
- Two-tier architecture supports thousands of global goods
- Reference data system handles complex relationships
- Caching strategy minimizes API calls

### Internationalization
- Data structure supports multiple languages
- Reference data includes localized content
- Progressive enhancement for translations
