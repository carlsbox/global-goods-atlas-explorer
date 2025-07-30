import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { UseFormReturn } from 'react-hook-form';
import { GlobalGoodFlatFormValues } from '@/lib/schemas/globalGoodFlatFormSchema';
import { useLazyReferenceData } from '@/hooks/useLazyReferenceData';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { Plus, Trash } from 'lucide-react';

interface LinkedInitiativesSectionProps {
  form: UseFormReturn<GlobalGoodFlatFormValues>;
}

export function LinkedInitiativesSection({ form }: LinkedInitiativesSectionProps) {
  const { initiatives: collectionInitiatives, loading, error } = useLazyReferenceData([]);

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
        <p className="text-destructive">Failed to load collection initiatives data</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-sm text-muted-foreground">
        Link this global good to collection initiatives like Digital Public Goods Alliance or DIAL Exchange.
      </div>

      <FormField
        control={form.control}
        name="LinkedInitiatives.Initiative"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Collection Initiatives</FormLabel>
            <FormControl>
              <div className="space-y-4">
                {field.value?.map((initiative, index) => (
                  <Card key={index}>
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-base">Initiative {index + 1}</CardTitle>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            const newInitiatives = field.value?.filter((_, i) => i !== index) || [];
                            field.onChange(newInitiatives);
                          }}
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <FormLabel className="text-sm">Collection Initiative</FormLabel>
                        <Select
                          value={initiative.collectionInitiative?.label || ''}
                          onValueChange={(value) => {
                            const selectedInitiative = collectionInitiatives?.find(
                              (ci: any) => ci.label === value
                            );
                            if (selectedInitiative) {
                              const newInitiatives = [...(field.value || [])];
                              newInitiatives[index] = {
                                ...initiative,
                                collectionInitiative: selectedInitiative
                              };
                              field.onChange(newInitiatives);
                            }
                          }}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select an initiative" />
                          </SelectTrigger>
                          <SelectContent>
                            {collectionInitiatives?.map((ci: any) => (
                              <SelectItem key={ci.id} value={ci.label}>
                                <div className="flex items-center gap-2">
                                  <span>{ci.label}</span>
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <FormLabel className="text-sm">Tool URL</FormLabel>
                        <Input
                          placeholder="Enter the URL to your tool on this initiative"
                          value={initiative.tool_url || ''}
                          onChange={(e) => {
                            const newInitiatives = [...(field.value || [])];
                            newInitiatives[index] = {
                              ...initiative,
                              tool_url: e.target.value
                            };
                            field.onChange(newInitiatives);
                          }}
                        />
                      </div>

                      {initiative.collectionInitiative && (
                        <div className="mt-4 p-3 bg-muted rounded-md">
                          <div className="flex items-start gap-3">
                            {initiative.collectionInitiative.logo_url && (
                              <img 
                                src={initiative.collectionInitiative.logo_url} 
                                alt={initiative.collectionInitiative.label}
                                className="w-12 h-12 object-contain"
                              />
                            )}
                            <div>
                              <h4 className="font-medium text-sm">{initiative.collectionInitiative.label}</h4>
                              <p className="text-xs text-muted-foreground mt-1">
                                {initiative.collectionInitiative.description}
                              </p>
                              <a 
                                href={initiative.collectionInitiative.site_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xs text-primary hover:underline mt-1 inline-block"
                              >
                                Visit Website
                              </a>
                            </div>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}

                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    const newInitiative = {
                      collectionInitiative: {
                        label: '',
                        logo_url: '',
                        site_url: '',
                        description: ''
                      },
                      tool_url: ''
                    };
                    field.onChange([...(field.value || []), newInitiative]);
                  }}
                  className="w-full"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Initiative
                </Button>
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}