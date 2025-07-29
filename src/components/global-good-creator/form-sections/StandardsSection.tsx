import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { UseFormReturn } from 'react-hook-form';
import { GlobalGoodFlatFormValues } from '@/lib/schemas/globalGoodFlatFormSchema';
import { useLazyReferenceData } from '@/hooks/useLazyReferenceData';
import { LoadingSpinner } from '@/components/LoadingSpinner';

interface StandardsSectionProps {
  form: UseFormReturn<GlobalGoodFlatFormValues>;
}

export function StandardsSection({ form }: StandardsSectionProps) {
  const { standards, loading, error } = useLazyReferenceData(['standards']);

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
        <p className="text-destructive">Failed to load standards data</p>
      </div>
    );
  }

  const renderStandardsGroup = (
    title: string,
    items: any[],
    fieldName: 'StandardsAndInteroperability.HealthStandards' | 'StandardsAndInteroperability.Interoperability' | 'StandardsAndInteroperability.ClimateStandards'
  ) => (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <FormField
          control={form.control}
          name={fieldName}
          render={({ field }) => (
            <FormItem>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {items.map((item) => {
                  const isSelected = field.value?.some((selected: any) => selected.code === item.code) || false;
                  
                  return (
                    <div key={item.code} className="flex items-start space-x-3 space-y-0 rounded-md border p-3">
                      <Checkbox
                        checked={isSelected}
                        onCheckedChange={(checked) => {
                          const currentValue = field.value || [];
                          if (checked) {
                            field.onChange([...currentValue, {
                              code: item.code,
                              domain: item.domain || item.type || '',
                              link: item.link || '',
                              name: item.name,
                              description: item.description
                            }]);
                          } else {
                            field.onChange(currentValue.filter((selected: any) => selected.code !== item.code));
                          }
                        }}
                      />
                      <div className="space-y-1 leading-none flex-1">
                        <div className="font-medium text-sm">{item.name}</div>
                        <div className="text-xs text-muted-foreground">{item.code}</div>
                        {(item.domain || item.type) && (
                          <Badge variant="outline" className="text-xs">
                            {item.domain || item.type}
                          </Badge>
                        )}
                        {item.description && (
                          <div className="text-xs text-muted-foreground mt-1">
                            {item.description}
                          </div>
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
                        {selected.name}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
              
              <FormMessage />
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      <div className="text-sm text-muted-foreground">
        Select standards and interoperability frameworks that your global good supports or complies with.
      </div>

      {standards.health && renderStandardsGroup('Health Standards', standards.health, 'StandardsAndInteroperability.HealthStandards')}
      {standards.interoperability && renderStandardsGroup('Interoperability Standards', standards.interoperability, 'StandardsAndInteroperability.Interoperability')}
      {standards.climate && renderStandardsGroup('Climate Standards', standards.climate, 'StandardsAndInteroperability.ClimateStandards')}
    </div>
  );
}