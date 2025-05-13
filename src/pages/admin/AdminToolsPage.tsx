
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useI18n } from '@/hooks/useI18n';

const AdminToolsPage = () => {
  const { tPage } = useI18n();

  return (
    <div className="container p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">{tPage('tools.title', 'admin')}</h1>
        <p className="text-muted-foreground">{tPage('tools.description', 'admin')}</p>
      </div>

      <Tabs defaultValue="utilities" className="space-y-6">
        <TabsList>
          <TabsTrigger value="utilities">{tPage('tools.utilities', 'admin')}</TabsTrigger>
        </TabsList>
        
        <TabsContent value="utilities" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>{tPage('tools.utilities', 'admin')}</CardTitle>
              <CardDescription>
                {tPage('tools.description', 'admin')}
              </CardDescription>
            </CardHeader>
            <CardContent className="py-4">
              <p className="text-center text-muted-foreground py-8">
                {tPage('tools.noUtilities', 'admin')}
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminToolsPage;
