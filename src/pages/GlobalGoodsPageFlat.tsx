
import { useState, useMemo } from "react";
import { GlobalGoodFlat } from "@/lib/types/globalGoodFlat";
import { useGlobalGoodsFlat } from "@/lib/api/globalGoodsFlat";
import { EnhancedFilterBar } from "@/components/global-goods/EnhancedFilterBar";
import { EnhancedGlobalGoodCard } from "@/components/global-goods/EnhancedGlobalGoodCard";
import { GlobalGoodListItem } from "@/components/global-goods/GlobalGoodListItem";
import { NoResults } from "@/components/global-goods/NoResults";
import { useI18n } from "@/hooks/useI18n";
import { LoadingState } from "@/components/global-good/LoadingState";
import { ErrorState } from "@/components/global-good/ErrorState";

export default function GlobalGoodsPageFlat() {
  const { data: globalGoods = [], isLoading, error, refetch } = useGlobalGoodsFlat();
  const [searchTerm, setSearchTerm] = useState("");
  const [sectorFilter, setSectorFilter] = useState("all");
  const [sortBy, setSortBy] = useState("name");
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedSDGs, setSelectedSDGs] = useState<string[]>([]);
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
  const [minMaturityScore, setMinMaturityScore] = useState(0);
  const { tPage } = useI18n();
  
  // Extract unique sectors for filter
  const sectors = Array.from(
    new Set(globalGoods.flatMap(good => 
      good.GlobalGoodsType?.map(type => type.title) || []
    ))
  ).sort();
  
  // Filter and sort global goods
  const filteredAndSortedGoods = useMemo(() => {
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

      const latestMaturity = good.Maturity?.Scores?.[good.Maturity.Scores.length - 1];
      const avgMaturityScore = latestMaturity ? 
        Math.round((latestMaturity.global_utility + latestMaturity.community_support + 
                   latestMaturity.maturity_of_gg + latestMaturity.inclusive_design + 
                   latestMaturity.climate_resilience + latestMaturity.low_carbon) / 6) : 0;
      const matchesMaturity = avgMaturityScore >= minMaturityScore;
        
      return matchesSearch && matchesSector && matchesSDGs && matchesMaturity;
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
  }, [globalGoods, searchTerm, sectorFilter, selectedSDGs, minMaturityScore, sortBy]);

  // Clear filters handler
  const handleClearAllFilters = () => {
    setSearchTerm("");
    setSectorFilter("all");
    setSelectedSDGs([]);
    setSelectedCountries([]);
    setMinMaturityScore(0);
  };

  if (isLoading) {
    return <LoadingState message={tPage('loadingCatalog', 'globalGoods')} />;
  }

  if (error) {
    return <ErrorState onRetry={() => refetch()} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="max-w-4xl mx-auto mb-12 text-center">
          <h1 className="mb-6">{tPage('catalogTitle', 'globalGoods')}</h1>
          <p className="text-xl text-muted-foreground">
            {tPage('catalogDescription', 'globalGoods')}
          </p>
        </div>
        
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
            minMaturityScore={minMaturityScore}
            setSearchTerm={setSearchTerm}
            setSectorFilter={setSectorFilter}
            setSortBy={setSortBy}
            setViewMode={setViewMode}
            setSelectedSDGs={setSelectedSDGs}
            setSelectedCountries={setSelectedCountries}
            setMinMaturityScore={setMinMaturityScore}
            onClearFilters={handleClearAllFilters}
          />
        </div>

        {/* Results Summary */}
        <div className="bg-card rounded-lg border p-4 mb-6 shadow-sm">
          <p className="text-muted-foreground">
            {tPage('showing', 'globalGoods', { 
              filtered: filteredAndSortedGoods.length, 
              total: globalGoods.length 
            })}
          </p>
        </div>
        
        {/* Content Display */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredAndSortedGoods.map((good) => (
              <EnhancedGlobalGoodCard key={good.ID} good={good} />
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredAndSortedGoods.map((good) => (
              <GlobalGoodListItem key={good.ID} good={good} />
            ))}
          </div>
        )}
        
        {/* No Results */}
        {filteredAndSortedGoods.length === 0 && (
          <div className="mt-12">
            <NoResults onClearFilters={handleClearAllFilters} />
          </div>
        )}
      </div>
    </div>
  );
}
