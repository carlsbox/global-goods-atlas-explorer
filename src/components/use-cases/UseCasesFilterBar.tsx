
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface UseCasesFilterBarProps {
  sectors: string[];
  globalGoods: any[];
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  sectorFilter: string;
  setSectorFilter: (sector: string) => void;
  globalGoodFilter: string;
  setGlobalGoodFilter: (globalGood: string) => void;
  onClearAllFilters: () => void;
}

export function UseCasesFilterBar({
  sectors,
  globalGoods,
  searchTerm,
  setSearchTerm,
  sectorFilter,
  setSectorFilter,
  globalGoodFilter,
  setGlobalGoodFilter,
  onClearAllFilters
}: UseCasesFilterBarProps) {
  return (
    <div className="bg-card shadow-sm rounded-lg p-4 mb-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search use cases..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>
        
        <Select value={sectorFilter} onValueChange={setSectorFilter}>
          <SelectTrigger>
            <SelectValue placeholder="Filter by sector" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Sectors</SelectItem>
            {sectors.map(sector => (
              <SelectItem key={sector} value={sector}>
                {sector}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        <Select value={globalGoodFilter} onValueChange={setGlobalGoodFilter}>
          <SelectTrigger>
            <SelectValue placeholder="Filter by global good" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Global Goods</SelectItem>
            {globalGoods.map(good => (
              <SelectItem key={good.id} value={good.id}>
                {good.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="mt-4 flex justify-end">
        <Button 
          variant="outline" 
          onClick={onClearAllFilters}
          className="flex items-center"
        >
          <Filter className="mr-2 h-4 w-4" />
          Clear All Filters
        </Button>
      </div>
    </div>
  );
}
