
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FormField, FormItem, FormLabel } from '@/components/ui/form';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { Plus, Trash } from 'lucide-react';

interface LanguagesFormProps {
  form: any;
}

export function LanguagesForm({ form }: LanguagesFormProps) {
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'languages',
  });

  const defaultLanguage = {
    code: '',
    name: '',
  };

  return (
    <FormItem className="space-y-4">
      <FormLabel>Languages</FormLabel>
      <div className="space-y-4">
        {fields.map((field, index) => (
          <div key={field.id} className="flex flex-col space-y-2 rounded-md border border-input p-4">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Language {index + 1}</span>
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
                name={`languages.${index}.code`}
                render={({ field }) => (
                  <Input {...field} placeholder="Language Code (e.g., en)" />
                )}
              />
              <FormField
                control={form.control}
                name={`languages.${index}.name`}
                render={({ field }) => (
                  <Input {...field} placeholder="Language Name (e.g., English)" />
                )}
              />
            </div>
          </div>
        ))}
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => append(defaultLanguage)}
          className="flex items-center"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Language
        </Button>
      </div>
    </FormItem>
  );
}
