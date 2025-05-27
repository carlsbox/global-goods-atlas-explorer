
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
import { useI18n } from '@/hooks/useI18n';

// Helper function to convert GlobalGood to GlobalGoodFlat format
const convertToFlat = (globalGood: any): any => {
  return {
    ID: globalGood.id || '',
    Name: typeof globalGood.name === 'string' ? globalGood.name : globalGood.name?.en || '',
    Website: {
      main: globalGood.coreMetadata?.website?.[0] || { name: '', url: '', description: '' }
    },
    GlobalGoodsType: globalGood.coreMetadata?.globalGoodsType || [],
    ProductOverview: {
      Summary: typeof globalGood.summary === 'string' ? globalGood.summary : globalGood.summary?.en || '',
      Description: typeof globalGood.description === 'string' ? globalGood.description : globalGood.description?.en || '',
      PrimaryFunctionality: globalGood.productOverview?.primaryFunctionality || '',
      Users: globalGood.productOverview?.users || '',
      Languages: globalGood.productOverview?.languages || [],
      Screenshots: globalGood.productOverview?.screenshots || []
    },
    Reach: globalGood.reach || { ImplementationCountries: [] },
    Maturity: globalGood.maturity || { Scores: [] },
    ...globalGood
  };
};

// Helper function to get text value from multilingual or string
const getTextValue = (value: string | { en?: string; fr?: string; es?: string } | undefined): string => {
  if (!value) return '';
  if (typeof value === 'string') return value;
  return value.en || value.fr || value.es || '';
};

export default function GlobalGoodDetailsPageHybrid() {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation('pages/globalGoodDetails');
  const { getText } = useI18n();
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

  // Convert to flat format for components that expect it
  const globalGoodFlat = convertToFlat(globalGood);

  return (
    <div className="container mx-auto py-6">
      <div className="mb-6">
        <Button variant="ghost" asChild className="mb-4">
          <Link to="/global-goods" className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            {t('backToGlobalGoods')}
          </Link>
        </Button>

        <GlobalGoodHeaderFlat globalGood={globalGoodFlat} />
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
          <OverviewTabFlat globalGood={globalGoodFlat} />
        </TabsContent>

        <TabsContent value="technical" className="space-y-6">
          <TechnicalInformationSection globalGood={globalGoodFlat} />
        </TabsContent>

        <TabsContent value="standards" className="space-y-6">
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="text-xl font-medium">Standards & Interoperability</h3>
            <p>Standards information for {getTextValue(globalGood.name)} (Hybrid)</p>
          </div>
        </TabsContent>

        <TabsContent value="useCases" className="space-y-6">
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="text-xl font-medium">Use Cases</h3>
            <p>Use cases for {getTextValue(globalGood.name)} (Hybrid)</p>
          </div>
        </TabsContent>

        <TabsContent value="maturity" className="space-y-6">
          <MaturitySection globalGood={globalGoodFlat} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
