
# Technical Specifications & Requirements

## Database Configuration

### Supabase Setup
```sql
-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm"; -- For fuzzy text search
CREATE EXTENSION IF NOT EXISTS "unaccent"; -- For accent-insensitive search

-- Create custom functions for search
CREATE OR REPLACE FUNCTION search_global_goods(search_term TEXT)
RETURNS TABLE(
  id UUID,
  name VARCHAR,
  summary JSONB,
  rank REAL
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    gg.id,
    gg.name,
    gg.summary,
    ts_rank(
      to_tsvector('english', gg.name || ' ' || COALESCE(gg.summary->>'en', '')),
      plainto_tsquery('english', search_term)
    ) as rank
  FROM global_goods gg
  WHERE 
    to_tsvector('english', gg.name || ' ' || COALESCE(gg.summary->>'en', '')) 
    @@ plainto_tsquery('english', search_term)
  ORDER BY rank DESC;
END;
$$ LANGUAGE plpgsql;
```

### API Endpoints Structure
```typescript
// API Routes for Supabase integration
export const API_ROUTES = {
  globalGoods: {
    list: '/api/global-goods',
    details: '/api/global-goods/:id',
    search: '/api/global-goods/search',
    filter: '/api/global-goods/filter',
  },
  useCases: {
    list: '/api/use-cases',
    details: '/api/use-cases/:id',
    byGlobalGood: '/api/use-cases/by-global-good/:id',
  },
  reference: {
    types: '/api/reference/types',
    classifications: '/api/reference/classifications',
    standards: '/api/reference/standards',
    countries: '/api/reference/countries',
    languages: '/api/reference/languages',
  },
  map: {
    deployments: '/api/map/deployments',
    countryData: '/api/map/countries/:id',
  }
};
```

## Frontend Architecture

### State Management with TanStack Query
```typescript
// Query configurations
export const QUERY_KEYS = {
  globalGoods: {
    all: ['global-goods'] as const,
    lists: () => [...QUERY_KEYS.globalGoods.all, 'list'] as const,
    list: (filters: GlobalGoodsFilters) => [...QUERY_KEYS.globalGoods.lists(), filters] as const,
    details: () => [...QUERY_KEYS.globalGoods.all, 'detail'] as const,
    detail: (id: string) => [...QUERY_KEYS.globalGoods.details(), id] as const,
  },
  useCases: {
    all: ['use-cases'] as const,
    lists: () => [...QUERY_KEYS.useCases.all, 'list'] as const,
    list: (filters: UseCasesFilters) => [...QUERY_KEYS.useCases.lists(), filters] as const,
  },
  reference: {
    all: ['reference'] as const,
    types: () => [...QUERY_KEYS.reference.all, 'types'] as const,
    classifications: () => [...QUERY_KEYS.reference.all, 'classifications'] as const,
    standards: () => [...QUERY_KEYS.reference.all, 'standards'] as const,
    countries: () => [...QUERY_KEYS.reference.all, 'countries'] as const,
  }
};

// Query functions
export const useGlobalGoods = (filters: GlobalGoodsFilters) => {
  return useQuery({
    queryKey: QUERY_KEYS.globalGoods.list(filters),
    queryFn: () => fetchGlobalGoods(filters),
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
  });
};
```

### Internationalization Setup
```typescript
// i18n configuration
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    debug: process.env.NODE_ENV === 'development',
    
    interpolation: {
      escapeValue: false,
    },
    
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json',
    },
    
    detection: {
      order: ['querystring', 'cookie', 'localStorage', 'navigator'],
      caches: ['localStorage', 'cookie'],
    },
    
    react: {
      useSuspense: false,
    }
  });

export default i18n;
```

### Custom Hooks Structure
```typescript
// Custom hooks for common functionality
export const useDebounce = <T>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

export const useLocalStorage = <T>(key: string, initialValue: T) => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  };

  return [storedValue, setValue] as const;
};

export const useFilters = <T extends Record<string, any>>(initialFilters: T) => {
  const [filters, setFilters] = useLocalStorage(`filters-${window.location.pathname}`, initialFilters);
  
  const updateFilter = useCallback((key: keyof T, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  }, [setFilters]);
  
  const clearFilters = useCallback(() => {
    setFilters(initialFilters);
  }, [setFilters, initialFilters]);
  
  const hasActiveFilters = useMemo(() => {
    return Object.keys(filters).some(key => 
      filters[key] !== initialFilters[key] && 
      filters[key] !== '' && 
      filters[key] !== null && 
      filters[key] !== undefined
    );
  }, [filters, initialFilters]);
  
  return { filters, updateFilter, clearFilters, hasActiveFilters };
};
```

## Component Architecture

### Higher-Order Components
```typescript
// Error boundary for error handling
export class ErrorBoundary extends React.Component<
  { children: React.ReactNode; fallback?: React.ComponentType<{ error: Error }> },
  { hasError: boolean; error: Error | null }
> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      const FallbackComponent = this.props.fallback || DefaultErrorFallback;
      return <FallbackComponent error={this.state.error!} />;
    }

    return this.props.children;
  }
}

// Lazy loading wrapper
export const LazyWrapper = ({ children }: { children: React.ReactNode }) => (
  <Suspense fallback={<LoadingSkeleton type="page" />}>
    {children}
  </Suspense>
);
```

### Form Components
```typescript
// Reusable form components
export const SearchInput = forwardRef<HTMLInputElement, {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  debounceMs?: number;
}>(({ value, onChange, placeholder, debounceMs = 300 }, ref) => {
  const debouncedValue = useDebounce(value, debounceMs);
  
  useEffect(() => {
    onChange(debouncedValue);
  }, [debouncedValue, onChange]);

  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
      <Input
        ref={ref}
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-10"
      />
    </div>
  );
});

export const MultiSelect = <T extends { id: string; name: string }>({ 
  options, 
  selectedValues, 
  onChange, 
  placeholder 
}: {
  options: T[];
  selectedValues: string[];
  onChange: (values: string[]) => void;
  placeholder?: string;
}) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-full justify-between">
          {selectedValues.length > 0 
            ? `${selectedValues.length} selected`
            : placeholder
          }
          <ChevronDown className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder="Search..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option.id}
                  onSelect={() => {
                    const newValues = selectedValues.includes(option.id)
                      ? selectedValues.filter(v => v !== option.id)
                      : [...selectedValues, option.id];
                    onChange(newValues);
                  }}
                >
                  <div className="flex items-center space-x-2">
                    <Checkbox checked={selectedValues.includes(option.id)} />
                    <span>{option.name}</span>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
```

## Performance Optimizations

### Code Splitting
```typescript
// Lazy load heavy components
const MapPage = lazy(() => import('./pages/MapPage'));
const GlobalGoodDetailsPage = lazy(() => import('./pages/GlobalGoodDetailsPage'));
const UseCasesPage = lazy(() => import('./pages/UseCasesPage'));

// Preload critical components
const GlobalGoodsPage = lazy(() => 
  import('./pages/GlobalGoodsPage').then(module => {
    // Preload related components
    import('./components/GlobalGoodCard');
    import('./components/SearchAndFilters');
    return module;
  })
);
```

### Image Optimization
```typescript
// Optimized image component
export const OptimizedImage = ({ 
  src, 
  alt, 
  width, 
  height, 
  className,
  fallback 
}: {
  src?: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  fallback?: string;
}) => {
  const [imgSrc, setImgSrc] = useState(src);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleLoad = () => setIsLoading(false);
  const handleError = () => {
    setHasError(true);
    setIsLoading(false);
    if (fallback) setImgSrc(fallback);
  };

  if (!src || hasError) {
    return (
      <div className={cn("bg-muted flex items-center justify-center", className)}>
        <ImageIcon className="h-8 w-8 text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="relative">
      {isLoading && (
        <div className={cn("absolute inset-0 bg-muted animate-pulse", className)} />
      )}
      <img
        src={imgSrc}
        alt={alt}
        width={width}
        height={height}
        className={cn(className, isLoading && "opacity-0")}
        onLoad={handleLoad}
        onError={handleError}
        loading="lazy"
      />
    </div>
  );
};
```

## Deployment Configuration

### Environment Variables
```env
# Supabase Configuration
VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key

# PayloadCMS Configuration
PAYLOAD_SECRET=your-payload-secret
DATABASE_URI=your-mongodb-uri

# Application Configuration
VITE_APP_NAME=Global Goods Platform
VITE_APP_VERSION=2.0.0
VITE_DEFAULT_LANGUAGE=en
VITE_SUPPORTED_LANGUAGES=en,fr,es

# Analytics (optional)
VITE_GA_TRACKING_ID=your-ga-id

# Feature Flags
VITE_ENABLE_MAP=true
VITE_ENABLE_EXPORT=true
VITE_ENABLE_ANALYTICS=true
```

### Build Configuration
```typescript
// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
  optimizeDeps: {
    include: ['react', 'react-dom', '@tanstack/react-query'],
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          query: ['@tanstack/react-query'],
          ui: ['@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu'],
          charts: ['recharts'],
          icons: ['lucide-react'],
        },
      },
    },
  },
});
```

This comprehensive technical specification provides all the implementation details needed to rebuild the platform with database-driven architecture while maintaining identical frontend functionality.
