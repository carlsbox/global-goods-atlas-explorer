
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator 
} from '@/components/ui/dropdown-menu';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Download, FileText, Database, Info, Clipboard } from 'lucide-react';
import { useUseCaseExport, ExportOptions, ExportData } from '@/hooks/useUseCaseExport';
import { UseCase } from '@/lib/types/useCase';
import { useToast } from '@/hooks/use-toast';

interface ExportButtonProps {
  useCase: UseCase;
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'default' | 'sm' | 'lg';
}

export function ExportButton({ useCase, variant = 'outline', size = 'sm' }: ExportButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentExportData, setCurrentExportData] = useState<ExportData | null>(null);
  const { generateExportData, downloadJSON } = useUseCaseExport(useCase);
  const { toast } = useToast();

  const handleExport = (options: ExportOptions) => {
    const exportData = generateExportData(options);
    setCurrentExportData(exportData);
    setIsOpen(true);
  };

  const handleDownload = () => {
    if (currentExportData) {
      downloadJSON(currentExportData);
      setIsOpen(false);
    }
  };

  const handleCopyToClipboard = async () => {
    if (currentExportData) {
      try {
        const jsonString = JSON.stringify(currentExportData.data, null, 2);
        await navigator.clipboard.writeText(jsonString);
        toast({
          title: "Copied to clipboard",
          description: "JSON data has been copied to your clipboard",
        });
      } catch (error) {
        toast({
          title: "Copy failed",
          description: "Could not copy to clipboard",
          variant: "destructive",
        });
      }
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={variant} size={size}>
            <Download className="h-4 w-4 mr-2" />
            Export JSON
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="bg-white">
          <DropdownMenuItem 
            onClick={() => handleExport({ format: 'full' })}
            className="cursor-pointer"
          >
            <Database className="h-4 w-4 mr-2" />
            Full Data Export
          </DropdownMenuItem>
          <DropdownMenuItem 
            onClick={() => handleExport({ format: 'formatted' })}
            className="cursor-pointer"
          >
            <FileText className="h-4 w-4 mr-2" />
            Formatted Export
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem 
            onClick={() => handleExport({ format: 'metadata' })}
            className="cursor-pointer"
          >
            <Info className="h-4 w-4 mr-2" />
            Metadata Only
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-hidden flex flex-col">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              <span>Export Preview - {currentExportData?.format}</span>
              <div className="flex gap-2">
                <Button onClick={handleCopyToClipboard} variant="outline" size="sm">
                  <Clipboard className="h-4 w-4 mr-2" />
                  Copy
                </Button>
                <Button onClick={handleDownload} size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
              </div>
            </DialogTitle>
          </DialogHeader>
          
          <div className="flex-1 overflow-auto">
            <div className="bg-gray-50 rounded-lg p-4 border">
              <div className="text-sm text-gray-600 mb-2">
                Filename: {currentExportData?.filename}
              </div>
              <pre className="text-xs overflow-auto max-h-96 bg-white p-4 rounded border">
                {currentExportData ? JSON.stringify(currentExportData.data, null, 2) : ''}
              </pre>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
