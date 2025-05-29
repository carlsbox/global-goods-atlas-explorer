
# API and Data Flow Documentation

## Overview

This document describes the data loading patterns, API endpoints, and data flow architecture used by the Global Goods platform. Understanding these patterns is essential for maintaining and extending the system.

## Data Loading Architecture

### Two-Phase Loading Strategy

#### Phase 1: Index Loading
```typescript
// Fast initial load for browsing
GET /data/global-goods/index.json
→ Array<GlobalGoodIndexEntry>
→ Immediate display in lists and cards
```

#### Phase 2: Detail Loading
```typescript
// Complete data for individual items
GET /data/global-goods/individual/{id}.json
→ GlobalGoodFlat
→ Full detail page display
```

### Progressive Loading Implementation

```typescript
// Hook pattern for progressive loading
const {
  basicData,           // From index, available immediately
  detailedData,        // From individual file, loads progressively  
  loadingPhase,        // 'basic' | 'detailed' | 'complete' | 'error'
  hasBasicData,        // Boolean flag
  hasDetailedData      // Boolean flag
} = useProgressiveGlobalGood(id);
```

## API Endpoints and Patterns

### Static File Endpoints

#### Global Goods Data
```
GET /data/global-goods/index.json
- Purpose: Lightweight index of all global goods
- Response: Array<GlobalGoodIndexEntry>
- Caching: Browser cache, CDN cache
- Performance: < 100KB, loads in ~200ms

GET /data/global-goods/individual/{id}.json
- Purpose: Complete global good specification
- Response: GlobalGoodFlat | EnhancedCMSGlobalGood
- Caching: Browser cache, CDN cache
- Performance: 10-50KB per file, loads in ~100ms
```

#### Reference Data Endpoints
```
GET /data/reference/globalGoodsTypes.json
GET /data/reference/licenses.json
GET /data/reference/standards.json
GET /data/reference/countries.json
GET /data/reference/productLanguages.json
GET /data/reference/collectionInitiatives.json
GET /data/reference/classifications/sdgs.json
GET /data/reference/classifications/who.json
GET /data/reference/classifications/dpi.json
GET /data/reference/classifications/wmo.json
```

### Data Loading Functions

#### Primary Loaders
```typescript
// Load all global goods (index only)
loadAllEnhancedCMSGlobalGoods(language?: LanguageCode): Promise<GlobalGoodFlat[]>

// Load single global good (complete)
loadEnhancedCMSGlobalGood(id: string, language?: LanguageCode): Promise<GlobalGoodFlat>

// Load reference data
loadLicenses(): Promise<License[]>
loadProductLanguages(): Promise<ProductLanguage[]>
loadGlobalGoodsTypes(): Promise<GlobalGoodsType[]>
loadStandards(): Promise<Record<string, Standard>>
loadCountries(): Promise<Record<string, Country>>
loadCollectionInitiatives(): Promise<CollectionInitiative[]>
```

#### Reference Resolution
```typescript
// Resolve single reference
getLicenseById(id: string): Promise<License | undefined>
getProductLanguageByCode(code: string): Promise<ProductLanguage | undefined>
getCountryByCode(code: string): Promise<Country | undefined>

// Resolve classification codes by authority
resolveClassificationsByAuthority(classifications: {
  SDGs: string[];
  WHO: string[];
  WMO: string[];
  DPI: string[];
}): Promise<ResolvedClassifications>
```

## Data Flow Patterns

### Application Startup Flow
```
1. App Initialize
   ↓
2. ReferenceDataProvider Loads
   ↓
3. Reference Data Cached (Context + localStorage)
   ↓
4. Index Data Loads
   ↓
5. Basic UI Ready
```

### Global Good Detail Flow
```
1. User Navigates to /global-goods/{id}
   ↓
2. useProgressiveGlobalGood Hook Activates
   ↓
3. Check Index for Basic Data
   ↓
4. Display Basic Information
   ↓
5. Load Individual File in Background
   ↓
6. Resolve References
   ↓
7. Update Display with Complete Data
```

### Reference Resolution Flow
```
1. Raw Data with Codes
   ↓
2. transformEnhancedCMSGlobalGoodToFlat()
   ↓
3. Reference Lookup (Cached)
   ↓
4. Code → Object Resolution
   ↓
5. Enriched Data Objects
   ↓
6. Display Ready Data
```

## Caching Strategy

### Multi-Level Caching

#### Level 1: Memory Cache (Session)
```typescript
// React Context provides session-level caching
const { 
  classifications, 
  standards, 
  countries,
  loading,
  error 
} = useReferenceData();
```

#### Level 2: Browser Cache (24 hours)
```typescript
// localStorage with timestamp validation
const cacheKey = 'referenceData';
const cacheTimestamp = localStorage.getItem(`${cacheKey}_timestamp`);
const cacheValid = cacheTimestamp && 
  (Date.now() - parseInt(cacheTimestamp)) < (24 * 60 * 60 * 1000);
```

#### Level 3: CDN Cache (Variable)
- Static files cached at CDN level
- Cache invalidation on deployment
- Geographic distribution for performance

### Cache Invalidation
```typescript
// Manual cache clearing
clearReferenceDataCache(): void;

// Automatic invalidation
- 24-hour expiry for reference data
- Deployment triggers cache clear
- Version changes invalidate cache
```

## Performance Optimization Patterns

### Progressive Enhancement
```typescript
// Show content as soon as available
{hasBasicData && <GlobalGoodHeaderFlat globalGood={basicData} />}
{hasDetailedData ? (
  <CompleteContent globalGood={detailedData} />
) : (
  <ProgressiveLoadingSkeleton phase={loadingPhase} />
)}
```

### Batch Operations
```typescript
// Load all reference data in parallel
const [
  classifications,
  standards,
  countries,
  licenses
] = await Promise.all([
  loadClassificationsData(language),
  loadStandardsData(),
  loadCountriesData(language),
  loadLicenses()
]);
```

### Lazy Loading
```typescript
// Load sections on demand
const { data: maturityData } = useQuery({
  queryKey: ['maturity', id],
  queryFn: () => loadMaturityData(id),
  enabled: !!showMaturitySection  // Only load when section visible
});
```

## Error Handling Patterns

### Graceful Degradation
```typescript
// Continue operation despite partial failures
const license = await getLicenseById(cmsGood.License);
const resolvedLicense = license ? {
  id: license.id,
  name: license.name,
  url: license.url,
  description: license.description
} : {
  id: cmsGood.License,      // Fallback to original code
  name: cmsGood.License,    // Use code as name
  url: '',                  // Empty but safe
  description: ''           // Empty but safe
};
```

### Error Reporting
```typescript
// Log issues without breaking functionality
try {
  const resolved = await resolveReference(code);
  return resolved;
} catch (error) {
  console.warn(`Failed to resolve reference ${code}:`, error);
  return createFallbackObject(code);  // Continue with fallback
}
```

### Retry Logic
```typescript
// Retry failed loads with exponential backoff
const { data, error, retry } = useQuery({
  queryKey: ['globalGood', id],
  queryFn: () => loadGlobalGood(id),
  retry: 3,
  retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000)
});
```

## Monitoring and Observability

### Performance Metrics
```typescript
// Track loading performance
console.time(`Loading global good ${id}`);
const globalGood = await loadEnhancedCMSGlobalGood(id);
console.timeEnd(`Loading global good ${id}`);

// Monitor cache hit rates
const cacheHit = !!cachedData;
analytics.track('cache_performance', { hit: cacheHit, type: 'reference' });
```

### Error Tracking
```typescript
// Track reference resolution failures
if (!resolvedReference) {
  console.warn(`Reference not found: ${code}`);
  analytics.track('reference_resolution_failed', { code, type });
}
```

### Quality Metrics
```typescript
// Track data completeness
const completeness = calculateDataCompleteness(globalGood);
analytics.track('data_quality', { completeness, id: globalGood.ID });
```

## Integration Points

### React Query Integration
```typescript
// Configure React Query for optimal caching
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,      // 5 minutes
      cacheTime: 24 * 60 * 60 * 1000, // 24 hours
      retry: 1,
      refetchOnWindowFocus: false
    }
  }
});
```

### Context Provider Integration
```typescript
// Global reference data availability
<ReferenceDataProvider>
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>
</ReferenceDataProvider>
```

### Route-Level Data Loading
```typescript
// Route-specific data requirements
const GlobalGoodDetailsPage = () => {
  const { id } = useParams();
  const globalGood = useProgressiveGlobalGood(id);
  const referenceData = useReferenceData();
  
  // Component renders progressively as data loads
};
```

## Future API Considerations

### CMS Backend Integration
- REST API endpoints for CRUD operations
- Authentication and authorization
- Real-time updates and webhooks
- Content versioning and publishing workflows

### GraphQL Potential
- Single endpoint for flexible queries
- Reduced over-fetching
- Real-time subscriptions
- Type-safe client generation

### Microservices Architecture
- Separate services for different data types
- Independent scaling and deployment
- Service mesh for communication
- Distributed caching strategies
