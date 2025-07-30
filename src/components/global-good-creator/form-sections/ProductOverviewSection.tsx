import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { UseFormReturn, useFieldArray } from 'react-hook-form';
import { GlobalGoodFlatFormValues } from '@/lib/schemas/globalGoodFlatFormSchema';
import { useState, useEffect } from 'react';
import { loadProductLanguages } from '@/lib/loaders/referenceDataLoader';
import { Plus, X } from 'lucide-react';

interface ProductOverviewSectionProps {
  form: UseFormReturn<GlobalGoodFlatFormValues>;
}

interface ProductLanguage {
  code: string;
  name: string;
  nativeName: string;
}

export function ProductOverviewSection({ form }: ProductOverviewSectionProps) {
  const [productLanguages, setProductLanguages] = useState<ProductLanguage[]>([]);

  const languagesFieldArray = useFieldArray({
    control: form.control,
    name: "ProductOverview.Languages"
  });

  const screenshotsFieldArray = useFieldArray({
    control: form.control,
    name: "ProductOverview.Screenshots"
  });

  useEffect(() => {
    loadProductLanguages().then(setProductLanguages);
  }, []);

  return (
    <div className="space-y-6">
      <FormField
        control={form.control}
        name="ProductOverview.Summary"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Summary *</FormLabel>
            <FormControl>
              <Textarea 
                placeholder="Brief summary of the global good"
                {...field} 
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="ProductOverview.Description"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Description *</FormLabel>
            <FormControl>
              <Textarea 
                placeholder="Detailed description of the global good"
                rows={4}
                {...field} 
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="ProductOverview.PrimaryFunctionality"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Primary Functionality</FormLabel>
            <FormControl>
              <Textarea 
                placeholder="Main functionality and features"
                {...field} 
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="ProductOverview.Users"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Target Users</FormLabel>
            <FormControl>
              <Textarea 
                placeholder="Who are the intended users"
                {...field} 
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Languages Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <FormLabel>Product Languages</FormLabel>
          <Select
            onValueChange={(value) => {
              const language = productLanguages.find(lang => lang.code === value);
              if (language && !languagesFieldArray.fields.find(field => field.code === language.code)) {
                languagesFieldArray.append({
                  code: language.code,
                  name: language.name
                });
              }
            }}
          >
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Add language" />
            </SelectTrigger>
            <SelectContent>
              {productLanguages.map((language) => (
                <SelectItem 
                  key={language.code} 
                  value={language.code}
                  disabled={languagesFieldArray.fields.some(field => field.code === language.code)}
                >
                  {language.name} ({language.nativeName})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          {languagesFieldArray.fields.map((field, index) => (
            <div key={field.id} className="flex items-center justify-between p-3 border rounded-md">
              <span>{field.name}</span>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => languagesFieldArray.remove(index)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </div>

      {/* Screenshots Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <FormLabel>Screenshots</FormLabel>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => screenshotsFieldArray.append({ url: '', description: '' })}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Screenshot
          </Button>
        </div>
        
        <div className="space-y-4">
          {screenshotsFieldArray.fields.map((field, index) => (
            <div key={field.id} className="space-y-3 p-4 border rounded-md">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-medium">Screenshot {index + 1}</h4>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => screenshotsFieldArray.remove(index)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              
              <FormField
                control={form.control}
                name={`ProductOverview.Screenshots.${index}.url`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Screenshot URL</FormLabel>
                    <FormControl>
                      <Input 
                        type="url"
                        placeholder="https://example.com/screenshot.png"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name={`ProductOverview.Screenshots.${index}.description`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Brief description of the screenshot"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
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