import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { UseFormReturn, useFieldArray } from 'react-hook-form';
import { GlobalGoodFlatFormValues } from '@/lib/schemas/globalGoodFlatFormSchema';
import { useState, useEffect } from 'react';
import { loadCollectionInitiatives } from '@/lib/loaders/referenceDataLoader';
import { Plus, X } from 'lucide-react';

interface LinkedInitiativesSectionProps {
  form: UseFormReturn<GlobalGoodFlatFormValues>;
}

interface CollectionInitiative {
  id: string;
  label: string;
  logo_url: string;
  site_url: string;
  description: string;
}

export function LinkedInitiativesSection({ form }: LinkedInitiativesSectionProps) {
  const [collectionInitiatives, setCollectionInitiatives] = useState<CollectionInitiative[]>([]);

  const initiativesFieldArray = useFieldArray({
    control: form.control,
    name: "LinkedInitiatives.Initiative"
  });

  useEffect(() => {
    loadCollectionInitiatives().then(setCollectionInitiatives);
  }, []);

  return (
    <div className="space-y-6">
      <div className="text-sm text-muted-foreground">
        Link this global good to relevant collection initiatives and networks.
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <FormLabel>Linked Initiatives</FormLabel>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => initiativesFieldArray.append({ 
              collectionInitiative: { 
                label: '', 
                logo_url: '', 
                site_url: '', 
                description: '' 
              }, 
              tool_url: '' 
            })}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Initiative
          </Button>
        </div>
        
        <div className="space-y-4">
          {initiativesFieldArray.fields.map((field, index) => (
            <div key={field.id} className="space-y-3 p-4 border rounded-md">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-medium">Initiative {index + 1}</h4>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => initiativesFieldArray.remove(index)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              
              <FormField
                control={form.control}
                name={`LinkedInitiatives.Initiative.${index}.collectionInitiative.label`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Initiative Name</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={(value) => {
                          const initiative = collectionInitiatives.find(init => init.label === value);
                          if (initiative) {
                            field.onChange(initiative.label);
                            form.setValue(`LinkedInitiatives.Initiative.${index}.collectionInitiative.logo_url`, initiative.logo_url);
                            form.setValue(`LinkedInitiatives.Initiative.${index}.collectionInitiative.site_url`, initiative.site_url);
                            form.setValue(`LinkedInitiatives.Initiative.${index}.collectionInitiative.description`, initiative.description);
                          }
                        }}
                        value={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select an initiative" />
                        </SelectTrigger>
                        <SelectContent>
                          {collectionInitiatives.map((initiative) => (
                            <SelectItem key={initiative.id} value={initiative.label}>
                              {initiative.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name={`LinkedInitiatives.Initiative.${index}.tool_url`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tool URL in Initiative</FormLabel>
                    <FormControl>
                      <Input 
                        type="url"
                        placeholder="https://example.com/your-tool"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Read-only fields populated from selection */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <FormField
                  control={form.control}
                  name={`LinkedInitiatives.Initiative.${index}.collectionInitiative.site_url`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Initiative Website</FormLabel>
                      <FormControl>
                        <Input 
                          {...field} 
                          readOnly
                          className="bg-muted"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name={`LinkedInitiatives.Initiative.${index}.collectionInitiative.logo_url`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Initiative Logo URL</FormLabel>
                      <FormControl>
                        <Input 
                          {...field} 
                          readOnly
                          className="bg-muted"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name={`LinkedInitiatives.Initiative.${index}.collectionInitiative.description`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Initiative Description</FormLabel>
                    <FormControl>
                      <Input 
                        {...field} 
                        readOnly
                        className="bg-muted"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}