
import { GlobalGoodFlat } from "@/lib/types/globalGoodFlat";
import { Badge } from "@/components/ui/badge";
import { ExternalLink } from "lucide-react";

interface FastGlobalGoodHeaderProps {
  globalGood: Partial<GlobalGoodFlat>;
  isLoading?: boolean;
}

export function FastGlobalGoodHeader({ globalGood, isLoading }: FastGlobalGoodHeaderProps) {
  return (
    <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-lg p-8 mb-8">
      <div className="flex flex-col lg:flex-row lg:items-start gap-6">
        {/* Logo and Basic Info */}
        <div className="flex items-center gap-4 flex-shrink-0">
          {globalGood.Logo ? (
            <img 
              src={globalGood.Logo} 
              alt={`${globalGood.Name} logo`}
              className="w-16 h-16 object-contain rounded-lg bg-white p-2 shadow-sm"
              loading="eager"
            />
          ) : (
            <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center">
              <span className="text-2xl font-bold text-primary">
                {globalGood.Name?.charAt(0) || '?'}
              </span>
            </div>
          )}
        </div>
        
        {/* Title and Quick Info */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-col lg:flex-row lg:items-center gap-4 mb-4">
            <h1 className="text-3xl font-bold text-foreground">
              {globalGood.Name || 'Loading...'}
            </h1>
            
            {globalGood.Website?.main?.url && (
              <a
                href={globalGood.Website.main.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <ExternalLink className="h-4 w-4" />
                Visit Website
              </a>
            )}
          </div>
          
          {/* Summary */}
          {globalGood.ProductOverview?.Summary && (
            <p className="text-lg text-muted-foreground mb-4 leading-relaxed">
              {globalGood.ProductOverview.Summary}
            </p>
          )}
          
          {/* Quick Badges */}
          <div className="flex flex-wrap gap-2">
            {globalGood.GlobalGoodsType?.slice(0, 3).map((type, index) => (
              <Badge key={index} variant="secondary">
                {type.title || type.code}
              </Badge>
            ))}
            {isLoading && (
              <Badge variant="outline">Loading details...</Badge>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
