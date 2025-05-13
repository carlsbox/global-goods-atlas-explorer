
import { Button } from "@/components/ui/button";

interface UseCasesNoResultsProps {
  onClearFilters: () => void;
}

export function UseCasesNoResults({ onClearFilters }: UseCasesNoResultsProps) {
  return (
    <div className="text-center my-12 p-8 bg-muted rounded-lg">
      <h3 className="text-xl font-semibold mb-2">No use cases found</h3>
      <p className="text-muted-foreground mb-4">
        Try adjusting your search criteria or clear filters.
      </p>
      <Button 
        variant="outline" 
        onClick={onClearFilters}
      >
        Clear All Filters
      </Button>
    </div>
  );
}
