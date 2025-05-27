
import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Plus, 
  Search, 
  Eye, 
  Edit, 
  Trash, 
  Globe,
  Filter
} from "lucide-react";
import { useGlobalGoodsFlat } from "@/lib/api/globalGoodsFlat";
import { LoadingState } from "@/components/global-good/LoadingState";
import { ErrorState } from "@/components/global-good/ErrorState";

export default function GlobalGoodsContentPage() {
  const { data: globalGoods = [], isLoading, error, refetch } = useGlobalGoodsFlat();
  const [searchTerm, setSearchTerm] = useState("");
  const [sectorFilter, setSectorFilter] = useState("all");

  const sectors = useMemo(() => {
    const uniqueSectors = new Set(
      globalGoods.flatMap(good => 
        good.GlobalGoodsType?.map(type => type.title) || []
      )
    );
    return Array.from(uniqueSectors).sort();
  }, [globalGoods]);

  const filteredGoods = useMemo(() => {
    return globalGoods.filter(good => {
      const matchesSearch = searchTerm === "" || 
        good.Name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (good.ProductOverview?.Summary || '').toLowerCase().includes(searchTerm.toLowerCase());
        
      const matchesSector = sectorFilter === "all" || 
        good.GlobalGoodsType?.some(type => type.title === sectorFilter);
        
      return matchesSearch && matchesSector;
    });
  }, [globalGoods, searchTerm, sectorFilter]);

  if (isLoading) {
    return <LoadingState message="Loading global goods..." />;
  }

  if (error) {
    return <ErrorState onRetry={() => refetch()} />;
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold flex items-center">
            <Globe className="h-8 w-8 mr-3 text-blue-600" />
            Global Goods Management
          </h1>
          <p className="text-muted-foreground">Manage the global goods catalog</p>
        </div>
        <Button asChild>
          <Link to="/admin/content/global-goods/new">
            <Plus className="h-4 w-4 mr-2" />
            Add New Global Good
          </Link>
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex gap-4 items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search global goods..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <select
                value={sectorFilter}
                onChange={(e) => setSectorFilter(e.target.value)}
                className="px-3 py-2 border rounded-md"
              >
                <option value="all">All Sectors</option>
                {sectors.map(sector => (
                  <option key={sector} value={sector}>{sector}</option>
                ))}
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results Summary */}
      <div className="flex justify-between items-center">
        <p className="text-muted-foreground">
          Showing {filteredGoods.length} of {globalGoods.length} global goods
        </p>
      </div>

      {/* Global Goods List */}
      <div className="grid gap-4">
        {filteredGoods.map((good) => (
          <Card key={good.ID} className="hover:shadow-md transition-shadow">
            <CardContent className="pt-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4 flex-1">
                  {good.Logo ? (
                    <img 
                      src={good.Logo} 
                      alt={good.Name} 
                      className="h-12 w-12 rounded object-contain flex-shrink-0"
                    />
                  ) : (
                    <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-primary font-semibold">
                        {good.Name.charAt(0)}
                      </span>
                    </div>
                  )}
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-lg mb-1">{good.Name}</h3>
                    <p className="text-muted-foreground mb-3">
                      {good.ProductOverview?.Summary || 'No description available'}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {good.GlobalGoodsType?.slice(0, 3).map((type, index) => (
                        <Badge key={index} variant="secondary">
                          {type.title}
                        </Badge>
                      ))}
                      {(good.GlobalGoodsType?.length || 0) > 3 && (
                        <Badge variant="outline">
                          +{(good.GlobalGoodsType?.length || 0) - 3} more
                        </Badge>
                      )}
                      <Badge variant="outline">
                        {good.Reach?.ImplementationCountries?.length || 0} countries
                      </Badge>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-2 flex-shrink-0">
                  <Button variant="outline" size="sm" asChild>
                    <Link to={`/global-goods/${good.ID}`} target="_blank">
                      <Eye className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button variant="outline" size="sm" asChild>
                    <Link to={`/admin/content/global-goods/edit/${good.ID}`}>
                      <Edit className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => {
                      if (confirm(`Are you sure you want to delete "${good.Name}"?`)) {
                        console.log('Delete:', good.ID);
                      }
                    }}
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredGoods.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center">
            <Globe className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No global goods found</h3>
            <p className="text-muted-foreground mb-4">
              {searchTerm || sectorFilter !== "all" 
                ? "Try adjusting your search or filters"
                : "Get started by adding your first global good"
              }
            </p>
            <Button asChild>
              <Link to="/admin/content/global-goods/new">
                <Plus className="h-4 w-4 mr-2" />
                Add Global Good
              </Link>
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
