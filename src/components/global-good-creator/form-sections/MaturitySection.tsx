import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { UseFormReturn } from 'react-hook-form';
import { GlobalGoodFlatFormValues } from '@/lib/schemas/globalGoodFlatFormSchema';

interface MaturitySectionProps {
  form: UseFormReturn<GlobalGoodFlatFormValues>;
}

export function MaturitySection({ form }: MaturitySectionProps) {
  return (
    <div className="space-y-6">
      <FormField
        control={form.control}
        name="Maturity.SummaryOfMaturity"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Summary of Maturity</FormLabel>
            <FormControl>
              <Textarea 
                placeholder="Describe the maturity level and development status"
                {...field} 
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="text-center p-8 border rounded-lg">
        <h3 className="text-lg font-medium mb-2">Maturity Scores Coming Soon</h3>
        <p className="text-muted-foreground">
          Detailed maturity scoring will be available in the next update.
        </p>
      </div>
    </div>
  );
}