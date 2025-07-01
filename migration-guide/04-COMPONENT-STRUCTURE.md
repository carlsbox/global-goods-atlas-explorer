
# Component Structure & Implementation Guide

## Core Layout Components

### 1. App.tsx - Main Application Router
```typescript
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { I18nProvider } from './contexts/I18nContext';
import { ReferenceDataProvider } from './contexts/ReferenceDataContext';

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <I18nProvider>
        <ReferenceDataProvider>
          <BrowserRouter>
            <div className="min-h-screen bg-background">
              <Navigation />
              <main>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/global-goods" element={<GlobalGoodsPage />} />
                  <Route path="/global-goods/:id" element={<GlobalGoodDetailsPage />} />
                  <Route path="/use-cases" element={<UseCasesPage />} />
                  <Route path="/map" element={<MapPage />} />
                  <Route path="/about" element={<AboutPage />} />
                </Routes>
              </main>
              <Footer />
            </div>
          </BrowserRouter>
        </ReferenceDataProvider>
      </I18nProvider>
    </QueryClientProvider>
  );
}
```

### 2. Navigation Component
```typescript
interface NavigationProps {
  // Navigation with language switcher and responsive menu
}

features:
- Responsive hamburger menu for mobile
- Language switcher dropdown
- Active route highlighting
- Logo and branding
```

### 3. Footer Component
```typescript
interface FooterProps {
  // Footer with links and branding
}

features:
- Multi-column layout
- Social links
- Legal links
- Responsive design
```

## Page Components

### 1. HomePage
```typescript
interface HomePageProps {}

Sections:
- Hero section with CTAs
- Feature cards (3 columns)
- Featured global goods carousel
- Statistics section

Key Features:
- Animated hero text
- Card hover effects
- Responsive grid layout
```

### 2. GlobalGoodsPage 
```typescript
interface GlobalGoodsPageProps {}

Components:
- SearchAndFilters component
- GlobalGoodsGrid component  
- Pagination component

Features:
- Real-time search with debouncing
- Multi-filter support (type, classification, text)
- Sort options (name, date, popularity)
- Results counter with filter status
```

### 3. GlobalGoodDetailsPage
```typescript
interface GlobalGoodDetailsPageProps {
  id: string; // from route params
}

Sections:
- Header with basic info and links
- Tabbed interface:
  - Overview tab
  - Community tab (enhanced)
  - Technical tab
  - Standards tab
  - Reach tab (with map)
  - Maturity tab (with charts)

Key Features:
- Dynamic tab loading
- Interactive charts (Recharts)
- Country modal with CSV export
- Related use cases
```

### 4. UseCasesPage
```typescript
interface UseCasesPageProps {}

Components:
- UseCaseFilters component
- UseCasesGrid component
- UseCaseCard component

Features:
- Filter by global good
- Filter by classification
- Search functionality
- Card-based layout
```

### 5. MapPage
```typescript
interface MapPageProps {}

Components:
- InteractiveMap component
- MapSidebar component
- MapDetails component

Features:
- SVG world map
- Country highlighting
- Click interactions
- Deployment visualization
- Responsive sidebar
```

## Card Components

### 1. GlobalGoodCard
```typescript
interface GlobalGoodCardProps {
  globalGood: {
    id: string;
    name: string;
    logo?: string;
    summary: string;
    types: GlobalGoodType[];
    countries: Country[];
    classifications: Classification[];
  };
}

Features:
- Hover animations
- Logo display with fallback
- Type badges
- Country count
- Classification indicators
- Responsive layout
```

### 2. UseCaseCard  
```typescript
interface UseCaseCardProps {
  useCase: {
    id: string;
    title: string;
    purpose: string;
    globalGoods: GlobalGood[];
    classifications: Classification[];
  };
}

Features:
- Expandable content
- Related global goods
- Classification badges
- Link to full details
```

## Specialized Components

### 1. CommunityTabEnhanced (Already Built)
```typescript
// This component is already well-structured
// Key features:
- Three-column layout
- Link availability indicators
- Event listing with modal
- Policy section
- Tooltip for unavailable links
```

### 2. CountriesModal (Already Built)
```typescript
// This component handles country display
// Key features:
- Sortable table
- CSV export
- Country flags
- Search/filter capability
```

### 3. InteractiveMap
```typescript
interface InteractiveMapProps {
  selectedGlobalGood?: string;
  onCountryClick: (countryId: string) => void;
  deploymentData: Record<string, number>;
}

Features:
- SVG-based world map
- Dynamic country coloring
- Hover effects
- Click handlers
- Legend display
- Zoom/pan capabilities
```

### 4. SearchAndFilters
```typescript
interface SearchAndFiltersProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  availableOptions: {
    types: GlobalGoodType[];
    classifications: Classification[];
  };
}

Features:
- Debounced search input
- Multi-select dropdowns
- Clear filters button
- Active filter indicators
- Responsive layout
```

### 5. LanguageSwitcher
```typescript
interface LanguageSwitcherProps {
  currentLanguage: string;
  onLanguageChange: (lang: string) => void;
  availableLanguages: Language[];
}

Features:
- Dropdown with flags
- Language names in native script
- URL update on change
- Persistent selection
```

## Chart Components

### 1. MaturityRadarChart
```typescript
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts';

interface MaturityRadarChartProps {
  data: MaturityScore[];
  year: number;
}

Features:
- Interactive radar chart
- Color-coded dimensions
- Responsive design
- Tooltip with details
```

### 2. MaturityTrendChart
```typescript
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface MaturityTrendChartProps {
  data: MaturityScore[];
  selectedDimensions: string[];
}

Features:
- Multi-line trend chart
- Dimension toggle
- Year-over-year comparison
- Interactive legend
```

## Utility Components

### 1. CountryFlag
```typescript
interface CountryFlagProps {
  isoCode: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

Features:
- Flag emoji or image
- Fallback for missing flags
- Consistent sizing
- Accessible alt text
```

### 2. ClassificationBadge
```typescript
interface ClassificationBadgeProps {
  classification: Classification;
  variant?: 'default' | 'outline';
  showTooltip?: boolean;
}

Features:
- Color coding by authority
- Tooltip with description
- Consistent styling
- Hover effects
```

### 3. LoadingSkeleton
```typescript
interface LoadingSkeletonProps {
  type: 'card' | 'list' | 'details';
  count?: number;
}

Features:
- Multiple skeleton types
- Animated shimmer effect
- Matches actual content layout
- Responsive design
```

## Hook Components

### 1. useGlobalGoods
```typescript
const useGlobalGoods = (filters: FilterState) => {
  // TanStack Query hook for fetching global goods
  // Features: caching, refetching, error handling
}
```

### 2. useUseCases  
```typescript
const useUseCases = (filters: UseCaseFilters) => {
  // TanStack Query hook for fetching use cases
  // Features: pagination, search, filtering
}
```

### 3. useReferenceData
```typescript
const useReferenceData = () => {
  // Hook for accessing reference data context
  // Features: lazy loading, caching, error handling
}
```

## Context Providers

### 1. I18nContext
```typescript
interface I18nContextValue {
  language: string;
  setLanguage: (lang: string) => void;
  t: (key: string, params?: any) => string;
  tPage: (key: string, page: string, params?: any) => string;
}
```

### 2. ReferenceDataContext
```typescript
interface ReferenceDataContextValue {
  classifications: Classification[];
  standards: Standard[];
  countries: Country[];
  languages: Language[];
  loading: boolean;
  error: Error | null;
}
```

## Styling Guidelines

### 1. Tailwind CSS Classes
- Use consistent spacing scale (4, 6, 8, 12, 16, 24)
- Color palette: primary, secondary, muted, background
- Typography: consistent font sizes and weights
- Responsive prefixes: sm:, md:, lg:, xl:

### 2. Component Variants
- Card components: hover effects, shadows
- Buttons: primary, secondary, outline, ghost variants
- Badges: default, outline, destructive variants
- Forms: consistent input styling, validation states

### 3. Animation Classes
- Hover transitions: hover:scale-105, hover:shadow-lg
- Loading states: animate-pulse, animate-spin
- Page transitions: fade-in, slide-up effects

This structure ensures maintainable, scalable code with proper separation of concerns and reusable components throughout the application.
