
import React from 'react';
import { Button } from '@/components/ui/button';
import { FormField, FormItem, FormLabel } from '@/components/ui/form';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { Plus, Trash } from 'lucide-react';
import { useI18n } from '@/hooks/useI18n';

interface ArrayFieldInputProps {
  name: string;
  label: string;
  control: any;
  renderItem: (itemName: string, index: number) => React.ReactNode;
  defaultValue?: any;
  addLabel?: string;
}

export function ArrayFieldInput({
  name,
  label,
  control,
  renderItem,
  defaultValue = {},
  addLabel = "Add Item"
}: ArrayFieldInputProps) {
  const { t } = useI18n();
  const { fields, append, remove } = useFieldArray({
    control,
    name,
  });
  const form = useFormContext();

  // Helper function to safely get value with type casting
  const getFieldValue = (fieldPath: string): string => {
    const value = form.watch(fieldPath);
    return typeof value === 'string' ? value : '';
  };

  // Helper function to safely set value
  const setFieldValue = (fieldPath: string, value: string) => {
    form.setValue(fieldPath as any, value, {
      shouldValidate: true,
      shouldDirty: true
    });
  };

  return (
    <FormItem className="space-y-4">
      <FormLabel>{label}</FormLabel>
      <div className="space-y-4">
        {fields.map((field, index) => (
          <div key={field.id} className="flex flex-col space-y-2 rounded-md border border-input p-4">
            <div className="flex justify-end">
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
            {renderItem(`${name}.${index}`, index)}
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
          {addLabel}
        </Button>
      </div>
    </FormItem>
  );
}
