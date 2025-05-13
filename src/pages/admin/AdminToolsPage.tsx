
import React from 'react';
import { DataConverterTool } from '@/components/admin/DataConverterTool';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const AdminToolsPage = () => {
  return (
    <div className="container p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Admin Tools</h1>
        <p className="text-muted-foreground">Utilities and tools for data management</p>
      </div>

      <Tabs defaultValue="converters" className="space-y-6">
        <TabsList>
          <TabsTrigger value="converters">Data Converters</TabsTrigger>
          <TabsTrigger value="utilities">Utilities</TabsTrigger>
        </TabsList>
        
        <TabsContent value="converters" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Data Conversion Tools</CardTitle>
              <CardDescription>
                Tools for converting and migrating data between formats
              </CardDescription>
            </CardHeader>
            <CardContent>
              <DataConverterTool />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="utilities" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Other Utilities</CardTitle>
              <CardDescription>
                Additional administrative utilities
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
