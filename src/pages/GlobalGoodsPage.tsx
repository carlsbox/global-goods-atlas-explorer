
import { useState } from "react";
import { GlobalGood } from "@/lib/types";
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
  const { getText, t } = useI18n();
  
  // Extract unique sectors for filter
  const sectors = Array.from(
    new Set(globalGoods.flatMap(good => good.sector || []))
  ).sort();
  
  // Filter global goods
  const filteredGoods = globalGoods.filter(good => {
    const goodName = getText(good.name);
    const goodDescription = getText(good.description);
    
    const matchesSearch = searchTerm === "" || 
      goodName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      goodDescription.toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesSector = sectorFilter === "all" || 
      (good.sector && good.sector.includes(sectorFilter));
      
    return matchesSearch && matchesSector;
  });

  // Clear filters handler
  const handleClearFilters = () => {
    setSearchTerm("");
    setSectorFilter("all");
  };

  if (isLoading) {
    return <LoadingState message={t('globalGoods.loadingCatalog')} />;
  }

  if (error) {
    return <ErrorState onRetry={() => refetch()} />;
  }

  return (
    <>
      <div className="max-w-4xl mx-auto mb-12 text-center">
        <h1 className="mb-6">{t('globalGoods.catalogTitle')}</h1>
        <p className="text-xl text-muted-foreground">
          {t('globalGoods.catalogDescription')}
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
          {t('globalGoods.showing', { 
            filtered: filteredGoods.length, 
            total: globalGoods.length 
          })}
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredGoods.map((good) => (
          <GlobalGoodCard key={good.id} good={good} />
        ))}
      </div>
      
      {filteredGoods.length === 0 && (
        <NoResults onClearFilters={handleClearFilters} />
      )}
    </>
  );
}
