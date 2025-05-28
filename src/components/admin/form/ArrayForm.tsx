
import React from 'react';
import { Button } from '@/components/ui/button';
import { FormField, FormItem, FormLabel } from '@/components/ui/form';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { Plus, Trash } from 'lucide-react';
import { UrlWithDescriptionInput } from './UrlWithDescriptionInput';

interface ArrayFormProps {
  form: any;
  name: string;
  label: string;
  itemLabel: string;
  fields: string[];
}

export function ArrayForm({ form, name, label, itemLabel, fields }: ArrayFormProps) {
  const { fields: fieldArray, append, remove } = useFieldArray({
    control: form.control,
    name,
  });

  const defaultValue = fields.reduce((acc, field) => {
    acc[field] = '';
    return acc;
  }, {} as Record<string, string>);

  return (
    <FormItem className="space-y-4">
      <FormLabel>{label}</FormLabel>
      <div className="space-y-4">
        {fieldArray.map((field, index) => (
          <div key={field.id} className="flex flex-col space-y-2 rounded-md border border-input p-4">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">{itemLabel} {index + 1}</span>
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
            <UrlWithDescriptionInput
              baseName={`${name}.${index}`}
              control={form.control}
            />
          </div>
        ))}
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => append(defaultValue)}
          className="flex items-center"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add {itemLabel}
        </Button>
      </div>
    </FormItem>
  );
}
