import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { UseFormReturn, useFieldArray } from 'react-hook-form';
import { GlobalGoodFlatFormValues } from '@/lib/schemas/globalGoodFlatFormSchema';
import { Plus, X } from 'lucide-react';

interface SustainabilitySectionProps {
  form: UseFormReturn<GlobalGoodFlatFormValues>;
}

export function SustainabilitySection({ form }: SustainabilitySectionProps) {
  const { fields: funders, append: addFunder, remove: removeFunder } = useFieldArray({
    control: form.control,
    name: 'Sustainability.KeyFundersSupporters',
  });

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
        name="TotalCostOfOwnership.url"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Cost Analysis URL</FormLabel>
            <FormControl>
              <Input 
                type="url"
                placeholder="https://example.com/cost-analysis"
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

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Key Funders & Supporters</CardTitle>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => addFunder({ name: '', url: '', description: '' })}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Funder
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {funders.length === 0 ? (
            <div className="text-center py-4 text-muted-foreground">
              No funders added yet
            </div>
          ) : (
            <div className="space-y-4">
              {funders.map((funder, index) => (
                <div key={funder.id} className="flex gap-4 items-start border rounded-lg p-4">
                  <div className="flex-1 space-y-3">
                    <FormField
                      control={form.control}
                      name={`Sustainability.KeyFundersSupporters.${index}.name` as any}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Funder Name</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="e.g., Bill & Melinda Gates Foundation"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`Sustainability.KeyFundersSupporters.${index}.url` as any}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Funder Website</FormLabel>
                          <FormControl>
                            <Input
                              type="url"
                              placeholder="https://funder.org"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`Sustainability.KeyFundersSupporters.${index}.description` as any}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Funding Description</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Describe the nature of support provided"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => removeFunder(index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}