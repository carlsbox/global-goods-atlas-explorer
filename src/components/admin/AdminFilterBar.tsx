
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Search, Filter } from "lucide-react";

interface AdminFilterBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  searchPlaceholder: string;
  filterOptions: {
    label: string;
    value: string;
  }[];
  selectedFilter: string | null;
  setSelectedFilter: (value: string | null) => void;
  filterPlaceholder: string;
}

export function AdminFilterBar({
  searchQuery,
  setSearchQuery,
  searchPlaceholder,
  filterOptions,
  selectedFilter,
  setSelectedFilter,
  filterPlaceholder
}: AdminFilterBarProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6">
      <div className="relative flex-1">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder={searchPlaceholder}
          className="pl-9"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <Select 
        value={selectedFilter || "all"} 
        onValueChange={(value) => setSelectedFilter(value === "all" ? null : value)}
      >
        <SelectTrigger className="w-full sm:w-[180px]">
          <div className="flex items-center">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue placeholder={filterPlaceholder} />
          </div>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All</SelectItem>
          {filterOptions.map(option => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
