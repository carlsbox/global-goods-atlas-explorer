
import { Link } from "react-router-dom";
import { FileText, MapPin } from "lucide-react";
import { UseCase } from "@/lib/types";
import { Badge } from "@/components/ui/badge";

interface RelatedUseCaseItemProps {
  useCase: UseCase;
  isDirectlyReferenced: boolean;
}

export function RelatedUseCaseItem({ useCase }: RelatedUseCaseItemProps) {
  return (
    <div className="flex items-start gap-3 p-3 border rounded-lg hover:bg-muted/50 transition-colors">
      <div className="rounded-full bg-blue-100 p-2 flex-shrink-0">
        <FileText className="h-4 w-4 text-blue-600" />
      </div>
      
      <div className="flex-1 min-w-0 space-y-2">
        <div>
          <Link 
            to={`/use-cases/${useCase.id}`}
            className="font-medium text-sm hover:text-primary transition-colors line-clamp-2"
          >
            {useCase.title}
          </Link>
        </div>
        
        {useCase.purpose && (
          <p className="text-xs text-muted-foreground line-clamp-2">
            {useCase.purpose.substring(0, 150)}...
          </p>
        )}
        
        <div className="flex flex-wrap gap-1">
          {useCase.classifications?.sdg && (
            <Badge variant="secondary" className="text-xs px-1 py-0">
              {useCase.classifications.sdg}
            </Badge>
          )}
          {useCase.country && (
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <MapPin className="h-3 w-3" />
              <span>{useCase.country}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
