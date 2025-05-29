
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";

export function ProgressiveLoadingSkeleton() {
  return (
    <div className="container px-4 py-8 mx-auto max-w-7xl">
      {/* Header Skeleton */}
      <div className="mb-6 flex justify-between items-center">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-8 w-24" />
      </div>
      
      {/* Global Good Header Skeleton */}
      <div className="border rounded-lg p-6 mb-8 bg-card">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-shrink-0">
            <Skeleton className="h-16 w-16 rounded" />
          </div>
          
          <div className="flex-1 space-y-4">
            <Skeleton className="h-8 w-64" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
            
            <div className="flex flex-wrap gap-2">
              <Skeleton className="h-6 w-20" />
              <Skeleton className="h-6 w-24" />
              <Skeleton className="h-6 w-16" />
            </div>
          </div>
        </div>
      </div>

      {/* Content Sections Skeleton */}
      <div className="space-y-10">
        {/* Overview Section */}
        <div>
          <Skeleton className="h-8 w-48 mb-4" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-4 w-4/5" />
            </div>
            <div className="space-y-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          </div>
        </div>
        
        <Separator />
        
        {/* Technical Information Section */}
        <div>
          <Skeleton className="h-8 w-56 mb-4" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-32 w-full" />
          </div>
        </div>
        
        <Separator />
        
        {/* Additional Sections Placeholder */}
        <div className="space-y-6">
          <Skeleton className="h-8 w-40" />
          <Skeleton className="h-24 w-full" />
        </div>
      </div>
    </div>
  );
}
