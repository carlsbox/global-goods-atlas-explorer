
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Search, Filter, X } from "lucide-react";
import { useI18n } from "@/hooks/useI18n";

interface FilterBarProps {
  sectors: string[];
  searchTerm: string;
  sectorFilter: string;
  setSearchTerm: (term: string) => void;
  setSectorFilter: (sector: string) => void;
}

export function FilterBar({
  sectors,
  searchTerm,
  sectorFilter,
  setSearchTerm,
  setSectorFilter
}: FilterBarProps) {
  const { tPage } = useI18n();
  
  const hasActiveFilters = searchTerm !== "" || sectorFilter !== "all";
  
  const handleClearFilters = () => {
    setSearchTerm("");
    setSectorFilter("all");
  };
  
  return (
    <div className="bg-card/95 backdrop-blur-sm shadow-lg rounded-xl border p-6">
      <div className="flex flex-col gap-4">
        {/* Search Bar - Full Width */}
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder={tPage("filters.searchPlaceholder", "globalGoods")}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9 h-11"
          />
          {searchTerm && (
            <Button
              variant="ghost"
              size="sm"
              className="absolute right-2 top-2 h-7 w-7 p-0"
              onClick={() => setSearchTerm("")}
            >
              <X className="h-3 w-3" />
            </Button>
          )}
        </div>
        
        {/* Filters Row */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1">
            <Select value={sectorFilter} onValueChange={setSectorFilter}>
              <SelectTrigger className="h-11">
                <SelectValue placeholder={tPage("filters.sectorLabel", "globalGoods")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{tPage("filters.allSectors", "globalGoods")}</SelectItem>
                {sectors.map(sector => (
                  <SelectItem key={sector} value={sector}>
                    {sector}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          {hasActiveFilters && (
            <Button 
              variant="outline" 
              onClick={handleClearFilters}
              className="h-11 px-4 flex items-center gap-2 shrink-0"
            >
              <Filter className="h-4 w-4" />
              {tPage("filters.clearFilters", "globalGoods")}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
