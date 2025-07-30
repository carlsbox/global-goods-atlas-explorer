import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { UseFormReturn } from 'react-hook-form';
import { GlobalGoodFlatFormValues } from '@/lib/schemas/globalGoodFlatFormSchema';
import { useReferenceData } from '@/contexts/ReferenceDataContext';
import { Badge } from '@/components/ui/badge';

interface TypeLicenseSectionProps {
  form: UseFormReturn<GlobalGoodFlatFormValues>;
}

export function TypeLicenseSection({ form }: TypeLicenseSectionProps) {
  const { globalGoodsTypes, licenses } = useReferenceData();

  return (
    <div className="space-y-6">
      {/* Global Goods Type */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Global Good Types *</h3>
        <p className="text-sm text-muted-foreground">
          Select the types that best describe this global good
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {globalGoodsTypes.map((type) => (
            <FormField
              key={type.code}
              control={form.control}
              name="GlobalGoodsType"
              render={({ field }) => {
                const isSelected = field.value?.some((selected: any) => selected.code === type.code) || false;
                
                return (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                    <FormControl>
                      <Checkbox
                        checked={isSelected}
                        onCheckedChange={(checked) => {
                          const currentValue = field.value || [];
                          if (checked) {
                            field.onChange([...currentValue, type]);
                          } else {
                            field.onChange(currentValue.filter((item: any) => item.code !== type.code));
                          }
                        }}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel className="font-medium">
                        {type.title}
                      </FormLabel>
                      <p className="text-sm text-muted-foreground">
                        {type.description}
                      </p>
                    </div>
                  </FormItem>
                );
              }}
            />
          ))}
        </div>
        
        {/* Show selected types */}
        <FormField
          control={form.control}
          name="GlobalGoodsType"
          render={({ field }) => (
            <div className="flex flex-wrap gap-2">
              {field.value?.map((type: any, index: number) => (
                <Badge key={index} variant="secondary">
                  {type.title}
                </Badge>
              ))}
            </div>
          )}
        />
      </div>

      {/* License */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">License *</h3>
        
        <FormField
          control={form.control}
          name="License"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Select License</FormLabel>
              <Select 
                onValueChange={(value) => {
                  const selectedLicense = licenses.find(license => license.id === value);
                  if (selectedLicense) {
                    field.onChange(selectedLicense);
                  }
                }}
                value={field.value?.id || ''}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a license" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {licenses.map((license) => (
                    <SelectItem key={license.id} value={license.id}>
                      {license.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Show selected license details */}
        {form.watch('License') && (
          <div className="p-4 border rounded-lg bg-muted/50">
            <h4 className="font-medium mb-2">{form.watch('License')?.name}</h4>
            <p className="text-sm text-muted-foreground">
              {form.watch('License')?.description}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}