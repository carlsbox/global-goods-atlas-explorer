
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FormField, FormItem, FormLabel } from '@/components/ui/form';
import { useFieldArray } from 'react-hook-form';
import { Plus, Trash } from 'lucide-react';

interface GlobalGoodsTypeFormProps {
  form: any;
}

export function GlobalGoodsTypeForm({ form }: GlobalGoodsTypeFormProps) {
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'GlobalGoodsType',
  });

  return (
    <div className="space-y-4">
      <FormLabel>Global Goods Type</FormLabel>
      {fields.map((field, index) => (
        <div key={field.id} className="space-y-2 border p-3 rounded">
          <div className="flex justify-end">
            <Button 
              type="button" 
              variant="ghost" 
              size="icon" 
              onClick={() => remove(index)}
            >
              <Trash className="h-4 w-4" />
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <FormField
              control={form.control}
              name={`GlobalGoodsType.${index}.code`}
              render={({ field }) => (
                <Input {...field} placeholder="Code" />
              )}
            />
            <FormField
              control={form.control}
              name={`GlobalGoodsType.${index}.title`}
              render={({ field }) => (
                <Input {...field} placeholder="Title" />
              )}
            />
            <FormField
              control={form.control}
              name={`GlobalGoodsType.${index}.description`}
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
        onClick={() => append({ code: '', title: '', description: '' })}
      >
        <Plus className="mr-2 h-4 w-4" />
        Add Global Goods Type
      </Button>
    </div>
  );
}
