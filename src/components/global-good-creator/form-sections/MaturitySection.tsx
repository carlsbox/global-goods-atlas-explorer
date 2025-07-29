import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Slider } from '@/components/ui/slider';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { UseFormReturn, useFieldArray } from 'react-hook-form';
import { GlobalGoodFlatFormValues } from '@/lib/schemas/globalGoodFlatFormSchema';
import { Plus, Trash } from 'lucide-react';

interface MaturitySectionProps {
  form: UseFormReturn<GlobalGoodFlatFormValues>;
}

export function MaturitySection({ form }: MaturitySectionProps) {
  const currentYear = new Date().getFullYear();
  
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'Maturity.Scores'
  });
  
  const maturityDimensions = [
    {
      key: 'global_utility',
      label: 'Global Utility',
      description: 'Utility and applicability across different contexts and regions'
    },
    {
      key: 'community_support',
      label: 'Community Support',
      description: 'Active community, governance, and support ecosystem'
    },
    {
      key: 'maturity_of_gg',
      label: 'Maturity of Global Good',
      description: 'Technical maturity, stability, and production readiness'
    },
    {
      key: 'inclusive_design',
      label: 'Inclusive Design',
      description: 'Accessibility, multilingual support, and inclusive features'
    },
    {
      key: 'climate_resilience',
      label: 'Climate Resilience',
      description: 'Resilience to climate impacts and environmental changes'
    },
    {
      key: 'low_carbon',
      label: 'Low Carbon',
      description: 'Environmental sustainability and low carbon footprint'
    }
  ];

  const addNewYear = () => {
    append({
      year: currentYear,
      global_utility: 0,
      community_support: 0,
      maturity_of_gg: 0,
      inclusive_design: 0,
      climate_resilience: 0,
      low_carbon: 0,
    });
  };

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

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Maturity Scores (0-10)</CardTitle>
              <p className="text-sm text-muted-foreground">
                Rate each dimension on a scale of 0-10, where 10 represents the highest level of maturity.
              </p>
            </div>
            <Button 
              type="button" 
              variant="outline" 
              size="sm"
              onClick={addNewYear}
              className="flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              Add Year
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-8">
          {fields.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <p>No maturity assessments added yet.</p>
              <Button 
                type="button" 
                variant="outline" 
                onClick={addNewYear}
                className="mt-4"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add First Assessment
              </Button>
            </div>
          )}
          
          {fields.map((field, index) => (
            <Card key={field.id} className="border-2">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg">
                    Assessment #{index + 1}
                  </CardTitle>
                  {fields.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => remove(index)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Year field */}
                <FormField
                  control={form.control}
                  name={`Maturity.Scores.${index}.year`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Assessment Year</FormLabel>
                      <FormControl>
                        <Input 
                          type="number"
                          placeholder={currentYear.toString()}
                          {...field}
                          onChange={(e) => field.onChange(parseInt(e.target.value) || currentYear)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Maturity dimensions */}
                {maturityDimensions.map((dimension) => (
                  <FormField
                    key={dimension.key}
                    control={form.control}
                    name={`Maturity.Scores.${index}.${dimension.key}` as any}
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex justify-between items-center mb-2">
                          <FormLabel className="text-base font-medium">
                            {dimension.label}
                          </FormLabel>
                          <Badge variant="outline" className="font-mono">
                            {field.value || 0}/10
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">
                          {dimension.description}
                        </p>
                        <FormControl>
                          <Slider
                            min={0}
                            max={10}
                            step={1}
                            value={[field.value || 0]}
                            onValueChange={(value) => field.onChange(value[0])}
                            className="w-full"
                          />
                        </FormControl>
                        <div className="flex justify-between text-xs text-muted-foreground mt-1">
                          <span>Not Implemented (0)</span>
                          <span>Excellent (10)</span>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ))}
              </CardContent>
            </Card>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}