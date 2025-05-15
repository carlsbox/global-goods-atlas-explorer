
import React from 'react';
import { Input } from '@/components/ui/input';

interface UrlWithDescriptionInputProps {
  baseName: string;
  control: any;
}

export function UrlWithDescriptionInput({ baseName, control }: UrlWithDescriptionInputProps) {
  // Get the form from the control to access setValue and watch
  const form = control._formState.form;

  return (
    <div className="space-y-3">
      <Input 
        placeholder="ID (e.g., main, github)" 
        value={form.watch(`${baseName}.id`) || ''}
        onChange={e => form.setValue(`${baseName}.id` as any, e.target.value)}
      />
      
      <Input 
        placeholder="Name (e.g., Official Website)" 
        value={form.watch(`${baseName}.name`) || ''}
        onChange={e => form.setValue(`${baseName}.name` as any, e.target.value)}
      />
      
      <Input 
        placeholder="URL (e.g., https://example.org)" 
        value={form.watch(`${baseName}.url`) || ''}
        onChange={e => form.setValue(`${baseName}.url` as any, e.target.value)}
      />
      
      <Input 
        placeholder="Description" 
        value={form.watch(`${baseName}.description`) || ''}
        onChange={e => form.setValue(`${baseName}.description` as any, e.target.value)}
      />
    </div>
  );
}
