
import { lazy, Suspense } from 'react';
import { GlobalGoodFlat } from "@/lib/types/globalGoodFlat";
import { Skeleton } from "@/components/ui/skeleton";

const GlobalReachSection = lazy(() => 
  import('./GlobalReachSection').then(module => ({ default: module.GlobalReachSection }))
);

interface LazyGlobalReachSectionProps {
  globalGood: GlobalGoodFlat;
}

function GlobalReachSkeleton() {
  return (
    <div className="space-y-6">
      <Skeleton className="h-8 w-48" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Skeleton className="h-16 w-full" />
          <Skeleton className="h-4 w-24" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-16 w-full" />
          <Skeleton className="h-4 w-24" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-16 w-full" />
          <Skeleton className="h-4 w-24" />
        </div>
      </div>
      <Skeleton className="h-64 w-full" />
    </div>
  );
}

export function LazyGlobalReachSection({ globalGood }: LazyGlobalReachSectionProps) {
  return (
    <Suspense fallback={<GlobalReachSkeleton />}>
      <GlobalReachSection globalGood={globalGood} />
    </Suspense>
  );
}
