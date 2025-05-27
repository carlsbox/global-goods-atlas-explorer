
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
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Search, Filter, X, Grid3X3, List, Sliders } from "lucide-react";
import { useI18n } from "@/hooks/useI18n";

interface EnhancedFilterBarProps {
  sectors: string[];
  searchTerm: string;
  sectorFilter: string;
  sortBy: string;
  viewMode: 'grid' | 'list';
  selectedSDGs: string[];
  selectedCountries: string[];
  minMaturityScore: number;
  setSearchTerm: (term: string) => void;
  setSectorFilter: (sector: string) => void;
  setSortBy: (sort: string) => void;
  setViewMode: (mode: 'grid' | 'list') => void;
  setSelectedSDGs: (sdgs: string[]) => void;
  setSelectedCountries: (countries: string[]) => void;
  setMinMaturityScore: (score: number) => void;
  onClearFilters: () => void;
}

const SORT_OPTIONS = [
  { value: 'name', label: 'Name A-Z' },
  { value: 'countries', label: 'Most Countries' },
  { value: 'maturity', label: 'Highest Maturity' },
  { value: 'recent', label: 'Recently Updated' }
];

const SDG_OPTIONS = [
  'SDG-1', 'SDG-2', 'SDG-3', 'SDG-4', 'SDG-5', 'SDG-6', 'SDG-7', 'SDG-8', 
  'SDG-9', 'SDG-10', 'SDG-11', 'SDG-12', 'SDG-13', 'SDG-14', 'SDG-15', 'SDG-16', 'SDG-17'
];

export function EnhancedFilterBar({
  sectors,
  searchTerm,
  sectorFilter,
  sortBy,
  viewMode,
  selectedSDGs,
  selectedCountries,
  minMaturityScore,
  setSearchTerm,
  setSectorFilter,
  setSortBy,
  setViewMode,
  setSelectedSDGs,
  setSelectedCountries,
  setMinMaturityScore,
  onClearFilters
}: EnhancedFilterBarProps) {
  const { tPage } = useI18n();
  
  const hasActiveFilters = searchTerm !== "" || sectorFilter !== "all" || 
                          selectedSDGs.length > 0 || selectedCountries.length > 0 ||
                          minMaturityScore > 0;

  const handleSDGChange = (sdg: string, checked: boolean) => {
    if (checked) {
      setSelectedSDGs([...selectedSDGs, sdg]);
    } else {
      setSelectedSDGs(selectedSDGs.filter(s => s !== sdg));
    }
  };

  const removeFilter = (type: string, value?: string) => {
    switch (type) {
      case 'search':
        setSearchTerm('');
        break;
      case 'sector':
        setSectorFilter('all');
        break;
      case 'sdg':
        if (value) setSelectedSDGs(selectedSDGs.filter(s => s !== value));
        break;
      case 'maturity':
        setMinMaturityScore(0);
        break;
    }
  };

  return (
    <div className="bg-card/95 backdrop-blur-sm shadow-lg rounded-xl border p-6 space-y-4">
      {/* Top Row: Search and View Controls */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
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
        
        {/* View Mode Toggle */}
        <div className="flex bg-muted rounded-lg p-1">
          <Button
            variant={viewMode === 'grid' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setViewMode('grid')}
            className="h-9"
          >
            <Grid3X3 className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === 'list' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setViewMode('list')}
            className="h-9"
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Filter Row */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Select value={sectorFilter} onValueChange={setSectorFilter}>
          <SelectTrigger className="h-11 sm:w-48">
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

        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="h-11 sm:w-48">
            <SelectValue placeholder="Sort by..." />
          </SelectTrigger>
          <SelectContent>
            {SORT_OPTIONS.map(option => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Advanced Filters */}
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="h-11">
              <Sliders className="h-4 w-4 mr-2" />
              More Filters
              {(selectedSDGs.length > 0 || minMaturityScore > 0) && (
                <Badge variant="secondary" className="ml-2 text-xs">
                  {selectedSDGs.length + (minMaturityScore > 0 ? 1 : 0)}
                </Badge>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80" align="start">
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">SDGs</h4>
                <div className="grid grid-cols-3 gap-2 max-h-32 overflow-y-auto">
                  {SDG_OPTIONS.map(sdg => (
                    <div key={sdg} className="flex items-center space-x-2">
                      <Checkbox
                        id={sdg}
                        checked={selectedSDGs.includes(sdg)}
                        onCheckedChange={(checked) => handleSDGChange(sdg, checked as boolean)}
                      />
                      <label htmlFor={sdg} className="text-xs cursor-pointer">
                        {sdg.replace('SDG-', '')}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">Minimum Maturity Score</h4>
                <Select 
                  value={minMaturityScore.toString()} 
                  onValueChange={(value) => setMinMaturityScore(Number(value))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Any score" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">Any score</SelectItem>
                    <SelectItem value="5">5+ (Above average)</SelectItem>
                    <SelectItem value="7">7+ (High quality)</SelectItem>
                    <SelectItem value="8">8+ (Excellent)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </PopoverContent>
        </Popover>

        {hasActiveFilters && (
          <Button 
            variant="outline" 
            onClick={onClearFilters}
            className="h-11 px-4 flex items-center gap-2 shrink-0"
          >
            <Filter className="h-4 w-4" />
            Clear All
          </Button>
        )}
      </div>

      {/* Active Filter Chips */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2">
          {searchTerm && (
            <Badge variant="secondary" className="flex items-center gap-1">
              Search: "{searchTerm}"
              <X 
                className="h-3 w-3 cursor-pointer" 
                onClick={() => removeFilter('search')}
              />
            </Badge>
          )}
          {sectorFilter !== "all" && (
            <Badge variant="secondary" className="flex items-center gap-1">
              {sectorFilter}
              <X 
                className="h-3 w-3 cursor-pointer" 
                onClick={() => removeFilter('sector')}
              />
            </Badge>
          )}
          {selectedSDGs.map(sdg => (
            <Badge key={sdg} variant="secondary" className="flex items-center gap-1">
              {sdg}
              <X 
                className="h-3 w-3 cursor-pointer" 
                onClick={() => removeFilter('sdg', sdg)}
              />
            </Badge>
          ))}
          {minMaturityScore > 0 && (
            <Badge variant="secondary" className="flex items-center gap-1">
              Maturity: {minMaturityScore}+
              <X 
                className="h-3 w-3 cursor-pointer" 
                onClick={() => removeFilter('maturity')}
              />
            </Badge>
          )}
        </div>
      )}
    </div>
  );
}
