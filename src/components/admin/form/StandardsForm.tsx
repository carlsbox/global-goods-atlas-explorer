
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FormField, FormItem, FormLabel } from '@/components/ui/form';
import { useFieldArray } from 'react-hook-form';
import { Plus, Trash } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface StandardsFormProps {
  form: any;
}

export function StandardsForm({ form }: StandardsFormProps) {
  const { fields: healthFields, append: appendHealth, remove: removeHealth } = useFieldArray({
    control: form.control,
    name: 'StandardsAndInteroperability.HealthStandards',
  });

  const { fields: interopFields, append: appendInterop, remove: removeInterop } = useFieldArray({
    control: form.control,
    name: 'StandardsAndInteroperability.Interoperability',
  });

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
            <div key={field.id} className="space-y-2 border p-3 rounded">
              <div className="flex justify-end">
                <Button 
                  type="button" 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => removeHealth(index)}
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <FormField
                  control={form.control}
                  name={`StandardsAndInteroperability.HealthStandards.${index}.code`}
                  render={({ field }) => (
                    <Input {...field} placeholder="Code" />
                  )}
                />
                <FormField
                  control={form.control}
                  name={`StandardsAndInteroperability.HealthStandards.${index}.domain`}
                  render={({ field }) => (
                    <Input {...field} placeholder="Domain" />
                  )}
                />
                <FormField
                  control={form.control}
                  name={`StandardsAndInteroperability.HealthStandards.${index}.name`}
                  render={({ field }) => (
                    <Input {...field} placeholder="Name" />
                  )}
                />
                <FormField
                  control={form.control}
                  name={`StandardsAndInteroperability.HealthStandards.${index}.link`}
                  render={({ field }) => (
                    <Input {...field} placeholder="Link" />
                  )}
                />
                <FormField
                  control={form.control}
                  name={`StandardsAndInteroperability.HealthStandards.${index}.description`}
                  render={({ field }) => (
                    <Input {...field} placeholder="Description" className="col-span-2" />
                  )}
                />
              </div>
            </div>
          ))}
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => appendHealth({ code: '', domain: '', link: '', name: '', description: '' })}
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Health Standard
          </Button>
        </div>

        {/* Interoperability Standards */}
        <div className="space-y-4">
          <FormLabel>Interoperability Standards</FormLabel>
          {interopFields.map((field, index) => (
            <div key={field.id} className="space-y-2 border p-3 rounded">
              <div className="flex justify-end">
                <Button 
                  type="button" 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => removeInterop(index)}
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <FormField
                  control={form.control}
                  name={`StandardsAndInteroperability.Interoperability.${index}.code`}
                  render={({ field }) => (
                    <Input {...field} placeholder="Code" />
                  )}
                />
                <FormField
                  control={form.control}
                  name={`StandardsAndInteroperability.Interoperability.${index}.type`}
                  render={({ field }) => (
                    <Input {...field} placeholder="Type" />
                  )}
                />
                <FormField
                  control={form.control}
                  name={`StandardsAndInteroperability.Interoperability.${index}.name`}
                  render={({ field }) => (
                    <Input {...field} placeholder="Name" />
                  )}
                />
                <FormField
                  control={form.control}
                  name={`StandardsAndInteroperability.Interoperability.${index}.link`}
                  render={({ field }) => (
                    <Input {...field} placeholder="Link" />
                  )}
                />
                <FormField
                  control={form.control}
                  name={`StandardsAndInteroperability.Interoperability.${index}.description`}
                  render={({ field }) => (
                    <Input {...field} placeholder="Description" className="col-span-2" />
                  )}
                />
              </div>
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
