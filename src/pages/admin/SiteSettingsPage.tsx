
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useI18n } from '@/hooks/useI18n';

const SiteSettingsPage = () => {
  const { tPage } = useI18n();

  return (
    <div className="container p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">{tPage('settings.title', 'admin')}</h1>
        <p className="text-muted-foreground">{tPage('settings.description', 'admin')}</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{tPage('settings.general.title', 'admin')}</CardTitle>
          <CardDescription>
            {tPage('settings.general.description', 'admin')}
          </CardDescription>
        </CardHeader>
        <CardContent className="py-4">
          <p className="text-center text-muted-foreground py-8">
            {tPage('settings.comingSoon', 'admin')}
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default SiteSettingsPage;
