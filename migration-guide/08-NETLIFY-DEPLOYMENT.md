# Netlify Deployment Guide

## Environment Variables Setup

Configure these environment variables in Netlify:

### Supabase Configuration
```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
DATABASE_URL=postgresql://postgres:[password]@db.[project].supabase.co:5432/postgres

# PayloadCMS Configuration (for admin)
PAYLOAD_SECRET=your-payload-secret-key
PAYLOAD_CONFIG_PATH=dist/payload.config.js
```

### Application Configuration
```env
VITE_APP_NAME=Global Goods Platform
VITE_APP_VERSION=2.0.0
VITE_DEFAULT_LANGUAGE=en
VITE_SUPPORTED_LANGUAGES=en,fr,es
NODE_ENV=production
```

### Optional Analytics
```env
VITE_GA_TRACKING_ID=your-google-analytics-id
```

## Build Configuration

### netlify.toml
```toml
[build]
  publish = "dist"
  command = "npm run build"

[build.environment]
  NODE_VERSION = "18"

[[redirects]]
  from = "/admin/*"
  to = "/.netlify/functions/payload"
  status = 200

[[redirects]]
  from = "/api/*"
  to = "/.netlify/functions/payload"
  status = 200

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[[headers]]
  for = "/static/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

[[headers]]
  for = "*.js"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

[[headers]]
  for = "*.css"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"
```

## PayloadCMS as Netlify Function

### netlify/functions/payload.js
```javascript
import { handler } from '@payloadcms/payload/netlify';
import config from '../../payload.config.js';

export { handler };
export const config = { 
  type: 'experimental-background' 
};
```

## Deployment Steps

### 1. Repository Setup
1. Connect your GitHub repository to Netlify
2. Set the build command: `npm run build`
3. Set the publish directory: `dist`

### 2. Environment Variables
1. Go to Site settings > Environment variables
2. Add all required environment variables listed above
3. Ensure DATABASE_URL points to your Supabase PostgreSQL instance

### 3. Build Settings
1. Set Node.js version to 18 or higher
2. Configure build command and publish directory
3. Add netlify.toml to your repository root

### 4. Domain Configuration
1. Configure custom domain if needed
2. Set up SSL certificate (automatic with Netlify)
3. Configure DNS records as required

## Database Migration for Production

### Supabase Production Setup
```sql
-- Run the unified database schema in production
-- Execute migration-guide/02-DATABASE-SCHEMA.sql

-- Set up Row Level Security policies
ALTER TABLE global_goods ENABLE ROW LEVEL SECURITY;
ALTER TABLE use_cases ENABLE ROW LEVEL SECURITY;

-- Create admin policies for PayloadCMS
CREATE POLICY "Admin full access" ON global_goods
FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Public read access" ON global_goods
FOR SELECT USING (true);
```

### Data Import Process
1. Export existing JSON data from current system
2. Transform data to match unified database schema
3. Import via PayloadCMS admin interface or SQL scripts
4. Verify data integrity and relationships

## Performance Optimizations

### Frontend Optimizations
- Enable gzip compression in Netlify
- Configure proper caching headers
- Use Netlify Large Media for image optimization
- Enable Netlify Analytics for performance monitoring

### Database Optimizations
- Configure Supabase connection pooling
- Set up proper indexes for search functionality
- Enable query performance monitoring
- Configure backup and restore policies

## Monitoring and Maintenance

### Health Checks
- Monitor Netlify build status
- Check Supabase database performance
- Monitor PayloadCMS admin access
- Track frontend performance metrics

### Backup Strategy
- Automated Supabase database backups
- Version control for code changes
- Regular content exports from PayloadCMS
- Monitor storage usage and limits

## Troubleshooting

### Common Issues
1. **Build failures**: Check Node.js version and dependencies
2. **Database connection**: Verify Supabase connection string
3. **PayloadCMS admin**: Ensure proper environment variables
4. **CORS issues**: Configure Supabase CORS settings
5. **Performance**: Monitor function execution time and database queries

This deployment guide ensures a smooth production deployment with proper configuration for the unified database architecture.