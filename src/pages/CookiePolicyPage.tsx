
import React from 'react';
import { PageLayout } from '@/components/layout/PageLayout';
import { useContentLoader } from '@/hooks/useContentLoader';

const CookiePolicyPage = () => {
  const { content } = useContentLoader('pages/cookie');

  return (
    <PageLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold">{content?.title || 'Cookie Policy'}</h1>
        
        <section className="space-y-4">
          <p>{content?.description}</p>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h2 className="text-xl font-semibold mb-2">{content?.necessary}</h2>
              <p className="text-muted-foreground">{content?.necessaryDesc}</p>
            </div>
            
            <div>
              <h2 className="text-xl font-semibold mb-2">{content?.analytics}</h2>
              <p className="text-muted-foreground">{content?.analyticsDesc}</p>
            </div>
            
            <div>
              <h2 className="text-xl font-semibold mb-2">{content?.preferences}</h2>
              <p className="text-muted-foreground">{content?.preferencesDesc}</p>
            </div>
          </div>
        </section>
      </div>
    </PageLayout>
  );
};

export default CookiePolicyPage;
