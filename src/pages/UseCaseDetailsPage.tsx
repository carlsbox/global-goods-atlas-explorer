
import { useParams } from "react-router-dom";
import { useUseCases } from "@/lib/api/useCases";
import { PageLayout } from "@/components/layout/PageLayout";
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
      <PageLayout>
        <div className="flex justify-center items-center min-h-[400px]">
          <LoadingSpinner />
        </div>
      </PageLayout>
    );
  }

  if (!useCase) {
    return (
      <PageLayout>
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
      </PageLayout>
    );
  }

  return (
    <PageLayout>
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
              <p className="text-muted-foreground">{useCase.overview}</p>
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

            {useCase.tags && useCase.tags.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-2">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {useCase.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
}
