
import React from 'react';
import { Button } from '@/components/ui/button';
import { FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useFieldArray } from 'react-hook-form';
import { Plus, Trash } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useReferenceData } from '@/hooks/useReferenceData';

interface StandardsFormProps {
  form: any;
}

interface Standard {
  code: string;
  domain?: string;
  type?: string;
  name: string;
  link?: string;
  description?: string;
}

export function StandardsForm({ form }: StandardsFormProps) {
  const { standards, loading } = useReferenceData();
  
  const { fields: healthFields, append: appendHealth, remove: removeHealth } = useFieldArray({
    control: form.control,
    name: 'StandardsAndInteroperability.HealthStandards',
  });

  const { fields: interopFields, append: appendInterop, remove: removeInterop } = useFieldArray({
    control: form.control,
    name: 'StandardsAndInteroperability.Interoperability',
  });

  // Safely get standards arrays with proper typing
  const allStandards = Object.values(standards || {}) as Standard[];
  const healthStandards = allStandards.filter((s: Standard) => s.domain === 'Health');
  const climateStandards = allStandards.filter((s: Standard) => s.domain === 'Weather and Climate');

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Standards and Interoperability</CardTitle>
        </CardHeader>
        <CardContent>
          <div>Loading standards data...</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Standards and Interoperability</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Health Standards */}
        <div className="space-y-4">
          <FormLabel>Health Standards</FormLabel>
          {healthFields.map((field, index) => (
            <div key={field.id} className="flex gap-2 items-center border p-3 rounded">
              <FormField
                control={form.control}
                name={`StandardsAndInteroperability.HealthStandards.${index}.code`}
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <Select onValueChange={(value) => {
                      const selectedStandard = healthStandards.find((s: Standard) => s.code === value);
                      if (selectedStandard) {
                        field.onChange(selectedStandard.code);
                        form.setValue(`StandardsAndInteroperability.HealthStandards.${index}.domain`, selectedStandard.domain || 'Health');
                        form.setValue(`StandardsAndInteroperability.HealthStandards.${index}.name`, selectedStandard.name || '');
                        form.setValue(`StandardsAndInteroperability.HealthStandards.${index}.link`, selectedStandard.link || '');
                        form.setValue(`StandardsAndInteroperability.HealthStandards.${index}.description`, selectedStandard.description || '');
                      }
                    }} value={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Health Standard" />
                      </SelectTrigger>
                      <SelectContent className="bg-white border shadow-lg max-h-60 overflow-y-auto z-50">
                        {healthStandards.map((standard: Standard) => (
                          <SelectItem key={standard.code} value={standard.code}>
                            {standard.code}: {standard.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button 
                type="button" 
                variant="ghost" 
                size="icon" 
                onClick={() => removeHealth(index)}
              >
                <Trash className="h-4 w-4" />
              </Button>
            </div>
          ))}
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => appendHealth({ code: '', domain: 'Health', link: '', name: '', description: '' })}
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Health Standard
          </Button>
        </div>

        {/* Interoperability Standards */}
        <div className="space-y-4">
          <FormLabel>Interoperability Standards</FormLabel>
          {interopFields.map((field, index) => (
            <div key={field.id} className="flex gap-2 items-center border p-3 rounded">
              <FormField
                control={form.control}
                name={`StandardsAndInteroperability.Interoperability.${index}.code`}
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <Select onValueChange={(value) => {
                      const selectedStandard = climateStandards.find((s: Standard) => s.code === value);
                      if (selectedStandard) {
                        field.onChange(selectedStandard.code);
                        form.setValue(`StandardsAndInteroperability.Interoperability.${index}.type`, selectedStandard.type || '');
                        form.setValue(`StandardsAndInteroperability.Interoperability.${index}.name`, selectedStandard.name || '');
                        form.setValue(`StandardsAndInteroperability.Interoperability.${index}.link`, selectedStandard.link || '');
                        form.setValue(`StandardsAndInteroperability.Interoperability.${index}.description`, selectedStandard.description || '');
                      }
                    }} value={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Interoperability Standard" />
                      </SelectTrigger>
                      <SelectContent className="bg-white border shadow-lg max-h-60 overflow-y-auto z-50">
                        {climateStandards.map((standard: Standard) => (
                          <SelectItem key={standard.code} value={standard.code}>
                            {standard.code}: {standard.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button 
                type="button" 
                variant="ghost" 
                size="icon" 
                onClick={() => removeInterop(index)}
              >
                <Trash className="h-4 w-4" />
              </Button>
            </div>
          ))}
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => appendInterop({ code: '', type: '', link: '', name: '', description: '' })}
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Interoperability Standard
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
