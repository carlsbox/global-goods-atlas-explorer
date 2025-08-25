
import { useState, useMemo, Suspense, useEffect } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import { GlobalGoodFlat } from "@/lib/types/globalGoodFlat";
import { useGlobalGoodsFlat } from "@/lib/api/globalGoodsFlat";
import { EnhancedFilterBar } from "@/components/global-goods/EnhancedFilterBar";
import { EnhancedGlobalGoodCard } from "@/components/global-goods/EnhancedGlobalGoodCard";
import { EnhancedGlobalGoodListItem } from "@/components/global-goods/EnhancedGlobalGoodListItem";
import { NoResults } from "@/components/global-goods/NoResults";
import { useI18n } from "@/hooks/useI18n";
import { LoadingState } from "@/components/global-good/LoadingState";
import { ErrorState } from "@/components/global-good/ErrorState";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { useEnhancedReferenceData } from "@/hooks/useEnhancedReferenceData";
import { logReferenceDataWarnings } from "@/lib/utils/referenceDataValidation";

// Skeleton for the catalog grid
function CatalogSkeleton({ viewMode }: { viewMode: 'grid' | 'list' }) {
  if (viewMode === 'grid') {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="bg-card border rounded-lg p-6">
            <div className="flex items-center mb-4">
              <Skeleton className="h-10 w-10 rounded mr-3" />
              <Skeleton className="h-5 w-32" />
            </div>
            <div className="space-y-2 mb-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
            <div className="flex gap-1 mb-4">
              <Skeleton className="h-6 w-16 rounded-full" />
              <Skeleton className="h-6 w-20 rounded-full" />
            </div>
            <Skeleton className="h-4 w-24" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="bg-card border rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 flex-1">
              <Skeleton className="h-8 w-8 rounded" />
              <div className="space-y-1 flex-1">
                <Skeleton className="h-5 w-48" />
                <Skeleton className="h-4 w-96" />
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Skeleton className="h-4 w-8" />
              <Skeleton className="h-6 w-16 rounded-full" />
              <Skeleton className="h-4 w-4" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// Main catalog content component
function CatalogContent() {
  const { data: globalGoods = [], isLoading, error, refetch } = useGlobalGoodsFlat();
  const { standardsMap, countriesMap, classificationsMap } = useEnhancedReferenceData();
  const [searchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState("");
  const [sectorFilter, setSectorFilter] = useState("all");
  const [sortBy, setSortBy] = useState("name");
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedSDGs, setSelectedSDGs] = useState<string[]>([]);
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
  const [selectedWHOClassifications, setSelectedWHOClassifications] = useState<string[]>([]);
  const [selectedDPIClassifications, setSelectedDPIClassifications] = useState<string[]>([]);
  const [selectedWMOClassifications, setSelectedWMOClassifications] = useState<string[]>([]);
  const [selectedHealthStandards, setSelectedHealthStandards] = useState<string[]>([]);
  const [selectedInteropStandards, setSelectedInteropStandards] = useState<string[]>([]);
  const [climateHealthFilter, setClimateHealthFilter] = useState(false);
  const { tPage } = useI18n();

  // Check for climate-health filter from URL
  useEffect(() => {
    const climateHealth = searchParams.get('climate-health') === 'true';
    setClimateHealthFilter(climateHealth);
  }, [searchParams]);

  // Validate reference data when global goods are loaded
  useEffect(() => {
    if (globalGoods.length > 0 && standardsMap.size > 0) {
      logReferenceDataWarnings(globalGoods, { standardsMap, countriesMap, classificationsMap });
    }
  }, [globalGoods, standardsMap, countriesMap, classificationsMap]);
  
  // Extract unique sectors for filter - defer calculation until data is loaded
  const sectors = useMemo(() => {
    if (!globalGoods.length) return [];
    return Array.from(
      new Set(globalGoods.flatMap(good => 
        good.GlobalGoodsType?.map(type => type.title) || []
      ))
    ).sort();
  }, [globalGoods]);

  // Extract available filter options from the data - defer calculation
  const availableFilterOptions = useMemo(() => {
    if (!globalGoods.length) {
      return {
        classifications: { who: [], dpi: [], wmo: [], sdgs: [] },
        standards: { health: [], interop: [] },
        countries: []
      };
    }

    const whoClassifications = new Map<string, string>();
    const dpiClassifications = new Map<string, string>();
    const wmoClassifications = new Map<string, string>();
    const sdgs = new Map<string, string>();
    const healthStandards = new Set<string>();
    const interopStandards = new Set<string>();
    const countries = new Set<string>();

    globalGoods.forEach(good => {
      // Extract SDGs with titles
      good.Classifications?.SDGs?.forEach(sdg => {
        sdgs.set(sdg.code, sdg.title);
      });

      // Extract WHO classifications with titles
      good.Classifications?.WHO?.forEach(classification => {
        whoClassifications.set(classification.code, classification.title);
      });

      // Extract DPI classifications with titles
      good.Classifications?.DPI?.forEach(classification => {
        dpiClassifications.set(classification.code, classification.title);
      });

      // Extract WMO classifications with titles
      good.Classifications?.WMO?.forEach(classification => {
        wmoClassifications.set(classification.code, classification.title);
      });

      // Extract health standards
      good.StandardsAndInteroperability?.HealthStandards?.forEach(standard => {
        healthStandards.add(standard.code);
      });

      // Extract interoperability standards
      good.StandardsAndInteroperability?.Interoperability?.forEach(standard => {
        interopStandards.add(standard.code);
      });

      // Extract implementation countries
      good.Reach?.ImplementationCountries?.forEach(country => {
        countries.add(country.names.en.short);
      });
    });

    return {
      classifications: {
        who: Array.from(whoClassifications.entries()).map(([code, title]) => ({ code, title })).sort((a, b) => a.title.localeCompare(b.title)),
        dpi: Array.from(dpiClassifications.entries()).map(([code, title]) => ({ code, title })).sort((a, b) => a.title.localeCompare(b.title)),
        wmo: Array.from(wmoClassifications.entries()).map(([code, title]) => ({ code, title })).sort((a, b) => a.title.localeCompare(b.title)),
        sdgs: Array.from(sdgs.entries()).map(([code, title]) => ({ code, title })).sort((a, b) => a.code.localeCompare(b.code))
      },
      standards: {
        health: Array.from(healthStandards).sort(),
        interop: Array.from(interopStandards).sort()
      },
      countries: Array.from(countries).sort()
    };
  }, [globalGoods]);
  
  // Filter and sort global goods - only process when filters change
  const filteredAndSortedGoods = useMemo(() => {
    if (!globalGoods.length) return [];

    let filtered = globalGoods.filter(good => {
      const matchesSearch = searchTerm === "" || 
        good.Name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (good.ProductOverview?.Summary || good.ProductOverview?.Description || '')
          .toLowerCase().includes(searchTerm.toLowerCase());
        
      const goodSectors = good.GlobalGoodsType?.map(type => type.title) || [];
      const matchesSector = sectorFilter === "all" || 
        goodSectors.includes(sectorFilter);

      const goodSDGs = good.Classifications?.SDGs?.map(sdg => sdg.code) || [];
      const matchesSDGs = selectedSDGs.length === 0 || 
        selectedSDGs.some(sdg => goodSDGs.includes(sdg));

      const goodWHOClassifications = good.Classifications?.WHO?.map(c => c.code) || [];
      const matchesWHO = selectedWHOClassifications.length === 0 ||
        selectedWHOClassifications.some(classification => goodWHOClassifications.includes(classification));

      const goodDPIClassifications = good.Classifications?.DPI?.map(c => c.code) || [];
      const matchesDPI = selectedDPIClassifications.length === 0 ||
        selectedDPIClassifications.some(classification => goodDPIClassifications.includes(classification));

      const goodWMOClassifications = good.Classifications?.WMO?.map(c => c.code) || [];
      const matchesWMO = selectedWMOClassifications.length === 0 ||
        selectedWMOClassifications.some(classification => goodWMOClassifications.includes(classification));

      const goodHealthStandards = good.StandardsAndInteroperability?.HealthStandards?.map(s => s.code) || [];
      const matchesHealthStandards = selectedHealthStandards.length === 0 ||
        selectedHealthStandards.some(standard => goodHealthStandards.includes(standard));

      const goodInteropStandards = good.StandardsAndInteroperability?.Interoperability?.map(s => s.code) || [];
      const matchesInteropStandards = selectedInteropStandards.length === 0 ||
        selectedInteropStandards.some(standard => goodInteropStandards.includes(standard));

      const goodCountries = good.Reach?.ImplementationCountries?.map(c => c.names.en.short) || [];
      const matchesCountries = selectedCountries.length === 0 ||
        selectedCountries.some(country => goodCountries.includes(country));

      const matchesClimateHealth = !climateHealthFilter || 
        good.ClimateHealth === true || 
        ['dhis2', 'geoprism', 'ewars'].includes(good.ID);
        
      return matchesSearch && matchesSector && matchesSDGs && matchesWHO && 
             matchesDPI && matchesWMO && matchesHealthStandards && 
             matchesInteropStandards && matchesCountries && matchesClimateHealth;
    });

    // Sort the filtered results
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'countries':
          const aCountries = a.Reach?.ImplementationCountries?.length || 0;
          const bCountries = b.Reach?.ImplementationCountries?.length || 0;
          return bCountries - aCountries;
        case 'maturity':
          const aMaturity = a.Maturity?.Scores?.[a.Maturity.Scores.length - 1];
          const bMaturity = b.Maturity?.Scores?.[b.Maturity.Scores.length - 1];
          const aAvg = aMaturity ? Math.round((aMaturity.global_utility + aMaturity.community_support + 
                     aMaturity.maturity_of_gg + aMaturity.inclusive_design + 
                     aMaturity.climate_resilience + aMaturity.low_carbon) / 6) : 0;
          const bAvg = bMaturity ? Math.round((bMaturity.global_utility + bMaturity.community_support + 
                     bMaturity.maturity_of_gg + bMaturity.inclusive_design + 
                     bMaturity.climate_resilience + bMaturity.low_carbon) / 6) : 0;
          return bAvg - aAvg;
        case 'recent':
          const aYear = a.Community?.InceptionYear || 0;
          const bYear = b.Community?.InceptionYear || 0;
          return bYear - aYear;
        case 'name':
        default:
          return a.Name.localeCompare(b.Name);
      }
    });

    return filtered;
  }, [globalGoods, searchTerm, sectorFilter, selectedSDGs, selectedCountries, 
      selectedWHOClassifications, selectedDPIClassifications, selectedWMOClassifications,
      selectedHealthStandards, selectedInteropStandards, sortBy, climateHealthFilter]);

  // Clear filters handler
  const handleClearAllFilters = () => {
    setSearchTerm("");
    setSectorFilter("all");
    setSelectedSDGs([]);
    setSelectedCountries([]);
    setSelectedWHOClassifications([]);
    setSelectedDPIClassifications([]);
    setSelectedWMOClassifications([]);
    setSelectedHealthStandards([]);
    setSelectedInteropStandards([]);
    setClimateHealthFilter(false);
  };

  if (error) {
    return <ErrorState onRetry={() => refetch()} />;
  }

  return (
    <>
      {/* Enhanced Filter Section */}
      <div className="sticky top-4 z-10 mb-8">
        <EnhancedFilterBar 
          sectors={sectors}
          searchTerm={searchTerm}
          sectorFilter={sectorFilter}
          sortBy={sortBy}
          viewMode={viewMode}
          selectedSDGs={selectedSDGs}
          selectedCountries={selectedCountries}
          selectedWHOClassifications={selectedWHOClassifications}
          selectedDPIClassifications={selectedDPIClassifications}
          selectedWMOClassifications={selectedWMOClassifications}
          selectedHealthStandards={selectedHealthStandards}
          selectedInteropStandards={selectedInteropStandards}
          climateHealthFilter={climateHealthFilter}
          setSearchTerm={setSearchTerm}
          setSectorFilter={setSectorFilter}
          setSortBy={setSortBy}
          setViewMode={setViewMode}
          setSelectedSDGs={setSelectedSDGs}
          setSelectedCountries={setSelectedCountries}
          setSelectedWHOClassifications={setSelectedWHOClassifications}
          setSelectedDPIClassifications={setSelectedDPIClassifications}
          setSelectedWMOClassifications={setSelectedWMOClassifications}
          setSelectedHealthStandards={setSelectedHealthStandards}
          setSelectedInteropStandards={setSelectedInteropStandards}
          setClimateHealthFilter={setClimateHealthFilter}
          onClearFilters={handleClearAllFilters}
          availableClassifications={availableFilterOptions.classifications}
          availableStandards={availableFilterOptions.standards}
          availableCountries={availableFilterOptions.countries}
        />
      </div>

      {/* Active Filters Display - Now integrated in filter bar */}

      {/* Results Summary */}
      <div className="bg-card rounded-lg border p-4 mb-6 shadow-sm">
        {isLoading ? (
          <Skeleton className="h-4 w-64" />
        ) : (
          <div className="flex items-center justify-between">
            <p className="text-muted-foreground">
              {tPage('showing', 'globalGoods', { 
                filtered: filteredAndSortedGoods.length, 
                total: globalGoods.length 
              })}
            </p>
            {climateHealthFilter && (
              <Badge variant="outline">Climate & Health Focus</Badge>
            )}
          </div>
        )}
      </div>
      
      {/* Content Display */}
      {isLoading ? (
        <CatalogSkeleton viewMode={viewMode} />
      ) : (
        <>
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredAndSortedGoods.map((good) => (
                <EnhancedGlobalGoodCard key={good.ID} good={good} />
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredAndSortedGoods.map((good) => (
                <EnhancedGlobalGoodListItem key={good.ID} good={good} />
              ))}
            </div>
          )}
          
          {/* No Results */}
          {filteredAndSortedGoods.length === 0 && (
            <div className="mt-12">
              <NoResults onClearFilters={handleClearAllFilters} />
            </div>
          )}
        </>
      )}
    </>
  );
}

export default function GlobalGoodsPageFlat() {
  const { tPage } = useI18n();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section - Renders immediately */}
        <div className="max-w-4xl mx-auto mb-12 text-center">
          <h1 className="mb-6">{tPage('catalogTitle', 'globalGoods')}</h1>
          <p className="text-xl text-muted-foreground">
            {tPage('catalogDescription', 'globalGoods')}
          </p>
        </div>
        
        {/* Progressive loading content */}
        <Suspense fallback={<LoadingState message={tPage('loadingCatalog', 'globalGoods')} />}>
          <CatalogContent />
        </Suspense>
      </div>
    </div>
  );
}
