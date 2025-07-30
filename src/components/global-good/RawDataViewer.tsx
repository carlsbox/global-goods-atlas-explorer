
import React, { useState, useMemo } from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { FileJson, Download, ChevronDown, Info, Database } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface RawDataViewerProps {
  data: any;
  title?: string;
  globalGoodName?: string;
}

interface ExportOptions {
  type: 'full' | 'metadata' | 'resources' | 'visible';
  includeNulls: boolean;
}

export const RawDataViewer: React.FC<RawDataViewerProps> = ({ 
  data, 
  title = "Raw Data Viewer",
  globalGoodName = "global-good"
}) => {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [exportData, setExportData] = useState<string>('');
  const [filename, setFilename] = useState<string>('');

  const processedData = useMemo(() => {
    if (!data) return { full: {}, metadata: {}, resources: {}, visible: {} };

    const metadata = {
      id: data.id || data.ID,
      name: data.name || data.Name,
      type: data.type || data.Type,
      license: data.license || data.License,
      website: data.website || data.Website,
      classifications: data.classifications || data.Classifications,
      maturity: data.maturity || data.Maturity,
      reach: data.reach || data.Reach
    };

    const resources = {
      resources: data.resources || data.Resources,
      documentation: data.documentation,
      screenshots: data.screenshots,
      linkedInitiatives: data.linkedInitiatives || data.LinkedInitiatives
    };

    const visible = {
      ...metadata,
      description: data.description || data.Description,
      summary: data.summary || data.Summary,
      primarySector: data.primarySector || data.PrimarySector,
      countries: data.countries || data.Countries
    };

    return {
      full: data,
      metadata: Object.fromEntries(Object.entries(metadata).filter(([_, v]) => v != null)),
      resources: Object.fromEntries(Object.entries(resources).filter(([_, v]) => v != null)),
      visible: Object.fromEntries(Object.entries(visible).filter(([_, v]) => v != null))
    };
  }, [data]);

  const dataStats = useMemo(() => {
    const jsonString = JSON.stringify(data, null, 2);
    const fieldCount = Object.keys(data || {}).length;
    const sizeKB = Math.round(new Blob([jsonString]).size / 1024 * 100) / 100;
    
    return {
      fieldCount,
      sizeKB,
      hasResources: !!(data?.resources || data?.Resources),
      hasMaturity: !!(data?.maturity || data?.Maturity),
      hasClassifications: !!(data?.classifications || data?.Classifications)
    };
  }, [data]);

  const handleExport = (options: ExportOptions) => {
    let dataToExport;
    let filenameSuffix;

    switch (options.type) {
      case 'metadata':
        dataToExport = processedData.metadata;
        filenameSuffix = 'metadata';
        break;
      case 'resources':
        dataToExport = processedData.resources;
        filenameSuffix = 'resources';
        break;
      case 'visible':
        dataToExport = processedData.visible;
        filenameSuffix = 'visible-data';
        break;
      default:
        dataToExport = processedData.full;
        filenameSuffix = 'full-data';
    }

    const formattedData = JSON.stringify(dataToExport, null, 2);
    const timestamp = new Date().toISOString().split('T')[0];
    const generatedFilename = `${globalGoodName.toLowerCase().replace(/\s+/g, '-')}_${filenameSuffix}_${timestamp}.json`;
    
    setExportData(formattedData);
    setFilename(generatedFilename);
  };

  const handleDownload = () => {
    const blob = new Blob([exportData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Download started",
      description: `${filename} is being downloaded`,
    });
  };

  const handleCopyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(exportData);
      toast({
        title: "Copied to clipboard",
        description: "JSON data has been copied to your clipboard",
      });
    } catch (error) {
      toast({
        title: "Copy failed",
        description: "Failed to copy data to clipboard",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <FileJson className="h-4 w-4" />
          View JSON Data
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[95vw] w-full max-h-[95vh] h-full">
        <DialogHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <div className="flex flex-col space-y-1">
            <DialogTitle className="flex items-center gap-2">
              <Database className="h-5 w-5" />
              {title}
            </DialogTitle>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span>{dataStats.fieldCount} fields</span>
              <span>{dataStats.sizeKB} KB</span>
              <div className="flex gap-1">
                {dataStats.hasResources && <Badge variant="secondary" className="text-xs">Resources</Badge>}
                {dataStats.hasMaturity && <Badge variant="secondary" className="text-xs">Maturity</Badge>}
                {dataStats.hasClassifications && <Badge variant="secondary" className="text-xs">Classifications</Badge>}
              </div>
            </div>
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2">
                <Download className="h-4 w-4" />
                Export
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem onClick={() => handleExport({ type: 'full', includeNulls: true })}>
                <FileJson className="h-4 w-4 mr-2" />
                Full Raw Data
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleExport({ type: 'visible', includeNulls: false })}>
                <Info className="h-4 w-4 mr-2" />
                Page Visible Data
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleExport({ type: 'metadata', includeNulls: false })}>
                <Database className="h-4 w-4 mr-2" />
                Metadata Only
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleExport({ type: 'resources', includeNulls: false })}>
                <FileJson className="h-4 w-4 mr-2" />
                Resources Only
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </DialogHeader>
        
        {exportData && (
          <div className="flex items-center justify-between p-3 bg-muted rounded-lg mb-4">
            <div className="flex flex-col gap-1">
              <span className="text-sm font-medium">Ready to export: {filename}</span>
              <span className="text-xs text-muted-foreground">
                {Math.round(new Blob([exportData]).size / 1024 * 100) / 100} KB
              </span>
            </div>
            <div className="flex gap-2">
              <Button onClick={handleCopyToClipboard} variant="outline" size="sm">
                Copy
              </Button>
              <Button onClick={handleDownload} size="sm">
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
            </div>
          </div>
        )}

        <Tabs defaultValue="raw" className="flex flex-col h-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="raw">Raw Data</TabsTrigger>
            <TabsTrigger value="metadata">Metadata</TabsTrigger>
            <TabsTrigger value="resources">Resources</TabsTrigger>
            <TabsTrigger value="visible">Page Data</TabsTrigger>
          </TabsList>
          
          <TabsContent value="raw" className="flex-1 mt-4">
            <ScrollArea className="h-[55vh] w-full">
              <pre className="whitespace-pre-wrap text-xs p-4 bg-muted rounded-md overflow-auto">
                {JSON.stringify(processedData.full, null, 2)}
              </pre>
            </ScrollArea>
          </TabsContent>
          
          <TabsContent value="metadata" className="flex-1 mt-4">
            <ScrollArea className="h-[55vh] w-full">
              <pre className="whitespace-pre-wrap text-xs p-4 bg-muted rounded-md overflow-auto">
                {JSON.stringify(processedData.metadata, null, 2)}
              </pre>
            </ScrollArea>
          </TabsContent>
          
          <TabsContent value="resources" className="flex-1 mt-4">
            <ScrollArea className="h-[55vh] w-full">
              <pre className="whitespace-pre-wrap text-xs p-4 bg-muted rounded-md overflow-auto">
                {JSON.stringify(processedData.resources, null, 2)}
              </pre>
            </ScrollArea>
          </TabsContent>
          
          <TabsContent value="visible" className="flex-1 mt-4">
            <div className="mb-3 p-3 bg-blue-50 dark:bg-blue-950 rounded-lg border">
              <p className="text-sm text-blue-700 dark:text-blue-300 flex items-center gap-2">
                <Info className="h-4 w-4" />
                This shows only the data currently displayed on the page interface
              </p>
            </div>
            <ScrollArea className="h-[50vh] w-full">
              <pre className="whitespace-pre-wrap text-xs p-4 bg-muted rounded-md overflow-auto">
                {JSON.stringify(processedData.visible, null, 2)}
              </pre>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};
