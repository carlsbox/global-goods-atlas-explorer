import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useGlobalGoodsFlat } from "@/lib/api/globalGoodsFlat";
import { GlobalGoodFlat } from "@/lib/types/globalGoodFlat";
import { Search, LayoutGrid, MapPin, Download } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { WorldMap } from "@/components/global-good/WorldMap";
import { EnhancedCountriesDisplay } from "@/components/global-good/EnhancedCountriesDisplay";
import { GlobalGoodCardFlat } from "@/components/global-goods/GlobalGoodCardFlat";

type ViewMode = 'overview' | 'focused' | 'grid';

export default function EnhancedMapPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const highlightParam = searchParams.get("highlight");
  
  const { data: globalGoods = [], isLoading } = useGlobalGoodsFlat();
  
  const [selectedGood, setSelectedGood] = useState<GlobalGoodFlat | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<ViewMode>('overview');
  
  // Set highlight from URL param
  useEffect(() => {
    if (highlightParam && globalGoods.length > 0) {
      const goodToHighlight = globalGoods.find(g => g.ID === highlightParam);
      if (goodToHighlight) {
        setSelectedGood(goodToHighlight);
        setViewMode('focused');
      }
    }
  }, [highlightParam, globalGoods]);
  
  // Filter global goods based on search
  const filteredGoods = globalGoods.filter(good => 
    good.Name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    good.ProductOverview?.Summary?.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Calculate aggregate stats
  const totalCountries = new Set(
    globalGoods.flatMap(good => 
      good.Reach?.ImplementationCountries?.map(country => country.iso_code) || []
    )
  ).size;
  
  const totalImplementations = globalGoods.reduce(
    (sum, good) => sum + (good.Reach?.NumberOfImplementations || 0), 0
  );

  const handleSelectGood = (good: GlobalGoodFlat | null) => {
    setSelectedGood(good);
    setViewMode(good ? 'focused' : 'overview');
    
    // Update URL
    if (good) {
      setSearchParams({ highlight: good.ID });
    } else {
      setSearchParams({});
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-6">
          <Skeleton className="h-12 w-full" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Skeleton className="h-32" />
            <Skeleton className="h-32" />
            <Skeleton className="h-32" />
          </div>
          <Skeleton className="h-96 w-full" />
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Page Header */}
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold">Global Implementation Map</h1>
          <p className="text-xl text-muted-foreground">
            Explore the worldwide deployment of digital global goods
          </p>
        </div>
        
        {/* Global Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-primary mb-1">
                {globalGoods.length}
              </div>
              <div className="font-medium">Global Goods</div>
              <div className="text-sm text-muted-foreground">
                Digital solutions available
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-primary mb-1">
                {totalCountries}
              </div>
              <div className="font-medium">Countries Reached</div>
              <div className="text-sm text-muted-foreground">
                Nations with implementations
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-primary mb-1">
                {totalImplementations.toLocaleString()}
              </div>
              <div className="font-medium">Total Implementations</div>
              <div className="text-sm text-muted-foreground">
                Active deployments worldwide
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Controls */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search global goods..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="flex gap-2">
            <Button
              variant={viewMode === 'overview' ? 'default' : 'outline'}
              size="sm"
              onClick={() => {
                setViewMode('overview');
                setSelectedGood(null);
                setSearchParams({});
              }}
            >
              <MapPin className="h-4 w-4 mr-2" />
              Overview
            </Button>
            <Button
              variant={viewMode === 'grid' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('grid')}
            >
              <LayoutGrid className="h-4 w-4 mr-2" />
              Grid View
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGoods.map((good) => (
            <GlobalGoodCardFlat key={good.ID} good={good} />
          ))}
        </div>
      ) : viewMode === 'focused' && selectedGood ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <WorldMap globalGood={selectedGood} />
          </div>
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="truncate">{selectedGood.Name}</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleSelectGood(null)}
                  >
                    Back to Overview
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  {selectedGood.ProductOverview?.Summary}
                </p>
                <div className="flex flex-wrap gap-2">
                  {selectedGood.GlobalGoodsType?.slice(0, 3).map((type) => (
                    <Badge key={type.code} variant="secondary" className="text-xs">
                      {type.title}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <EnhancedCountriesDisplay globalGood={selectedGood} />
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Global Goods Sidebar */}
          <div className="lg:col-span-1">
            <Card className="h-fit max-h-[600px]">
              <CardHeader>
                <CardTitle className="text-lg">Global Goods</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 max-h-[500px] overflow-y-auto">
                  {filteredGoods.map((good) => (
                    <Button
                      key={good.ID}
                      variant="ghost"
                      className="w-full justify-start text-left h-auto p-3"
                      onClick={() => handleSelectGood(good)}
                    >
                      <div className="flex-1 min-w-0">
                        <div className="font-medium truncate">{good.Name}</div>
                        <div className="text-xs text-muted-foreground">
                          {good.Reach?.ImplementationCountries?.length || 0} countries
                        </div>
                      </div>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Main Map Area */}
          <div className="lg:col-span-3">
            <Card>
              <CardContent className="p-0">
                <div className="p-6 text-center border-b">
                  <h3 className="text-lg font-semibold mb-2">
                    Global Distribution Overview
                  </h3>
                  <p className="text-muted-foreground">
                    Select a global good from the sidebar to view its implementation map
                  </p>
                </div>
                
                <div className="h-96 flex items-center justify-center bg-muted/20">
                  <div className="text-center space-y-4">
                    <MapPin className="h-16 w-16 mx-auto text-muted-foreground" />
                    <div>
                      <h4 className="font-medium mb-2">Interactive Map</h4>
                      <p className="text-sm text-muted-foreground max-w-md">
                        Choose a global good to see its worldwide implementation. 
                        The map will highlight countries with active deployments.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
