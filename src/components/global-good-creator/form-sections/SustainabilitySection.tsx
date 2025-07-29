import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { UseFormReturn } from 'react-hook-form';
import { GlobalGoodFlatFormValues } from '@/lib/schemas/globalGoodFlatFormSchema';

interface SustainabilitySectionProps {
  form: UseFormReturn<GlobalGoodFlatFormValues>;
}

export function SustainabilitySection({ form }: SustainabilitySectionProps) {
  return (
    <div className="space-y-6">
      <FormField
        control={form.control}
        name="Sustainability.Description"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Sustainability Description</FormLabel>
            <FormControl>
              <Textarea 
                placeholder="Describe the sustainability model and funding approach"
                {...field} 
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="TotalCostOfOwnership.Description"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Total Cost of Ownership</FormLabel>
            <FormControl>
              <Textarea 
                placeholder="Describe the total cost of ownership"
                {...field} 
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="EnvironmentalImpact.LowCarbon"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Environmental Impact - Low Carbon</FormLabel>
            <FormControl>
              <Textarea 
                placeholder="Describe environmental impact and low carbon features"
                {...field} 
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}