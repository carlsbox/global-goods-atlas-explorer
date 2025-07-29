import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Slider } from '@/components/ui/slider';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { UseFormReturn } from 'react-hook-form';
import { GlobalGoodFlatFormValues } from '@/lib/schemas/globalGoodFlatFormSchema';

interface MaturitySectionProps {
  form: UseFormReturn<GlobalGoodFlatFormValues>;
}

export function MaturitySection({ form }: MaturitySectionProps) {
  const currentYear = new Date().getFullYear();
  
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
          <CardTitle>Maturity Scores (0-10)</CardTitle>
          <p className="text-sm text-muted-foreground">
            Rate each dimension on a scale of 0-10, where 10 represents the highest level of maturity.
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          {maturityDimensions.map((dimension) => (
            <FormField
              key={dimension.key}
              control={form.control}
              name={`Maturity.Scores.0.${dimension.key}` as any}
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

          {/* Set the year automatically */}
          <FormField
            control={form.control}
            name="Maturity.Scores.0.year"
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
        </CardContent>
      </Card>
    </div>
  );
}