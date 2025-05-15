
import React from 'react';
import { FormControl, FormField } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

interface UrlWithDescriptionInputProps {
  baseName: string;
  control: any;
}

export function UrlWithDescriptionInput({ baseName, control }: UrlWithDescriptionInputProps) {
  return (
    <div className="space-y-3">
      <FormField
        control={control}
        name={`${baseName}.id`}
        render={({ field }) => (
          <FormControl>
            <Input placeholder="ID (e.g., main, github)" {...field} />
          </FormControl>
        )}
      />
      
      <FormField
        control={control}
        name={`${baseName}.name`}
        render={({ field }) => (
          <FormControl>
            <Input placeholder="Name (e.g., Official Website)" {...field} />
          </FormControl>
        )}
      />
      
      <FormField
        control={control}
        name={`${baseName}.url`}
        render={({ field }) => (
          <FormControl>
            <Input placeholder="URL (e.g., https://example.org)" {...field} />
          </FormControl>
        )}
      />
      
      <FormField
        control={control}
        name={`${baseName}.description`}
        render={({ field }) => (
          <FormControl>
            <Input placeholder="Description" {...field} />
          </FormControl>
        )}
      />
    </div>
  );
}
