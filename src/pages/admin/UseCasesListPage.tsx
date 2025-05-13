
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { UseCase } from "@/lib/types";
import { toast } from "sonner";
import { AdminFilterBar } from "@/components/admin/AdminFilterBar";
import { AdminDataTable } from "@/components/admin/AdminDataTable";
import { UseCaseRow } from "@/components/admin/UseCaseRow";

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
  
  // Function to toggle item selection
  const toggleItemSelection = (id: string) => {
    if (id === "all") {
      setSelectedItems(useCases.map(item => item.id));
      return;
    }
    
    if (id === "none") {
      setSelectedItems([]);
      return;
    }
    
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
                         useCase.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesSector = !selectedSector || useCase.sector === selectedSector;
    
    return matchesSearch && matchesSector;
  });
  
  // Extract unique sectors for filter dropdown
  const sectors = [...new Set(useCases.map(useCase => useCase.sector))].sort();
  const sectorOptions = sectors.map(sector => ({ label: sector, value: sector }));
  
  // Define table columns
  const columns = [
    { title: "Title" },
    { title: "Country", className: "hidden md:table-cell" },
    { title: "Sector", className: "hidden lg:table-cell" },
    { title: "Year", className: "hidden lg:table-cell" },
    { title: "Actions", className: "text-right" }
  ];
  
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
        toggleItemSelection={toggleItemSelection}
        onBulkDelete={handleBulkDelete}
        columns={columns}
        renderRow={(useCase) => (
          <UseCaseRow
            key={useCase.id}
            useCase={useCase}
            isSelected={selectedItems.includes(useCase.id)}
            onToggleSelect={() => toggleItemSelection(useCase.id)}
          />
        )}
      />
    </div>
  );
}
