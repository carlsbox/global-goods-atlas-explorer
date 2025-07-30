import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { UseFormReturn, useFieldArray } from 'react-hook-form';
import { GlobalGoodFlatFormValues } from '@/lib/schemas/globalGoodFlatFormSchema';
import { Plus, X } from 'lucide-react';

interface ResourcesSectionProps {
  form: UseFormReturn<GlobalGoodFlatFormValues>;
}

export function ResourcesSection({ form }: ResourcesSectionProps) {
  const resourceTypes = [
    {
      key: 'Articles',
      title: 'Articles',
      description: 'Research papers, blog posts, and articles about the global good'
    },
    {
      key: 'ProductDocumentation',
      title: 'Product Documentation',
      description: 'Official product documentation and specifications'
    },
    {
      key: 'UserRequirements',
      title: 'User Requirements',
      description: 'User requirement documents and specifications'
    },
    {
      key: 'EndUserDocumentation',
      title: 'End User Documentation',
      description: 'Documentation for end users and beneficiaries'
    },
    {
      key: 'ImplementerDocumentation',
      title: 'Implementer Documentation',
      description: 'Guides for organizations implementing the global good'
    },
    {
      key: 'DeveloperDocumentation',
      title: 'Developer Documentation',
      description: 'Technical documentation for developers'
    },
    {
      key: 'OperatorDocumentation',
      title: 'Operator Documentation',
      description: 'Documentation for system operators and administrators'
    },
    {
      key: 'InstallationDocumentation',
      title: 'Installation Documentation',
      description: 'Installation and deployment guides'
    }
  ];

  const ResourceArrayField = ({ resourceType }: { resourceType: any }) => {
    const { fields, append, remove } = useFieldArray({
      control: form.control,
      name: `Resources.${resourceType.key}` as any,
    });

    return (
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg">{resourceType.title}</CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                {resourceType.description}
              </p>
            </div>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => append({ description: '', url: '' })}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {fields.length === 0 ? (
            <div className="text-center py-4 text-muted-foreground">
              No {resourceType.title.toLowerCase()} added yet
            </div>
          ) : (
            <div className="space-y-4">
              {fields.map((field, index) => (
                <div key={field.id} className="flex gap-4 items-start">
                  <div className="flex-1 space-y-2">
                    <FormField
                      control={form.control}
                      name={`Resources.${resourceType.key}.${index}.description` as any}
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              placeholder="Resource description"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`Resources.${resourceType.key}.${index}.url` as any}
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              type="url"
                              placeholder="https://example.com/resource"
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
                    onClick={() => remove(index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-6">
      <div className="text-sm text-muted-foreground">
        Add links to various types of documentation and resources related to your global good.
      </div>

      {resourceTypes.map((resourceType) => (
        <ResourceArrayField key={resourceType.key} resourceType={resourceType} />
      ))}
    </div>
  );
}