
import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useProgressiveGlobalGood } from "@/hooks/useProgressiveGlobalGood";
import { ProgressiveLoadingSkeleton } from "@/components/global-good/ProgressiveLoadingSkeleton";

// Import flat structure components
import { GlobalGoodHeaderFlat } from "@/components/global-good/GlobalGoodHeaderFlat";
import { OverviewTabFlat } from "@/components/global-good/OverviewTabFlat";
import { CommunityTabEnhanced } from "@/components/global-good/CommunityTabEnhanced";
import { ErrorState } from "@/components/global-good/ErrorState";
import { RawDataViewer } from "@/components/global-good/RawDataViewer";

// Import new section components
import { TechnicalInformationSection } from "@/components/global-good/TechnicalInformationSection";
import { GlobalReachSection } from "@/components/global-good/GlobalReachSection";
import { ResourcesSection } from "@/components/global-good/ResourcesSection";
import { MaturitySection } from "@/components/global-good/MaturitySection";
import { SustainabilityEconomicsSection } from "@/components/global-good/SustainabilityEconomicsSection";

import { useI18n } from "@/hooks/useI18n";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

export default function GlobalGoodDetailsPageFlat() {
  const { id } = useParams<{ id: string }>();
  const { tPage } = useI18n();
  
  const {
    basicData,
    detailedData,
    loadingPhase,
    error,
    isBasicLoaded,
    isDetailedLoaded
  } = useProgressiveGlobalGood(id);

  // Show full skeleton while initial loading
  if (loadingPhase === 'initial') {
    return <ProgressiveLoadingSkeleton />;
  }

  // Handle error state
  if (error || loadingPhase === 'error') {
    return <ErrorState onRetry={() => window.location.reload()} />;
  }

  // Use detailed data if available, otherwise fall back to basic data
  const displayData = detailedData || basicData;
  
  if (!displayData) {
    return <ProgressiveLoadingSkeleton />;
  }

  return (
    <div className="container px-4 py-8 mx-auto max-w-7xl">
      {/* Breadcrumb Navigation */}
      <div className="mb-6 flex justify-between items-center">
        <Link 
          to="/global-goods" 
          className="text-muted-foreground hover:text-primary flex items-center"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          {tPage('backToGlobalGoods', 'globalGoodDetails')}
        </Link>
        
        {isDetailedLoaded && (
          <RawDataViewer data={detailedData} title={`Raw Data: ${displayData.Name}`} />
        )}
      </div>
      
      {/* Header Section - Shows immediately with basic data */}
      <GlobalGoodHeaderFlat globalGood={displayData} />
      
      {/* Main Content - Progressive loading sections */}
      <div className="mt-8 space-y-10">
        {/* Overview Section - Priority content */}
        <div>
          <h2 className="text-2xl font-bold mb-4">{tPage('tabs.overview', 'globalGoodDetails')}</h2>
          {isBasicLoaded ? (
            <OverviewTabFlat globalGood={displayData} />
          ) : (
            <Skeleton className="h-32 w-full" />
          )}
        </div>
        
        <Separator />
        
        {/* Technical Information Section - Priority content */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Technical Information</h2>
          {isDetailedLoaded ? (
            <TechnicalInformationSection globalGood={displayData} />
          ) : (
            <div className="space-y-4">
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-24 w-full" />
            </div>
          )}
        </div>
        
        <Separator />
        
        {/* Global Reach Section - Lazy loaded */}
        {isDetailedLoaded ? (
          <>
            <GlobalReachSection globalGood={displayData} />
            <Separator />
          </>
        ) : (
          <>
            <div>
              <Skeleton className="h-8 w-48 mb-4" />
              <Skeleton className="h-32 w-full" />
            </div>
            <Separator />
          </>
        )}
        
        {/* Resources Section - Lazy loaded */}
        {isDetailedLoaded ? (
          <>
            <ResourcesSection globalGood={displayData} />
            <Separator />
          </>
        ) : (
          <>
            <div>
              <Skeleton className="h-8 w-32 mb-4" />
              <Skeleton className="h-24 w-full" />
            </div>
            <Separator />
          </>
        )}
        
        {/* Community Section - Lazy loaded */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Community</h2>
          {isDetailedLoaded ? (
            <CommunityTabEnhanced globalGood={displayData} />
          ) : (
            <Skeleton className="h-40 w-full" />
          )}
        </div>
        
        <Separator />
        
        {/* Maturity Section - Lazy loaded */}
        {isDetailedLoaded ? (
          <>
            <MaturitySection globalGood={displayData} />
            <Separator />
          </>
        ) : (
          <>
            <div>
              <Skeleton className="h-8 w-32 mb-4" />
              <Skeleton className="h-48 w-full" />
            </div>
            <Separator />
          </>
        )}
        
        {/* Sustainability & Economics Section - Lazy loaded */}
        {isDetailedLoaded ? (
          <SustainabilityEconomicsSection globalGood={displayData} />
        ) : (
          <div>
            <Skeleton className="h-8 w-48 mb-4" />
            <Skeleton className="h-32 w-full" />
          </div>
        )}
      </div>
    </div>
  );
}
