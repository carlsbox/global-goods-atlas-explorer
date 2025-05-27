import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
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
import { ensureMultilingualText } from '@/utils/defaultValues';

interface GlobalGoodFormProps {
  initialData?: Partial<GlobalGood>;
  onSubmit: (data: GlobalGoodFormValues) => Promise<void>;
  isSubmitting?: boolean;
}

// Helper to convert string arrays to object arrays with required structure
const convertToLanguagesArray = (arr: string[] | { code: string, name: string }[] | undefined): { code: string, name: string }[] => {
  if (!arr) return [];
  
  if (arr.length > 0 && typeof arr[0] === 'string') {
    return (arr as string[]).map(item => ({ code: item, name: item }));
  }
  
  return arr as { code: string, name: string }[];
};

// Helper to convert string arrays to object arrays with url description structure
const convertToUrlArray = (arr: string[] | { url: string, description: string }[] | undefined): { url: string, description: string }[] => {
  if (!arr) return [];
  
  if (arr.length > 0 && typeof arr[0] === 'string') {
    return (arr as string[]).map(item => ({ url: item, description: '' }));
  }
  
  return arr as { url: string, description: string }[];
};

export function GlobalGoodForm({ initialData, onSubmit, isSubmitting = false }: GlobalGoodFormProps) {
  const { t } = useI18n();
  
  // Create form with react-hook-form and zod validation
  const methods = useForm<GlobalGoodFormValues>({
    resolver: zodResolver(globalGoodFormSchema),
    defaultValues: {
      coreMetadata: {
        id: initialData?.coreMetadata?.id || initialData?.id || '',
        name: initialData?.name ? (typeof initialData.name === 'string' ? 
               ensureMultilingualText(initialData.name) : initialData.name) 
               : { en: '', fr: '', es: '' },
        logo: initialData?.logo || '',
        website: initialData?.coreMetadata?.website || [],
        globalGoodsType: initialData?.coreMetadata?.globalGoodsType || [],
        sourceCode: initialData?.coreMetadata?.sourceCode || [],
        license: initialData?.coreMetadata?.license || [],
        demoLink: initialData?.coreMetadata?.demoLink || [],
        contact: initialData?.coreMetadata?.contact || [],
      },
      productOverview: {
        summary: initialData?.summary ? (typeof initialData.summary === 'string' ? 
                 ensureMultilingualText(initialData.summary) : initialData.summary) 
                 : { en: '', fr: '', es: '' },
        description: initialData?.description ? (typeof initialData.description === 'string' ? 
                     ensureMultilingualText(initialData.description) : initialData.description) 
                     : { en: '', fr: '', es: '' },
        details: initialData?.details ? (typeof initialData.details === 'string' ? 
                 ensureMultilingualText(initialData.details) : initialData.details) 
                 : { en: '', fr: '', es: '' },
        primaryFunctionality: initialData?.productOverview?.primaryFunctionality || '',
        users: initialData?.productOverview?.users || '',
        languages: convertToLanguagesArray(initialData?.productOverview?.languages),
        screenshots: convertToUrlArray(initialData?.productOverview?.screenshots),
      },
      id: initialData?.id || '',
      name: initialData?.name ? (typeof initialData.name === 'string' ? 
             ensureMultilingualText(initialData.name) : initialData.name) 
             : { en: '', fr: '', es: '' },
      summary: initialData?.summary ? (typeof initialData.summary === 'string' ? 
               ensureMultilingualText(initialData.summary) : initialData.summary) 
               : { en: '', fr: '', es: '' },
      description: initialData?.description ? (typeof initialData.description === 'string' ? 
                   ensureMultilingualText(initialData.description) : initialData.description) 
                   : { en: '', fr: '', es: '' },
      details: initialData?.details ? (typeof initialData.details === 'string' ? 
               ensureMultilingualText(initialData.details) : initialData.details) 
               : { en: '', fr: '', es: '' },
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

  // Create a Contact Fields input component
  const renderContactFields = (baseName: string) => {
    return (
      <div className="space-y-3">
        <Input 
          placeholder="Name" 
          {...methods.register(`${baseName}.name` as any)} 
        />
        <Input 
          placeholder="Email" 
          {...methods.register(`${baseName}.email` as any)} 
        />
        <Input 
          placeholder="Role" 
          {...methods.register(`${baseName}.role` as any)} 
        />
      </div>
    );
  };

  // Create a Language Fields input component
  const renderLanguageFields = (baseName: string) => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <Input 
          placeholder="Language Code (e.g., en)" 
          {...methods.register(`${baseName}.code` as any)} 
        />
        <Input 
          placeholder="Language Name (e.g., English)" 
          {...methods.register(`${baseName}.name` as any)} 
        />
      </div>
    );
  };

  return (
    <FormProvider {...methods}>
      <Form {...methods}>
        <form onSubmit={methods.handleSubmit(handleFormSubmit)} className="space-y-8">
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
                control={methods.control}
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
                control={methods.control}
                placeholder="Global Good Name"
                required={true}
              />
              
              <FormField
                control={methods.control}
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
                control={methods.control}
                addLabel="Add Website"
                renderItem={(name) => (
                  <UrlWithDescriptionInput baseName={name} control={methods.control} />
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
                control={methods.control}
                addLabel="Add Repository"
                renderItem={(name) => (
                  <UrlWithDescriptionInput baseName={name} control={methods.control} />
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
                control={methods.control}
                addLabel="Add Contact"
                renderItem={(name) => renderContactFields(name)}
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
                control={methods.control}
                placeholder="Brief summary of the global good"
                required={true}
              />
              
              <MultilingualTextInput
                name="description"
                label="Description"
                control={methods.control}
                placeholder="Detailed description of the global good"
                multiline={true}
                required={true}
              />
              
              <MultilingualTextInput
                name="details"
                label="Additional Details"
                control={methods.control}
                placeholder="Additional details about the global good"
                multiline={true}
              />
              
              <FormField
                control={methods.control}
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
                control={methods.control}
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
                control={methods.control}
                addLabel="Add Language"
                renderItem={(name) => renderLanguageFields(name)}
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
    </FormProvider>
  );
}
