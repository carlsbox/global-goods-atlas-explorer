
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FormField, FormItem, FormLabel } from '@/components/ui/form';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { Plus, Trash } from 'lucide-react';

interface ScoresFormProps {
  form: any;
}

export function ScoresForm({ form }: ScoresFormProps) {
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'scores',
  });

  const defaultScore = {
    year: new Date().getFullYear(),
    global_utility: 0,
    community_support: 0,
    maturity_of_gg: 0,
    inclusive_design: 0,
    climate_resilience: 0,
    low_carbon: 0,
  };

  return (
    <FormItem className="space-y-4">
      <FormLabel>Scores</FormLabel>
      <div className="space-y-4">
        {fields.map((field, index) => (
          <div key={field.id} className="flex flex-col space-y-2 rounded-md border border-input p-4">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Score {index + 1}</span>
              <Button 
                type="button" 
                variant="ghost" 
                size="icon" 
                onClick={() => remove(index)}
                className="h-8 w-8"
              >
                <Trash className="h-4 w-4" />
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <FormField
                control={form.control}
                name={`scores.${index}.year`}
                render={({ field }) => (
                  <Input {...field} type="number" placeholder="Year" />
                )}
              />
              <FormField
                control={form.control}
                name={`scores.${index}.global_utility`}
                render={({ field }) => (
                  <Input {...field} type="number" placeholder="Global Utility" />
                )}
              />
            </div>
          </div>
        ))}
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => append(defaultScore)}
          className="flex items-center"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Score
        </Button>
      </div>
    </FormItem>
  );
}
