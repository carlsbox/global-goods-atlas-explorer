
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
import { Trash2 } from "lucide-react";

interface AdminDataTableProps<T> {
  data: T[];
  isLoading: boolean;
  selectedItems: string[];
  toggleItemSelection: (id: string) => void;
  onBulkDelete: () => void;
  renderRow: (item: T) => React.ReactNode;
  columns: {
    title: string;
    className?: string;
  }[];
}

export function AdminDataTable<T extends { id: string }>({
  data,
  isLoading,
  selectedItems,
  toggleItemSelection,
  onBulkDelete,
  renderRow,
  columns
}: AdminDataTableProps<T>) {
  const allSelected = data.length > 0 && selectedItems.length === data.length;
  
  return (
    <div>
      {/* Selected items actions */}
      {selectedItems.length > 0 && (
        <div className="bg-muted/50 p-3 rounded-md flex items-center justify-between mb-4">
          <span className="text-sm">{selectedItems.length} items selected</span>
          <Button variant="destructive" size="sm" onClick={onBulkDelete}>
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
                  checked={allSelected} 
                  onCheckedChange={(checked) => {
                    if (checked) {
                      toggleItemSelection("all");
                    } else {
                      toggleItemSelection("none");
                    }
                  }}
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
              data.map(renderRow)
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
