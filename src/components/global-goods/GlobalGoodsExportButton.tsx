import { useState } from 'react';
import { Download, FileJson, FileText, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { GlobalGoodFlat } from '@/lib/types/globalGoodFlat';
import { useGlobalGoodsExport, ExportOptions } from '@/hooks/useGlobalGoodsExport';
import { useToast } from '@/components/ui/use-toast';

interface GlobalGoodsExportButtonProps {
  goods: GlobalGoodFlat[];
  filteredGoods?: GlobalGoodFlat[];
  isFiltered?: boolean;
}

export function GlobalGoodsExportButton({ 
  goods, 
  filteredGoods, 
  isFiltered = false 
}: GlobalGoodsExportButtonProps) {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [previewData, setPreviewData] = useState<any>(null);
  const [selectedFormat, setSelectedFormat] = useState<string>('');
  const { generateExportData, downloadExport } = useGlobalGoodsExport(goods, filteredGoods);
  const { toast } = useToast();

  const currentGoods = isFiltered && filteredGoods ? filteredGoods : goods;
  const exportCount = currentGoods.length;

  const handleExport = (options: ExportOptions) => {
    try {
      const exportData = generateExportData(options);
      
      // For preview, parse the data if it's a string (CSV)
      let preview: any;
      if (options.format === 'csv') {
        const lines = exportData.data.split('\n').slice(0, 6); // First 5 rows + header
        preview = lines.join('\n');
      } else {
        const parsed = JSON.parse(exportData.data);
        preview = {
          metadata: parsed.metadata,
          global_goods: parsed.global_goods.slice(0, 3), // First 3 items
          preview_note: `Showing first 3 of ${parsed.global_goods.length} items`
        };
      }
      
      setPreviewData({ 
        ...exportData, 
        preview,
        fullData: exportData.data 
      });
      setSelectedFormat(options.format);
      setIsPreviewOpen(true);
    } catch (error) {
      console.error('Export generation failed:', error);
      toast({
        title: "Export failed",
        description: "There was an error generating the export",
        variant: "destructive",
      });
    }
  };

  const handleDownload = () => {
    if (previewData) {
      downloadExport({
        data: previewData.fullData,
        filename: previewData.filename,
        format: previewData.format,
        mimeType: previewData.mimeType
      });
      setIsPreviewOpen(false);
    }
  };

  const handleCopyToClipboard = async () => {
    if (previewData) {
      try {
        await navigator.clipboard.writeText(previewData.fullData);
        toast({
          title: "Copied to clipboard",
          description: "Export data has been copied to your clipboard",
        });
      } catch (error) {
        toast({
          title: "Copy failed",
          description: "Failed to copy to clipboard",
          variant: "destructive",
        });
      }
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export {isFiltered ? `${exportCount} filtered` : `all ${exportCount}`} items
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel>Export Format</DropdownMenuLabel>
          <DropdownMenuSeparator />
          
          <DropdownMenuItem onClick={() => handleExport({ 
            format: 'csv', 
            includeFiltered: isFiltered 
          })}>
            <FileText className="w-4 h-4 mr-2" />
            <span className="flex-1">CSV (Table format)</span>
            <span className="text-xs text-muted-foreground">Excel</span>
          </DropdownMenuItem>
          
          <DropdownMenuItem onClick={() => handleExport({ 
            format: 'json-summary', 
            includeFiltered: isFiltered 
          })}>
            <FileJson className="w-4 h-4 mr-2" />
            <span className="flex-1">JSON (Summary)</span>
            <span className="text-xs text-muted-foreground">Key fields</span>
          </DropdownMenuItem>
          
          <DropdownMenuItem onClick={() => handleExport({ 
            format: 'json-full', 
            includeFiltered: isFiltered 
          })}>
            <FileJson className="w-4 h-4 mr-2" />
            <span className="flex-1">JSON (Complete)</span>
            <span className="text-xs text-muted-foreground">All data</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
        <DialogContent className="max-w-4xl">
          <div className="max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                Export Preview
                <Badge variant="outline">
                  {selectedFormat === 'csv' ? 'CSV Format' : 'JSON Format'}
                </Badge>
              </DialogTitle>
              <DialogDescription className="flex items-center gap-2 mt-2">
                <Check className="w-4 h-4 text-green-500" />
                Ready to export {exportCount} Global Goods
              </DialogDescription>
            </DialogHeader>

            <div className="border rounded-lg p-4 bg-muted/50 mt-4">
              <div className="flex flex-col gap-2 mb-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Filename:</span>
                  <code className="text-xs bg-background px-2 py-1 rounded">
                    {previewData?.filename}
                  </code>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">License:</span>
                  <Badge variant="secondary" className="text-xs">
                    CC BY-SA 4.0
                  </Badge>
                </div>
              </div>

              <ScrollArea className="h-[300px] w-full rounded border bg-background">
                <pre className="p-4 text-xs whitespace-pre-wrap break-words">
                  {typeof previewData?.preview === 'string' 
                    ? previewData.preview 
                    : JSON.stringify(previewData?.preview, null, 2)}
                </pre>
              </ScrollArea>
              
              {previewData?.preview?.preview_note && (
                <p className="text-xs text-muted-foreground mt-2">
                  {previewData.preview.preview_note}
                </p>
              )}
            </div>

            <DialogFooter className="flex flex-row justify-end space-x-2 mt-4">
              <Button variant="outline" onClick={handleCopyToClipboard}>
                Copy to Clipboard
              </Button>
              <Button onClick={handleDownload}>
                <Download className="w-4 h-4 mr-2" />
                Download File
              </Button>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}