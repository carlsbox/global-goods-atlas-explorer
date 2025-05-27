
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useGlobalGoodHybrid } from '@/lib/api';
import { LoadingState } from '@/components/global-good/LoadingState';
import { ErrorState } from '@/components/global-good/ErrorState';
import { MaturitySection } from '@/components/global-good/MaturitySection';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ExternalLink, Github } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

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

  console.log('GlobalGoodDetailsPageHybrid data:', globalGood);

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

  const displayName = typeof globalGood.name === 'string' ? globalGood.name : globalGood.name?.en || 'Unknown';
  const displaySummary = typeof globalGood.summary === 'string' ? globalGood.summary : globalGood.summary?.en || '';
  const displayDescription = typeof globalGood.description === 'string' ? globalGood.description : globalGood.description?.en || '';

  return (
    <div className="container mx-auto py-6">
      <div className="mb-6">
        <Button variant="ghost" asChild className="mb-4">
          <Link to="/global-goods" className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            {t('backToGlobalGoods')}
          </Link>
        </Button>

        {/* Header Section */}
        <div className="bg-card rounded-lg p-6 mb-6">
          <div className="flex items-start gap-4">
            {globalGood.logo ? (
              <img 
                src={globalGood.logo} 
                alt={displayName} 
                className="h-16 w-16 rounded object-contain"
              />
            ) : (
              <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center">
                <span className="text-primary font-semibold text-xl">
                  {displayName.charAt(0)}
                </span>
              </div>
            )}
            
            <div className="flex-1">
              <h1 className="text-3xl font-bold mb-2">{displayName}</h1>
              <p className="text-lg text-muted-foreground mb-4">{displaySummary}</p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {globalGood.sectors?.map((sector) => (
                  <Badge key={sector} variant="secondary">
                    {sector}
                  </Badge>
                ))}
              </div>
              
              <div className="flex gap-2">
                {globalGood.website && (
                  <Button variant="outline" size="sm" asChild>
                    <a href={globalGood.website} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Website
                    </a>
                  </Button>
                )}
                {globalGood.source_code?.primary && (
                  <Button variant="outline" size="sm" asChild>
                    <a href={globalGood.source_code.primary} target="_blank" rel="noopener noreferrer">
                      <Github className="w-4 h-4 mr-2" />
                      Source Code
                    </a>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
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
          <Card>
            <CardHeader>
              <CardTitle>Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{displayDescription}</p>
              
              {globalGood.countries && globalGood.countries.length > 0 && (
                <div className="mt-4">
                  <h4 className="font-medium mb-2">Deployed in:</h4>
                  <p className="text-sm text-muted-foreground">
                    {globalGood.countries.length} countries
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="technical" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Technical Information</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Technical details for {displayName} (Hybrid)</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="standards" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Standards & Interoperability</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Standards information for {displayName} (Hybrid)</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="useCases" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Use Cases</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Use cases for {displayName} (Hybrid)</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="maturity" className="space-y-6">
          <MaturitySection globalGood={globalGood} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
