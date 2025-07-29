import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { UseFormReturn } from 'react-hook-form';
import { GlobalGoodFlatFormValues } from '@/lib/schemas/globalGoodFlatFormSchema';
import { Plus, X } from 'lucide-react';

interface WebsiteContactSectionProps {
  form: UseFormReturn<GlobalGoodFlatFormValues>;
}

export function WebsiteContactSection({ form }: WebsiteContactSectionProps) {
  return (
    <div className="space-y-6">
      {/* Website Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Website Information</h3>
        
        <FormField
          control={form.control}
          name="Website.main.name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Main Website Name</FormLabel>
              <FormControl>
                <Input 
                  placeholder="e.g., Official Website" 
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="Website.main.url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Main Website URL *</FormLabel>
              <FormControl>
                <Input 
                  type="url"
                  placeholder="https://example.com" 
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="Website.main.description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Main Website Description</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Brief description of the main website"
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="Website.docs.url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Documentation URL</FormLabel>
              <FormControl>
                <Input 
                  type="url"
                  placeholder="https://docs.example.com" 
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="Website.source_code.url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Source Code URL</FormLabel>
              <FormControl>
                <Input 
                  type="url"
                  placeholder="https://github.com/example/repo" 
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      {/* Contact Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Contact Information</h3>
        
        <FormField
          control={form.control}
          name="Contact.0.name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Primary Contact Name *</FormLabel>
              <FormControl>
                <Input 
                  placeholder="John Doe" 
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="Contact.0.email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Primary Contact Email *</FormLabel>
              <FormControl>
                <Input 
                  type="email"
                  placeholder="contact@example.com" 
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="Contact.0.role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Primary Contact Role</FormLabel>
              <FormControl>
                <Input 
                  placeholder="e.g., Product Manager, Technical Lead" 
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}