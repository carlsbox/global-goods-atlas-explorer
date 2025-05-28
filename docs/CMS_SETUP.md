
# DecapCMS Integration Setup Guide

## Development Setup

### 1. Install Dependencies
The required dependencies have been added:
- `netlify-cms-app` - Core CMS functionality
- `netlify-cms-proxy-server` - Local development server

### 2. Local Development
To run DecapCMS locally during development:

1. Start the CMS proxy server:
```bash
npx netlify-cms-proxy-server
```

2. Start your main development server:
```bash
npm run dev
```

3. Access the CMS at: `http://localhost:5173/admin/`

### 3. GitHub Configuration
Update the `backend` section in `/public/admin/config.yml`:
```yaml
backend:
  name: github
  repo: your-username/your-repo-name  # Replace with actual repo
  branch: main
```

### 4. Authentication Setup
- For GitHub: Configure OAuth App in GitHub settings
- For Google: Add Google OAuth configuration to Netlify Identity (if using Netlify)

## Content Structure

### Global Goods
- Stored in: `/public/data/global-goods/cms/`
- Format: Multilingual JSON files with language folders
- Schema: Preserves existing structure with i18n support

### Use Cases
- Stored in: `/src/data/use-cases/cms/`
- Format: Multilingual JSON files matching existing format
- Schema: Maintains current Use Case structure with translations

### Reference Data
- SDGs, Classifications, Standards remain in existing i18n structure
- CMS provides editing interface for reference data translations

## Data Transformation
- `src/lib/cms/cmsTransform.ts` - Handles conversion between CMS and app formats
- `src/lib/cms/cmsLoader.ts` - Loads data with CMS/fallback support
- Maintains backward compatibility with existing JSON structure

## Editorial Workflow
- **Admin Role**: Full create/edit/delete access to all content
- **Editor Role**: Create/edit access with approval workflow
- **Draft → Review → Publish** workflow for content approval

## Next Steps
1. Configure actual GitHub repository in config.yml
2. Set up authentication (GitHub OAuth + optional Google)
3. Test content creation and editing workflows
4. Train content editors on CMS interface
5. Migrate existing content to CMS format (optional)
