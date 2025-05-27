
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useGlobalGoodHybrid } from '@/lib/api';
import { GlobalGoodHeaderFlat } from '@/components/global-good/GlobalGoodHeaderFlat';
import { OverviewTabFlat } from '@/components/global-good/OverviewTabFlat';
import { TechnicalInformationSection } from '@/components/global-good/TechnicalInformationSection';
import { LoadingState } from '@/components/global-good/LoadingState';
import { ErrorState } from '@/components/global-good/ErrorState';
import { MaturitySection } from '@/components/global-good/MaturitySection';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export default function GlobalGoodDetailsPageHybrid() {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation('pages/globalGoodDetails');
  const [activeTab, setActiveTab] = useState('overview');

  // Use the hybrid hook for full data
  const { 
    data: globalGood, 
    isLoading, 
    isError,
    refetch
  } = useGlobalGoodHybrid(id);

  if (isLoading) {
    return (
      <div className="container mx-auto py-6">
        <LoadingState message={t('loading')} />
      </div>
    );
  }

  if (isError || !globalGood) {
    return (
      <div className="container mx-auto py-6">
        <ErrorState 
          message={t('error')} 
          onRetry={() => refetch()}
        />
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6">
      <div className="mb-6">
        <Button variant="ghost" asChild className="mb-4">
          <Link to="/global-goods" className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            {t('backToGlobalGoods')}
          </Link>
        </Button>

        <GlobalGoodHeaderFlat globalGood={globalGood} />
      </div>

      <Tabs 
        value={activeTab} 
        onValueChange={setActiveTab} 
        className="space-y-6"
      >
        <TabsList className="bg-muted grid w-full grid-cols-2 md:grid-cols-5 gap-2">
          <TabsTrigger value="overview">{t('tabs.overview')}</TabsTrigger>
          <TabsTrigger value="technical">{t('tabs.technical')}</TabsTrigger>
          <TabsTrigger value="standards">{t('tabs.standards')}</TabsTrigger>
          <TabsTrigger value="useCases">{t('tabs.useCases')}</TabsTrigger>
          <TabsTrigger value="maturity">{t('tabs.maturity')}</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <OverviewTabFlat globalGood={globalGood} />
        </TabsContent>

        <TabsContent value="technical" className="space-y-6">
          <TechnicalInformationSection globalGood={globalGood} />
        </TabsContent>

        <TabsContent value="standards" className="space-y-6">
          {/* Standards content here */}
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="text-xl font-medium">Standards & Interoperability</h3>
            <p>Standards information for {globalGood.name} (Hybrid)</p>
          </div>
        </TabsContent>

        <TabsContent value="useCases" className="space-y-6">
          {/* Use cases content here */}
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="text-xl font-medium">Use Cases</h3>
            <p>Use cases for {globalGood.name} (Hybrid)</p>
          </div>
        </TabsContent>

        <TabsContent value="maturity" className="space-y-6">
          <MaturitySection globalGood={globalGood} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
