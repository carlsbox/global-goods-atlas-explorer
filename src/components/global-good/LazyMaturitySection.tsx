
import { lazy, Suspense } from 'react';
import { GlobalGoodFlat } from "@/lib/types/globalGoodFlat";
import { Skeleton } from "@/components/ui/skeleton";

const MaturitySection = lazy(() => 
  import('./MaturitySection').then(module => ({ default: module.MaturitySection }))
);

interface LazyMaturitySectionProps {
  globalGood: GlobalGoodFlat;
}

function MaturitySkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-8 w-32" />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Skeleton className="h-64 w-full" />
        <Skeleton className="h-64 w-full" />
      </div>
    </div>
  );
}

export function LazyMaturitySection({ globalGood }: LazyMaturitySectionProps) {
  return (
    <Suspense fallback={<MaturitySkeleton />}>
      <MaturitySection globalGood={globalGood} />
    </Suspense>
  );
}
