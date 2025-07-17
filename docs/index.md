
# Global Goods Platform Documentation

## Overview

This documentation suite provides comprehensive guidance for understanding, implementing, and maintaining the Global Goods platform's data architecture and content management systems.

## Quick Start Guide

### For Developers
1. **Start Here**: [Global Goods Data Specification](./GlobalGoodsDataSpecification.md) - Understanding the core architecture
2. **Implementation**: [API Data Flow Documentation](./APIDataFlowDocumentation.md) - How data flows through the system
3. **Data Structures**: [Data Schema Reference](./DataSchemaReference.md) - Complete field specifications

### For Content Editors
1. **Reference**: [Reference Data Systems](./ReferenceDataSystems.md) - Understanding reference data
2. **Quality**: [Data Validation Rules](./DataValidationRules.md) - Content standards and requirements

### For AI Agents & System Integration
1. **Architecture**: [Global Goods Data Specification](./GlobalGoodsDataSpecification.md) - Core concepts
2. **Data Models**: [Data Schema Reference](./DataSchemaReference.md) - Complete type definitions
3. **Reference Systems**: [Reference Data Systems](./ReferenceDataSystems.md) - Data relationships
4. **Validation**: [Data Validation Rules](./DataValidationRules.md) - Quality assurance rules
5. **APIs**: [API Data Flow Documentation](./APIDataFlowDocumentation.md) - Loading patterns and endpoints

## Core Architecture Documentation

### Essential Technical Documentation
These five documents form the core technical specification:

#### [Global Goods Data Specification](./GlobalGoodsDataSpecification.md)
**Start here for system understanding**
- Two-tier data architecture (index + individual files)
- Reference data normalization concepts
- Progressive loading strategy
- Performance optimization principles

#### [Data Schema Reference](./DataSchemaReference.md)
**Complete field and type definitions**
- `GlobalGoodFlat` interface specification
- Index vs. detail data structures
- Required vs. optional field definitions
- Data transformation schemas

#### [Reference Data Systems](./ReferenceDataSystems.md)
**Reference data organization and relationships**
- Classification systems (SDG, WHO, WMO, DPI)
- Standards and interoperability definitions
- Geographic and language reference data
- Code-to-object resolution patterns

#### [Data Validation Rules](./DataValidationRules.md)
**Quality assurance and governance**
- Field validation requirements
- Content quality standards
- Business logic validation
- Error handling procedures

#### [API Data Flow Documentation](./APIDataFlowDocumentation.md)
**Data loading and API patterns**
- Progressive loading implementation
- Caching strategies
- Reference resolution flow
- Performance optimization techniques

## Setup and Integration

### Content Management

The platform uses a code-driven approach with JSON data files for content management. Data is stored in `/public/data/` and loaded through dedicated loaders.

## Specialized Tools

### [AI Extraction Template](./ai-extraction-template.md)
**Automated content extraction guide**
- Template for AI-assisted data extraction
- Structured extraction procedures
- Quality validation workflows

### [Prevention Strategy](./PREVENTION_STRATEGY.md)
**System maintenance and issue prevention**
- Proactive maintenance procedures
- Common issue prevention
- System health monitoring

## Documentation Maintenance

### Keeping Documentation Current
- All documentation should be updated when making architectural changes
- Schema changes require updates to both Data Schema Reference and Validation Rules
- New reference data types need documentation in Reference Data Systems
- API changes must be reflected in API Data Flow Documentation

### Cross-References
- **Data Architecture** ↔ **API Flow**: Architecture principles implemented through API patterns
- **Schema Reference** ↔ **Validation Rules**: Schema definitions enforced through validation
- **Reference Data** ↔ **All Documents**: Reference systems used throughout the platform
- **Data Files** ↔ **Schema/Validation**: JSON data structure must align with schema requirements

---

## Getting Help

- **Technical Issues**: Start with the relevant architecture document
- **Content Questions**: Refer to CMS Setup and Validation Rules
- **Integration Problems**: Check API Data Flow Documentation
- **Data Quality Issues**: Review Data Validation Rules and Reference Data Systems

For questions not covered in this documentation, consider updating the relevant document to help future users.
