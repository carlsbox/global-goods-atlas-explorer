
import { UseCase } from '@/lib/types/useCase';
import { useToast } from '@/hooks/use-toast';

export interface ExportOptions {
  format: 'full' | 'formatted' | 'metadata';
  includeLanguages?: string[];
  resolveReferences?: boolean;
  convertMarkdown?: boolean;
}

export function useUseCaseExport(useCase: UseCase) {
  const { toast } = useToast();

  const exportJSON = (options: ExportOptions = { format: 'full' }) => {
    try {
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
            standards: useCase.standards?.map(standard => ({
              code: standard.code,
              name: standard.name,
              domain: standard.domain
            })),
            exported_at: new Date().toISOString()
          };
          break;
          
        default:
          exportData = useCase;
      }

      const jsonString = JSON.stringify(exportData, null, 2);
      const blob = new Blob([jsonString], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      
      const filename = `usecase-${useCase.id}-${options.format}-${timestamp}.json`;
      
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      toast({
        title: "Export successful",
        description: `Use case exported as ${filename}`,
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

  return { exportJSON };
}
