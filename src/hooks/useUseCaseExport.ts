
import { UseCase } from '@/lib/types/useCase';
import { useToast } from '@/hooks/use-toast';

export interface ExportOptions {
  format: 'full' | 'formatted' | 'metadata';
  includeLanguages?: string[];
  resolveReferences?: boolean;
  convertMarkdown?: boolean;
}

export interface ExportData {
  data: any;
  filename: string;
  format: string;
}

export function useUseCaseExport(useCase: UseCase) {
  const { toast } = useToast();

  const generateExportData = (options: ExportOptions = { format: 'full' }): ExportData => {
    let exportData: any;
    const timestamp = new Date().toISOString().split('T')[0];
    
    switch (options.format) {
      case 'full':
        exportData = useCase;
        break;
        
      case 'formatted':
        exportData = {
          id: useCase.id,
          title: useCase.title,
          purpose: useCase.purpose,
          classifications: useCase.classifications,
          scope: useCase.scope,
          actors: useCase.actors,
          process_steps: useCase.process_steps,
          data_requirements: useCase.data_requirements,
          technology_components: useCase.technology_components,
          global_goods: useCase.global_goods,
          standards: useCase.standards,
          challenges: useCase.challenges,
          sustainability_considerations: useCase.sustainability_considerations
        };
        break;
        
      case 'metadata':
        exportData = {
          id: useCase.id,
          title: useCase.title,
          classifications: useCase.classifications,
          global_goods: useCase.global_goods?.map(good => ({
            id: good.id,
            name: good.name
          })),
          // Updated to work with string array - just map the codes
          standards: useCase.standards?.map(standardCode => ({
            code: standardCode
          })),
          exported_at: new Date().toISOString(),
          license: {
            type: "CC BY-SA 4.0",
            name: "Creative Commons Attribution-ShareAlike 4.0 International",
            url: "https://creativecommons.org/licenses/by-sa/4.0/",
            attribution: `Content from Global Goods Guidebook (${window.location.origin})`
          }
        };
        break;
        
      default:
        exportData = {
          ...useCase,
          license: {
            type: "CC BY-SA 4.0",
            name: "Creative Commons Attribution-ShareAlike 4.0 International",
            url: "https://creativecommons.org/licenses/by-sa/4.0/",
            attribution: `Content from Global Goods Guidebook (${window.location.origin})`
          }
        };
    }

    const filename = `usecase-${useCase.id}-${options.format}-${timestamp}.json`;
    
    return {
      data: exportData,
      filename,
      format: options.format
    };
  };

  const downloadJSON = (exportData: ExportData) => {
    try {
      const jsonString = JSON.stringify(exportData.data, null, 2);
      const blob = new Blob([jsonString], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = exportData.filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      toast({
        title: "Export successful",
        description: `Use case exported as ${exportData.filename}`,
      });
      
    } catch (error) {
      console.error('Export failed:', error);
      toast({
        title: "Export failed",
        description: "There was an error exporting the use case data",
        variant: "destructive",
      });
    }
  };

  return { generateExportData, downloadJSON };
}
