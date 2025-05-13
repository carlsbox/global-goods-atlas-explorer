
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { GlobalGood } from "@/lib/types";
import { toast } from "sonner";
import { AdminFilterBar } from "@/components/admin/AdminFilterBar";
import { AdminDataTable } from "@/components/admin/AdminDataTable";
import { GlobalGoodRow } from "@/components/admin/GlobalGoodRow";

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
  
  // Function to toggle item selection
  const toggleItemSelection = (id: string) => {
    if (id === "all") {
      setSelectedItems(globalGoods.map(item => item.id));
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
    setGlobalGoods(globalGoods.filter(item => !selectedItems.includes(item.id)));
    setSelectedItems([]);
  };
  
  // Load data on component mount
  useEffect(() => {
    const fetchGoods = async () => {
      try {
        setIsLoading(true);
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
  const sectorOptions = sectors.map(sector => ({ label: sector, value: sector }));
  
  // Define table columns
  const columns = [
    { title: "Name" },
    { title: "Sectors", className: "hidden md:table-cell" },
    { title: "Countries", className: "hidden lg:table-cell" },
    { title: "Last Updated", className: "hidden md:table-cell" },
    { title: "Actions", className: "text-right" }
  ];
  
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
      <AdminFilterBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        searchPlaceholder="Search global goods..."
        filterOptions={sectorOptions}
        selectedFilter={selectedSector}
        setSelectedFilter={setSelectedSector}
        filterPlaceholder="Filter by sector"
      />
      
      {/* Data table */}
      <AdminDataTable
        data={filteredGoods}
        isLoading={isLoading}
        selectedItems={selectedItems}
        toggleItemSelection={toggleItemSelection}
        onBulkDelete={handleBulkDelete}
        columns={columns}
        renderRow={(good) => (
          <GlobalGoodRow
            key={good.id}
            good={good}
            isSelected={selectedItems.includes(good.id)}
            onToggleSelect={() => toggleItemSelection(good.id)}
          />
        )}
      />
    </div>
  );
}
