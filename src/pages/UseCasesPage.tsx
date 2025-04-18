import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { useUseCases, useGlobalGoods } from "@/lib/api";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Search, 
  Filter, 
  MapPin, 
  ArrowUpRight, 
  CalendarIcon,
  ArrowRight
} from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function UseCasesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const globalGoodFilterParam = searchParams.get("globalGood");

  const { data: useCases = [], isLoading: useCasesLoading } = useUseCases();
  const { data: globalGoods = [], isLoading: globalGoodsLoading } = useGlobalGoods();
  
  const [searchTerm, setSearchTerm] = useState("");
  const [sectorFilter, setSectorFilter] = useState("all");
  const [globalGoodFilter, setGlobalGoodFilter] = useState(globalGoodFilterParam || "all");
  
  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    if (globalGoodFilter && globalGoodFilter !== "all") {
      params.set("globalGood", globalGoodFilter);
    }
    setSearchParams(params, { replace: true });
  }, [globalGoodFilter, setSearchParams]);
  
  // Extract unique sectors for filter
  const sectors = Array.from(
    new Set(useCases.map(useCase => useCase.sector))
  ).sort();
  
  // Filter use cases
  const filteredUseCases = useCases.filter(useCase => {
    const matchesSearch = searchTerm === "" || 
      useCase.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      useCase.description.toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesSector = sectorFilter === "all" || useCase.sector === sectorFilter;
    const matchesGlobalGood = globalGoodFilter === "all" || 
      (useCase.globalGoods && useCase.globalGoods.includes(globalGoodFilter));
      
    return matchesSearch && matchesSector && matchesGlobalGood;
  });

  // Get global good name for display
  const selectedGoodName = globalGoodFilter && globalGoodFilter !== "all"
    ? globalGoods.find(g => g.id === globalGoodFilter)?.name || "Unknown Global Good"
    : "";

  return (
    <>
      <div className="max-w-4xl mx-auto mb-12 text-center">
        <h1 className="mb-6">Use Cases</h1>
        <p className="text-xl text-muted-foreground">
          Explore real-world implementations and success stories of digital global goods.
        </p>
      </div>
      
      {globalGoodFilter && globalGoodFilter !== "all" && (
        <div className="bg-secondary/30 p-4 rounded-lg mb-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold">Filtered by Global Good: {selectedGoodName}</p>
              <p className="text-sm text-muted-foreground">
                Showing use cases that implement this global good
              </p>
            </div>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setGlobalGoodFilter("all")}
            >
              Clear Filter
            </Button>
          </div>
        </div>
      )}
      
      {/* Filter bar */}
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
            onClick={() => {
              setSearchTerm("");
              setSectorFilter("all");
              setGlobalGoodFilter("all");
            }}
            className="flex items-center"
          >
            <Filter className="mr-2 h-4 w-4" />
            Clear All Filters
          </Button>
        </div>
      </div>

      {useCasesLoading || globalGoodsLoading ? (
        <div className="text-center my-12">
          <p>Loading use cases...</p>
        </div>
      ) : (
        <>
          <div className="mb-4">
            <p className="text-muted-foreground">
              Showing {filteredUseCases.length} of {useCases.length} use cases
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredUseCases.map((useCase) => (
              <UseCaseCard 
                key={useCase.id} 
                useCase={useCase}
                globalGoods={globalGoods}
              />
            ))}
          </div>
          
          {filteredUseCases.length === 0 && (
            <div className="text-center my-12 p-8 bg-muted rounded-lg">
              <h3 className="text-xl font-semibold mb-2">No use cases found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your search criteria or clear filters.
              </p>
              <Button 
                variant="outline" 
                onClick={() => {
                  setSearchTerm("");
                  setSectorFilter("all");
                  setGlobalGoodFilter("all");
                }}
              >
                Clear All Filters
              </Button>
            </div>
          )}
        </>
      )}
    </>
  );
}

function UseCaseCard({ useCase, globalGoods }) {
  // Get global good names for display
  const usedGoodsNames = useCase.globalGoods
    .map(goodId => {
      const good = globalGoods.find(g => g.id === goodId);
      return good ? good.name : null;
    })
    .filter(Boolean);

  return (
    <Card className="h-full transition-all hover:shadow-md overflow-hidden">
      <CardContent className="p-0">
        {useCase.featuredImage && (
          <div className="relative aspect-video">
            <img 
              src={useCase.featuredImage} 
              alt={useCase.title} 
              className="w-full h-full object-cover" 
            />
          </div>
        )}
        <div className="p-6">
          <h3 className="font-semibold text-xl mb-2">{useCase.title}</h3>
          
          <div className="flex items-center gap-2 mb-4">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">{useCase.country}</span>
            <span className="text-muted-foreground">•</span>
            <Badge variant="outline" className="text-xs">
              {useCase.sector}
            </Badge>
            <span className="text-muted-foreground">•</span>
            <div className="flex items-center text-sm text-muted-foreground">
              <CalendarIcon className="h-3 w-3 mr-1" />
              {useCase.year}
            </div>
          </div>
          
          <p className="text-muted-foreground text-sm line-clamp-3 mb-4 min-h-[4.5rem]">
            {useCase.description}
          </p>
          
          <div className="mb-4">
            <h4 className="text-sm font-medium mb-2">Global Goods Used:</h4>
            <div className="flex flex-wrap gap-1">
              {usedGoodsNames.map((name) => (
                <Badge key={name} className="text-xs">
                  {name}
                </Badge>
              ))}
            </div>
          </div>
          
          <div className="flex justify-between items-center mt-4 pt-2 border-t">
            <span className="text-sm text-muted-foreground">
              {useCase.organization}
            </span>
            <div className="flex items-center gap-2">
              {useCase.link && (
                <Button asChild variant="ghost" size="sm" className="text-primary">
                  <a 
                    href={useCase.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center"
                  >
                    Website <ArrowUpRight className="ml-1 h-3 w-3" />
                  </a>
                </Button>
              )}
              <Button asChild size="sm">
                <Link to={`/use-cases/${useCase.id}`} className="flex items-center">
                  Details <ArrowRight className="ml-1 h-3 w-3" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
