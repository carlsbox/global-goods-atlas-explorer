
import { useParams, Link } from "react-router-dom";
import { useGlobalGood } from "@/lib/api";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft } from "lucide-react";

// Import our components
import { GlobalGoodHeader } from "@/components/global-good/GlobalGoodHeader";
import { OverviewTab } from "@/components/global-good/OverviewTab";
import { TechnicalTab } from "@/components/global-good/TechnicalTab";
import { StandardsTab } from "@/components/global-good/StandardsTab";
import { UseCasesTab } from "@/components/global-good/UseCasesTab";
import { MaturityTab } from "@/components/global-good/MaturityTab";
import { DeploymentLocations } from "@/components/global-good/DeploymentLocations";
import { LoadingState } from "@/components/global-good/LoadingState";
import { ErrorState } from "@/components/global-good/ErrorState";
import { useI18n } from "@/hooks/useI18n";

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
    <>
      {/* Breadcrumb Navigation */}
      <div className="mb-6">
        <Link 
          to="/global-goods" 
          className="text-muted-foreground hover:text-primary flex items-center"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          {tPage('backToGlobalGoods', 'globalGoodDetails')}
        </Link>
      </div>
      
      {/* Header Section */}
      <GlobalGoodHeader globalGood={globalGood} />
      
      {/* Main Content */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Column - Details */}
        <div className="md:col-span-2">
          <Tabs defaultValue="overview">
            <TabsList>
              <TabsTrigger value="overview">{tPage('tabs.overview', 'globalGoodDetails')}</TabsTrigger>
              <TabsTrigger value="technical">{tPage('tabs.technical', 'globalGoodDetails')}</TabsTrigger>
              <TabsTrigger value="standards">{tPage('tabs.standards', 'globalGoodDetails')}</TabsTrigger>
              <TabsTrigger value="maturity">{tPage('tabs.maturity', 'globalGoodDetails')}</TabsTrigger>
              <TabsTrigger value="use-cases">{tPage('tabs.useCases', 'globalGoodDetails')}</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-4">
              <OverviewTab globalGood={globalGood} />
            </TabsContent>
            
            <TabsContent value="technical" className="mt-4">
              <TechnicalTab globalGood={globalGood} />
            </TabsContent>
            
            <TabsContent value="standards" className="mt-4">
              <StandardsTab globalGood={globalGood} />
            </TabsContent>
            
            <TabsContent value="maturity" className="mt-4">
              <MaturityTab globalGood={globalGood} />
            </TabsContent>
            
            <TabsContent value="use-cases" className="mt-4">
              <UseCasesTab globalGood={globalGood} />
            </TabsContent>
          </Tabs>
        </div>
        
        {/* Right Column - Deployment Locations */}
        <div>
          <DeploymentLocations globalGood={globalGood} />
        </div>
      </div>
    </>
  );
}
