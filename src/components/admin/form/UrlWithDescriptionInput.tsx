
import React from 'react';
import { Input } from '@/components/ui/input';
import { useFormContext } from 'react-hook-form';

interface UrlWithDescriptionInputProps {
  baseName: string;
  control: any;
}

export function UrlWithDescriptionInput({ baseName, control }: UrlWithDescriptionInputProps) {
  // Use useFormContext directly instead of accessing through control._formState
  const form = useFormContext();
  
  // Helper function to safely get value with type casting
  const getFieldValue = (fieldPath: string): string => {
    const value = form.watch(`${baseName}.${fieldPath}`);
    return typeof value === 'string' ? value : '';
  };

  // Helper function to safely set value
  const setFieldValue = (fieldPath: string, value: string) => {
    form.setValue(`${baseName}.${fieldPath}` as any, value, {
      shouldValidate: true,
      shouldDirty: true
    });
  };

  return (
    <div className="space-y-3">
      <Input 
        placeholder="ID (e.g., main, github)" 
        value={getFieldValue('id')} 
        onChange={e => setFieldValue('id', e.target.value)}
      />
      
      <Input 
        placeholder="Name (e.g., Official Website)" 
        value={getFieldValue('name')}
        onChange={e => setFieldValue('name', e.target.value)}
      />
      
      <Input 
        placeholder="URL (e.g., https://example.org)" 
        value={getFieldValue('url')}
        onChange={e => setFieldValue('url', e.target.value)}
      />
      
      <Input 
        placeholder="Description" 
        value={getFieldValue('description')}
        onChange={e => setFieldValue('description', e.target.value)}
      />
    </div>
  );
}
