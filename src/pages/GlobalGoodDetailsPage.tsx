
import { useParams, Link } from "react-router-dom";
import { useGlobalGood } from "@/lib/api";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft } from "lucide-react";

// Import our components
import { GlobalGoodHeader } from "@/components/global-good/GlobalGoodHeader";
import { OverviewTab } from "@/components/global-good/OverviewTab";
import { TechnicalTab } from "@/components/global-good/TechnicalTab";
import { StandardsTab } from "@/components/global-good/StandardsTab";
import { MaturityTab } from "@/components/global-good/MaturityTab";
import { DeploymentTab } from "@/components/global-good/DeploymentTab";
import { CommunityTab } from "@/components/global-good/CommunityTab";
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
    <div className="container px-4 py-8 mx-auto max-w-7xl">
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
      <div className="mt-8">
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="mb-6 w-full max-w-3xl mx-auto flex flex-wrap justify-center border-b pb-1">
            <TabsTrigger value="overview">{tPage('tabs.overview', 'globalGoodDetails')}</TabsTrigger>
            <TabsTrigger value="technical">{tPage('tabs.technical', 'globalGoodDetails')}</TabsTrigger>
            <TabsTrigger value="deployment">Deployment</TabsTrigger>
            <TabsTrigger value="community">Community</TabsTrigger>
            <TabsTrigger value="maturity">{tPage('tabs.maturity', 'globalGoodDetails')}</TabsTrigger>
            <TabsTrigger value="standards">{tPage('tabs.standards', 'globalGoodDetails')}</TabsTrigger>
          </TabsList>

          <div className="mt-6">
            <TabsContent value="overview">
              <OverviewTab globalGood={globalGood} />
            </TabsContent>
            
            <TabsContent value="technical">
              <TechnicalTab globalGood={globalGood} />
            </TabsContent>
            
            <TabsContent value="deployment">
              <DeploymentTab globalGood={globalGood} />
            </TabsContent>
            
            <TabsContent value="community">
              <CommunityTab globalGood={globalGood} />
            </TabsContent>
            
            <TabsContent value="maturity">
              <MaturityTab globalGood={globalGood} />
            </TabsContent>
            
            <TabsContent value="standards">
              <StandardsTab globalGood={globalGood} />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
}
