
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator 
} from '@/components/ui/dropdown-menu';
import { Download, FileText, Database, Info } from 'lucide-react';
import { useUseCaseExport, ExportOptions } from '@/hooks/useUseCaseExport';
import { UseCase } from '@/lib/types/useCase';

interface ExportButtonProps {
  useCase: UseCase;
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'default' | 'sm' | 'lg';
}

export function ExportButton({ useCase, variant = 'outline', size = 'sm' }: ExportButtonProps) {
  const [isExporting, setIsExporting] = useState(false);
  const { exportJSON } = useUseCaseExport(useCase);

  const handleExport = async (options: ExportOptions) => {
    setIsExporting(true);
    try {
      await exportJSON(options);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={variant} size={size} disabled={isExporting}>
          <Download className="h-4 w-4 mr-2" />
          {isExporting ? 'Exporting...' : 'Export JSON'}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
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
  );
}
