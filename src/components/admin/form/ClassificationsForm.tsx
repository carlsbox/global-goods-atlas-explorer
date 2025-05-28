
import React from 'react';
import { Button } from '@/components/ui/button';
import { FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useFieldArray } from 'react-hook-form';
import { Plus, Trash } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useReferenceData } from '@/hooks/useReferenceData';

interface ClassificationsFormProps {
  form: any;
}

export function ClassificationsForm({ form }: ClassificationsFormProps) {
  const { sdgs, classifications, loading } = useReferenceData();
  
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

  // Filter classifications by authority
  const whoClassifications = classifications.filter(c => c.authority === 'WHO');
  const dpiClassifications = classifications.filter(c => c.authority === 'DPI');

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Classifications</CardTitle>
        </CardHeader>
        <CardContent>
          <div>Loading classifications data...</div>
        </CardContent>
      </Card>
    );
  }

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
                  <FormItem className="flex-1">
                    <Select onValueChange={(value) => {
                      const selectedSDG = sdgs.find(sdg => sdg.code === value);
                      if (selectedSDG) {
                        field.onChange(selectedSDG.code);
                        form.setValue(`Classifications.SDGs.${index}.title`, selectedSDG.title);
                      }
                    }} value={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select SDG" />
                      </SelectTrigger>
                      <SelectContent className="bg-white border shadow-lg max-h-60 overflow-y-auto z-50">
                        {sdgs.map((sdg) => (
                          <SelectItem key={sdg.code} value={sdg.code}>
                            {sdg.code}: {sdg.title}
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
            <div key={field.id} className="flex gap-2 items-center border p-3 rounded">
              <FormField
                control={form.control}
                name={`Classifications.WHO.${index}.code`}
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <Select onValueChange={(value) => {
                      const selectedWHO = whoClassifications.find(who => who.code === value);
                      if (selectedWHO) {
                        field.onChange(selectedWHO.code);
                        form.setValue(`Classifications.WHO.${index}.title`, selectedWHO.title);
                        form.setValue(`Classifications.WHO.${index}.group_code`, selectedWHO.group_code);
                        form.setValue(`Classifications.WHO.${index}.group_name`, selectedWHO.group_name);
                        form.setValue(`Classifications.WHO.${index}.authority`, selectedWHO.authority);
                      }
                    }} value={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select WHO Classification" />
                      </SelectTrigger>
                      <SelectContent className="bg-white border shadow-lg max-h-60 overflow-y-auto z-50">
                        {whoClassifications.map((who) => (
                          <SelectItem key={who.code} value={who.code}>
                            {who.code}: {who.title}
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
                onClick={() => removeWHO(index)}
              >
                <Trash className="h-4 w-4" />
              </Button>
            </div>
          ))}
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => appendWHO({ code: '', title: '', group_code: '', group_name: '', authority: 'WHO' })}
          >
            <Plus className="mr-2 h-4 w-4" />
            Add WHO Classification
          </Button>
        </div>

        {/* DPI Classifications */}
        <div className="space-y-4">
          <FormLabel>DPI Classifications</FormLabel>
          {dpiFields.map((field, index) => (
            <div key={field.id} className="flex gap-2 items-center border p-3 rounded">
              <FormField
                control={form.control}
                name={`Classifications.DPI.${index}.code`}
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <Select onValueChange={(value) => {
                      const selectedDPI = dpiClassifications.find(dpi => dpi.code === value);
                      if (selectedDPI) {
                        field.onChange(selectedDPI.code);
                        form.setValue(`Classifications.DPI.${index}.title`, selectedDPI.title);
                        form.setValue(`Classifications.DPI.${index}.group_code`, selectedDPI.group_code);
                        form.setValue(`Classifications.DPI.${index}.group_name`, selectedDPI.group_name);
                        form.setValue(`Classifications.DPI.${index}.authority`, selectedDPI.authority);
                      }
                    }} value={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select DPI Classification" />
                      </SelectTrigger>
                      <SelectContent className="bg-white border shadow-lg max-h-60 overflow-y-auto z-50">
                        {dpiClassifications.map((dpi) => (
                          <SelectItem key={dpi.code} value={dpi.code}>
                            {dpi.code}: {dpi.title}
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
                onClick={() => removeDPI(index)}
              >
                <Trash className="h-4 w-4" />
              </Button>
            </div>
          ))}
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => appendDPI({ code: '', title: '', group_code: '', group_name: '', authority: 'DPI' })}
          >
            <Plus className="mr-2 h-4 w-4" />
            Add DPI Classification
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
