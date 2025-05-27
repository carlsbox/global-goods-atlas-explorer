
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface StandardFilterProps {
  standardFilter: string;
  setStandardFilter: (standard: string) => void;
  standardOptions: string[];
  availableOptions: Set<string>;
}

export function StandardFilter({ 
  standardFilter, 
  setStandardFilter, 
  standardOptions,
  availableOptions 
}: StandardFilterProps) {
  return (
    <Select value={standardFilter} onValueChange={setStandardFilter}>
      <SelectTrigger>
        <SelectValue placeholder="Filter by Standard" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All Standards</SelectItem>
        {standardOptions.map(standard => {
          const isAvailable = availableOptions.has(standard);
          return (
            <SelectItem 
              key={standard} 
              value={standard}
              className={!isAvailable ? "text-muted-foreground opacity-50" : ""}
            >
              {standard}
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
}
