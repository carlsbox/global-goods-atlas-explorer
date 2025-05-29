# Enhanced Netlify CMS Setup Guide

## Overview

This enhanced Netlify CMS configuration provides comprehensive content management for Global Goods with full support for the complex nested data structure, reference data integration, and validation.

## Features

### ✅ Complete Data Structure Support
- **All 15 major sections** of Global Good data
- **Nested objects** (Website, License, Community, etc.)
- **Complex arrays** (Classifications, Resources, etc.)
- **Time-series data** (Maturity scores over years)
- **Reference relationships** (SDGs, Standards, etc.)

### ✅ Enhanced Editor Experience
- **Grouped field sections** for logical organization
- **Field validation** with custom rules
- **Preview templates** for content review
- **Media management** for logos and screenshots
- **Auto-generated slugs** from Global Good IDs

### ✅ Data Integrity
- **Validation engine** ensures data quality
- **Reference data consistency** checking
- **Required field enforcement**
- **Format validation** (URLs, emails, dates)

## File Structure

```
public/
├── admin/
│   ├── config.yml          # Main CMS configuration
│   └── index.html          # CMS admin interface
├── data/
│   └── global-goods/
│       ├── individual/      # CMS-managed global good files
│       └── index.json       # Global goods index
└── uploads/                 # Media files (logos, screenshots)

src/
└── lib/
    └── cms/
        ├── enhancedCmsTransform.ts  # Data transformation layer
        └── enhancedCmsLoader.ts     # Enhanced data loading
```

## Setup Instructions

### 1. Authentication Setup

For **Git Gateway** (recommended for Netlify hosting):
```yaml
# In config.yml
backend:
  name: git-gateway
  branch: main
```

For **GitHub** (direct integration):
```yaml
# In config.yml
backend:
  name: github
  repo: your-username/your-repo-name
  branch: main
```

### 2. Local Development

```bash
# Start CMS proxy server
npx netlify-cms-proxy-server

# Start your dev server
npm run dev

# Access CMS at: http://localhost:5173/admin/
```

### 3. Production Deployment

1. **Enable Git Gateway** in Netlify dashboard
2. **Set up authentication** (GitHub OAuth recommended)
3. **Configure roles** in Netlify Identity
4. **Deploy** your site with CMS files

### 4. Content Migration

```typescript
// Use the enhanced loader for backward compatibility
import { loadEnhancedCMSGlobalGood } from '@/lib/cms/enhancedCmsLoader';

// Existing files will work seamlessly
const globalGood = await loadEnhancedCMSGlobalGood('meditrack');
```

## Advanced Features

### Custom Widgets

The CMS includes custom widgets for:
- **Classification selection** with reference data
- **Country selection** with ISO codes
- **Maturity scoring** with validation (0-10)
- **URL validation** for links
- **Image upload** with optimization

### Preview Templates

Real-time preview shows:
- **Global Good summary** with key information
- **Contact details** formatting
- **Logo display** with proper sizing
- **Validation status** indicators

### Data Validation

Comprehensive validation includes:
- **Required field** checking
- **ID format** validation (lowercase, hyphens only)
- **Score range** validation (0-10 for maturity)
- **URL format** checking
- **Email validation** for contacts

## Content Editor Workflow

### Creating a New Global Good

1. **Access CMS**: Navigate to `/admin/`
2. **New Entry**: Click "New Global Goods"
3. **Fill Sections**: Complete form sections systematically
4. **Preview**: Use preview to review formatting
5. **Validate**: Check for errors before saving
6. **Publish**: Save to create the JSON file

### Editing Existing Content

1. **Browse**: View existing global goods in CMS
2. **Select**: Choose entry to edit
3. **Modify**: Update fields as needed
4. **Preview**: Review changes
5. **Save**: Commit changes to repository

### Reference Data Management

1. **SDGs**: Edit SDG definitions in reference section
2. **Global Good Types**: Update type definitions and translations
3. **Validation**: Reference data changes are validated across entries

## Technical Integration

### Data Flow

```
CMS Editor → config.yml schema → JSON files → enhancedCmsLoader → App Components
```

### API Integration

```typescript
// Load with enhanced CMS loader
import { loadAllEnhancedCMSGlobalGoods } from '@/lib/cms/enhancedCmsLoader';

// Use in React components
const { data: globalGoods } = useQuery({
  queryKey: ['global-goods-enhanced'],
  queryFn: () => loadAllEnhancedCMSGlobalGoods('en')
});
```

### Validation Integration

```typescript
import { validateGlobalGoodData } from '@/lib/cms/enhancedCmsTransform';

const validation = validateGlobalGoodData(globalGoodData);
if (!validation.isValid) {
  console.error('Validation errors:', validation.errors);
}
```

## Maintenance

### Regular Tasks

1. **Backup**: Repository automatically backs up all content
2. **Validation**: Run periodic validation checks
3. **Reference Updates**: Update SDGs and standards as needed
4. **Media Cleanup**: Remove unused uploaded files

### Troubleshooting

**CMS not loading**: Check authentication and config.yml syntax
**Validation errors**: Review field requirements and formats
**Media issues**: Verify upload permissions and file sizes
**Preview problems**: Check preview template configuration

## Security Considerations

- **Authentication** required for all CMS access
- **Role-based permissions** for different user types
- **Git-based workflow** provides audit trail
- **Validation** prevents malformed data entry
- **Media uploads** restricted to safe file types

## Future Enhancements

- **Multi-language editing** interface
- **Bulk import/export** tools
- **Advanced search** and filtering
- **Workflow automation** with approval processes
- **API integration** for external data sources
