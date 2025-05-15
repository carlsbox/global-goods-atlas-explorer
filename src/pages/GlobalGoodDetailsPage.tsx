
import { useParams, Link } from "react-router-dom";
import { useGlobalGood } from "@/lib/api";
import { ArrowLeft } from "lucide-react";

// Import our components
import { GlobalGoodHeader } from "@/components/global-good/GlobalGoodHeader";
import { OverviewTab } from "@/components/global-good/OverviewTab";
import { TechnicalTab } from "@/components/global-good/TechnicalTab";
import { StandardsTab } from "@/components/global-good/StandardsTab";
import { MaturityTab } from "@/components/global-good/MaturityTab";
import { DeploymentTab } from "@/components/global-good/DeploymentTab";
import { CommunityTab } from "@/components/global-good/CommunityTab";
import { UseCasesTab } from "@/components/global-good/UseCasesTab";
import { LoadingState } from "@/components/global-good/LoadingState";
import { ErrorState } from "@/components/global-good/ErrorState";
import { RawDataViewer } from "@/components/global-good/RawDataViewer";
import { useI18n } from "@/hooks/useI18n";
import { Separator } from "@/components/ui/separator";

export default function GlobalGoodDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const { data: globalGood, isLoading, error, refetch } = useGlobalGood(id);
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
        
        {/* Add the Raw Data Viewer button */}
        <RawDataViewer data={globalGood} title={`Raw Data: ${globalGood.name}`} />
      </div>
      
      {/* Header Section */}
      <GlobalGoodHeader globalGood={globalGood} />
      
      {/* Main Content - All sections displayed vertically */}
      <div className="mt-8 space-y-10">
        {/* Overview Section */}
        <div>
          <h2 className="text-2xl font-bold mb-4">{tPage('tabs.overview', 'globalGoodDetails')}</h2>
          <OverviewTab globalGood={globalGood} />
        </div>
        
        <Separator />
        
        {/* Technical Section */}
        <div>
          <h2 className="text-2xl font-bold mb-4">{tPage('tabs.technical', 'globalGoodDetails')}</h2>
          <TechnicalTab globalGood={globalGood} />
        </div>
        
        <Separator />
        
        {/* Deployment Section */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Deployment</h2>
          <DeploymentTab globalGood={globalGood} />
        </div>
        
        <Separator />
        
        {/* Community Section */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Community</h2>
          <CommunityTab globalGood={globalGood} />
        </div>
        
        <Separator />
        
        {/* Maturity Section */}
        <div>
          <h2 className="text-2xl font-bold mb-4">{tPage('tabs.maturity', 'globalGoodDetails')}</h2>
          <MaturityTab globalGood={globalGood} />
        </div>
        
        <Separator />
        
        {/* Standards Section */}
        <div>
          <h2 className="text-2xl font-bold mb-4">{tPage('tabs.standards', 'globalGoodDetails')}</h2>
          <StandardsTab globalGood={globalGood} />
        </div>
        
        <Separator />
        
        {/* Use Cases Section */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Use Cases</h2>
          <UseCasesTab globalGood={globalGood} />
        </div>
      </div>
    </div>
  );
}
