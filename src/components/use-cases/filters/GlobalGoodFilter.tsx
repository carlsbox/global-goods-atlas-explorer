
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

  console.log('GlobalGoodFilter debug:', {
    globalGoods: globalGoods.slice(0, 3),
    availableOptions: Array.from(availableOptions),
    currentFilter: globalGoodFilter
  });

  return (
    <Select value={globalGoodFilter} onValueChange={setGlobalGoodFilter}>
      <SelectTrigger>
        <SelectValue placeholder="Filter by Global Good" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All Global Goods</SelectItem>
        {globalGoods
          .filter(good => good.ID && good.ID.trim() !== '') // Use ID instead of id
          .map(good => {
            const isAvailable = availableOptions.has(good.ID);
            return (
              <SelectItem 
                key={good.ID} 
                value={good.ID}
                className={!isAvailable ? "text-muted-foreground opacity-50" : ""}
              >
                {getText(good.Name)}
              </SelectItem>
            );
          })}
      </SelectContent>
    </Select>
  );
}
