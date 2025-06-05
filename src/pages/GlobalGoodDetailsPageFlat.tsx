
import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Suspense, useMemo } from "react";

// Import optimized components
import { FastGlobalGoodHeader } from "@/components/global-good/FastGlobalGoodHeader";
import { OverviewTabFlat } from "@/components/global-good/OverviewTabFlat";
import { LoadingState } from "@/components/global-good/LoadingState";
import { ErrorState } from "@/components/global-good/ErrorState";
import { RawDataViewer } from "@/components/global-good/RawDataViewer";

// Import lazy-loaded sections
import { LazyGlobalReachSection } from "@/components/global-good/LazyGlobalReachSection";
import { LazyCommunitySection } from "@/components/global-good/LazyCommunitySection";
import { LazyMaturitySection } from "@/components/global-good/LazyMaturitySection";

// Import remaining sections (lightweight)
import { TechnicalInformationSection } from "@/components/global-good/TechnicalInformationSection";
import { ResourcesSection } from "@/components/global-good/ResourcesSection";
import { SustainabilityEconomicsSection } from "@/components/global-good/SustainabilityEconomicsSection";

import { useI18n } from "@/hooks/useI18n";
import { useDirectGlobalGood } from "@/hooks/useDirectGlobalGood";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

// Lightweight section skeleton
function SectionSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-8 w-48" />
      <Skeleton className="h-32 w-full" />
    </div>
  );
}

export default function GlobalGoodDetailsPageFlat() {
  const { id } = useParams<{ id: string }>();
  const { tPage } = useI18n();
  
  const { data: globalGood, isLoading, error, isCached } = useDirectGlobalGood(id);

  // Memoize the basic header data to prevent re-renders
  const headerData = useMemo(() => {
    if (!globalGood) return {};
    return {
      ID: globalGood.ID,
      Name: globalGood.Name,
      Logo: globalGood.Logo,
      Website: globalGood.Website,
      ProductOverview: globalGood.ProductOverview,
      GlobalGoodsType: globalGood.GlobalGoodsType,
    };
  }, [globalGood?.ID, globalGood?.Name, globalGood?.Logo]);

  // Handle error state
  if (error) {
    return <ErrorState onRetry={() => window.location.reload()} />;
  }

  // Show loading only if we don't have any data and it's not cached
  if (isLoading && !headerData.Name && !isCached) {
    return <LoadingState message={tPage('loading', 'globalGoodDetails')} />;
  }

  return (
    <div className="container px-4 py-8 mx-auto max-w-7xl">
      {/* Breadcrumb Navigation - Renders immediately */}
      <div className="mb-6 flex justify-between items-center">
        <Link 
          to="/global-goods" 
          className="text-muted-foreground hover:text-primary flex items-center"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          {tPage('backToGlobalGoods', 'globalGoodDetails')}
        </Link>
        
        {globalGood && (
          <RawDataViewer data={globalGood} title={`Raw Data: ${globalGood.Name}`} />
        )}
      </div>
      
      {/* Fast Header - Renders immediately with basic data */}
      <FastGlobalGoodHeader 
        globalGood={headerData} 
        isLoading={isLoading && !globalGood} 
      />
      
      {/* Main Content - Progressive sections */}
      <div className="mt-8 space-y-10">
        {/* Overview Section - Priority content, renders quickly */}
        <div>
          <h2 className="text-2xl font-bold mb-4">{tPage('tabs.overview', 'globalGoodDetails')}</h2>
          {globalGood ? (
            <OverviewTabFlat globalGood={globalGood} />
          ) : (
            <SectionSkeleton />
          )}
        </div>
        
        <Separator />
        
        {/* Technical Information Section - Priority content */}
        {globalGood ? (
          <TechnicalInformationSection globalGood={globalGood} />
        ) : (
          <SectionSkeleton />
        )}
        
        <Separator />
        
        {/* Global Reach Section - Lazy loaded */}
        {globalGood ? (
          <LazyGlobalReachSection globalGood={globalGood} />
        ) : (
          <SectionSkeleton />
        )}
        
        <Separator />
        
        {/* Resources Section - Lightweight */}
        {globalGood ? (
          <ResourcesSection globalGood={globalGood} />
        ) : (
          <SectionSkeleton />
        )}
        
        <Separator />
        
        {/* Community Section - Lazy loaded */}
        {globalGood ? (
          <LazyCommunitySection globalGood={globalGood} />
        ) : (
          <SectionSkeleton />
        )}
        
        <Separator />
        
        {/* Maturity Section - Lazy loaded */}
        {globalGood ? (
          <LazyMaturitySection globalGood={globalGood} />
        ) : (
          <SectionSkeleton />
        )}
        
        <Separator />
        
        {/* Sustainability & Economics Section - Lightweight */}
        {globalGood ? (
          <SustainabilityEconomicsSection globalGood={globalGood} />
        ) : (
          <SectionSkeleton />
        )}
      </div>
    </div>
  );
}
