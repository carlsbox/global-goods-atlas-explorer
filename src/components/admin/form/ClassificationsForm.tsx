
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FormField, FormItem, FormLabel } from '@/components/ui/form';
import { useFieldArray } from 'react-hook-form';
import { Plus, Trash } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ClassificationsFormProps {
  form: any;
}

export function ClassificationsForm({ form }: ClassificationsFormProps) {
  const { fields: sdgFields, append: appendSDG, remove: removeSDG } = useFieldArray({
    control: form.control,
    name: 'Classifications.SDGs',
  });

  const { fields: whoFields, append: appendWHO, remove: removeWHO } = useFieldArray({
    control: form.control,
    name: 'Classifications.WHO',
  });

  const { fields: dpiFields, append: appendDPI, remove: removeDPI } = useFieldArray({
    control: form.control,
    name: 'Classifications.DPI',
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Classifications</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* SDGs */}
        <div className="space-y-4">
          <FormLabel>SDGs</FormLabel>
          {sdgFields.map((field, index) => (
            <div key={field.id} className="flex gap-2 items-center border p-3 rounded">
              <FormField
                control={form.control}
                name={`Classifications.SDGs.${index}.code`}
                render={({ field }) => (
                  <Input {...field} placeholder="SDG Code" />
                )}
              />
              <FormField
                control={form.control}
                name={`Classifications.SDGs.${index}.title`}
                render={({ field }) => (
                  <Input {...field} placeholder="SDG Title" />
                )}
              />
              <Button 
                type="button" 
                variant="ghost" 
                size="icon" 
                onClick={() => removeSDG(index)}
              >
                <Trash className="h-4 w-4" />
              </Button>
            </div>
          ))}
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => appendSDG({ code: '', title: '' })}
          >
            <Plus className="mr-2 h-4 w-4" />
            Add SDG
          </Button>
        </div>

        {/* WHO Classifications */}
        <div className="space-y-4">
          <FormLabel>WHO Classifications</FormLabel>
          {whoFields.map((field, index) => (
            <div key={field.id} className="space-y-2 border p-3 rounded">
              <div className="flex justify-end">
                <Button 
                  type="button" 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => removeWHO(index)}
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <FormField
                  control={form.control}
                  name={`Classifications.WHO.${index}.code`}
                  render={({ field }) => (
                    <Input {...field} placeholder="WHO Code" />
                  )}
                />
                <FormField
                  control={form.control}
                  name={`Classifications.WHO.${index}.title`}
                  render={({ field }) => (
                    <Input {...field} placeholder="WHO Title" />
                  )}
                />
                <FormField
                  control={form.control}
                  name={`Classifications.WHO.${index}.group_code`}
                  render={({ field }) => (
                    <Input {...field} placeholder="Group Code" />
                  )}
                />
                <FormField
                  control={form.control}
                  name={`Classifications.WHO.${index}.group_name`}
                  render={({ field }) => (
                    <Input {...field} placeholder="Group Name" />
                  )}
                />
                <FormField
                  control={form.control}
                  name={`Classifications.WHO.${index}.authority`}
                  render={({ field }) => (
                    <Input {...field} placeholder="Authority" />
                  )}
                />
              </div>
            </div>
          ))}
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => appendWHO({ code: '', title: '', group_code: '', group_name: '', authority: '' })}
          >
            <Plus className="mr-2 h-4 w-4" />
            Add WHO Classification
          </Button>
        </div>

        {/* DPI Classifications */}
        <div className="space-y-4">
          <FormLabel>DPI Classifications</FormLabel>
          {dpiFields.map((field, index) => (
            <div key={field.id} className="space-y-2 border p-3 rounded">
              <div className="flex justify-end">
                <Button 
                  type="button" 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => removeDPI(index)}
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <FormField
                  control={form.control}
                  name={`Classifications.DPI.${index}.code`}
                  render={({ field }) => (
                    <Input {...field} placeholder="DPI Code" />
                  )}
                />
                <FormField
                  control={form.control}
                  name={`Classifications.DPI.${index}.title`}
                  render={({ field }) => (
                    <Input {...field} placeholder="DPI Title" />
                  )}
                />
                <FormField
                  control={form.control}
                  name={`Classifications.DPI.${index}.group_code`}
                  render={({ field }) => (
                    <Input {...field} placeholder="Group Code" />
                  )}
                />
                <FormField
                  control={form.control}
                  name={`Classifications.DPI.${index}.group_name`}
                  render={({ field }) => (
                    <Input {...field} placeholder="Group Name" />
                  )}
                />
                <FormField
                  control={form.control}
                  name={`Classifications.DPI.${index}.authority`}
                  render={({ field }) => (
                    <Input {...field} placeholder="Authority" />
                  )}
                />
              </div>
            </div>
          ))}
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => appendDPI({ code: '', title: '', group_code: '', group_name: '', authority: '' })}
          >
            <Plus className="mr-2 h-4 w-4" />
            Add DPI Classification
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
