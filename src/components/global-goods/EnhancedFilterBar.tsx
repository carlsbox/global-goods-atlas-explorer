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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
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
  selectedWHOClassifications: string[];
  selectedDPIClassifications: string[];
  selectedWMOClassifications: string[];
  selectedHealthStandards: string[];
  selectedInteropStandards: string[];
  setSearchTerm: (term: string) => void;
  setSectorFilter: (sector: string) => void;
  setSortBy: (sort: string) => void;
  setViewMode: (mode: 'grid' | 'list') => void;
  setSelectedSDGs: (sdgs: string[]) => void;
  setSelectedCountries: (countries: string[]) => void;
  setSelectedWHOClassifications: (classifications: string[]) => void;
  setSelectedDPIClassifications: (classifications: string[]) => void;
  setSelectedWMOClassifications: (classifications: string[]) => void;
  setSelectedHealthStandards: (standards: string[]) => void;
  setSelectedInteropStandards: (standards: string[]) => void;
  onClearFilters: () => void;
  availableClassifications: {
    who: Array<{ code: string; title: string }>;
    dpi: Array<{ code: string; title: string }>;
    wmo: Array<{ code: string; title: string }>;
    sdgs: Array<{ code: string; title: string }>;
  };
  availableStandards: {
    health: string[];
    interop: string[];
  };
  availableCountries: string[];
}

const SORT_OPTIONS = [
  { value: 'name', label: 'Name A-Z' },
  { value: 'countries', label: 'Most Countries' },
  { value: 'maturity', label: 'Highest Maturity' },
  { value: 'recent', label: 'Recently Updated' }
];

export function EnhancedFilterBar({
  sectors,
  searchTerm,
  sectorFilter,
  sortBy,
  viewMode,
  selectedSDGs,
  selectedCountries,
  selectedWHOClassifications,
  selectedDPIClassifications,
  selectedWMOClassifications,
  selectedHealthStandards,
  selectedInteropStandards,
  setSearchTerm,
  setSectorFilter,
  setSortBy,
  setViewMode,
  setSelectedSDGs,
  setSelectedCountries,
  setSelectedWHOClassifications,
  setSelectedDPIClassifications,
  setSelectedWMOClassifications,
  setSelectedHealthStandards,
  setSelectedInteropStandards,
  onClearFilters,
  availableClassifications,
  availableStandards,
  availableCountries
}: EnhancedFilterBarProps) {
  const { tPage } = useI18n();
  const [searchWHO, setSearchWHO] = useState("");
  const [searchDPI, setSearchDPI] = useState("");
  const [searchWMO, setSearchWMO] = useState("");
  const [searchSDGs, setSearchSDGs] = useState("");
  const [searchCountries, setSearchCountries] = useState("");
  const [searchHealthStandards, setSearchHealthStandards] = useState("");
  const [searchInteropStandards, setSearchInteropStandards] = useState("");
  
  const hasActiveFilters = searchTerm !== "" || sectorFilter !== "all" || 
                          selectedSDGs.length > 0 || selectedCountries.length > 0 ||
                          selectedWHOClassifications.length > 0 || selectedDPIClassifications.length > 0 ||
                          selectedWMOClassifications.length > 0 || selectedHealthStandards.length > 0 ||
                          selectedInteropStandards.length > 0;

  const totalAdvancedFilters = selectedSDGs.length + selectedCountries.length + 
                              selectedWHOClassifications.length + selectedDPIClassifications.length +
                              selectedWMOClassifications.length + selectedHealthStandards.length +
                              selectedInteropStandards.length;

  const handleSDGChange = (sdg: string, checked: boolean) => {
    if (checked) {
      setSelectedSDGs([...selectedSDGs, sdg]);
    } else {
      setSelectedSDGs(selectedSDGs.filter(s => s !== sdg));
    }
  };

  const handleClassificationChange = (classification: string, checked: boolean, type: 'who' | 'dpi' | 'wmo') => {
    const setters = {
      who: setSelectedWHOClassifications,
      dpi: setSelectedDPIClassifications,
      wmo: setSelectedWMOClassifications
    };
    const current = {
      who: selectedWHOClassifications,
      dpi: selectedDPIClassifications,
      wmo: selectedWMOClassifications
    };
    
    if (checked) {
      setters[type]([...current[type], classification]);
    } else {
      setters[type](current[type].filter(c => c !== classification));
    }
  };

  const handleStandardChange = (standard: string, checked: boolean, type: 'health' | 'interop') => {
    const setters = {
      health: setSelectedHealthStandards,
      interop: setSelectedInteropStandards
    };
    const current = {
      health: selectedHealthStandards,
      interop: selectedInteropStandards
    };
    
    if (checked) {
      setters[type]([...current[type], standard]);
    } else {
      setters[type](current[type].filter(s => s !== standard));
    }
  };

  const handleCountryChange = (country: string, checked: boolean) => {
    if (checked) {
      setSelectedCountries([...selectedCountries, country]);
    } else {
      setSelectedCountries(selectedCountries.filter(c => c !== country));
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
      case 'country':
        if (value) setSelectedCountries(selectedCountries.filter(c => c !== value));
        break;
      case 'who':
        if (value) setSelectedWHOClassifications(selectedWHOClassifications.filter(c => c !== value));
        break;
      case 'dpi':
        if (value) setSelectedDPIClassifications(selectedDPIClassifications.filter(c => c !== value));
        break;
      case 'wmo':
        if (value) setSelectedWMOClassifications(selectedWMOClassifications.filter(c => c !== value));
        break;
      case 'health-standard':
        if (value) setSelectedHealthStandards(selectedHealthStandards.filter(s => s !== value));
        break;
      case 'interop-standard':
        if (value) setSelectedInteropStandards(selectedInteropStandards.filter(s => s !== value));
        break;
    }
  };

  const filteredClassifications = {
    who: availableClassifications.who.filter(c => c.title.toLowerCase().includes(searchWHO.toLowerCase())),
    dpi: availableClassifications.dpi.filter(c => c.title.toLowerCase().includes(searchDPI.toLowerCase())),
    wmo: availableClassifications.wmo.filter(c => c.title.toLowerCase().includes(searchWMO.toLowerCase())),
    sdgs: availableClassifications.sdgs.filter(c => c.title.toLowerCase().includes(searchSDGs.toLowerCase()))
  };

  const filteredCountries = availableCountries.filter(c => c.toLowerCase().includes(searchCountries.toLowerCase()));
  const filteredHealthStandards = availableStandards.health.filter(s => s.toLowerCase().includes(searchHealthStandards.toLowerCase()));
  const filteredInteropStandards = availableStandards.interop.filter(s => s.toLowerCase().includes(searchInteropStandards.toLowerCase()));

  // Helper function to get classification title by code
  const getClassificationTitle = (code: string, type: 'who' | 'dpi' | 'wmo' | 'sdgs') => {
    const classification = availableClassifications[type].find(c => c.code === code);
    return classification?.title || code;
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
            <SelectValue placeholder={tPage("filters.sortLabel", "globalGoods")} />
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
              {totalAdvancedFilters > 0 && (
                <Badge variant="secondary" className="ml-2 text-xs">
                  {totalAdvancedFilters}
                </Badge>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-96" align="start">
            <div className="space-y-4 max-h-96 overflow-y-auto">
              <Accordion type="multiple" className="w-full">
                <AccordionItem value="sdgs">
                  <AccordionTrigger className="text-sm font-medium">
                    SDGs {selectedSDGs.length > 0 && `(${selectedSDGs.length})`}
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2">
                      <Input
                        placeholder="Search SDGs..."
                        value={searchSDGs}
                        onChange={(e) => setSearchSDGs(e.target.value)}
                        className="h-8 text-sm"
                      />
                      <div className="max-h-32 overflow-y-auto space-y-1">
                        {filteredClassifications.sdgs.map(sdg => (
                          <div key={sdg.code} className="flex items-center space-x-2">
                            <Checkbox
                              id={sdg.code}
                              checked={selectedSDGs.includes(sdg.code)}
                              onCheckedChange={(checked) => handleSDGChange(sdg.code, checked as boolean)}
                            />
                            <label htmlFor={sdg.code} className="text-xs cursor-pointer">
                              {sdg.title}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="who-classifications">
                  <AccordionTrigger className="text-sm font-medium">
                    WHO Classifications {selectedWHOClassifications.length > 0 && `(${selectedWHOClassifications.length})`}
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2">
                      <Input
                        placeholder="Search WHO classifications..."
                        value={searchWHO}
                        onChange={(e) => setSearchWHO(e.target.value)}
                        className="h-8 text-sm"
                      />
                      <div className="max-h-32 overflow-y-auto space-y-1">
                        {filteredClassifications.who.map(classification => (
                          <div key={classification.code} className="flex items-center space-x-2">
                            <Checkbox
                              id={`who-${classification.code}`}
                              checked={selectedWHOClassifications.includes(classification.code)}
                              onCheckedChange={(checked) => handleClassificationChange(classification.code, checked as boolean, 'who')}
                            />
                            <label htmlFor={`who-${classification.code}`} className="text-xs cursor-pointer">
                              {classification.title}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="dpi-classifications">
                  <AccordionTrigger className="text-sm font-medium">
                    DPI Classifications {selectedDPIClassifications.length > 0 && `(${selectedDPIClassifications.length})`}
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2">
                      <Input
                        placeholder="Search DPI classifications..."
                        value={searchDPI}
                        onChange={(e) => setSearchDPI(e.target.value)}
                        className="h-8 text-sm"
                      />
                      <div className="max-h-32 overflow-y-auto space-y-1">
                        {filteredClassifications.dpi.map(classification => (
                          <div key={classification.code} className="flex items-center space-x-2">
                            <Checkbox
                              id={`dpi-${classification.code}`}
                              checked={selectedDPIClassifications.includes(classification.code)}
                              onCheckedChange={(checked) => handleClassificationChange(classification.code, checked as boolean, 'dpi')}
                            />
                            <label htmlFor={`dpi-${classification.code}`} className="text-xs cursor-pointer">
                              {classification.title}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="wmo-classifications">
                  <AccordionTrigger className="text-sm font-medium">
                    WMO Classifications {selectedWMOClassifications.length > 0 && `(${selectedWMOClassifications.length})`}
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2">
                      <Input
                        placeholder="Search WMO classifications..."
                        value={searchWMO}
                        onChange={(e) => setSearchWMO(e.target.value)}
                        className="h-8 text-sm"
                      />
                      <div className="max-h-32 overflow-y-auto space-y-1">
                        {filteredClassifications.wmo.map(classification => (
                          <div key={classification.code} className="flex items-center space-x-2">
                            <Checkbox
                              id={`wmo-${classification.code}`}
                              checked={selectedWMOClassifications.includes(classification.code)}
                              onCheckedChange={(checked) => handleClassificationChange(classification.code, checked as boolean, 'wmo')}
                            />
                            <label htmlFor={`wmo-${classification.code}`} className="text-xs cursor-pointer">
                              {classification.title}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="health-standards">
                  <AccordionTrigger className="text-sm font-medium">
                    Health Standards {selectedHealthStandards.length > 0 && `(${selectedHealthStandards.length})`}
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2">
                      <Input
                        placeholder="Search health standards..."
                        value={searchHealthStandards}
                        onChange={(e) => setSearchHealthStandards(e.target.value)}
                        className="h-8 text-sm"
                      />
                      <div className="max-h-32 overflow-y-auto space-y-1">
                        {filteredHealthStandards.map(standard => (
                          <div key={standard} className="flex items-center space-x-2">
                            <Checkbox
                              id={`health-${standard}`}
                              checked={selectedHealthStandards.includes(standard)}
                              onCheckedChange={(checked) => handleStandardChange(standard, checked as boolean, 'health')}
                            />
                            <label htmlFor={`health-${standard}`} className="text-xs cursor-pointer">
                              {standard}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="interop-standards">
                  <AccordionTrigger className="text-sm font-medium">
                    Interoperability Standards {selectedInteropStandards.length > 0 && `(${selectedInteropStandards.length})`}
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2">
                      <Input
                        placeholder="Search interop standards..."
                        value={searchInteropStandards}
                        onChange={(e) => setSearchInteropStandards(e.target.value)}
                        className="h-8 text-sm"
                      />
                      <div className="max-h-32 overflow-y-auto space-y-1">
                        {filteredInteropStandards.map(standard => (
                          <div key={standard} className="flex items-center space-x-2">
                            <Checkbox
                              id={`interop-${standard}`}
                              checked={selectedInteropStandards.includes(standard)}
                              onCheckedChange={(checked) => handleStandardChange(standard, checked as boolean, 'interop')}
                            />
                            <label htmlFor={`interop-${standard}`} className="text-xs cursor-pointer">
                              {standard}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="countries">
                  <AccordionTrigger className="text-sm font-medium">
                    Implementation Countries {selectedCountries.length > 0 && `(${selectedCountries.length})`}
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2">
                      <Input
                        placeholder="Search countries..."
                        value={searchCountries}
                        onChange={(e) => setSearchCountries(e.target.value)}
                        className="h-8 text-sm"
                      />
                      <div className="max-h-32 overflow-y-auto space-y-1">
                        {filteredCountries.map(country => (
                          <div key={country} className="flex items-center space-x-2">
                            <Checkbox
                              id={`country-${country}`}
                              checked={selectedCountries.includes(country)}
                              onCheckedChange={(checked) => handleCountryChange(country, checked as boolean)}
                            />
                            <label htmlFor={`country-${country}`} className="text-xs cursor-pointer">
                              {country}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
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
              {getClassificationTitle(sdg, 'sdgs')}
              <X 
                className="h-3 w-3 cursor-pointer" 
                onClick={() => removeFilter('sdg', sdg)}
              />
            </Badge>
          ))}
          {selectedWHOClassifications.map(classification => (
            <Badge key={classification} variant="secondary" className="flex items-center gap-1">
              WHO: {getClassificationTitle(classification, 'who')}
              <X 
                className="h-3 w-3 cursor-pointer" 
                onClick={() => removeFilter('who', classification)}
              />
            </Badge>
          ))}
          {selectedDPIClassifications.map(classification => (
            <Badge key={classification} variant="secondary" className="flex items-center gap-1">
              DPI: {getClassificationTitle(classification, 'dpi')}
              <X 
                className="h-3 w-3 cursor-pointer" 
                onClick={() => removeFilter('dpi', classification)}
              />
            </Badge>
          ))}
          {selectedWMOClassifications.map(classification => (
            <Badge key={classification} variant="secondary" className="flex items-center gap-1">
              WMO: {getClassificationTitle(classification, 'wmo')}
              <X 
                className="h-3 w-3 cursor-pointer" 
                onClick={() => removeFilter('wmo', classification)}
              />
            </Badge>
          ))}
          {selectedHealthStandards.map(standard => (
            <Badge key={standard} variant="secondary" className="flex items-center gap-1">
              Health: {standard}
              <X 
                className="h-3 w-3 cursor-pointer" 
                onClick={() => removeFilter('health-standard', standard)}
              />
            </Badge>
          ))}
          {selectedInteropStandards.map(standard => (
            <Badge key={standard} variant="secondary" className="flex items-center gap-1">
              Interop: {standard}
              <X 
                className="h-3 w-3 cursor-pointer" 
                onClick={() => removeFilter('interop-standard', standard)}
              />
            </Badge>
          ))}
          {selectedCountries.map(country => (
            <Badge key={country} variant="secondary" className="flex items-center gap-1">
              {country}
              <X 
                className="h-3 w-3 cursor-pointer" 
                onClick={() => removeFilter('country', country)}
              />
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
}
