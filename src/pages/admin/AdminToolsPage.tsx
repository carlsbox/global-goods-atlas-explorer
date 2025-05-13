
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const AdminToolsPage = () => {
  return (
    <div className="container p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Admin Tools</h1>
        <p className="text-muted-foreground">Utilities and tools for data management</p>
      </div>

      <Tabs defaultValue="utilities" className="space-y-6">
        <TabsList>
          <TabsTrigger value="utilities">Utilities</TabsTrigger>
        </TabsList>
        
        <TabsContent value="utilities" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Admin Utilities</CardTitle>
              <CardDescription>
                Administrative utilities and tools
              </CardDescription>
            </CardHeader>
            <CardContent className="py-4">
              <p className="text-center text-muted-foreground py-8">
                No additional utilities are available at this time.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminToolsPage;
