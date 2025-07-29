import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { UseFormReturn } from 'react-hook-form';
import { GlobalGoodFlatFormValues } from '@/lib/schemas/globalGoodFlatFormSchema';
import { useLazyReferenceData } from '@/hooks/useLazyReferenceData';
import { LoadingSpinner } from '@/components/LoadingSpinner';

interface ClassificationsSectionProps {
  form: UseFormReturn<GlobalGoodFlatFormValues>;
}

export function ClassificationsSection({ form }: ClassificationsSectionProps) {
  const { classifications, loading, error } = useLazyReferenceData(['classifications']);

  if (loading) {
    return (
      <div className="flex justify-center py-8">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-8 border rounded-lg border-destructive">
        <p className="text-destructive">Failed to load classifications data</p>
      </div>
    );
  }

  // Group classifications by authority
  const sdgs = classifications.filter(c => c.authority === 'SDG');
  const who = classifications.filter(c => c.authority === 'WHO');
  const wmo = classifications.filter(c => c.authority === 'WMO');
  const dpi = classifications.filter(c => c.authority === 'DPI');

  const renderClassificationGroup = (
    title: string,
    items: any[],
    fieldName: 'Classifications.SDGs' | 'Classifications.WHO' | 'Classifications.WMO' | 'Classifications.DPI'
  ) => (
    <FormField
      control={form.control}
      name={fieldName}
      render={({ field }) => (
        <FormItem>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {items.map((item) => {
              const isSelected = field.value?.some((selected: any) => selected.code === item.code) || false;
              
              return (
                <div 
                  key={item.code} 
                  className="flex items-start space-x-3 space-y-0 rounded-md border p-3 cursor-pointer hover:bg-accent transition-colors"
                  onClick={() => {
                    const currentValue = field.value || [];
                    if (isSelected) {
                      field.onChange(currentValue.filter((selected: any) => selected.code !== item.code));
                    } else {
                      field.onChange([...currentValue, {
                        code: item.code,
                        title: item.title,
                        description: item.description,
                        group_code: item.group_code,
                        group_name: item.group_name,
                        authority: item.authority
                      }]);
                    }
                  }}
                >
                  <Checkbox
                    checked={isSelected}
                    onChange={() => {}} // Controlled by div click
                    className="pointer-events-none"
                  />
                  <div className="space-y-1 leading-none flex-1">
                    <div className="font-medium text-sm">{item.title}</div>
                    <div className="text-xs text-muted-foreground">{item.code}</div>
                    {item.group_name && (
                      <Badge variant="outline" className="text-xs">
                        {item.group_name}
                      </Badge>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
          
          {/* Show selected items */}
          {field.value && field.value.length > 0 && (
            <div className="mt-4">
              <div className="text-sm font-medium mb-2">Selected {title}:</div>
              <div className="flex flex-wrap gap-2">
                {field.value.map((selected: any, index: number) => (
                  <Badge key={index} variant="secondary">
                    {selected.title} [{selected.code}]
                  </Badge>
                ))}
              </div>
            </div>
          )}
          
          <FormMessage />
        </FormItem>
      )}
    />
  );

  return (
    <div className="space-y-6">
      <div className="text-sm text-muted-foreground">
        Select relevant classifications that apply to this global good. These help categorize and discover your global good.
      </div>

      <Accordion type="multiple" className="w-full">
        <AccordionItem value="sdgs">
          <AccordionTrigger>Sustainable Development Goals (SDGs)</AccordionTrigger>
          <AccordionContent>
            {renderClassificationGroup('Sustainable Development Goals (SDGs)', sdgs, 'Classifications.SDGs')}
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="who">
          <AccordionTrigger>WHO Health Classifications</AccordionTrigger>
          <AccordionContent>
            {renderClassificationGroup('WHO Health Classifications', who, 'Classifications.WHO')}
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="wmo">
          <AccordionTrigger>WMO Climate Classifications</AccordionTrigger>
          <AccordionContent>
            {renderClassificationGroup('WMO Climate Classifications', wmo, 'Classifications.WMO')}
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="dpi">
          <AccordionTrigger>Digital Public Infrastructure (DPI)</AccordionTrigger>
          <AccordionContent>
            {renderClassificationGroup('Digital Public Infrastructure (DPI)', dpi, 'Classifications.DPI')}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}