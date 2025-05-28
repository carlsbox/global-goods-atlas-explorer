
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FormField, FormItem, FormLabel } from '@/components/ui/form';
import { useFieldArray } from 'react-hook-form';
import { Plus, Trash } from 'lucide-react';

interface LanguagesFormProps {
  form: any;
}

export function LanguagesForm({ form }: LanguagesFormProps) {
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'ProductOverview.Languages',
  });

  return (
    <div className="space-y-4">
      <FormLabel>Languages</FormLabel>
      {fields.map((field, index) => (
        <div key={field.id} className="flex gap-2 items-center border p-3 rounded">
          <FormField
            control={form.control}
            name={`ProductOverview.Languages.${index}.code`}
            render={({ field }) => (
              <Input {...field} placeholder="Language Code (e.g., en)" />
            )}
          />
          <FormField
            control={form.control}
            name={`ProductOverview.Languages.${index}.name`}
            render={({ field }) => (
              <Input {...field} placeholder="Language Name (e.g., English)" />
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
        onClick={() => append({ code: '', name: '' })}
      >
        <Plus className="mr-2 h-4 w-4" />
        Add Language
      </Button>
    </div>
  );
}
