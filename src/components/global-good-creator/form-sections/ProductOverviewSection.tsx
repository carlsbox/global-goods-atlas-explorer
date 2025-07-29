import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { UseFormReturn } from 'react-hook-form';
import { GlobalGoodFlatFormValues } from '@/lib/schemas/globalGoodFlatFormSchema';

interface ProductOverviewSectionProps {
  form: UseFormReturn<GlobalGoodFlatFormValues>;
}

export function ProductOverviewSection({ form }: ProductOverviewSectionProps) {
  return (
    <div className="space-y-6">
      <FormField
        control={form.control}
        name="ProductOverview.Summary"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Summary *</FormLabel>
            <FormControl>
              <Textarea 
                placeholder="Brief summary of the global good"
                {...field} 
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="ProductOverview.Description"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Description *</FormLabel>
            <FormControl>
              <Textarea 
                placeholder="Detailed description of the global good"
                rows={4}
                {...field} 
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="ProductOverview.PrimaryFunctionality"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Primary Functionality</FormLabel>
            <FormControl>
              <Textarea 
                placeholder="Main functionality and features"
                {...field} 
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="ProductOverview.Users"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Target Users</FormLabel>
            <FormControl>
              <Textarea 
                placeholder="Who are the intended users"
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