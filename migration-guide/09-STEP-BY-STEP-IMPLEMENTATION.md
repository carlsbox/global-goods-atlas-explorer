# Step-by-Step Implementation Guide
## Creating the Global Goods Platform from Migration Files

This guide provides a complete walkthrough for implementing the Global Goods Platform using the migration strategy files in a new Lovable.ai project.

## Prerequisites

Before starting, ensure you have:
- A new Lovable.ai project created
- Supabase account and project set up
- Basic understanding of React, TypeScript, and PostgreSQL

## Phase 1: Database Setup (30-45 minutes)

### Step 1.1: Set Up Supabase Connection
1. Click the green **Supabase** button in the top-right of your Lovable project
2. Connect your Supabase account and select/create a project
3. Note your Supabase URL and anon key for later use

### Step 1.2: Create Database Schema
1. Go to your Supabase project dashboard
2. Navigate to **SQL Editor**
3. Copy the entire content from `migration-guide/02-DATABASE-SCHEMA.sql`
4. Paste and execute the SQL script
5. Verify all tables are created in the **Table Editor**

### Step 1.3: Set Up Row Level Security
1. In Supabase, go to **Authentication** > **Policies**
2. Verify RLS policies were created for:
   - `global_goods` (public read access)
   - `use_cases` (public read access)
   - Other reference tables

### Step 1.4: Configure Environment Variables
1. In Supabase, go to **Settings** > **API**
2. Copy your URL and anon key
3. In Lovable, these should be automatically configured via the Supabase integration

## Phase 2: PayloadCMS Setup (45-60 minutes)

### Step 2.1: Install PayloadCMS Dependencies
```bash
npm install payload @payloadcms/db-postgres @payloadcms/bundler-webpack @payloadcms/richtext-slate
```

### Step 2.2: Create PayloadCMS Configuration
1. Create `payload.config.ts` in your project root
2. Copy the configuration from `migration-guide/03-PAYLOADCMS-CONFIG.ts`
3. Update the database connection string to your Supabase PostgreSQL URL:
   ```typescript
   db: postgresAdapter({
     pool: {
       connectionString: process.env.DATABASE_URL,
     },
   }),
   ```

### Step 2.3: Set Up PayloadCMS Admin
1. Create the admin build directory structure
2. Configure Netlify functions for PayloadCMS (see `migration-guide/08-NETLIFY-DEPLOYMENT.md`)
3. Set up the admin interface access route

### Step 2.4: Create Initial Admin User
1. Run PayloadCMS in development mode
2. Navigate to `/admin` in your application
3. Create your first admin user account

## Phase 3: Reference Data Setup (30 minutes)

### Step 3.1: Load Reference Data via PayloadCMS
Using the PayloadCMS admin interface, create initial reference data:

1. **Languages**: Add English, French, Spanish
   ```
   - en: English, English
   - fr: French, Français  
   - es: Spanish, Español
   ```

2. **Global Good Types**: 
   ```
   - software: Software/Logiciel/Software
   - content: Content/Contenu/Contenido
   - service: Service/Service/Servicio
   - climate: Climate/Climat/Clima
   - data: Data/Données/Datos
   - ai: AI/IA/IA
   ```

3. **Licenses**: Add common licenses
   ```
   - apache-2.0: Apache License 2.0
   - mit: MIT License
   - gpl-3.0: GNU General Public License v3.0
   ```

4. **Countries**: Import from existing reference data
5. **Classifications**: Import SDG, WHO, WMO, DPI classifications
6. **Standards**: Import health, interoperability, and climate standards

### Step 3.2: Verify Data Relationships
1. Test that relationships work correctly in PayloadCMS admin
2. Verify multilingual content displays properly
3. Check that junction tables are populated correctly

## Phase 4: Frontend Development (3-4 hours)

### Step 4.1: Set Up Core Infrastructure
1. **API Layer**: Create services to connect to Supabase
   ```typescript
   // src/lib/supabase.ts
   import { createClient } from '@supabase/supabase-js'
   
   const supabaseUrl = process.env.VITE_SUPABASE_URL!
   const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY!
   
   export const supabase = createClient(supabaseUrl, supabaseKey)
   ```

2. **Query Setup**: Install and configure TanStack Query
   ```bash
   npm install @tanstack/react-query
   ```

3. **Internationalization**: Set up react-i18next
   ```bash
   npm install i18next react-i18next i18next-browser-languagedetector i18next-http-backend
   ```

### Step 4.2: Create Data Access Layer
1. Create service functions for each entity:
   ```typescript
   // src/services/globalGoods.ts
   export const fetchGlobalGoods = async (filters?: GlobalGoodsFilters) => {
     // Implementation using Supabase client
   }
   
   export const fetchGlobalGoodById = async (id: string) => {
     // Implementation with all relationships
   }
   ```

2. Create custom hooks:
   ```typescript
   // src/hooks/useGlobalGoods.ts
   export const useGlobalGoods = (filters: GlobalGoodsFilters) => {
     return useQuery({
       queryKey: ['global-goods', filters],
       queryFn: () => fetchGlobalGoods(filters),
     })
   }
   ```

### Step 4.3: Build Core Components
Following the component structure from `migration-guide/07-TECHNICAL-SPECIFICATIONS.md`:

1. **Layout Components**:
   - `PageLayout`
   - `MainNav` with language switcher
   - `Footer`

2. **Global Goods Components**:
   - `GlobalGoodCard`
   - `GlobalGoodDetailsPage`
   - `FilterBar` with all filter types

3. **Search Components**:
   - `SearchInput` with debouncing
   - `MultiSelect` for filters
   - `FilterBadges` for active filters

### Step 4.4: Implement Key Features
1. **Search & Filtering**:
   - Full-text search using PostgreSQL
   - Multiple filter combinations
   - URL state persistence

2. **Interactive Map**:
   - World map with country highlighting
   - Country selection and details
   - Implementation visualization

3. **Multilingual Support**:
   - Language switcher in header
   - Content fallback to English
   - URL localization

## Phase 5: Data Migration (1-2 hours)

### Step 5.1: Export Existing Data
1. Extract data from current JSON files
2. Transform to match new schema structure
3. Prepare import scripts

### Step 5.2: Import Data via PayloadCMS
1. Use PayloadCMS admin interface for manual entry
2. Or create import scripts using PayloadCMS API
3. Verify data integrity and relationships

### Step 5.3: Test Data Access
1. Verify all global goods display correctly
2. Test search and filtering functionality
3. Check multilingual content rendering

## Phase 6: Deployment Setup (30 minutes)

### Step 6.1: Configure Netlify
1. Follow instructions in `migration-guide/08-NETLIFY-DEPLOYMENT.md`
2. Set up environment variables in Netlify
3. Configure PayloadCMS as Netlify function

### Step 6.2: Deploy and Test
1. Deploy to Netlify
2. Test all functionality in production
3. Verify PayloadCMS admin access

## Testing Checklist

Before going live, verify:

- [ ] All pages load correctly
- [ ] Search and filtering work
- [ ] Multilingual content displays properly
- [ ] PayloadCMS admin is accessible
- [ ] Data relationships are intact
- [ ] Map functionality works
- [ ] Export features function
- [ ] Mobile responsive design works
- [ ] Performance is acceptable

## Troubleshooting Common Issues

### Database Connection Issues
- Verify Supabase connection string is correct
- Check that RLS policies allow public read access
- Ensure PayloadCMS can connect to PostgreSQL

### PayloadCMS Issues
- Verify all environment variables are set
- Check that Netlify functions are configured correctly
- Ensure database schema matches collection definitions

### Frontend Issues
- Check that all API endpoints return expected data
- Verify that relationships are properly joined
- Test multilingual fallback behavior

## Next Steps After Implementation

1. **Content Entry**: Begin entering global goods data through PayloadCMS
2. **User Training**: Train content managers on the CMS interface
3. **Performance Monitoring**: Set up monitoring for database queries
4. **Backup Strategy**: Configure automated backups
5. **Maintenance**: Plan regular updates and security patches

## Support Resources

- PayloadCMS Documentation: https://payloadcms.com/docs
- Supabase Documentation: https://supabase.com/docs
- Lovable Documentation: https://docs.lovable.dev/
- TanStack Query: https://tanstack.com/query/latest

## Estimated Timeline

- **Database Setup**: 30-45 minutes
- **PayloadCMS Configuration**: 45-60 minutes  
- **Reference Data**: 30 minutes
- **Frontend Development**: 3-4 hours
- **Data Migration**: 1-2 hours
- **Deployment**: 30 minutes

**Total**: 6-8 hours for complete implementation

This guide ensures a systematic approach to implementing the Global Goods Platform with all features working correctly and data properly migrated.