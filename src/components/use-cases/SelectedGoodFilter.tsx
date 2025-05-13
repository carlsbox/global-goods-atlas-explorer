
import { Button } from "@/components/ui/button";

interface SelectedGoodFilterProps {
  selectedGoodName: string;
  onClear: () => void;
}

export function SelectedGoodFilter({ selectedGoodName, onClear }: SelectedGoodFilterProps) {
  return (
    <div className="bg-secondary/30 p-4 rounded-lg mb-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="font-semibold">Filtered by Global Good: {selectedGoodName}</p>
          <p className="text-sm text-muted-foreground">
            Showing use cases that implement this global good
          </p>
        </div>
        <Button 
          variant="outline" 
          size="sm"
          onClick={onClear}
        >
          Clear Filter
        </Button>
      </div>
    </div>
  );
}
