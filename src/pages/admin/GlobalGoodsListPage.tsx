
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
import { GlobalGood } from "@/lib/types";
import { useLanguage } from "@/contexts/LanguageContext";
import { toast } from "sonner";

// Mock data loader for demonstration
async function loadGlobalGoods(): Promise<GlobalGood[]> {
  // In a real app, this would be an API call
  return new Promise((resolve) => {
    setTimeout(() => {
      // Mock data - in real app would come from your API
      resolve([
        {
          id: "dhis2",
          name: "DHIS2",
          description: "A flexible information system for data capture and visualization",
          sector: ["Health", "Data Management"],
          countries: ["Tanzania", "Uganda", "Kenya", "Rwanda"],
          technologies: ["JavaScript", "React", "Java"],
          lastUpdated: "2025-04-10",
          logo: "/logos/dhis2.png",
          maturity: "Mature",
          tags: ["Data", "Visualization", "Health"]
        },
        {
          id: "openimis",
          name: "openIMIS",
          description: "An insurance management information system",
          sector: ["Health", "Insurance"],
          countries: ["Cameroon", "Nepal", "Tanzania"],
          technologies: ["Python", "React", "Docker"],
          lastUpdated: "2025-04-05",
          logo: "/logos/openimis.png",
          maturity: "Established",
          tags: ["Insurance", "Claims", "Health"]
        },
        // Add more mock goods as needed
      ]);
    }, 1000);
  });
}

export default function GlobalGoodsListPage() {
  const [globalGoods, setGlobalGoods] = useState<GlobalGood[]>([]);
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
    setGlobalGoods(globalGoods.filter(item => !selectedItems.includes(item.id)));
    setSelectedItems([]);
  };
  
  // Load data on component mount
  useEffect(() => {
    const fetchGoods = async () => {
      try {
        const data = await loadGlobalGoods();
        setGlobalGoods(data);
      } catch (error) {
        console.error("Failed to load global goods", error);
        toast.error("Failed to load global goods");
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchGoods();
  }, []);
  
  // Filter goods based on search query and sector filter
  const filteredGoods = globalGoods.filter(good => {
    const matchesSearch = good.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         good.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesSector = !selectedSector || good.sector.includes(selectedSector);
    
    return matchesSearch && matchesSector;
  });
  
  // Extract unique sectors for filter dropdown
  const sectors = [...new Set(globalGoods.flatMap(good => good.sector))].sort();
  
  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Global Goods</h1>
        <Button asChild>
          <Link to="/admin/global-goods/new">
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
            placeholder="Search global goods..."
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
                  checked={globalGoods.length > 0 && selectedItems.length === globalGoods.length} 
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setSelectedItems(globalGoods.map(good => good.id));
                    } else {
                      setSelectedItems([]);
                    }
                  }}
                />
              </TableHead>
              <TableHead>Name</TableHead>
              <TableHead className="hidden md:table-cell">Sectors</TableHead>
              <TableHead className="hidden lg:table-cell">Countries</TableHead>
              <TableHead className="hidden md:table-cell">Last Updated</TableHead>
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
            ) : filteredGoods.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-10">
                  No global goods found
                </TableCell>
              </TableRow>
            ) : (
              filteredGoods.map((good) => (
                <TableRow key={good.id}>
                  <TableCell>
                    <Checkbox 
                      checked={selectedItems.includes(good.id)} 
                      onCheckedChange={() => toggleItemSelection(good.id)}
                    />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      {good.logo ? (
                        <img 
                          src={good.logo} 
                          alt={good.name} 
                          className="h-8 w-8 object-contain rounded-sm"
                          onError={(e) => (e.currentTarget.src = "/placeholder.svg")}
                        />
                      ) : (
                        <div className="h-8 w-8 rounded-sm bg-muted flex items-center justify-center">
                          {good.name.charAt(0)}
                        </div>
                      )}
                      <div>
                        <p className="font-medium">{good.name}</p>
                        <p className="text-xs text-muted-foreground hidden sm:block">
                          {good.description.length > 50
                            ? `${good.description.slice(0, 50)}...`
                            : good.description}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <div className="flex flex-wrap gap-1">
                      {good.sector.slice(0, 2).map(sector => (
                        <Badge key={sector} variant="outline">{sector}</Badge>
                      ))}
                      {good.sector.length > 2 && (
                        <Badge variant="outline">+{good.sector.length - 2}</Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">
                    {good.countries.length > 0 
                      ? `${good.countries.length} countries` 
                      : "Not specified"}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {good.lastUpdated}
                  </TableCell>
                  <TableCell className="text-right space-x-1">
                    <Button variant="ghost" size="icon" asChild>
                      <Link to={`/global-goods/${good.id}`} target="_blank">
                        <Eye className="h-4 w-4" />
                        <span className="sr-only">View</span>
                      </Link>
                    </Button>
                    <Button variant="ghost" size="icon" asChild>
                      <Link to={`/admin/global-goods/edit/${good.id}`}>
                        <Pencil className="h-4 w-4" />
                        <span className="sr-only">Edit</span>
                      </Link>
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => {
                        toast.warning(`This would delete ${good.name} in a real application`, {
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
