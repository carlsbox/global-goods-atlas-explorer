import { FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { UseFormReturn } from 'react-hook-form';
import { GlobalGoodFlatFormValues } from '@/lib/schemas/globalGoodFlatFormSchema';

interface ClassificationsSectionProps {
  form: UseFormReturn<GlobalGoodFlatFormValues>;
}

export function ClassificationsSection({ form }: ClassificationsSectionProps) {
  return (
    <div className="space-y-6">
      <div className="text-center p-8 border rounded-lg">
        <h3 className="text-lg font-medium mb-2">Classifications Coming Soon</h3>
        <p className="text-muted-foreground">
          SDGs, WHO, WMO, and DPI classification selection will be available in the next update.
        </p>
      </div>
    </div>
  );
}