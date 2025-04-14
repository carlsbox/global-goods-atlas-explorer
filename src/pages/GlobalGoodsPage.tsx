import { useState } from "react";
import { Link } from "react-router-dom";
import { GlobalGood } from "@/lib/types";
import { useGlobalGoods } from "@/lib/api";
import { Input } from "@/components/ui/input";
import { 
  Card, 
  CardContent 
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Search, Filter, ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function GlobalGoodsPage() {
  const { data: globalGoods = [], isLoading, error } = useGlobalGoods();
  const [searchTerm, setSearchTerm] = useState("");
  const [sectorFilter, setSectorFilter] = useState("all");
  
  // Extract unique sectors for filter
  const sectors = Array.from(
    new Set(globalGoods.flatMap(good => good.sector || []))
  ).sort();
  
  // Filter global goods
  const filteredGoods = globalGoods.filter(good => {
    const matchesSearch = searchTerm === "" || 
      good.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      good.description.toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesSector = sectorFilter === "all" || 
      (good.sector && good.sector.includes(sectorFilter));
      
    return matchesSearch && matchesSector;
  });

  return (
    <>
      <div className="max-w-4xl mx-auto mb-12 text-center">
        <h1 className="mb-6">Global Goods Catalog</h1>
        <p className="text-xl text-muted-foreground">
          Browse our comprehensive collection of digital global goods making an impact across sectors and regions.
        </p>
      </div>
      
      {/* Filter bar */}
      <div className="bg-card shadow-sm rounded-lg p-4 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search global goods..."
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
          
          <Button 
            variant="outline" 
            onClick={() => {
              setSearchTerm("");
              setSectorFilter("all");
            }}
            className="flex items-center"
          >
            <Filter className="mr-2 h-4 w-4" />
            Clear Filters
          </Button>
        </div>
      </div>

      {isLoading ? (
        <div className="text-center my-12">
          <p>Loading global goods catalog...</p>
        </div>
      ) : error ? (
        <div className="text-center my-12">
          <p className="text-destructive">Error loading catalog. Please try again later.</p>
        </div>
      ) : (
        <>
          <div className="mb-4">
            <p className="text-muted-foreground">
              Showing {filteredGoods.length} of {globalGoods.length} global goods
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGoods.map((good) => (
              <GlobalGoodCard key={good.id} good={good} />
            ))}
          </div>
          
          {filteredGoods.length === 0 && (
            <div className="text-center my-12 p-8 bg-muted rounded-lg">
              <h3 className="text-xl font-semibold mb-2">No global goods found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your search criteria or clear filters.
              </p>
              <Button 
                variant="outline" 
                onClick={() => {
                  setSearchTerm("");
                  setSectorFilter("all");
                }}
              >
                Clear Filters
              </Button>
            </div>
          )}
        </>
      )}
    </>
  );
}

function GlobalGoodCard({ good }: { good: GlobalGood }) {
  return (
    <Link to={`/global-goods/${good.id}`}>
      <Card className="h-full transition-all hover:shadow-md overflow-hidden">
        <CardContent className="p-0">
          <div className="p-6">
            <div className="flex items-center mb-4">
              {good.logo ? (
                <img 
                  src={good.logo} 
                  alt={good.name} 
                  className="h-10 w-10 mr-3 rounded object-contain"
                />
              ) : (
                <div className="h-10 w-10 bg-primary/10 rounded-full mr-3" />
              )}
              <h3 className="font-semibold truncate">{good.name}</h3>
            </div>
            
            <p className="text-muted-foreground text-sm line-clamp-3 mb-4 h-[4.5rem]">
              {good.description}
            </p>
            
            <div className="flex flex-wrap gap-1 mb-4">
              {good.sector?.slice(0, 3).map((sector) => (
                <Badge key={sector} variant="secondary" className="text-xs">
                  {sector}
                </Badge>
              ))}
              {(good.sector?.length || 0) > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{(good.sector?.length || 0) - 3} more
                </Badge>
              )}
            </div>
            
            <div className="flex items-center justify-between mt-auto pt-2 text-sm text-muted-foreground">
              <span>
                {good.countries?.length || 0} {good.countries?.length === 1 ? 'country' : 'countries'}
              </span>
              <div className="flex items-center text-primary">
                View details <ArrowUpRight className="ml-1 h-3 w-3" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
