import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

// Import flat structure components
import { GlobalGoodHeaderFlat } from "@/components/global-good/GlobalGoodHeaderFlat";
import { OverviewTabFlat } from "@/components/global-good/OverviewTabFlat";
import { CommunityTabEnhanced } from "@/components/global-good/CommunityTabEnhanced";
import { LoadingState } from "@/components/global-good/LoadingState";
import { ErrorState } from "@/components/global-good/ErrorState";
import { RawDataViewer } from "@/components/global-good/RawDataViewer";
import { ProgressiveLoadingSkeleton } from "@/components/global-good/ProgressiveLoadingSkeleton";

// Import new section components
import { TechnicalInformationSection } from "@/components/global-good/TechnicalInformationSection";
import { GlobalReachSection } from "@/components/global-good/GlobalReachSection";
import { ResourcesSection } from "@/components/global-good/ResourcesSection";
import { MaturitySection } from "@/components/global-good/MaturitySection";
import { SustainabilityEconomicsSection } from "@/components/global-good/SustainabilityEconomicsSection";
import { RelatedContentSection } from "@/components/global-good/RelatedContentSection";

import { useI18n } from "@/hooks/useI18n";
import { useProgressiveGlobalGood } from "@/hooks/useProgressiveGlobalGood";
import { Separator } from "@/components/ui/separator";

export default function GlobalGoodDetailsPageFlat() {
  const { id } = useParams<{ id: string }>();
  const { tPage } = useI18n();
  
  const {
    basicData,
    detailedData,
    loadingPhase,
    error,
    hasBasicData,
    hasDetailedData
  } = useProgressiveGlobalGood(id);

  // Handle error state
  if (loadingPhase === 'error' || (!hasBasicData && !hasDetailedData && error)) {
    return <ErrorState onRetry={() => window.location.reload()} />;
  }

  // Show initial loading if we don't have any data yet
  if (!hasBasicData && loadingPhase === 'basic') {
    return <LoadingState message={tPage('loading', 'globalGoodDetails')} />;
  }

  // Use the most complete data available
  const globalGood = detailedData || basicData;
  if (!globalGood) {
    return <LoadingState message={tPage('loading', 'globalGoodDetails')} />;
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
        
        {detailedData && (
          <RawDataViewer data={detailedData} title={`Raw Data: ${globalGood.Name}`} />
        )}
      </div>
      
      {/* Header Section - Show immediately with basic data */}
      {globalGood && (
        <GlobalGoodHeaderFlat globalGood={globalGood as any} />
      )}
      
      {/* Main Content - Progressive sections */}
      <div className="mt-8 space-y-10">
        {/* Overview Section - Priority content */}
        <div>
          <h2 className="text-2xl font-bold mb-4">{tPage('tabs.overview', 'globalGoodDetails')}</h2>
          {globalGood && (
            <OverviewTabFlat globalGood={globalGood as any} />
          )}
        </div>
        
        <Separator />
        
        {/* Technical Information Section - Priority content */}
        {hasDetailedData && detailedData ? (
          <TechnicalInformationSection globalGood={detailedData} />
        ) : (
          <ProgressiveLoadingSkeleton phase={loadingPhase} />
        )}
        
        {hasDetailedData && detailedData && (
          <>
            <Separator />
            
            {/* Global Reach Section */}
            <GlobalReachSection globalGood={detailedData} />
            
            <Separator />
            
            {/* Resources Section */}
            <ResourcesSection globalGood={detailedData} />
            
            <Separator />
            
            {/* Community Section */}
            <div>
              <h2 className="text-2xl font-bold mb-4">Community</h2>
              <CommunityTabEnhanced globalGood={detailedData} />
            </div>
            
            <Separator />
            
            {/* Maturity Section */}
            <MaturitySection globalGood={detailedData} />
            
            <Separator />
            
            {/* Sustainability & Economics Section */}
            <SustainabilityEconomicsSection globalGood={detailedData} />
            
            <Separator />
            
            {/* Related Content Section */}
            <RelatedContentSection globalGood={detailedData} />
          </>
        )}
      </div>
    </div>
  );
}
