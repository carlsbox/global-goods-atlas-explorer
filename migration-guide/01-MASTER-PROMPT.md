
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

### Use Cases Entity
```typescript
interface UseCase {
  id: string;
  title: string;
  purpose: string;
  scope: string;
  actors: string;
  process_steps: string;
  data_requirements: string;
  technology_components: string;
  challenges: string;
  sustainability_considerations: string;
  // Relationships
  global_goods: GlobalGood[];
  classifications: Classification[];
  standards: Standard[];
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

## Migration Strategy
**Phase 1**: Set up unified Supabase PostgreSQL database with PayloadCMS tables
**Phase 2**: Configure PayloadCMS with PostgreSQL adapter and admin interface
**Phase 3**: Create unified API layer serving both CMS and frontend needs
**Phase 4**: Recreate frontend with identical functionality using unified database
**Phase 5**: Deploy to Netlify with proper environment variables and testing

Start with the unified database schema setup, then configure PayloadCMS, and finally build the frontend components systematically, ensuring each feature matches the original functionality exactly.
