
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
  FileText,
  Filter
} from "lucide-react";

// Mock data - in real implementation, this would come from useUseCases hook
const mockUseCases = [
  {
    id: "senegal-heat-alert",
    title: "Automated Heat Alert System for Community Health Resilience in Senegal",
    purpose: "This use case addresses the rising health risks posed by extreme heat events in Senegal",
    country: "Senegal",
    sector: "Health",
    classifications: {
      sdg: "SDG-3",
      who_system: "WHO_A2"
    },
    global_goods: [
      { id: "dhis2", name: "DHIS2" }
    ],
    year: "2024"
  }
];

export default function UseCasesContentPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sectorFilter, setSectorFilter] = useState("all");
  const [countryFilter, setCountryFilter] = useState("all");

  const useCases = mockUseCases; // Replace with actual data hook

  const sectors = useMemo(() => {
    const uniqueSectors = new Set(useCases.map(useCase => useCase.sector).filter(Boolean));
    return Array.from(uniqueSectors).sort();
  }, [useCases]);

  const countries = useMemo(() => {
    const uniqueCountries = new Set(useCases.map(useCase => useCase.country).filter(Boolean));
    return Array.from(uniqueCountries).sort();
  }, [useCases]);

  const filteredUseCases = useMemo(() => {
    return useCases.filter(useCase => {
      const matchesSearch = searchTerm === "" || 
        useCase.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (useCase.purpose || '').toLowerCase().includes(searchTerm.toLowerCase());
        
      const matchesSector = sectorFilter === "all" || useCase.sector === sectorFilter;
      const matchesCountry = countryFilter === "all" || useCase.country === countryFilter;
        
      return matchesSearch && matchesSector && matchesCountry;
    });
  }, [useCases, searchTerm, sectorFilter, countryFilter]);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold flex items-center">
            <FileText className="h-8 w-8 mr-3 text-green-600" />
            Use Cases Management
          </h1>
          <p className="text-muted-foreground">Manage implementation use cases</p>
        </div>
        <Button asChild>
          <Link to="/admin/content/use-cases/new">
            <Plus className="h-4 w-4 mr-2" />
            Add New Use Case
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
                placeholder="Search use cases..."
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
              <select
                value={countryFilter}
                onChange={(e) => setCountryFilter(e.target.value)}
                className="px-3 py-2 border rounded-md"
              >
                <option value="all">All Countries</option>
                {countries.map(country => (
                  <option key={country} value={country}>{country}</option>
                ))}
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results Summary */}
      <div className="flex justify-between items-center">
        <p className="text-muted-foreground">
          Showing {filteredUseCases.length} of {useCases.length} use cases
        </p>
      </div>

      {/* Use Cases List */}
      <div className="grid gap-4">
        {filteredUseCases.map((useCase) => (
          <Card key={useCase.id} className="hover:shadow-md transition-shadow">
            <CardContent className="pt-6">
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <div className="flex items-start gap-4">
                    <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <FileText className="h-6 w-6 text-green-600" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-lg mb-1">{useCase.title}</h3>
                      <p className="text-muted-foreground mb-3">
                        {useCase.purpose}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="secondary">{useCase.country}</Badge>
                        <Badge variant="outline">{useCase.sector}</Badge>
                        {useCase.classifications?.sdg && (
                          <Badge variant="outline">{useCase.classifications.sdg}</Badge>
                        )}
                        {useCase.classifications?.who_system && (
                          <Badge variant="outline">WHO: {useCase.classifications.who_system}</Badge>
                        )}
                        {useCase.global_goods?.map(good => (
                          <Badge key={good.id} variant="outline">{good.name}</Badge>
                        ))}
                        <Badge variant="outline">{useCase.year}</Badge>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-2 flex-shrink-0">
                  <Button variant="outline" size="sm" asChild>
                    <Link to={`/use-cases/${useCase.id}`} target="_blank">
                      <Eye className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button variant="outline" size="sm" asChild>
                    <Link to={`/admin/content/use-cases/edit/${useCase.id}`}>
                      <Edit className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => {
                      if (confirm(`Are you sure you want to delete "${useCase.title}"?`)) {
                        console.log('Delete:', useCase.id);
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

      {filteredUseCases.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center">
            <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No use cases found</h3>
            <p className="text-muted-foreground mb-4">
              {searchTerm || sectorFilter !== "all" || countryFilter !== "all"
                ? "Try adjusting your search or filters"
                : "Get started by adding your first use case"
              }
            </p>
            <Button asChild>
              <Link to="/admin/content/use-cases/new">
                <Plus className="h-4 w-4 mr-2" />
                Add Use Case
              </Link>
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
