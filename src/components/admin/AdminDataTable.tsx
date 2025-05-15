import { useState } from "react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";

interface AdminDataTableProps<T> {
  data: T[];
  isLoading: boolean;
  selectedItems: string[];
  setSelectedItems: React.Dispatch<React.SetStateAction<string[]>>;
  renderRow: (item: T) => React.ReactNode;
  columns?: {
    title: string;
    className?: string;
  }[];
}

export function AdminDataTable<T extends { id: string }>({
  data,
  isLoading,
  selectedItems,
  setSelectedItems,
  renderRow,
  columns = [
    { title: "Item", className: "w-[300px]" },
    { title: "Categories", className: "hidden md:table-cell" },
    { title: "Deployment", className: "hidden lg:table-cell" },
    { title: "Last Updated", className: "hidden md:table-cell" },
    { title: "Actions", className: "text-right" }
  ]
}: AdminDataTableProps<T>) {
  const allSelected = data.length > 0 && selectedItems.length === data.length;
  
  // Toggle item selection
  const toggleItemSelection = (id: string) => {
    setSelectedItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  // Toggle all items
  const toggleAllItems = (selected: boolean) => {
    if (selected) {
      setSelectedItems(data.map(item => item.id));
    } else {
      setSelectedItems([]);
    }
  };

  // Handle bulk delete
  const handleBulkDelete = () => {
    // In a real app, this would delete the selected items
    console.log("Deleting items:", selectedItems);
    setSelectedItems([]);
  };
  
  return (
    <div>
      {/* Selected items actions */}
      {selectedItems.length > 0 && (
        <div className="bg-muted/50 p-3 rounded-md flex items-center justify-between mb-4">
          <span className="text-sm">{selectedItems.length} items selected</span>
          <Button variant="destructive" size="sm" onClick={handleBulkDelete}>
            <Trash className="h-4 w-4 mr-2" />
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
                  checked={allSelected} 
                  onCheckedChange={toggleAllItems}
                />
              </TableHead>
              {columns.map((column, index) => (
                <TableHead key={index} className={column.className}>
                  {column.title}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={columns.length + 1} className="text-center py-10">
                  <div className="flex justify-center items-center">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
                    <span className="ml-2">Loading...</span>
                  </div>
                </TableCell>
              </TableRow>
            ) : data.length === 0 ? (
              <TableRow>
                <TableCell colSpan={columns.length + 1} className="text-center py-10">
                  No items found
                </TableCell>
              </TableRow>
            ) : (
              data.map(item => renderRow(item))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
