
import React from 'react';
import { FormField, FormItem, FormLabel } from '@/components/ui/form';
import { UrlWithDescriptionInput } from './UrlWithDescriptionInput';

interface WebsiteFormProps {
  form: any;
}

export function WebsiteForm({ form }: WebsiteFormProps) {
  return (
    <FormField
      control={form.control}
      name="website"
      render={() => (
        <FormItem>
          <FormLabel>Website</FormLabel>
          <UrlWithDescriptionInput
            baseName="website"
            control={form.control}
          />
        </FormItem>
      )}
    />
  );
}
