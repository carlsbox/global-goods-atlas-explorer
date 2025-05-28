
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FormField, FormItem, FormLabel } from '@/components/ui/form';
import { useFieldArray } from 'react-hook-form';
import { Plus, Trash } from 'lucide-react';

interface ScreenshotsFormProps {
  form: any;
}

export function ScreenshotsForm({ form }: ScreenshotsFormProps) {
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'ProductOverview.Screenshots',
  });

  return (
    <div className="space-y-4">
      <FormLabel>Screenshots</FormLabel>
      {fields.map((field, index) => (
        <div key={field.id} className="flex gap-2 items-center border p-3 rounded">
          <FormField
            control={form.control}
            name={`ProductOverview.Screenshots.${index}.url`}
            render={({ field }) => (
              <Input {...field} placeholder="Screenshot URL" />
            )}
          />
          <FormField
            control={form.control}
            name={`ProductOverview.Screenshots.${index}.description`}
            render={({ field }) => (
              <Input {...field} placeholder="Description" />
            )}
          />
          <Button 
            type="button" 
            variant="ghost" 
            size="icon" 
            onClick={() => remove(index)}
          >
            <Trash className="h-4 w-4" />
          </Button>
        </div>
      ))}
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={() => append({ url: '', description: '' })}
      >
        <Plus className="mr-2 h-4 w-4" />
        Add Screenshot
      </Button>
    </div>
  );
}
