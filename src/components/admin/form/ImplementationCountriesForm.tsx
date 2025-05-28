
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FormField, FormItem, FormLabel } from '@/components/ui/form';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { Plus, Trash } from 'lucide-react';

interface ImplementationCountriesFormProps {
  form: any;
}

export function ImplementationCountriesForm({ form }: ImplementationCountriesFormProps) {
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'implementationCountries',
  });

  const defaultCountry = {
    iso_code: '',
    type: '',
    names: {
      en: {
        short: '',
        formal: '',
      },
    },
  };

  return (
    <FormItem className="space-y-4">
      <FormLabel>Implementation Countries</FormLabel>
      <div className="space-y-4">
        {fields.map((field, index) => (
          <div key={field.id} className="flex flex-col space-y-2 rounded-md border border-input p-4">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Country {index + 1}</span>
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
                name={`implementationCountries.${index}.iso_code`}
                render={({ field }) => (
                  <Input {...field} placeholder="ISO Code (e.g., US)" />
                )}
              />
              <FormField
                control={form.control}
                name={`implementationCountries.${index}.names.en.short`}
                render={({ field }) => (
                  <Input {...field} placeholder="Country Name" />
                )}
              />
            </div>
          </div>
        ))}
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => append(defaultCountry)}
          className="flex items-center"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Country
        </Button>
      </div>
    </FormItem>
  );
}
