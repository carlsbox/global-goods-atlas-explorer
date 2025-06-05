import { Link, FileText, Lightbulb } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GlobalGoodFlat } from "@/lib/types/globalGoodFlat";
import { useRelatedContent } from "@/hooks/useRelatedContent";
import { RelatedGlobalGoodCard } from "./RelatedGlobalGoodCard";
import { RelatedUseCaseItem } from "./RelatedUseCaseItem";
import { Skeleton } from "@/components/ui/skeleton";

interface RelatedContentSectionProps {
  globalGood: GlobalGoodFlat;
}

export function RelatedContentSection({ globalGood }: RelatedContentSectionProps) {
  const { relatedContent, isLoading } = useRelatedContent(globalGood);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold mb-2">Related Content</h2>
          <p className="text-muted-foreground">
            Discover other global goods and use cases related to {globalGood.Name}
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-48" />
            </CardHeader>
            <CardContent className="space-y-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} className="h-24 w-full" />
              ))}
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-32" />
            </CardHeader>
            <CardContent className="space-y-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} className="h-20 w-full" />
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (!relatedContent || (relatedContent.globalGoods.length === 0 && relatedContent.useCases.length === 0)) {
    return null;
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Related Content</h2>
        <p className="text-muted-foreground">
          Discover other global goods and use cases related to {globalGood.Name}
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Related Global Goods */}
        {relatedContent.globalGoods.length > 0 && (
          <Card className="h-fit">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Link className="h-5 w-5 mr-2" />
                Related Global Goods
                <span className="ml-2 text-sm font-normal text-muted-foreground">
                  ({relatedContent.globalGoods.length})
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {relatedContent.globalGoods.map((item, index) => (
                  <RelatedGlobalGoodCard
                    key={item.globalGood.ID}
                    globalGood={item.globalGood}
                    sharedClassifications={item.sharedClassifications}
                    sharedStandards={item.sharedStandards}
                    relationshipScore={item.relationshipScore}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Related Use Cases */}
        {relatedContent.useCases.length > 0 && (
          <Card className="h-fit">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Lightbulb className="h-5 w-5 mr-2" />
                Use Cases
                <span className="ml-2 text-sm font-normal text-muted-foreground">
                  ({relatedContent.useCases.length})
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {relatedContent.useCases.map((item, index) => (
                  <RelatedUseCaseItem
                    key={item.useCase.id}
                    useCase={item.useCase}
                    isDirectlyReferenced={item.isDirectlyReferenced}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
