import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ChevronDown, Download, FileText, AlertTriangle, Check } from 'lucide-react';
import { GlobalGoodFlat } from '@/lib/types/globalGoodFlat';
import { useToast } from '@/hooks/use-toast';

interface GlobalGoodExportProps {
  formData: Partial<GlobalGoodFlat>;
  completionPercentage: number;
}

interface ExportOptions {
  includeOptional: boolean;
  format: 'complete' | 'minimal' | 'draft';
}

export function GlobalGoodExport({ formData, completionPercentage }: GlobalGoodExportProps) {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<ExportOptions>({
    includeOptional: true,
    format: 'complete'
  });
  const [exportData, setExportData] = useState<string>('');
  const { toast } = useToast();

  const generateExportData = (options: ExportOptions): string => {
    let dataToExport = { ...formData };

    // Clean up the data based on export options
    if (options.format === 'minimal') {
      // Only include essential fields
      const minimalFields = ['ID', 'Name', 'Website', 'GlobalGoodsType', 'License', 'ProductOverview'];
      dataToExport = Object.fromEntries(
        Object.entries(dataToExport).filter(([key]) => minimalFields.includes(key))
      );
    } else if (options.format === 'draft') {
      // Include all fields, even if empty
      // No filtering needed
    } else {
      // Complete format - remove empty fields
      dataToExport = Object.fromEntries(
        Object.entries(dataToExport).filter(([, value]) => {
          if (Array.isArray(value)) return value.length > 0;
          if (typeof value === 'object' && value !== null) return Object.keys(value).length > 0;
          return value !== undefined && value !== null && value !== '';
        })
      );
    }

    return JSON.stringify(dataToExport, null, 2);
  };

  const handleExport = (options: ExportOptions) => {
    setSelectedOptions(options);
    const data = generateExportData(options);
    setExportData(data);
    setIsPreviewOpen(true);
  };

  const handleDownload = () => {
    const filename = `global-good-${formData.ID || 'untitled'}-${selectedOptions.format}.json`;
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
      title: "Export Downloaded",
      description: `${filename} has been downloaded successfully.`,
    });
  };

  const handleCopyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(exportData);
      toast({
        title: "Copied to Clipboard",
        description: "The JSON data has been copied to your clipboard.",
      });
    } catch (error) {
      toast({
        title: "Copy Failed",
        description: "Failed to copy to clipboard. Please copy manually.",
        variant: "destructive",
      });
    }
  };

  const getExportStatusBadge = () => {
    if (completionPercentage >= 80) {
      return <Badge className="bg-green-100 text-green-800">Ready</Badge>;
    } else if (completionPercentage >= 50) {
      return <Badge className="bg-yellow-100 text-yellow-800">Draft</Badge>;
    } else {
      return <Badge className="bg-red-100 text-red-800">Incomplete</Badge>;
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Export
            <ChevronDown className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuItem onClick={() => handleExport({ includeOptional: true, format: 'complete' })}>
            <div className="flex flex-col">
              <span className="font-medium">Complete Export</span>
              <span className="text-xs text-muted-foreground">All filled fields, production ready</span>
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleExport({ includeOptional: false, format: 'minimal' })}>
            <div className="flex flex-col">
              <span className="font-medium">Minimal Export</span>
              <span className="text-xs text-muted-foreground">Essential fields only</span>
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleExport({ includeOptional: true, format: 'draft' })}>
            <div className="flex flex-col">
              <span className="font-medium">Draft Export</span>
              <span className="text-xs text-muted-foreground">All fields, including empty ones</span>
            </div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-hidden flex flex-col">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              <span>Export Preview - {selectedOptions.format}</span>
              {getExportStatusBadge()}
            </DialogTitle>
          </DialogHeader>

          <div className="flex-1 overflow-hidden flex flex-col">
            {/* Export warnings/info */}
            <div className="mb-4">
              {completionPercentage < 50 && (
                <Alert>
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>
                    This export contains incomplete data. Consider filling out more sections before using in production.
                  </AlertDescription>
                </Alert>
              )}
              {completionPercentage >= 80 && (
                <Alert className="border-green-200 bg-green-50">
                  <Check className="h-4 w-4 text-green-600" />
                  <AlertDescription className="text-green-800">
                    This global good appears complete and ready for use.
                  </AlertDescription>
                </Alert>
              )}
            </div>

            {/* JSON Preview */}
            <div className="flex-1 overflow-hidden">
              <div className="text-sm text-muted-foreground mb-2">
                Filename: global-good-{formData.ID || 'untitled'}-{selectedOptions.format}.json
              </div>
              <pre className="text-xs bg-muted p-4 rounded-lg overflow-auto h-full border">
                <code>{exportData}</code>
              </pre>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-2 pt-4 border-t">
              <Button variant="outline" onClick={handleCopyToClipboard}>
                <FileText className="h-4 w-4 mr-2" />
                Copy to Clipboard
              </Button>
              <Button onClick={handleDownload}>
                <Download className="h-4 w-4 mr-2" />
                Download JSON
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}