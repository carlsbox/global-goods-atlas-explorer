
# Global Goods Platform - Complete Rebuild Prompt

## Project Overview
Rebuild a comprehensive Global Goods catalog platform with identical frontend functionality but database-driven architecture using Supabase and PayloadCMS.

## Core Requirements

### Technology Stack
- **Frontend**: React + TypeScript + Vite + Tailwind CSS + shadcn/ui
- **Database**: Supabase (PostgreSQL)
- **CMS**: PayloadCMS for content management
- **State Management**: TanStack Query for data fetching
- **Internationalization**: react-i18next (EN, FR, ES)
- **Icons**: Lucide React
- **Charts**: Recharts
- **UI Components**: shadcn/ui components

### Application Architecture
1. **Multi-page application** with client-side routing
2. **Multilingual support** (English, French, Spanish)
3. **Real-time data** from Supabase database
4. **Content management** via PayloadCMS admin
5. **Progressive loading** with skeleton states
6. **Advanced filtering and search**
7. **Interactive world map** visualization
8. **Responsive design** for all devices

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
  id: string;
  name: string;
  logo?: string;
  summary: string;
  description: string;
  website_main?: string;
  website_docs?: string;
  website_source?: string;
  website_demo?: string;
  primary_functionality: string;
  users: string;
  license: string;
  contact: Contact[];
  inception_year?: number;
  // Relationships
  types: GlobalGoodType[];
  languages: Language[];
  classifications: Classification[];
  standards: Standard[];
  countries: Country[];
  screenshots: Screenshot[];
  // Additional data...
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
- Supabase authentication (for admin)
- PayloadCMS API endpoints
- Real-time subscriptions for live data
- CSV export functionality
- External link validation

Start with the database schema setup and then build the frontend components systematically, ensuring each feature matches the original functionality exactly.
