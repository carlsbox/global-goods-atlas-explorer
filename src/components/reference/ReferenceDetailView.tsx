import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowLeft, Download, FileJson } from "lucide-react";
import { ReferenceDataCategory, downloadJSON } from "@/lib/simpleReferenceLoader";
import { RawDataViewer } from "@/components/global-good/RawDataViewer";

interface ReferenceDetailViewProps {
  category: ReferenceDataCategory;
  data: any;
  onBack: () => void;
}

export const ReferenceDetailView: React.FC<ReferenceDetailViewProps> = ({
  category,
  data,
  onBack
}) => {
  const handleDownload = () => {
    downloadJSON(data, `${category.id}.json`);
  };

  const renderDataTable = () => {
    if (!data) return null;

    // Handle different data structures
    let items: any[] = [];
    
    if (Array.isArray(data)) {
      items = data;
    } else if (typeof data === 'object') {
      // Convert object to array for display
      items = Object.entries(data).map(([key, value]) => ({
        key,
        ...(typeof value === 'object' && value !== null ? value : { value })
      }));
    }

    if (items.length === 0) return <p>No data available</p>;

    // Get all unique keys from the data for table headers
    const allKeys = new Set<string>();
    items.forEach(item => {
      if (typeof item === 'object' && item !== null) {
        Object.keys(item).forEach(key => allKeys.add(key));
      }
    });

    const headers = Array.from(allKeys);

    return (
      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              {headers.map((header) => (
                <TableHead key={header} className="font-medium">
                  {header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((item, index) => (
              <TableRow key={index}>
                {headers.map((header) => (
                  <TableCell key={header} className="max-w-xs">
                    {typeof item[header] === 'object' 
                      ? JSON.stringify(item[header]) 
                      : String(item[header] || '')}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={onBack}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Overview
          </Button>
          <div>
            <h1 className="text-2xl font-bold">{category.name}</h1>
            <p className="text-muted-foreground">{category.description}</p>
          </div>
        </div>
        
        <div className="flex gap-2">
          <RawDataViewer data={data} title={`${category.name} - Raw JSON Data`} />
          <Button variant="outline" onClick={handleDownload}>
            <Download className="h-4 w-4 mr-2" />
            Download JSON
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Data Table</CardTitle>
        </CardHeader>
        <CardContent>
          {renderDataTable()}
        </CardContent>
      </Card>
    </div>
  );
};