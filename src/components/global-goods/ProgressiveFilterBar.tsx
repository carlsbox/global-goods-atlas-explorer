import { useState, useEffect, useMemo } from "react";
import { Search, Filter, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { useI18n } from "@/hooks/useI18n";
import { cn } from "@/lib/utils";

interface ProgressiveFilterBarProps {
  // Data at different loading stages
  minimalData?: any[];
  summaryData?: any[];
  resolvedData?: any[];
  dataState: 'minimal' | 'summary' | 'resolved';
  
  // Filter states
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedSector: string;
  setSelectedSector: (sector: string) => void;
  sortBy: string;
  setSortBy: (sort: string) => void;
  viewMode?: 'grid' | 'list';
  setViewMode?: (mode: 'grid' | 'list') => void;
  climateHealthOnly?: boolean;
  setClimateHealthOnly?: (value: boolean) => void;
  
  // Advanced filters (populated progressively)
  selectedSDGs?: string[];
  setSelectedSDGs?: (sdgs: string[]) => void;
  selectedStandards?: { health: string[], interop: string[] };
  setSelectedStandards?: (standards: { health: string[], interop: string[] }) => void;
  
  onClearFilters: () => void;
}

export function ProgressiveFilterBar({
  minimalData = [],
  summaryData = [],
  resolvedData = [],
  dataState,
  searchQuery,
  setSearchQuery,
  selectedSector,
  setSelectedSector,
  sortBy,
  setSortBy,
  viewMode = 'grid',
  setViewMode,
  climateHealthOnly = false,
  setClimateHealthOnly,
  selectedSDGs = [],
  setSelectedSDGs,
  selectedStandards = { health: [], interop: [] },
  setSelectedStandards,
  onClearFilters
}: ProgressiveFilterBarProps) {
  const { tPage } = useI18n();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  // Progressive filter options based on data availability
  const sectors = useMemo(() => {
    const data = resolvedData.length > 0 ? resolvedData : summaryData.length > 0 ? summaryData : minimalData;
    const sectorSet = new Set<string>();
    
    data.forEach(item => {
      if (item.GlobalGoodsType) {
        if (Array.isArray(item.GlobalGoodsType)) {
          item.GlobalGoodsType.forEach((type: any) => {
            const name = typeof type === 'object' ? type.name : type;
            if (name) sectorSet.add(name);
          });
        } else {
          const name = typeof item.GlobalGoodsType === 'object' ? item.GlobalGoodsType.name : item.GlobalGoodsType;
          if (name) sectorSet.add(name);
        }
      }
    });
    
    return Array.from(sectorSet).sort();
  }, [minimalData, summaryData, resolvedData]);
  
  // SDGs available only with summary data or higher
  const availableSDGs = useMemo(() => {
    if (dataState === 'minimal') return [];
    
    const data = resolvedData.length > 0 ? resolvedData : summaryData;
    const sdgSet = new Set<string>();
    
    data.forEach(item => {
      if (item.Classifications?.SDGs) {
        item.Classifications.SDGs.forEach((sdg: any) => {
          const id = typeof sdg === 'object' ? sdg.id : sdg;
          if (id) sdgSet.add(id);
        });
      }
    });
    
    return Array.from(sdgSet).sort();
  }, [summaryData, resolvedData, dataState]);
  
  const hasActiveFilters = searchQuery || selectedSector !== 'all' || climateHealthOnly || 
    selectedSDGs.length > 0 || selectedStandards.health.length > 0 || selectedStandards.interop.length > 0;
  
  return (
    <div className="space-y-4">
      {/* Main Filter Bar */}
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            type="text"
            placeholder={tPage("filters.searchPlaceholder", "globalGoods")}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-background"
          />
        </div>
        
        {/* Sector Filter */}
        <Select value={selectedSector} onValueChange={setSelectedSector}>
          <SelectTrigger className="w-full lg:w-[200px]">
            <SelectValue placeholder={tPage("filters.sectorLabel", "globalGoods")} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{tPage("filters.allSectors", "globalGoods")}</SelectItem>
            {sectors.length > 0 ? (
              sectors.map(sector => (
                <SelectItem key={sector} value={sector}>{sector}</SelectItem>
              ))
            ) : (
              <SelectItem value="loading" disabled>
                <Skeleton className="h-4 w-24" />
              </SelectItem>
            )}
          </SelectContent>
        </Select>
        
        {/* Sort */}
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-full lg:w-[150px]">
            <SelectValue placeholder={tPage("filters.sortLabel", "globalGoods")} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="name">Name</SelectItem>
            <SelectItem value="countries">Countries</SelectItem>
            {dataState !== 'minimal' && (
              <>
                <SelectItem value="maturity">Maturity</SelectItem>
                <SelectItem value="year">Inception Year</SelectItem>
              </>
            )}
          </SelectContent>
        </Select>
        
        {/* Advanced Filters Button */}
        {dataState !== 'minimal' && (
          <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" className="gap-2">
                <Filter className="h-4 w-4" />
                Advanced
                {(selectedSDGs.length > 0 || selectedStandards.health.length > 0 || selectedStandards.interop.length > 0) && (
                  <Badge variant="secondary" className="ml-1">
                    {selectedSDGs.length + selectedStandards.health.length + selectedStandards.interop.length}
                  </Badge>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Advanced Filters</SheetTitle>
                <SheetDescription>
                  Filter global goods by specific criteria
                </SheetDescription>
              </SheetHeader>
              
              <div className="mt-6 space-y-6">
                {/* SDGs Filter */}
                {availableSDGs.length > 0 && (
                  <div>
                    <Label className="text-sm font-medium mb-2">SDGs</Label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {availableSDGs.slice(0, 10).map(sdg => (
                        <Badge
                          key={sdg}
                          variant={selectedSDGs.includes(sdg) ? "default" : "outline"}
                          className="cursor-pointer"
                          onClick={() => {
                            if (setSelectedSDGs) {
                              setSelectedSDGs(
                                selectedSDGs.includes(sdg)
                                  ? selectedSDGs.filter(s => s !== sdg)
                                  : [...selectedSDGs, sdg]
                              );
                            }
                          }}
                        >
                          {sdg}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Climate Health Toggle */}
                <div className="flex items-center space-x-2">
                  <Switch
                    id="climate-health"
                    checked={climateHealthOnly}
                    onCheckedChange={setClimateHealthOnly}
                  />
                  <Label htmlFor="climate-health">
                    {tPage("filters.climateHealth", "globalGoods")}
                  </Label>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        )}
      </div>
      
      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-sm text-muted-foreground">Active filters:</span>
          
          {searchQuery && (
            <Badge variant="secondary" className="gap-1">
              Search: {searchQuery}
              <X 
                className="h-3 w-3 cursor-pointer" 
                onClick={() => setSearchQuery('')}
              />
            </Badge>
          )}
          
          {selectedSector !== 'all' && (
            <Badge variant="secondary" className="gap-1">
              Type: {selectedSector}
              <X 
                className="h-3 w-3 cursor-pointer" 
                onClick={() => setSelectedSector('all')}
              />
            </Badge>
          )}
          
          {climateHealthOnly && (
            <Badge variant="secondary" className="gap-1">
              Climate & Health
              <X 
                className="h-3 w-3 cursor-pointer" 
                onClick={() => setClimateHealthOnly?.(false)}
              />
            </Badge>
          )}
          
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearFilters}
            className="text-xs"
          >
            Clear all
          </Button>
        </div>
      )}
    </div>
  );
}