
import { useState } from "react";
import { GlobalGoodFlat } from "@/lib/types/globalGoodFlat";
import { useGlobalGoods } from "@/lib/api";
import { FilterBar } from "@/components/global-goods/FilterBar";
import { GlobalGoodCard } from "@/components/global-goods/GlobalGoodCard";
import { NoResults } from "@/components/global-goods/NoResults";
import { useI18n } from "@/hooks/useI18n";
import { LoadingState } from "@/components/global-good/LoadingState";
import { ErrorState } from "@/components/global-good/ErrorState";

export default function GlobalGoodsPage() {
  const { data: globalGoods = [], isLoading, error, refetch } = useGlobalGoods();
  const [searchTerm, setSearchTerm] = useState("");
  const [sectorFilter, setSectorFilter] = useState("all");
  const { getText, tPage } = useI18n();
  
  // Extract unique sectors for filter from GlobalGoodsType
  const sectors = Array.from(
    new Set(globalGoods.flatMap(good => 
      good.GlobalGoodsType?.map(type => type.code || type.title || type) || []
    ))
  ).sort();
  
  // Filter global goods
  const filteredGoods = globalGoods.filter(good => {
    const goodName = good.Name || '';
    const goodDescription = good.ProductOverview?.Summary || good.ProductOverview?.Description || '';
    
    const matchesSearch = searchTerm === "" || 
      goodName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      goodDescription.toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesSector = sectorFilter === "all" || 
      (good.GlobalGoodsType && good.GlobalGoodsType.some(type => 
        (type.code || type.title || type) === sectorFilter
      ));
      
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
    <>
      <div className="max-w-4xl mx-auto mb-12 text-center">
        <h1 className="mb-6">{tPage('catalogTitle', 'globalGoods')}</h1>
        <p className="text-xl text-muted-foreground">
          {tPage('catalogDescription', 'globalGoods')}
        </p>
      </div>
      
      <FilterBar 
        sectors={sectors}
        searchTerm={searchTerm}
        sectorFilter={sectorFilter}
        setSearchTerm={setSearchTerm}
        setSectorFilter={setSectorFilter}
      />

      <div className="mb-4">
        <p className="text-muted-foreground">
          {tPage('showing', 'globalGoods', { 
            filtered: filteredGoods.length, 
            total: globalGoods.length 
          })}
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredGoods.map((good) => (
          <GlobalGoodCard key={good.ID} good={good} />
        ))}
      </div>
      
      {filteredGoods.length === 0 && (
        <NoResults onClearFilters={handleClearFilters} />
      )}
    </>
  );
}
