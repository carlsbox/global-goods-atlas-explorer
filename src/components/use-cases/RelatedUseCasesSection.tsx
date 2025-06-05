
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RelatedUseCaseCard } from "./RelatedUseCaseCard";
import { useRelatedUseCases } from "@/hooks/useRelatedUseCases";
import { UseCase } from "@/lib/types/useCase";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { Link2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface RelatedUseCasesSectionProps {
  currentUseCase: UseCase;
}

export function RelatedUseCasesSection({ currentUseCase }: RelatedUseCasesSectionProps) {
  const { relatedUseCases, isLoading } = useRelatedUseCases(currentUseCase);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-8">
        <LoadingSpinner />
      </div>
    );
  }

  if (relatedUseCases.length === 0) {
    return null; // Don't show section if no related use cases
  }

  const displayedUseCases = relatedUseCases.slice(0, 4);
  const hasMoreUseCases = relatedUseCases.length > 4;

  return (
    <div className="border-t pt-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center">
          <Link2 className="mr-2 h-6 w-6" />
          Related Use Cases
        </h2>
        {hasMoreUseCases && (
          <Link to="/use-cases">
            <Button variant="outline" size="sm">
              View All Use Cases
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {displayedUseCases.map((relatedUseCase) => (
          <RelatedUseCaseCard
            key={relatedUseCase.useCase.id}
            relatedUseCase={relatedUseCase}
          />
        ))}
      </div>

      {hasMoreUseCases && (
        <div className="text-center mt-6">
          <p className="text-sm text-muted-foreground">
            Showing {displayedUseCases.length} of {relatedUseCases.length} related use cases
          </p>
        </div>
      )}
    </div>
  );
}
