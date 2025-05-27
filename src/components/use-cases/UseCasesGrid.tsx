
import { UseCase } from "@/lib/types";
import { NewUseCaseCard } from "./NewUseCaseCard";
import { UseCasesNoResults } from "./UseCasesNoResults";
import { useI18n } from "@/hooks/useI18n";

interface UseCasesGridProps {
  filteredUseCases: UseCase[];
  totalUseCases: number;
  globalGoods: any[];
  classifications: any[];
  onClearFilters: () => void;
  hasActiveFilters: boolean;
}

export function UseCasesGrid({
  filteredUseCases,
  totalUseCases,
  globalGoods,
  classifications,
  onClearFilters,
  hasActiveFilters
}: UseCasesGridProps) {
  const { tPage } = useI18n();

  return (
    <>
      <div className="mb-6">
        <p className="text-muted-foreground">
          {tPage("showing", "useCases", { filtered: filteredUseCases.length, total: totalUseCases })}
          {hasActiveFilters && (
            <span className="ml-2 text-primary">
              (filtered results)
            </span>
          )}
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 auto-rows-fr">
        {filteredUseCases.map((useCase) => (
          <NewUseCaseCard 
            key={useCase.id} 
            useCase={useCase}
            globalGoods={globalGoods}
            classifications={classifications}
          />
        ))}
      </div>
      
      {filteredUseCases.length === 0 && (
        <UseCasesNoResults onClearFilters={onClearFilters} />
      )}
    </>
  );
}
