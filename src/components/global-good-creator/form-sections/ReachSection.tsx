import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { UseFormReturn } from 'react-hook-form';
import { GlobalGoodFlatFormValues } from '@/lib/schemas/globalGoodFlatFormSchema';

interface ReachSectionProps {
  form: UseFormReturn<GlobalGoodFlatFormValues>;
}

export function ReachSection({ form }: ReachSectionProps) {
  return (
    <div className="space-y-6">
      <FormField
        control={form.control}
        name="Reach.SummaryOfReach"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Summary of Reach</FormLabel>
            <FormControl>
              <Textarea 
                placeholder="Describe the global reach and implementation scope"
                {...field} 
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="Reach.NumberOfImplementations"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Number of Implementations</FormLabel>
            <FormControl>
              <Input 
                type="number"
                placeholder="e.g., 25"
                {...field}
                onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="text-center p-8 border rounded-lg">
        <h3 className="text-lg font-medium mb-2">Country Selection Coming Soon</h3>
        <p className="text-muted-foreground">
          Implementation countries selection will be available in the next update.
        </p>
      </div>
    </div>
  );
}