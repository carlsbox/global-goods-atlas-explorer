
import { useState } from "react";
import { GlobalGoodFlat } from "@/lib/types/globalGoodFlat";
import { useGlobalGoodsFlat } from "@/lib/api/globalGoodsFlat";
import { FilterBar } from "@/components/global-goods/FilterBar";
import { GlobalGoodCardFlat } from "@/components/global-goods/GlobalGoodCardFlat";
import { NoResults } from "@/components/global-goods/NoResults";
import { useI18n } from "@/hooks/useI18n";
import { LoadingState } from "@/components/global-good/LoadingState";
import { ErrorState } from "@/components/global-good/ErrorState";

export default function GlobalGoodsPageFlat() {
  const { data: globalGoods = [], isLoading, error, refetch } = useGlobalGoodsFlat();
  const [searchTerm, setSearchTerm] = useState("");
  const [sectorFilter, setSectorFilter] = useState("all");
  const { tPage } = useI18n();
  
  // Extract unique sectors for filter
  const sectors = Array.from(
    new Set(globalGoods.flatMap(good => 
      good.GlobalGoodsType?.map(type => type.title) || []
    ))
  ).sort();
  
  // Filter global goods
  const filteredGoods = globalGoods.filter(good => {
    const matchesSearch = searchTerm === "" || 
      good.Name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (good.ProductOverview?.Summary || good.ProductOverview?.Description || '')
        .toLowerCase().includes(searchTerm.toLowerCase());
      
    const goodSectors = good.GlobalGoodsType?.map(type => type.title) || [];
    const matchesSector = sectorFilter === "all" || 
      goodSectors.includes(sectorFilter);
      
    return matchesSearch && matchesSector;
  });

  // Clear filters handler
  const handleClearFilters = () => {
    setSearchTerm("");
    setSectorFilter("all");
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
        
        {/* Sticky Filter Section */}
        <div className="sticky top-4 z-10 mb-8">
          <FilterBar 
            sectors={sectors}
            searchTerm={searchTerm}
            sectorFilter={sectorFilter}
            setSearchTerm={setSearchTerm}
            setSectorFilter={setSectorFilter}
          />
        </div>

        {/* Results Summary */}
        <div className="bg-card rounded-lg border p-4 mb-6 shadow-sm">
          <p className="text-muted-foreground">
            {tPage('showing', 'globalGoods', { 
              filtered: filteredGoods.length, 
              total: globalGoods.length 
            })}
          </p>
        </div>
        
        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredGoods.map((good) => (
            <GlobalGoodCardFlat key={good.ID} good={good} />
          ))}
        </div>
        
        {/* No Results */}
        {filteredGoods.length === 0 && (
          <div className="mt-12">
            <NoResults onClearFilters={handleClearFilters} />
          </div>
        )}
      </div>
    </div>
  );
}
