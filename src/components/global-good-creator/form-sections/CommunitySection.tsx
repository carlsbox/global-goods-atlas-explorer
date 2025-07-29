import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { UseFormReturn } from 'react-hook-form';
import { GlobalGoodFlatFormValues } from '@/lib/schemas/globalGoodFlatFormSchema';

interface CommunitySectionProps {
  form: UseFormReturn<GlobalGoodFlatFormValues>;
}

export function CommunitySection({ form }: CommunitySectionProps) {
  return (
    <div className="space-y-6">
      <FormField
        control={form.control}
        name="Community.DescriptionOfCommunity"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Description of Community</FormLabel>
            <FormControl>
              <Textarea 
                placeholder="Describe the community around this global good"
                {...field} 
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="Community.HostAnchorOrganization.name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Host Organization Name</FormLabel>
            <FormControl>
              <Input 
                placeholder="e.g., Health Information Systems Program"
                {...field} 
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="Community.InceptionYear"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Inception Year</FormLabel>
            <FormControl>
              <Input 
                type="number"
                placeholder="e.g., 2008"
                {...field}
                onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="Community.SizeOfCommunity"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Size of Community</FormLabel>
            <FormControl>
              <Input 
                type="number"
                placeholder="e.g., 5000"
                {...field}
                onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}