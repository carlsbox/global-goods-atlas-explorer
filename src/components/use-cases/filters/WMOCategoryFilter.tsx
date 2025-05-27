
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface WMOCategoryFilterProps {
  wmoFilter: string;
  setWmoFilter: (category: string) => void;
  wmoOptions: string[];
  classifications: any[];
  availableOptions: Set<string>;
}

export function WMOCategoryFilter({ 
  wmoFilter, 
  setWmoFilter, 
  wmoOptions, 
  classifications,
  availableOptions 
}: WMOCategoryFilterProps) {
  return (
    <Select value={wmoFilter} onValueChange={setWmoFilter}>
      <SelectTrigger>
        <SelectValue placeholder="Filter by WMO Category" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All WMO Categories</SelectItem>
        {wmoOptions.map(wmo => {
          const classification = classifications.find(c => c.code === wmo);
          const isAvailable = availableOptions.has(wmo);
          return (
            <SelectItem 
              key={wmo} 
              value={wmo}
              className={!isAvailable ? "text-muted-foreground opacity-50" : ""}
            >
              {classification?.title || wmo}
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
}
