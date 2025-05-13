
import { Button } from "@/components/ui/button";

interface NoResultsProps {
  onClearFilters: () => void;
}

export function NoResults({ onClearFilters }: NoResultsProps) {
  return (
    <div className="text-center my-12 p-8 bg-muted rounded-lg">
      <h3 className="text-xl font-semibold mb-2">No global goods found</h3>
      <p className="text-muted-foreground mb-4">
        Try adjusting your search criteria or clear filters.
      </p>
      <Button 
        variant="outline" 
        onClick={onClearFilters}
      >
        Clear Filters
      </Button>
    </div>
  );
}
