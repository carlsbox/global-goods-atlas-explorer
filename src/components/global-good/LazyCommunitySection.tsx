
import { lazy, Suspense } from 'react';
import { GlobalGoodFlat } from "@/lib/types/globalGoodFlat";
import { Skeleton } from "@/components/ui/skeleton";

const CommunityTabEnhanced = lazy(() => 
  import('./CommunityTabEnhanced').then(module => ({ default: module.CommunityTabEnhanced }))
);

interface LazyCommunityTabProps {
  globalGood: GlobalGoodFlat;
}

function CommunitySkeleton() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-6 w-24" />
          <Skeleton className="h-8 w-16" />
        </div>
      </div>
      <Skeleton className="h-32 w-full" />
    </div>
  );
}

export function LazyCommunitySection({ globalGood }: LazyCommunityTabProps) {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Community</h2>
      <Suspense fallback={<CommunitySkeleton />}>
        <CommunityTabEnhanced globalGood={globalGood} />
      </Suspense>
    </div>
  );
}
