
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SDGFilterProps {
  sdgFilter: string;
  setSdgFilter: (sdg: string) => void;
  sdgOptions: Array<{ code: string; title: string }>;
  availableOptions: Set<string>;
}

export function SDGFilter({ 
  sdgFilter, 
  setSdgFilter, 
  sdgOptions, 
  availableOptions 
}: SDGFilterProps) {
  return (
    <Select value={sdgFilter} onValueChange={setSdgFilter}>
      <SelectTrigger>
        <SelectValue placeholder="Filter by SDG" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All SDGs</SelectItem>
        {sdgOptions.map(sdg => {
          const isAvailable = availableOptions.has(sdg.code);
          return (
            <SelectItem 
              key={sdg.code} 
              value={sdg.code}
              className={!isAvailable ? "text-muted-foreground opacity-50" : ""}
            >
              {sdg.title}
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
}
