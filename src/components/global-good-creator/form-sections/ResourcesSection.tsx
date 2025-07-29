import { FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { UseFormReturn } from 'react-hook-form';
import { GlobalGoodFlatFormValues } from '@/lib/schemas/globalGoodFlatFormSchema';

interface ResourcesSectionProps {
  form: UseFormReturn<GlobalGoodFlatFormValues>;
}

export function ResourcesSection({ form }: ResourcesSectionProps) {
  return (
    <div className="space-y-6">
      <div className="text-center p-8 border rounded-lg">
        <h3 className="text-lg font-medium mb-2">Resources Coming Soon</h3>
        <p className="text-muted-foreground">
          Documentation links and resource management will be available in the next update.
        </p>
      </div>
    </div>
  );
}