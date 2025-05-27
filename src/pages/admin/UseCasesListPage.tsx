import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { UseCase } from "@/lib/types";
import { toast } from "sonner";
import { AdminFilterBar } from "@/components/admin/AdminFilterBar";
import { AdminDataTable } from "@/components/admin/AdminDataTable";
import { TableRow, TableCell } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Pencil, Trash, Eye } from "lucide-react";

// Mock data loader for demonstration
async function loadUseCases(): Promise<UseCase[]> {
  // In a real app, this would be an API call
  return new Promise((resolve) => {
    setTimeout(() => {
      // Mock data - in real app would come from your API
      resolve([
        {
          id: "senegal-heat-alert",
          title: "Automated Heat Alert System for Community Health Resilience in Senegal",
          purpose: "This use case addresses the rising health risks posed by extreme heat events in Senegal, particularly for vulnerable populations such as the elderly, children, and people with chronic illnesses.",
          classifications: {
            sdg: "SDG-3",
            who_system: "WHO_A2",
            wmo_category: "WMO_D1"
          },
          scope: "This use case covers the generation, dissemination, and response to heat alerts based on weather forecasts and health thresholds.",
          actors: "Community Health Workers, District Health Authorities, Ministry of Health and Ministry of Environment",
          preconditions: "Access to reliable weather forecast and temperature/humidity data, Defined heat health thresholds",
          process_steps: "1. Meteorological Agency publishes daily forecasts\n2. System calculates heat index and checks thresholds",
          postconditions: "Alerts are delivered on time, Outreach reduces health risks",
          data_requirements: "Daily weather forecasts (temperature, humidity, heat index), Defined heat-health thresholds",
          standards: [
            {
              code: "HL7 FHIR",
              domain: "Health",
              link: "https://www.hl7.org/fhir/",
              name: "HL7 FHIR",
              description: "Fast Healthcare Interoperability Resources",
              type: "exchange"
            }
          ],
          technology_components: "Weather data API, Alert platform, Dashboards, Mobile phones for CHWs",
          global_goods: [
            { id: "dhis2", name: "DHIS2", url: "/global-goods/dhis2" }
          ],
          challenges: "Gaps in weather data granularity, Limited mobile access in remote areas",
          sustainability_considerations: "Scalable to other regions in West Africa, Needs cross-sector collaboration",
          // Legacy compatibility
          country: "Senegal",
          sector: "Health",
          organization: "Ministry of Health",
          year: "2024",
          description: "Heat alert system for health resilience"
        }
      ]);
    }, 1000);
  });
}

// New UseCaseRow component to replace the deleted one
function UseCaseRow({ useCase, isSelected, onToggleSelect }: {
  useCase: UseCase;
  isSelected: boolean;
  onToggleSelect: () => void;
}) {
  return (
    <TableRow key={useCase.id}>
      <TableCell>
        <Checkbox 
          checked={isSelected} 
          onCheckedChange={onToggleSelect}
        />
      </TableCell>
      <TableCell>
        <div>
          <p className="font-medium">{useCase.title}</p>
          <p className="text-xs text-muted-foreground hidden sm:block">
            {(useCase.purpose || useCase.description || "").length > 50
              ? `${(useCase.purpose || useCase.description || "").slice(0, 50)}...`
              : (useCase.purpose || useCase.description || "")}
          </p>
          <div className="mt-1 hidden sm:flex flex-wrap gap-1">
            {useCase.classifications?.sdg && (
              <Badge variant="outline" className="text-xs">
                {useCase.classifications.sdg}
              </Badge>
            )}
            {useCase.classifications?.who_system && (
              <Badge variant="outline" className="text-xs">
                WHO: {useCase.classifications.who_system}
              </Badge>
            )}
            {useCase.global_goods?.slice(0, 2).map(good => (
              <Badge key={good.id} variant="outline" className="text-xs">
                {good.name}
              </Badge>
            )) || useCase.global_goods?.slice(0, 2).map(good => (
              <Badge key={good.id || good.name} variant="outline" className="text-xs">
                {good.name || good.id}
              </Badge>
            ))}
            {((useCase.global_goods?.length || 0) + (useCase.global_goods?.length || 0)) > 2 && (
              <Badge variant="outline" className="text-xs">
                +{((useCase.global_goods?.length || 0) + (useCase.global_goods?.length || 0)) - 2}
              </Badge>
            )}
          </div>
        </div>
      </TableCell>
      <TableCell className="hidden md:table-cell">
        {useCase.country || "Global"}
      </TableCell>
      <TableCell className="hidden lg:table-cell">
        <Badge variant="secondary">{useCase.sector || "Multiple"}</Badge>
      </TableCell>
      <TableCell className="hidden lg:table-cell">
        {useCase.year || "Current"}
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
          <Trash className="h-4 w-4" />
          <span className="sr-only">Delete</span>
        </Button>
      </TableCell>
    </TableRow>
  );
}

export default function UseCasesListPage() {
  const [useCases, setUseCases] = useState<UseCase[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSector, setSelectedSector] = useState<string | null>(null);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  
  // Load data on component mount
  useEffect(() => {
    const fetchUseCases = async () => {
      try {
        setIsLoading(true);
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
                         (useCase.purpose || useCase.description || "").toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesSector = !selectedSector || (useCase.sector === selectedSector);
    
    return matchesSearch && matchesSector;
  });
  
  // Extract unique sectors for filter dropdown
  const sectors = [...new Set(useCases.map(useCase => useCase.sector).filter(Boolean))].sort();
  const sectorOptions = sectors.map(sector => ({ label: sector, value: sector }));
  
  // Define table columns
  const columns = [
    { title: "Title" },
    { title: "Country", className: "hidden md:table-cell" },
    { title: "Sector", className: "hidden lg:table-cell" },
    { title: "Year", className: "hidden lg:table-cell" },
    { title: "Actions", className: "text-right" }
  ];
  
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
      <AdminFilterBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        searchPlaceholder="Search use cases..."
        filterOptions={sectorOptions}
        selectedFilter={selectedSector}
        setSelectedFilter={setSelectedSector}
        filterPlaceholder="Filter by sector"
      />
      
      {/* Data table */}
      <AdminDataTable
        data={filteredUseCases}
        isLoading={isLoading}
        selectedItems={selectedItems}
        setSelectedItems={setSelectedItems}
        columns={columns}
        renderRow={(useCase: UseCase) => (
          <UseCaseRow
            key={useCase.id}
            useCase={useCase}
            isSelected={selectedItems.includes(useCase.id)}
            onToggleSelect={() => setSelectedItems(prev => 
              prev.includes(useCase.id) 
                ? prev.filter(id => id !== useCase.id)
                : [...prev, useCase.id]
            )}
          />
        )}
      />
    </div>
  );
}
