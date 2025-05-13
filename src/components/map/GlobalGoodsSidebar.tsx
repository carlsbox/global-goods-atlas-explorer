
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, X } from "lucide-react";
import { GlobalGood } from "@/lib/types";

interface GlobalGoodsSidebarProps {
  globalGoods: GlobalGood[];
  selectedGood: GlobalGood | null;
  onSelectGood: (good: GlobalGood | null) => void;
}

export function GlobalGoodsSidebar({ 
  globalGoods, 
  selectedGood, 
  onSelectGood 
}: GlobalGoodsSidebarProps) {
  const [searchTerm, setSearchTerm] = useState("");
  
  // Filter global goods based on search
  const filteredGoods = globalGoods.filter(good => 
    good.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="col-span-12 md:col-span-3 lg:col-span-2 bg-card border-r overflow-y-auto p-4">
      <h2 className="font-semibold text-lg mb-4">Global Goods</h2>
      
      <div className="relative mb-4">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search global goods..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-8"
        />
        {searchTerm && (
          <button 
            onClick={() => setSearchTerm("")}
            className="absolute right-2 top-2.5"
          >
            <X className="h-4 w-4 text-muted-foreground" />
          </button>
        )}
      </div>
      
      <div className="space-y-1">
        {filteredGoods.map(good => (
          <Button
            key={good.id}
            variant={selectedGood?.id === good.id ? "default" : "ghost"}
            className="w-full justify-start text-left font-normal"
            onClick={() => {
              onSelectGood(selectedGood?.id === good.id ? null : good);
            }}
          >
            {good.name}
            <Badge variant="outline" className="ml-auto text-xs">
              {good.countries?.length || 0}
            </Badge>
          </Button>
        ))}
      </div>
    </div>
  );
}
