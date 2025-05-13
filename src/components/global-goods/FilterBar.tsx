
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
import { Search, Filter } from "lucide-react";
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
  
  return (
    <div className="bg-card shadow-sm rounded-lg p-4 mb-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder={tPage("filters.searchPlaceholder", "globalGoods")}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>
        
        <Select value={sectorFilter} onValueChange={setSectorFilter}>
          <SelectTrigger>
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
        
        <Button 
          variant="outline" 
          onClick={() => {
            setSearchTerm("");
            setSectorFilter("all");
          }}
          className="flex items-center"
        >
          <Filter className="mr-2 h-4 w-4" />
          {tPage("filters.clearFilters", "globalGoods")}
        </Button>
      </div>
    </div>
  );
}
