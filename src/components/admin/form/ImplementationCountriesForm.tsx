
import React from 'react';
import { Button } from '@/components/ui/button';
import { FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useFieldArray } from 'react-hook-form';
import { Plus, Trash } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useReferenceData } from '@/hooks/useReferenceData';

interface ImplementationCountriesFormProps {
  form: any;
}

export function ImplementationCountriesForm({ form }: ImplementationCountriesFormProps) {
  const { countries, loading } = useReferenceData();
  
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'Reach.ImplementationCountries',
  });

  if (loading) {
    return <div>Loading countries data...</div>;
  }

  return (
    <FormItem className="space-y-4">
      <FormLabel>Implementation Countries</FormLabel>
      <div className="space-y-4">
        {fields.map((field, index) => (
          <div key={field.id} className="flex gap-2 items-center border p-3 rounded">
            <FormField
              control={form.control}
              name={`Reach.ImplementationCountries.${index}.iso_code`}
              render={({ field }) => (
                <FormItem className="flex-1">
                  <Select onValueChange={(value) => {
                    const selectedCountry = countries.find(country => country.iso_code === value);
                    if (selectedCountry) {
                      field.onChange(selectedCountry.iso_code);
                      form.setValue(`Reach.ImplementationCountries.${index}.type`, selectedCountry.type || 'State');
                      form.setValue(`Reach.ImplementationCountries.${index}.names.en.short`, selectedCountry.names?.en?.short || selectedCountry.name?.short || '');
                      form.setValue(`Reach.ImplementationCountries.${index}.names.en.formal`, selectedCountry.names?.en?.formal || selectedCountry.name?.official || '');
                    }
                  }} value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Country" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border shadow-lg max-h-60 overflow-y-auto z-50">
                      {countries.map((country) => (
                        <SelectItem key={country.iso_code} value={country.iso_code}>
                          {country.names?.en?.short || country.name?.short || country.iso_code}
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
              onClick={() => remove(index)}
              className="h-8 w-8"
            >
              <Trash className="h-4 w-4" />
            </Button>
          </div>
        ))}
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => append({
            iso_code: '',
            type: 'State',
            names: {
              en: {
                short: '',
                formal: '',
              },
            },
          })}
          className="flex items-center"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Country
        </Button>
      </div>
    </FormItem>
  );
}
