
import { Button } from "@/components/ui/button";
import { useI18n } from "@/hooks/useI18n";

interface UseCasesNoResultsProps {
  onClearFilters: () => void;
}

export function UseCasesNoResults({ onClearFilters }: UseCasesNoResultsProps) {
  const { tPage } = useI18n();
  
  return (
    <div className="text-center my-12 p-8 bg-muted rounded-lg">
      <h3 className="text-xl font-semibold mb-2">{tPage("noResults.title", "useCases")}</h3>
      <p className="text-muted-foreground mb-4">
        {tPage("noResults.description", "useCases")}
      </p>
      <Button 
        variant="outline" 
        onClick={onClearFilters}
      >
        {tPage("noResults.button", "useCases")}
      </Button>
    </div>
  );
}
