import React, { useState, useEffect, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import { GlobalGoodFormValues, globalGoodFormSchema } from '@/lib/schemas/globalGoodFormSchema';
import { GlobalGood } from '@/lib/types';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { useI18n } from '@/hooks/useI18n';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { MultiSelect } from './MultiSelect';
import { InputWithCounter } from './InputWithCounter';
import { Checkbox } from '@/components/ui/checkbox';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { TagsInput } from './TagsInput';
import { FileUploader } from './FileUploader';
import { ArrayForm } from './ArrayForm';
import { WebsiteForm } from './WebsiteForm';
import { ScoresForm } from './ScoresForm';
import { LanguagesForm } from './LanguagesForm';
import { ScreenshotsForm } from './ScreenshotsForm';
import { ImplementationCountriesForm } from './ImplementationCountriesForm';
import { GlobalGoodsTypeForm } from './GlobalGoodsTypeForm';

interface GlobalGoodFormProps {
  initialData?: GlobalGood | null;
  onSubmit: (data: GlobalGoodFormValues) => Promise<void>;
  isSubmitting: boolean;
}

export const GlobalGoodForm: React.FC<GlobalGoodFormProps> = ({ initialData, onSubmit, isSubmitting }) => {
  const { t, language } = useI18n();

  // Default values for the form
  const defaultValues: GlobalGoodFormValues = {
    id: '',
    name: { en: '' },
    summary: { en: '' },
    description: { en: '' },
    globalGoodsType: [],
    licenses: [],
    repositories: [],
    primaryFunctionality: '',
    users: '',
    languages: [],
    screenshots: [],
    implementationCountries: [],
    scores: [],
    website: { name: '', url: '', description: '' },
    logo: '',
    trl: 1,
    lastUpdated: new Date().toISOString(),
  };

  // Populate default values with initial data if available
  const initialFormValues: GlobalGoodFormValues = initialData ? {
    id: initialData.id || '',
    name: initialData.name || { en: '' },
    summary: initialData.summary || { en: '' },
    description: initialData.description || { en: '' },
    globalGoodsType: initialData.coreMetadata?.globalGoodsType || [],
    licenses: initialData.licenses || [],
    repositories: initialData.repositories || [],
    primaryFunctionality: initialData.productOverview?.primaryFunctionality || '',
    users: initialData.productOverview?.users || '',
    languages: initialData.productOverview?.languages || [],
    screenshots: initialData.productOverview?.screenshots || [],
    implementationCountries: initialData.reach?.ImplementationCountries || [],
    scores: initialData.maturity?.Scores || [],
    website: initialData.coreMetadata?.website?.[0] || { name: '', url: '', description: '' },
    logo: initialData.logo || '',
    trl: initialData.maturity?.trl || 1,
    lastUpdated: initialData.lastUpdated || new Date().toISOString(),
  } : defaultValues;

  const form = useForm<GlobalGoodFormValues>({
    resolver: zodResolver(globalGoodFormSchema),
    defaultValues: initialFormValues,
    mode: "onChange"
  });

  useEffect(() => {
    if (initialData) {
      const processedData: GlobalGoodFormValues = {
        id: initialData.id || '',
        name: initialData.name || { en: '' },
        summary: initialData.summary || { en: '' },
        description: initialData.description || { en: '' },
        globalGoodsType: initialData.coreMetadata?.globalGoodsType || [],
        
        // Convert string arrays to proper object arrays for licenses and repositories
        licenses: Array.isArray(initialData.licenses) 
          ? initialData.licenses.map((license: any) => 
              typeof license === 'string' 
                ? { id: license, name: license, url: '', description: '' }
                : license
            )
          : [],
        repositories: Array.isArray(initialData.repositories)
          ? initialData.repositories.map((repo: any) =>
              typeof repo === 'string'
                ? { id: repo, name: repo, url: '', description: '' }
                : repo
            )
          : [],
        
        primaryFunctionality: initialData.productOverview?.primaryFunctionality || '',
        users: initialData.productOverview?.users || '',
        languages: initialData.productOverview?.languages || [],
        screenshots: initialData.productOverview?.screenshots || [],
        implementationCountries: initialData.reach?.ImplementationCountries || [],
        scores: initialData.maturity?.Scores || [],
        website: initialData.coreMetadata?.website?.[0] || { name: '', url: '', description: '' },
        logo: initialData.logo || '',
        trl: initialData.maturity?.trl || 1,
        lastUpdated: initialData.lastUpdated || new Date().toISOString(),
      };
      form.reset(processedData);
    }
  }, [initialData, form]);

  const onSubmitHandler = (values: GlobalGoodFormValues) => {
    onSubmit(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmitHandler)} className="space-y-4">
        <FormField
          control={form.control}
          name="id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('admin.globalGoods.id')}</FormLabel>
              <FormControl>
                <Input {...field} placeholder={t('admin.globalGoods.idPlaceholder')} disabled={!!initialData} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="name.en"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('admin.globalGoods.name')}</FormLabel>
              <FormControl>
                <Input {...field} placeholder={t('admin.globalGoods.namePlaceholder')} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="summary.en"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('admin.globalGoods.summary')}</FormLabel>
              <FormControl>
                <Textarea
                  placeholder={t('admin.globalGoods.summaryPlaceholder')}
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description.en"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('admin.globalGoods.description')}</FormLabel>
              <FormControl>
                <Textarea
                  placeholder={t('admin.globalGoods.descriptionPlaceholder')}
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>Sections</AccordionTrigger>
            <AccordionContent>

              <Card>
                <CardHeader>
                  <CardTitle>Core Metadata</CardTitle>
                  <CardDescription>Manage core metadata.</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                  <GlobalGoodsTypeForm form={form} />
                  <ArrayForm
                    form={form}
                    name="licenses"
                    label="Licenses"
                    itemLabel="License"
                    fields={['name', 'url', 'description']}
                  />
                  <ArrayForm
                    form={form}
                    name="repositories"
                    label="Repositories"
                    itemLabel="Repository"
                    fields={['name', 'url', 'description']}
                  />
                  <WebsiteForm form={form} />
                  <FormField
                    control={form.control}
                    name="logo"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Logo</FormLabel>
                        <FormControl>
                          <FileUploader
                            onChange={(url: string) => field.onChange(url)}
                            value={field.value}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Product Overview</CardTitle>
                  <CardDescription>Manage product overview.</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                  <FormField
                    control={form.control}
                    name="primaryFunctionality"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Primary Functionality</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Enter primary functionality" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="users"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Users</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Enter users" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <LanguagesForm form={form} />
                  <ScreenshotsForm form={form} />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Reach</CardTitle>
                  <CardDescription>Manage reach.</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                  <ImplementationCountriesForm form={form} />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Maturity</CardTitle>
                  <CardDescription>Manage maturity.</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                  <FormField
                    control={form.control}
                    name="trl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>TRL</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} placeholder="Enter TRL" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <ScoresForm form={form} />
                </CardContent>
              </Card>

            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? t('admin.submitting') : t('admin.submit')}
        </Button>
      </form>
    </Form>
  );
};
