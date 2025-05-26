
import { useParams, Link } from "react-router-dom";
import { useGlobalGoodFlat } from "@/lib/api/globalGoodsFlat";
import { ArrowLeft } from "lucide-react";

// Import flat structure components
import { GlobalGoodHeaderFlat } from "@/components/global-good/GlobalGoodHeaderFlat";
import { OverviewTabFlat } from "@/components/global-good/OverviewTabFlat";
import { CommunityTabEnhanced } from "@/components/global-good/CommunityTabEnhanced";
import { LoadingState } from "@/components/global-good/LoadingState";
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

export default function GlobalGoodDetailsPageFlat() {
  const { id } = useParams<{ id: string }>();
  const { data: globalGood, isLoading, error, refetch } = useGlobalGoodFlat(id);
  const { tPage } = useI18n();

  // Handle loading state
  if (isLoading) {
    return <LoadingState message={tPage('loading', 'globalGoodDetails')} />;
  }

  // Handle error state
  if (error || !globalGood) {
    return <ErrorState onRetry={() => refetch()} />;
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
        
        <RawDataViewer data={globalGood} title={`Raw Data: ${globalGood.Name}`} />
      </div>
      
      {/* Header Section */}
      <GlobalGoodHeaderFlat globalGood={globalGood} />
      
      {/* Main Content - All sections displayed vertically */}
      <div className="mt-8 space-y-10">
        {/* Overview Section */}
        <div>
          <h2 className="text-2xl font-bold mb-4">{tPage('tabs.overview', 'globalGoodDetails')}</h2>
          <OverviewTabFlat globalGood={globalGood} />
        </div>
        
        <Separator />
        
        {/* Technical Information Section */}
        <TechnicalInformationSection globalGood={globalGood} />
        
        <Separator />
        
        {/* Global Reach Section */}
        <GlobalReachSection globalGood={globalGood} />
        
        <Separator />
        
        {/* Resources Section */}
        <ResourcesSection globalGood={globalGood} />
        
        <Separator />
        
        {/* Community Section - Using Enhanced Component */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Community</h2>
          <CommunityTabEnhanced globalGood={globalGood} />
        </div>
        
        <Separator />
        
        {/* Maturity Section */}
        <MaturitySection globalGood={globalGood} />
        
        <Separator />
        
        {/* Sustainability & Economics Section */}
        <SustainabilityEconomicsSection globalGood={globalGood} />
      </div>
    </div>
  );
}
