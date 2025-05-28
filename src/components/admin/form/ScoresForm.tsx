
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FormField, FormItem, FormLabel } from '@/components/ui/form';
import { useFieldArray } from 'react-hook-form';
import { Plus, Trash } from 'lucide-react';

interface ScoresFormProps {
  form: any;
}

export function ScoresForm({ form }: ScoresFormProps) {
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'Maturity.Scores',
  });

  return (
    <div className="space-y-4">
      <FormLabel>Maturity Scores</FormLabel>
      {fields.map((field, index) => (
        <div key={field.id} className="space-y-2 border p-3 rounded">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Score Set {index + 1}</span>
            <Button 
              type="button" 
              variant="ghost" 
              size="icon" 
              onClick={() => remove(index)}
            >
              <Trash className="h-4 w-4" />
            </Button>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <FormField
              control={form.control}
              name={`Maturity.Scores.${index}.year`}
              render={({ field }) => (
                <Input 
                  type="number" 
                  {...field} 
                  placeholder="Year"
                  onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                />
              )}
            />
            <FormField
              control={form.control}
              name={`Maturity.Scores.${index}.global_utility`}
              render={({ field }) => (
                <Input 
                  type="number" 
                  {...field} 
                  placeholder="Global Utility"
                  onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                />
              )}
            />
            <FormField
              control={form.control}
              name={`Maturity.Scores.${index}.community_support`}
              render={({ field }) => (
                <Input 
                  type="number" 
                  {...field} 
                  placeholder="Community Support"
                  onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                />
              )}
            />
            <FormField
              control={form.control}
              name={`Maturity.Scores.${index}.maturity_of_gg`}
              render={({ field }) => (
                <Input 
                  type="number" 
                  {...field} 
                  placeholder="Maturity of GG"
                  onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                />
              )}
            />
            <FormField
              control={form.control}
              name={`Maturity.Scores.${index}.inclusive_design`}
              render={({ field }) => (
                <Input 
                  type="number" 
                  {...field} 
                  placeholder="Inclusive Design"
                  onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                />
              )}
            />
            <FormField
              control={form.control}
              name={`Maturity.Scores.${index}.climate_resilience`}
              render={({ field }) => (
                <Input 
                  type="number" 
                  {...field} 
                  placeholder="Climate Resilience"
                  onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                />
              )}
            />
            <FormField
              control={form.control}
              name={`Maturity.Scores.${index}.low_carbon`}
              render={({ field }) => (
                <Input 
                  type="number" 
                  {...field} 
                  placeholder="Low Carbon"
                  onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                />
              )}
            />
          </div>
        </div>
      ))}
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={() => append({ 
          year: new Date().getFullYear(), 
          global_utility: 0, 
          community_support: 0, 
          maturity_of_gg: 0, 
          inclusive_design: 0, 
          climate_resilience: 0, 
          low_carbon: 0 
        })}
      >
        <Plus className="mr-2 h-4 w-4" />
        Add Score Set
      </Button>
    </div>
  );
}
