
import { useState } from "react";
import { Link, FileText, Lightbulb } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GlobalGoodFlat } from "@/lib/types/globalGoodFlat";
import { useRelatedContent } from "@/hooks/useRelatedContent";
import { RelatedGlobalGoodBadge } from "./RelatedGlobalGoodBadge";
import { RelatedUseCaseItem } from "./RelatedUseCaseItem";
import { EnhancedRelatedUseCaseItem } from "./EnhancedRelatedUseCaseItem";
import { BadgeUseCaseItem } from "./BadgeUseCaseItem";
import { UseCaseDisplayModeSelector, DisplayMode } from "./UseCaseDisplayModeSelector";
import { Skeleton } from "@/components/ui/skeleton";

interface RelatedContentSectionProps {
  globalGood: GlobalGoodFlat;
}

export function RelatedContentSection({ globalGood }: RelatedContentSectionProps) {
  const { relatedContent, isLoading } = useRelatedContent(globalGood);
  const [useCaseDisplayMode, setUseCaseDisplayMode] = useState<DisplayMode>('enhanced');

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold mb-2">Related Content</h2>
          <p className="text-muted-foreground">
            Discover other global goods and use cases related to {globalGood.Name}
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-10 gap-6">
          <Card className="lg:col-span-7">
            <CardHeader>
              <Skeleton className="h-6 w-32" />
            </CardHeader>
            <CardContent className="space-y-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} className="h-20 w-full" />
              ))}
            </CardContent>
          </Card>
          
          <Card className="lg:col-span-3">
            <CardHeader>
              <Skeleton className="h-6 w-48" />
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {Array.from({ length: 6 }).map((_, i) => (
                  <Skeleton key={i} className="h-8 w-24 rounded-full" />
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (!relatedContent || (relatedContent.globalGoods.length === 0 && relatedContent.useCases.length === 0)) {
    return null;
  }

  const renderUseCaseContent = () => {
    switch (useCaseDisplayMode) {
      case 'enhanced':
        return (
          <div className="space-y-3">
            {relatedContent.useCases.map((item) => (
              <EnhancedRelatedUseCaseItem
                key={item.useCase.id}
                useCase={item.useCase}
                isDirectlyReferenced={item.isDirectlyReferenced}
              />
            ))}
          </div>
        );
      
      case 'badges':
        return (
          <div className="flex flex-wrap gap-2">
            {relatedContent.useCases.map((item) => (
              <BadgeUseCaseItem
                key={item.useCase.id}
                useCase={item.useCase}
                isDirectlyReferenced={item.isDirectlyReferenced}
              />
            ))}
          </div>
        );
      
      case 'compact':
        return (
          <div className="space-y-2">
            {relatedContent.useCases.map((item) => (
              <RelatedUseCaseItem
                key={item.useCase.id}
                useCase={item.useCase}
                isDirectlyReferenced={item.isDirectlyReferenced}
              />
            ))}
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Related Content</h2>
        <p className="text-muted-foreground">
          Discover other global goods and use cases related to {globalGood.Name}
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-10 gap-6">
        {/* Related Use Cases - 70% width */}
        {relatedContent.useCases.length > 0 && (
          <Card className="h-fit lg:col-span-7">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center">
                  <Lightbulb className="h-5 w-5 mr-2" />
                  Use Cases
                  <span className="ml-2 text-sm font-normal text-muted-foreground">
                    ({relatedContent.useCases.length})
                  </span>
                </CardTitle>
                <UseCaseDisplayModeSelector 
                  mode={useCaseDisplayMode}
                  onModeChange={setUseCaseDisplayMode}
                />
              </div>
            </CardHeader>
            <CardContent>
              {renderUseCaseContent()}
            </CardContent>
          </Card>
        )}

        {/* Related Global Goods - 30% width */}
        {relatedContent.globalGoods.length > 0 && (
          <Card className="h-fit lg:col-span-3">
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
              <div className="flex flex-wrap gap-2">
                {relatedContent.globalGoods.map((item) => (
                  <RelatedGlobalGoodBadge
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
      </div>
    </div>
  );
}
