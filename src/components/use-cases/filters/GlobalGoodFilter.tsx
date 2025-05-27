
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useI18n } from "@/hooks/useI18n";

interface GlobalGoodFilterProps {
  globalGoodFilter: string;
  setGlobalGoodFilter: (globalGood: string) => void;
  globalGoods: any[];
  availableOptions: Set<string>;
}

export function GlobalGoodFilter({ 
  globalGoodFilter, 
  setGlobalGoodFilter, 
  globalGoods,
  availableOptions 
}: GlobalGoodFilterProps) {
  const { getText } = useI18n();

  return (
    <Select value={globalGoodFilter} onValueChange={setGlobalGoodFilter}>
      <SelectTrigger>
        <SelectValue placeholder="Filter by Global Good" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All Global Goods</SelectItem>
        {globalGoods
          .filter(good => good.id && good.id.trim() !== '')
          .map(good => {
            const isAvailable = availableOptions.has(good.id);
            return (
              <SelectItem 
                key={good.id} 
                value={good.id}
                className={!isAvailable ? "text-muted-foreground opacity-50" : ""}
              >
                {getText(good.name)}
              </SelectItem>
            );
          })}
      </SelectContent>
    </Select>
  );
}
