
# Global Goods Platform - Complete Rebuild Prompt

## Project Overview
Rebuild a comprehensive Global Goods catalog platform with identical frontend functionality but database-driven architecture using Supabase and PayloadCMS.

## Core Requirements

### Technology Stack
- **Frontend**: React + TypeScript + Vite + Tailwind CSS + shadcn/ui
- **Database**: Supabase PostgreSQL (unified database)
- **CMS**: PayloadCMS with PostgreSQL adapter (uses same Supabase database)
- **State Management**: TanStack Query for data fetching
- **Internationalization**: react-i18next (EN, FR, ES)
- **Icons**: Lucide React
- **Charts**: Recharts
- **UI Components**: shadcn/ui components
- **Deployment**: Netlify

### Application Architecture
1. **Multi-page application** with client-side routing
2. **Multilingual support** (English, French, Spanish)
3. **Unified database** - Single Supabase PostgreSQL instance
4. **Content management** - PayloadCMS with PostgreSQL adapter
5. **Real-time data** from unified Supabase database
6. **Progressive loading** with skeleton states
7. **Advanced filtering and search**
8. **Interactive world map** visualization
9. **Responsive design** for all devices
10. **Netlify deployment** with environment variables

## Pages to Build

### 1. HomePage (/)
- Hero section with call-to-action buttons
- Featured global goods carousel
- Three feature cards (Global Goods, Use Cases, Map)
- Navigation to other sections

### 2. Global Goods Catalog (/global-goods)
- Grid layout of global good cards
- Advanced filtering by:
  - Type (software, content, service, climate, data, ai)
  - Search text
  - Classifications (SDGs, WHO, WMO, DPI)
- Sorting options
- Pagination or infinite scroll
- Results counter with active filter indicators

### 3. Global Good Details (/global-goods/:id)
- Tabbed interface with sections:
  - Overview (summary, screenshots, links)
  - Community (organization info, events, policies)
  - Technical (standards, interoperability)
  - Reach (implementation map, countries)
  - Maturity (scoring charts)
- Related use cases
- Implementation countries modal with CSV export
- Country flags and names

### 4. Use Cases (/use-cases)
- Card grid layout
- Filtering by:
  - Global good
  - Sector/classification
  - Search text
- Detailed use case information
- Links to related global goods

### 5. Interactive Map (/map)
- World map with country highlighting
- Sidebar with global goods list
- Click interactions showing:
  - Countries where goods are deployed
  - Number of deployments per country
- Legend and filters
- Zoom and pan capabilities

### 6. About Page (/about)
- Information about Digital Square
- Global goods explanation
- Application process information
- Contact information

## Data Structure Requirements

### Global Goods Entity
```typescript
interface GlobalGood {
  // Core identification
  id: string;
  slug: string;
  name: string;
  logo?: string;
  
  // Basic information (multilingual)
  summary: JSONB; // {"en": "...", "fr": "...", "es": "..."}
  description: JSONB;
  primary_functionality: JSONB;
  users: JSONB;
  inception_year?: number;
  size_of_community?: number;
  number_of_implementations?: number;
  
  // Website links
  website_main?: string;
  website_docs?: string;
  website_source?: string;
  website_demo?: string;
  
  // License and contact
  license_id: string; // Reference to licenses table
  contact: Contact[];
  
  // Community information
  community_description: JSONB;
  host_organization_id: string; // Reference to organizations table
  community_url?: string;
  mailing_list_url?: string;
  
  // Governance and policies
  governance_url?: string;
  terms_of_use_url?: string;
  user_agreement_url?: string;
  privacy_policy_url?: string;
  do_no_harm_url?: string;
  pii_collected_url?: string;
  npii_used_url?: string;
  
  // Events and community engagement
  events_description: JSONB;
  events_schedule_url?: string;
  recent_events: Event[];
  
  // Reach and implementation
  reach_summary: JSONB;
  implementation_countries: Country[];
  implementation_map_overview?: {
    url: string;
    description: string;
  };
  
  // Maturity and scoring
  maturity_summary: JSONB;
  maturity_scores: MaturityScore[]; // Yearly scores
  
  // Sustainability and impact
  climate_integration: JSONB;
  inclusive_design: JSONB;
  environmental_impact: JSONB;
  tco_description: JSONB;
  tco_url?: string;
  sustainability: JSONB;
  key_funders: Funder[];
  
  // Technical specifications
  types: GlobalGoodType[]; // Software, Content, Service, etc.
  languages: Language[]; // Programming/supported languages
  classifications: Classification[]; // SDGs, WHO, WMO, DPI
  standards: Standard[]; // Health, Interop, Climate standards
  screenshots: Screenshot[];
  resources: Resource[]; // Documentation, articles, etc.
  linked_initiatives: LinkedInitiative[];
  
  // Metadata
  created_at: timestamp;
  updated_at: timestamp;
}
```

### Supporting Entity Definitions

```typescript
// Events - Individual records per event
interface Event {
  id: string;
  global_good_id: string;
  event_name: string;
  event_date?: Date;
  description: JSONB; // Multilingual
  url?: string;
  created_at: timestamp;
}

// Maturity Scores - Multiple score sets per year
interface MaturityScore {
  id: string;
  global_good_id: string;
  year: number;
  global_utility: number; // 0-10
  community_support: number; // 0-10
  maturity_of_gg: number; // 0-10
  inclusive_design: number; // 0-10
  climate_resilience: number; // 0-10
  low_carbon: number; // 0-10
  entry_date: timestamp; // When this score set was entered
  created_at: timestamp;
}

// Contact Information
interface Contact {
  id: string;
  global_good_id: string;
  name: string;
  email?: string;
  role?: string;
  created_at: timestamp;
}

// Screenshot Management
interface Screenshot {
  id: string;
  global_good_id: string;
  filename: string; // Stored locally in /media directory
  alt_text: JSONB; // Multilingual alt text
  description: JSONB; // Multilingual description
  sort_order: number;
  created_at: timestamp;
}

// Resources (Documentation, Articles, etc.)
interface Resource {
  id: string;
  global_good_id: string;
  type: 'Articles' | 'ProductDocumentation' | 'UserRequirements' | 'EndUserDocumentation' | 'ImplementerDocumentation' | 'DeveloperDocumentation' | 'OperatorDocumentation' | 'InstallationDocumentation';
  title: JSONB; // Multilingual
  description: JSONB; // Multilingual
  url: string;
  created_at: timestamp;
}

// Key Funders/Supporters
interface Funder {
  id: string;
  global_good_id: string;
  name: string;
  url?: string;
  description?: JSONB; // Multilingual
  created_at: timestamp;
}

// Linked Initiatives
interface LinkedInitiative {
  id: string;
  global_good_id: string;
  name: string;
  url?: string;
  description?: JSONB; // Multilingual
  created_at: timestamp;
}

### Use Cases Entity
```typescript
interface UseCase {
  id: string;
  slug: string;
  title: JSONB; // Multilingual
  purpose: JSONB; // Multilingual
  scope: JSONB; // Multilingual
  actors: JSONB; // Multilingual
  preconditions?: JSONB; // Multilingual
  process_steps: JSONB; // Multilingual
  postconditions?: JSONB; // Multilingual
  data_requirements?: JSONB; // Multilingual
  technology_components?: JSONB; // Multilingual
  challenges?: JSONB; // Multilingual
  sustainability_considerations?: JSONB; // Multilingual
  
  // Relationships (many-to-many via junction tables)
  global_goods: GlobalGood[];
  classifications: Classification[];
  standards: Standard[];
  
  created_at: timestamp;
  updated_at: timestamp;
}
```

### Reference Data Entities

```typescript
// Countries - Flat list for implementation tracking
interface Country {
  id: string;
  iso_code: string; // ISO 3166-1 alpha-3
  type: string; // 'Country', 'Territory', etc.
  names: JSONB; // {"en": {"short": "USA", "formal": "United States of America"}, "fr": {...}, "es": {...}}
  created_at: timestamp;
  updated_at: timestamp;
}

// Organizations - Host organizations for global goods
interface Organization {
  id: string;
  name: string;
  url?: string;
  description?: JSONB; // Multilingual
  logo_url?: string;
  countries: Country[]; // Countries where organization operates
  created_at: timestamp;
  updated_at: timestamp;
}

// Classifications - Extensible classification system
interface Classification {
  id: string;
  code: string; // Unique identifier
  title: JSONB; // Multilingual titles
  description?: JSONB; // Multilingual descriptions
  authority: 'SDG' | 'WHO' | 'WMO' | 'DPI'; // Can be extended by adding new authorities
  group_code?: string; // For grouping related classifications
  group_name?: string;
  created_at: timestamp;
  updated_at: timestamp;
}

// Standards - Technical and domain standards
interface Standard {
  id: string;
  code: string; // Unique identifier
  name: JSONB; // Multilingual names
  description: JSONB; // Multilingual descriptions
  domain: 'Health' | 'Weather and Climate' | 'Technology'; // Extensible domains
  type: string; // 'exchange', 'terminology', etc.
  link?: string; // Reference URL
  created_at: timestamp;
  updated_at: timestamp;
}

// Global Good Types
interface GlobalGoodType {
  id: string;
  code: string; // 'software', 'content', 'service', 'climate', 'data', 'ai'
  title: JSONB; // Multilingual titles
  description: JSONB; // Multilingual descriptions
  created_at: timestamp;
  updated_at: timestamp;
}

// Languages (for programming/interface languages)
interface Language {
  id: string;
  code: string; // ISO 639-1 or custom code
  name: string; // English name
  native_name: string; // Native language name
  created_at: timestamp;
  updated_at: timestamp;
}

// Licenses
interface License {
  id: string;
  license_id: string; // Standard license identifier
  name: string;
  url?: string;
  description?: string;
  created_at: timestamp;
  updated_at: timestamp;
}
```

## Key Features to Implement

### 1. Multilingual System
- Language switcher in header
- Dynamic content translation
- URL localization support
- Fallback to English for missing translations

### 2. Advanced Search & Filtering
- Real-time search with debouncing
- Multiple filter combinations
- Clear filters functionality
- Filter state persistence in URL

### 3. Interactive Map
- SVG world map with country boundaries
- Dynamic country coloring based on deployments
- Hover effects and tooltips
- Sidebar integration with selection state

### 4. Data Visualization
- Maturity scoring radar charts
- Implementation statistics
- Country deployment counts
- Classification breakdowns

### 5. Content Management
- PayloadCMS admin interface
- Rich text editing for descriptions
- Image upload and management
- Relationship field management
- Bulk import/export capabilities

## UI/UX Requirements

### Design System
- Modern, clean interface
- Consistent spacing (Tailwind CSS)
- Professional color scheme
- Responsive grid layouts
- Loading states and skeletons
- Error handling with retry options

### Components to Build
- GlobalGoodCard
- UseCaseCard
- CountryFlag component
- ClassificationBadge
- StandardsBadge
- SearchInput with filters
- LanguageSwitcher
- NavigationMenu
- Footer
- LoadingSpinner/Skeleton
- ErrorBoundary

### Responsive Breakpoints
- Mobile: 320px - 768px
- Tablet: 768px - 1024px
- Desktop: 1024px+

## Performance Requirements
- Fast initial load (< 3s)
- Optimized images and assets
- Efficient database queries
- Caching strategy for reference data
- Progressive loading for large datasets

## SEO & Accessibility
- Semantic HTML structure
- Alt text for images
- ARIA labels where needed
- Meta tags for social sharing
- Keyboard navigation support

## Integration Points
- **Unified Database**: Single Supabase PostgreSQL for both app data and CMS
- **PayloadCMS Integration**: Direct database management with PostgreSQL adapter
- **Supabase Authentication**: For both frontend users and CMS admin access
- **Real-time subscriptions** for live data updates
- **CSV export functionality** from unified database
- **Netlify deployment** with proper environment configuration

## Data Management Strategy

### Translation Management
- **Site Content**: All pages, navigation, and UI text managed through PayloadCMS with full translation support
- **Global Goods**: CMS allows logged-in users to add translations for fields marked as translatable
- **Reference Data**: All reference data (except codes) must have translations for supported languages
- **Fallback Strategy**: Partial translations show translated content then fallback to English (en)
- **Supported Languages**: English (en - base), French (fr), Spanish (es)

### File Storage Strategy
- **Screenshots**: Stored locally in `/media` directory with optimized sizes
- **Logos**: Stored locally in `/media` directory
- **Documents**: External URLs only (no local document storage)

### Data Entry Approach
- **Global Goods**: Manual data entry via PayloadCMS admin interface
- **Site Pages**: Created and managed by users through CMS
- **Reference Data**: Managed through CMS with translation support
- **Events**: Manual entry per event (individual records)
- **Maturity Scores**: User-entered score sets with multiple entries per year

### User Roles & Permissions
- **Super Admin**: Full system access, user management
- **Data Manager**: Global goods and reference data management
- **Editor**: Content creation and translation
- **Viewer**: Read-only access

## Migration Strategy
**Phase 1**: Set up unified Supabase PostgreSQL database with complete schema
**Phase 2**: Configure PayloadCMS with PostgreSQL adapter, collections, and user roles
**Phase 3**: Create comprehensive API layer with search, filtering, and export capabilities
**Phase 4**: Build frontend with identical functionality plus new database features
**Phase 5**: Data migration from existing JSON files to PostgreSQL
**Phase 6**: Deploy to Netlify with proper environment configuration and testing

Start with the unified database schema setup, then configure PayloadCMS collections, migrate existing data, and finally build the frontend components systematically, ensuring each feature matches the original functionality exactly.
