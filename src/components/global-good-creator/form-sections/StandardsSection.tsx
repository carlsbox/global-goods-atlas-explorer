import { FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { UseFormReturn } from 'react-hook-form';
import { GlobalGoodFlatFormValues } from '@/lib/schemas/globalGoodFlatFormSchema';

interface StandardsSectionProps {
  form: UseFormReturn<GlobalGoodFlatFormValues>;
}

export function StandardsSection({ form }: StandardsSectionProps) {
  return (
    <div className="space-y-6">
      <div className="text-center p-8 border rounded-lg">
        <h3 className="text-lg font-medium mb-2">Standards Coming Soon</h3>
        <p className="text-muted-foreground">
          Health, Interoperability, and Climate standards selection will be available in the next update.
        </p>
      </div>
    </div>
  );
}