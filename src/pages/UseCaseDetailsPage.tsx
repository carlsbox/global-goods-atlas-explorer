
import { useParams } from "react-router-dom";
import { useUseCases } from "@/lib/api";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export default function UseCaseDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const { data: useCases = [], isLoading } = useUseCases();
  
  const useCase = useCases.find(uc => uc.id === id);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <LoadingSpinner />
      </div>
    );
  }

  if (!useCase) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold mb-4">Use Case Not Found</h1>
        <p className="text-muted-foreground mb-6">
          The use case you're looking for doesn't exist.
        </p>
        <Link to="/use-cases">
          <Button>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Use Cases
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link to="/use-cases">
          <Button variant="outline" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Use Cases
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-3xl">{useCase.title}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-2">Overview</h3>
            <p className="text-muted-foreground">{useCase.description}</p>
          </div>

          {useCase.challenge && (
            <div>
              <h3 className="text-lg font-semibold mb-2">Challenge</h3>
              <p className="text-muted-foreground">{useCase.challenge}</p>
            </div>
          )}

          {useCase.solution && (
            <div>
              <h3 className="text-lg font-semibold mb-2">Solution</h3>
              <p className="text-muted-foreground">{useCase.solution}</p>
            </div>
          )}

          {useCase.impact && (
            <div>
              <h3 className="text-lg font-semibold mb-2">Impact</h3>
              <p className="text-muted-foreground">{useCase.impact}</p>
            </div>
          )}

          <div>
            <h3 className="text-lg font-semibold mb-2">Details</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium">Country:</span> {useCase.country}
              </div>
              <div>
                <span className="font-medium">Sector:</span> {useCase.sector}
              </div>
              <div>
                <span className="font-medium">Organization:</span> {useCase.organization}
              </div>
              <div>
                <span className="font-medium">Year:</span> {useCase.year}
              </div>
            </div>
          </div>

          {useCase.globalGoods && useCase.globalGoods.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-2">Global Goods Used</h3>
              <div className="flex flex-wrap gap-2">
                {useCase.globalGoods.map((goodId, index) => (
                  <Badge key={index} variant="secondary">
                    {goodId}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
