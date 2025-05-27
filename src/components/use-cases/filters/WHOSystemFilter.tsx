
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface WHOSystemFilterProps {
  whoSystemFilter: string;
  setWhoSystemFilter: (system: string) => void;
  whoOptions: string[];
  classifications: any[];
  availableOptions: Set<string>;
}

export function WHOSystemFilter({ 
  whoSystemFilter, 
  setWhoSystemFilter, 
  whoOptions, 
  classifications,
  availableOptions 
}: WHOSystemFilterProps) {
  return (
    <Select value={whoSystemFilter} onValueChange={setWhoSystemFilter}>
      <SelectTrigger>
        <SelectValue placeholder="Filter by WHO System" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All WHO Systems</SelectItem>
        {whoOptions.map(who => {
          const classification = classifications.find(c => c.code === who);
          const isAvailable = availableOptions.has(who);
          return (
            <SelectItem 
              key={who} 
              value={who}
              className={!isAvailable ? "text-muted-foreground opacity-50" : ""}
            >
              {classification?.title || who}
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
}
