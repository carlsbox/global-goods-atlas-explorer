import { useState, useMemo, useRef, useEffect } from "react";
import { useProgressiveGlobalGoods, usePreloadGlobalGoods } from "@/lib/api/globalGoodsProgressive";
import { ProgressiveGlobalGoodCard } from "@/components/global-goods/ProgressiveGlobalGoodCard";
import { ProgressiveFilterBar } from "@/components/global-goods/ProgressiveFilterBar";
import { NoResults } from "@/components/global-goods/NoResults";
import { Skeleton } from "@/components/ui/skeleton";
import { SEO } from "@/components/SEO";
import { useI18n } from "@/hooks/useI18n";
import { cn } from "@/lib/utils";

// Virtual scrolling component
function VirtualGrid({ 
  items, 
  renderItem, 
  itemHeight = 300,
  gap = 24,
  columns = 3 
}: {
  items: any[];
  renderItem: (item: any, index: number) => React.ReactNode;
  itemHeight?: number;
  gap?: number;
  columns?: number;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [visibleRange, setVisibleRange] = useState({ start: 0, end: 20 });
  
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const viewportHeight = window.innerHeight;
      const containerTop = container.offsetTop;
      
      const rowHeight = itemHeight + gap;
      const startRow = Math.floor(Math.max(0, scrollTop - containerTop) / rowHeight);
      const endRow = Math.ceil((scrollTop - containerTop + viewportHeight * 1.5) / rowHeight);
      
      const start = startRow * columns;
      const end = Math.min(items.length, endRow * columns);
      
      setVisibleRange({ start, end });
    };
    
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [items.length, itemHeight, gap, columns]);
  
  const totalRows = Math.ceil(items.length / columns);
  const totalHeight = totalRows * (itemHeight + gap) - gap;
  
  return (
    <div 
      ref={containerRef}
      className="relative"
      style={{ height: totalHeight }}
    >
      {items.slice(visibleRange.start, visibleRange.end).map((item, index) => {
        const actualIndex = visibleRange.start + index;
        const row = Math.floor(actualIndex / columns);
        const col = actualIndex % columns;
        
        return (
          <div
            key={item.ID}
            className="absolute"
            style={{
              top: row * (itemHeight + gap),
              left: `${(col * 100) / columns}%`,
              width: `calc(${100 / columns}% - ${(gap * (columns - 1)) / columns}px)`,
              height: itemHeight,
            }}
          >
            {renderItem(item, actualIndex)}
          </div>
        );
      })}
    </div>
  );
}

function CatalogContent() {
  const { tPage } = useI18n();
  const { data, isLoading, isUpgrading, dataState } = useProgressiveGlobalGoods();
  
  // Preload all data tiers in background
  usePreloadGlobalGoods();
  
  // Filter states
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSector, setSelectedSector] = useState("all");
  const [sortBy, setSortBy] = useState("name");
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [climateHealthOnly, setClimateHealthOnly] = useState(false);
  const [selectedSDGs, setSelectedSDGs] = useState<string[]>([]);
  const [selectedStandards, setSelectedStandards] = useState<{ health: string[], interop: string[] }>({
    health: [],
    interop: []
  });
  
  // Filter and sort data
  const filteredAndSortedGoods = useMemo(() => {
    let filtered = [...data];
    
    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(good =>
        good.Name?.toLowerCase().includes(query) ||
        (good as any).Summary?.toLowerCase().includes(query) ||
        (good as any).ProductOverview?.toLowerCase().includes(query)
      );
    }
    
    // Sector filter
    if (selectedSector !== 'all') {
      filtered = filtered.filter(good => {
        if (!good.GlobalGoodsType) return false;
        if (Array.isArray(good.GlobalGoodsType)) {
          return good.GlobalGoodsType.some((type: any) => {
            const name = typeof type === 'object' ? type.name : type;
            return name === selectedSector;
          });
        }
        const name = typeof good.GlobalGoodsType === 'object' ? (good.GlobalGoodsType as any).name : good.GlobalGoodsType;
        return name === selectedSector;
      });
    }
    
    // Climate Health filter
    if (climateHealthOnly) {
      filtered = filtered.filter(good => good.ClimateHealth);
    }
    
    // SDG filter (only available with summary data or higher)
    if (selectedSDGs.length > 0 && dataState !== 'minimal') {
      filtered = filtered.filter(good =>
        good.Classifications?.SDGs?.some((sdg: any) => {
          const id = typeof sdg === 'object' ? sdg.id : sdg;
          return selectedSDGs.includes(id);
        })
      );
    }
    
    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return (a.Name || '').localeCompare(b.Name || '');
        case 'countries':
          // Handle different data shapes - CountryCount in minimal/summary, Reach.Countries in full
          const aCount = (a as any).CountryCount ?? (a as any).Reach?.Countries?.length ?? 0;
          const bCount = (b as any).CountryCount ?? (b as any).Reach?.Countries?.length ?? 0;
          return bCount - aCount;
        case 'maturity':
          if (dataState === 'minimal') return 0;
          return ((b as any).Maturity?.OverallScore || 0) - ((a as any).Maturity?.OverallScore || 0);
        case 'year':
          if (dataState === 'minimal') return 0;
          return ((b as any).InceptionYear || 0) - ((a as any).InceptionYear || 0);
        default:
          return 0;
      }
    });
    
    return filtered;
  }, [data, searchQuery, selectedSector, sortBy, climateHealthOnly, selectedSDGs, selectedStandards, dataState]);
  
  const handleClearFilters = () => {
    setSearchQuery("");
    setSelectedSector("all");
    setClimateHealthOnly(false);
    setSelectedSDGs([]);
    setSelectedStandards({ health: [], interop: [] });
    setSortBy("name");
  };
  
  // Loading skeleton
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-4 mb-8">
          <Skeleton className="h-10 w-full max-w-md" />
          <div className="flex gap-4">
            <Skeleton className="h-10 w-[200px]" />
            <Skeleton className="h-10 w-[150px]" />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-[250px] rounded-lg" />
          ))}
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Progressive Loading Indicator */}
      {isUpgrading && (
        <div className="mb-4 p-2 bg-primary/5 border border-primary/20 rounded-lg">
          <div className="flex items-center gap-2">
            <div className="animate-pulse h-2 w-2 bg-primary rounded-full" />
            <span className="text-sm text-muted-foreground">
              Loading enhanced features... (Stage: {dataState})
            </span>
          </div>
        </div>
      )}
      
      {/* Filter Bar */}
      <ProgressiveFilterBar
        minimalData={dataState === 'minimal' ? data : []}
        summaryData={dataState === 'summary' ? data : []}
        resolvedData={dataState === 'resolved' ? data : []}
        dataState={dataState}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedSector={selectedSector}
        setSelectedSector={setSelectedSector}
        sortBy={sortBy}
        setSortBy={setSortBy}
        viewMode={viewMode}
        setViewMode={setViewMode}
        climateHealthOnly={climateHealthOnly}
        setClimateHealthOnly={setClimateHealthOnly}
        selectedSDGs={selectedSDGs}
        setSelectedSDGs={setSelectedSDGs}
        selectedStandards={selectedStandards}
        setSelectedStandards={setSelectedStandards}
        onClearFilters={handleClearFilters}
      />
      
      {/* Results Summary */}
      <div className="my-6">
        <p className="text-muted-foreground">
          {tPage("showing", "globalGoods", { 
            filtered: filteredAndSortedGoods.length, 
            total: data.length 
          })}
        </p>
      </div>
      
      {/* Results Grid with Virtual Scrolling */}
      {filteredAndSortedGoods.length > 0 ? (
        viewMode === 'grid' ? (
          <VirtualGrid
            items={filteredAndSortedGoods}
            columns={window.innerWidth >= 1280 ? 3 : window.innerWidth >= 768 ? 2 : 1}
            itemHeight={280}
            gap={24}
            renderItem={(good) => (
              <ProgressiveGlobalGoodCard 
                good={good} 
                isUpgrading={isUpgrading && dataState === 'minimal'}
                className="h-full"
              />
            )}
          />
        ) : (
          <div className="space-y-4">
            {filteredAndSortedGoods.slice(0, 50).map(good => (
              <ProgressiveGlobalGoodCard 
                key={good.ID} 
                good={good}
                isUpgrading={isUpgrading && dataState === 'minimal'}
              />
            ))}
          </div>
        )
      ) : (
        <NoResults onClearFilters={handleClearFilters} />
      )}
    </div>
  );
}

export default function GlobalGoodsPageProgressive() {
  const { tPage } = useI18n();
  
  return (
    <>
      <SEO
        title={tPage("catalogTitle", "globalGoods")}
        description={tPage("catalogDescription", "globalGoods")}
      />
      
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 pt-8 pb-4">
          <h1 className="text-4xl font-bold text-foreground mb-2">
            {tPage("catalogTitle", "globalGoods")}
          </h1>
          <p className="text-lg text-muted-foreground">
            {tPage("catalogDescription", "globalGoods")}
          </p>
        </div>
        
        <CatalogContent />
      </div>
    </>
  );
}