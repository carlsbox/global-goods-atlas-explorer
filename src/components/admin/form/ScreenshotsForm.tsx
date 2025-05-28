
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FormField, FormItem, FormLabel } from '@/components/ui/form';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { Plus, Trash } from 'lucide-react';

interface ScreenshotsFormProps {
  form: any;
}

export function ScreenshotsForm({ form }: ScreenshotsFormProps) {
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'screenshots',
  });

  const defaultScreenshot = {
    url: '',
    description: '',
  };

  return (
    <FormItem className="space-y-4">
      <FormLabel>Screenshots</FormLabel>
      <div className="space-y-4">
        {fields.map((field, index) => (
          <div key={field.id} className="flex flex-col space-y-2 rounded-md border border-input p-4">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Screenshot {index + 1}</span>
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
            <div className="space-y-2">
              <FormField
                control={form.control}
                name={`screenshots.${index}.url`}
                render={({ field }) => (
                  <Input {...field} placeholder="Screenshot URL" />
                )}
              />
              <FormField
                control={form.control}
                name={`screenshots.${index}.description`}
                render={({ field }) => (
                  <Input {...field} placeholder="Screenshot Description" />
                )}
              />
            </div>
          </div>
        ))}
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => append(defaultScreenshot)}
          className="flex items-center"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Screenshot
        </Button>
      </div>
    </FormItem>
  );
}
