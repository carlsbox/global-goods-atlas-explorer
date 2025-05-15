
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { useI18n } from '@/hooks/useI18n';
import { GlobalGood } from '@/lib/types';
import { globalGoodFormSchema, GlobalGoodFormValues } from '@/lib/schemas/globalGoodFormSchema';
import { MultilingualTextInput } from './MultilingualTextInput';
import { ArrayFieldInput } from './ArrayFieldInput';
import { UrlWithDescriptionInput } from './UrlWithDescriptionInput';
import { toast } from '@/components/ui/use-toast';

interface GlobalGoodFormProps {
  initialData?: Partial<GlobalGood>;
  onSubmit: (data: GlobalGoodFormValues) => Promise<void>;
  isSubmitting?: boolean;
}

export function GlobalGoodForm({ initialData, onSubmit, isSubmitting = false }: GlobalGoodFormProps) {
  const { t } = useI18n();
  
  // Create form with react-hook-form and zod validation
  const form = useForm<GlobalGoodFormValues>({
    resolver: zodResolver(globalGoodFormSchema),
    defaultValues: {
      coreMetadata: {
        id: initialData?.coreMetadata?.id || initialData?.id || '',
        name: initialData?.name || { en: '', fr: '', es: '' },
        logo: initialData?.logo || '',
        website: initialData?.coreMetadata?.website || [],
        globalGoodsType: initialData?.coreMetadata?.globalGoodsType || [],
        sourceCode: initialData?.coreMetadata?.sourceCode || [],
        license: initialData?.coreMetadata?.license || [],
        demoLink: initialData?.coreMetadata?.demoLink || [],
        contact: initialData?.coreMetadata?.contact || [],
      },
      productOverview: {
        summary: initialData?.summary || { en: '', fr: '', es: '' },
        description: initialData?.description || { en: '', fr: '', es: '' },
        details: initialData?.details || { en: '', fr: '', es: '' },
        primaryFunctionality: initialData?.productOverview?.primaryFunctionality || '',
        users: initialData?.productOverview?.users || '',
        languages: initialData?.productOverview?.languages || [],
        screenshots: initialData?.productOverview?.screenshots || [],
      },
      id: initialData?.id || '',
      name: initialData?.name || { en: '', fr: '', es: '' },
      summary: initialData?.summary || { en: '', fr: '', es: '' },
      description: initialData?.description || { en: '', fr: '', es: '' },
      details: initialData?.details || { en: '', fr: '', es: '' },
    },
  });

  const handleFormSubmit = async (values: GlobalGoodFormValues) => {
    try {
      await onSubmit(values);
    } catch (error) {
      console.error('Form submission error:', error);
      toast({
        title: t('admin.error', 'Error'),
        description: t('admin.failedToSave', 'Failed to save global good'),
        variant: "destructive"
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-8">
        <Tabs defaultValue="core" className="space-y-4">
          <TabsList className="grid grid-cols-2 md:grid-cols-4">
            <TabsTrigger value="core">Core Metadata</TabsTrigger>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="standards">Standards</TabsTrigger>
            <TabsTrigger value="reach">Reach & Impact</TabsTrigger>
          </TabsList>
          
          {/* Core Metadata Tab */}
          <TabsContent value="core" className="space-y-6">
            <div>
              <h3 className="text-lg font-medium">Core Metadata</h3>
              <p className="text-sm text-muted-foreground">
                Basic information about the global good.
              </p>
            </div>
            <Separator />
            
            <FormField
              control={form.control}
              name="coreMetadata.id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ID<span className="text-destructive ml-1">*</span></FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Unique identifier (e.g., dhis2)" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <MultilingualTextInput
              name="name"
              label="Name"
              control={form.control}
              placeholder="Global Good Name"
              required={true}
            />
            
            <FormField
              control={form.control}
              name="coreMetadata.logo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Logo URL</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Logo URL (e.g., https://example.org/logo.png)" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <ArrayFieldInput
              name="coreMetadata.website"
              label="Websites"
              control={form.control}
              addLabel="Add Website"
              renderItem={(name) => (
                <UrlWithDescriptionInput baseName={name} control={form.control} />
              )}
              defaultValue={{
                id: '',
                name: '',
                url: '',
                description: ''
              }}
            />
            
            <ArrayFieldInput
              name="coreMetadata.sourceCode"
              label="Source Code Repositories"
              control={form.control}
              addLabel="Add Repository"
              renderItem={(name) => (
                <UrlWithDescriptionInput baseName={name} control={form.control} />
              )}
              defaultValue={{
                id: '',
                name: '',
                url: '',
                description: ''
              }}
            />
            
            <ArrayFieldInput
              name="coreMetadata.contact"
              label="Contact Information"
              control={form.control}
              addLabel="Add Contact"
              renderItem={(name) => (
                <div className="space-y-3">
                  <FormField
                    control={form.control}
                    name={`${name}.name`}
                    render={({ field }) => (
                      <FormControl>
                        <Input placeholder="Name" {...field} />
                      </FormControl>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`${name}.email`}
                    render={({ field }) => (
                      <FormControl>
                        <Input placeholder="Email" {...field} />
                      </FormControl>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`${name}.role`}
                    render={({ field }) => (
                      <FormControl>
                        <Input placeholder="Role" {...field} />
                      </FormControl>
                    )}
                  />
                </div>
              )}
              defaultValue={{
                name: '',
                email: '',
                role: ''
              }}
            />
          </TabsContent>
          
          {/* Product Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div>
              <h3 className="text-lg font-medium">Product Overview</h3>
              <p className="text-sm text-muted-foreground">
                Detailed information about the global good.
              </p>
            </div>
            <Separator />
            
            <MultilingualTextInput
              name="summary"
              label="Summary"
              control={form.control}
              placeholder="Brief summary of the global good"
              required={true}
            />
            
            <MultilingualTextInput
              name="description"
              label="Description"
              control={form.control}
              placeholder="Detailed description of the global good"
              multiline={true}
              required={true}
            />
            
            <MultilingualTextInput
              name="details"
              label="Additional Details"
              control={form.control}
              placeholder="Additional details about the global good"
              multiline={true}
            />
            
            <FormField
              control={form.control}
              name="productOverview.primaryFunctionality"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Primary Functionality</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Main functions (e.g., Health Information Management)" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="productOverview.users"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Target Users</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Target users (e.g., Ministries of Health, NGOs)" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <ArrayFieldInput
              name="productOverview.languages"
              label="Supported Languages"
              control={form.control}
              addLabel="Add Language"
              renderItem={(name) => (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <FormField
                    control={form.control}
                    name={`${name}.code`}
                    render={({ field }) => (
                      <FormControl>
                        <Input placeholder="Language Code (e.g., en)" {...field} />
                      </FormControl>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`${name}.name`}
                    render={({ field }) => (
                      <FormControl>
                        <Input placeholder="Language Name (e.g., English)" {...field} />
                      </FormControl>
                    )}
                  />
                </div>
              )}
              defaultValue={{
                code: '',
                name: ''
              }}
            />
          </TabsContent>
          
          {/* Standards Tab */}
          <TabsContent value="standards" className="space-y-6">
            <div>
              <h3 className="text-lg font-medium">Standards & Interoperability</h3>
              <p className="text-sm text-muted-foreground">
                Information about standards and interoperability.
              </p>
            </div>
            <Separator />
            
            {/* Standards content will go here */}
            <p className="text-muted-foreground">Standards section is under development.</p>
          </TabsContent>
          
          {/* Reach Tab */}
          <TabsContent value="reach" className="space-y-6">
            <div>
              <h3 className="text-lg font-medium">Reach & Impact</h3>
              <p className="text-sm text-muted-foreground">
                Information about the global good's deployment and impact.
              </p>
            </div>
            <Separator />
            
            {/* Reach content will go here */}
            <p className="text-muted-foreground">Reach section is under development.</p>
          </TabsContent>
        </Tabs>
        
        <div className="flex justify-end gap-3">
          <Button variant="outline" type="button" disabled={isSubmitting}>
            {t('admin.common.cancel', 'Cancel')}
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting 
              ? t('admin.forms.saving', 'Saving...') 
              : t('admin.forms.save', 'Save')}
          </Button>
        </div>
      </form>
    </Form>
  );
}
