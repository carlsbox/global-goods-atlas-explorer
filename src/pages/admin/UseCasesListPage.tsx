
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Pencil, Trash2, Search, Filter, Plus, Eye } from "lucide-react";
import { UseCase } from "@/lib/types";
import { useLanguage } from "@/contexts/LanguageContext";
import { toast } from "sonner";

// Mock data loader for demonstration
async function loadUseCases(): Promise<UseCase[]> {
  // In a real app, this would be an API call
  return new Promise((resolve) => {
    setTimeout(() => {
      // Mock data - in real app would come from your API
      resolve([
        {
          id: "1",
          title: "COVID-19 Response in Kenya",
          description: "Using DHIS2 to track COVID-19 cases and coordinate response",
          country: "Kenya",
          sector: "Health",
          globalGoods: ["dhis2"],
          organization: "Ministry of Health",
          year: "2023",
          link: "https://example.com/case1",
          results: "Improved case tracking and response coordination",
          challenge: "Rapid tracking and response to COVID-19 cases",
          solution: "Implementation of DHIS2 COVID-19 package",
          impact: "Reduced response time by 50%",
          lessons: ["Early data collection is crucial", "Training is essential"],
          contacts: [{
            name: "John Doe",
            email: "john@example.com",
            organization: "Ministry of Health",
            role: "Project Manager"
          }],
          sdgs: ["SDG3"],
          featuredImage: "/images/case1.jpg"
        },
        {
          id: "2",
          title: "Maternal Health in Tanzania",
          description: "Implementing digital health solutions for maternal health monitoring",
          country: "Tanzania",
          sector: "Health",
          globalGoods: ["dhis2", "openimis"],
          organization: "Tanzania Health Department",
          year: "2024",
          link: "https://example.com/case2",
          challenge: "High maternal mortality rates",
          solution: "Digital tracking of pregnancy and postnatal care",
          impact: "20% reduction in maternal mortality"
        },
        // Add more mock use cases as needed
      ]);
    }, 1000);
  });
}

export default function UseCasesListPage() {
  const [useCases, setUseCases] = useState<UseCase[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSector, setSelectedSector] = useState<string | null>(null);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const { language } = useLanguage();
  
  // Function to toggle item selection
  const toggleItemSelection = (id: string) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter(item => item !== id));
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  };
  
  // Function to handle bulk delete action
  const handleBulkDelete = () => {
    if (selectedItems.length === 0) return;
    
    // In a real app, this would be an API call
    toast.info(`${selectedItems.length} items would be deleted in a real application`, {
      description: "This is a mock functionality for demonstration purposes.",
    });
    
    // Remove the items from the state
    setUseCases(useCases.filter(item => !selectedItems.includes(item.id)));
    setSelectedItems([]);
  };
  
  // Load data on component mount
  useEffect(() => {
    const fetchUseCases = async () => {
      try {
        const data = await loadUseCases();
        setUseCases(data);
      } catch (error) {
        console.error("Failed to load use cases", error);
        toast.error("Failed to load use cases");
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchUseCases();
  }, []);
  
  // Filter use cases based on search query and sector filter
  const filteredUseCases = useCases.filter(useCase => {
    const matchesSearch = useCase.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         useCase.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesSector = !selectedSector || useCase.sector === selectedSector;
    
    return matchesSearch && matchesSector;
  });
  
  // Extract unique sectors for filter dropdown
  const sectors = [...new Set(useCases.map(useCase => useCase.sector))].sort();
  
  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Use Cases</h1>
        <Button asChild>
          <Link to="/admin/use-cases/new">
            <Plus className="h-4 w-4 mr-2" />
            Add New
          </Link>
        </Button>
      </div>
      
      {/* Filters and search */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search use cases..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Select value={selectedSector || ""} onValueChange={(value) => setSelectedSector(value || null)}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <div className="flex items-center">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Filter by sector" />
            </div>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All Sectors</SelectItem>
            {sectors.map(sector => (
              <SelectItem key={sector} value={sector}>{sector}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      {/* Selected items actions */}
      {selectedItems.length > 0 && (
        <div className="bg-muted/50 p-3 rounded-md flex items-center justify-between">
          <span className="text-sm">{selectedItems.length} items selected</span>
          <Button variant="destructive" size="sm" onClick={handleBulkDelete}>
            <Trash2 className="h-4 w-4 mr-2" />
            Delete Selected
          </Button>
        </div>
      )}
      
      {/* Table */}
      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <Checkbox 
                  checked={useCases.length > 0 && selectedItems.length === useCases.length} 
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setSelectedItems(useCases.map(useCase => useCase.id));
                    } else {
                      setSelectedItems([]);
                    }
                  }}
                />
              </TableHead>
              <TableHead>Title</TableHead>
              <TableHead className="hidden md:table-cell">Country</TableHead>
              <TableHead className="hidden lg:table-cell">Sector</TableHead>
              <TableHead className="hidden lg:table-cell">Year</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-10">
                  <div className="flex justify-center items-center">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
                    <span className="ml-2">Loading...</span>
                  </div>
                </TableCell>
              </TableRow>
            ) : filteredUseCases.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-10">
                  No use cases found
                </TableCell>
              </TableRow>
            ) : (
              filteredUseCases.map((useCase) => (
                <TableRow key={useCase.id}>
                  <TableCell>
                    <Checkbox 
                      checked={selectedItems.includes(useCase.id)} 
                      onCheckedChange={() => toggleItemSelection(useCase.id)}
                    />
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{useCase.title}</p>
                      <p className="text-xs text-muted-foreground hidden sm:block">
                        {useCase.description.length > 50
                          ? `${useCase.description.slice(0, 50)}...`
                          : useCase.description}
                      </p>
                      <div className="mt-1 hidden sm:flex flex-wrap gap-1">
                        {useCase.globalGoods.slice(0, 2).map(goodId => (
                          <Badge key={goodId} variant="outline" className="text-xs">
                            {goodId}
                          </Badge>
                        ))}
                        {useCase.globalGoods.length > 2 && (
                          <Badge variant="outline" className="text-xs">
                            +{useCase.globalGoods.length - 2}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {useCase.country}
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">
                    <Badge variant="secondary">{useCase.sector}</Badge>
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">
                    {useCase.year}
                  </TableCell>
                  <TableCell className="text-right space-x-1">
                    <Button variant="ghost" size="icon" asChild>
                      <Link to={`/use-cases/${useCase.id}`} target="_blank">
                        <Eye className="h-4 w-4" />
                        <span className="sr-only">View</span>
                      </Link>
                    </Button>
                    <Button variant="ghost" size="icon" asChild>
                      <Link to={`/admin/use-cases/edit/${useCase.id}`}>
                        <Pencil className="h-4 w-4" />
                        <span className="sr-only">Edit</span>
                      </Link>
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => {
                        toast.warning(`This would delete "${useCase.title}" in a real application`, {
                          description: "Mock functionality for demonstration",
                        });
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Delete</span>
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
