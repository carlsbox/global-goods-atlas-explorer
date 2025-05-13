
import { useState } from "react";
import { GlobalGood } from "@/lib/types";
import { useGlobalGoods } from "@/lib/api";
import { FilterBar } from "@/components/global-goods/FilterBar";
import { GlobalGoodCard } from "@/components/global-goods/GlobalGoodCard";
import { NoResults } from "@/components/global-goods/NoResults";
import { useMultilingualText } from "@/lib/textUtils";

export default function GlobalGoodsPage() {
  const { data: globalGoods = [], isLoading, error } = useGlobalGoods();
  const [searchTerm, setSearchTerm] = useState("");
  const [sectorFilter, setSectorFilter] = useState("all");
  const { getText } = useMultilingualText();
  
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

  return (
    <>
      <div className="max-w-4xl mx-auto mb-12 text-center">
        <h1 className="mb-6">Global Goods Catalog</h1>
        <p className="text-xl text-muted-foreground">
          Browse our comprehensive collection of digital global goods making an impact across sectors and regions.
        </p>
      </div>
      
      <FilterBar 
        sectors={sectors}
        searchTerm={searchTerm}
        sectorFilter={sectorFilter}
        setSearchTerm={setSearchTerm}
        setSectorFilter={setSectorFilter}
      />

      {isLoading ? (
        <div className="text-center my-12">
          <p>Loading global goods catalog...</p>
        </div>
      ) : error ? (
        <div className="text-center my-12">
          <p className="text-destructive">Error loading catalog. Please try again later.</p>
        </div>
      ) : (
        <>
          <div className="mb-4">
            <p className="text-muted-foreground">
              Showing {filteredGoods.length} of {globalGoods.length} global goods
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
      )}
    </>
  );
}
