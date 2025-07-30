import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { UseFormReturn } from 'react-hook-form';
import { GlobalGoodFlatFormValues } from '@/lib/schemas/globalGoodFlatFormSchema';

interface BasicInfoSectionProps {
  form: UseFormReturn<GlobalGoodFlatFormValues>;
}

export function BasicInfoSection({ form }: BasicInfoSectionProps) {
  return (
    <div className="space-y-6">
      <FormField
        control={form.control}
        name="ID"
        render={({ field }) => (
          <FormItem>
            <FormLabel>ID *</FormLabel>
            <FormControl>
              <Input 
                placeholder="e.g., dhis2, openmrs, commcare" 
                {...field} 
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="Name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Name *</FormLabel>
            <FormControl>
              <Input 
                placeholder="e.g., DHIS2, OpenMRS, CommCare" 
                {...field} 
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="Logo"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Logo URL</FormLabel>
            <FormControl>
              <Input 
                type="url"
                placeholder="https://example.com/logo.png" 
                {...field} 
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="ClimateHealth"
        render={({ field }) => (
          <FormItem className="flex flex-row items-start space-x-3 space-y-0">
            <FormControl>
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
            <div className="space-y-1 leading-none">
              <FormLabel>Climate Health Tool</FormLabel>
              <p className="text-sm text-muted-foreground">
                Check if this is a climate and health tool
              </p>
            </div>
          </FormItem>
        )}
      />

    </div>
  );
}