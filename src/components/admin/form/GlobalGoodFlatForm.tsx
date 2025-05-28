
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import { GlobalGoodFlatFormValues, globalGoodFlatFormSchema } from '@/lib/schemas/globalGoodFlatFormSchema';
import { GlobalGoodFlat } from '@/lib/types/globalGoodFlat';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useI18n } from '@/hooks/useI18n';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { FileUploader } from './FileUploader';
import { ClassificationsForm } from './ClassificationsForm';
import { StandardsForm } from './StandardsForm';
import { GlobalGoodsTypeForm } from './GlobalGoodsTypeForm';
import { LanguagesForm } from './LanguagesForm';
import { ScreenshotsForm } from './ScreenshotsForm';
import { ImplementationCountriesForm } from './ImplementationCountriesForm';
import { ScoresForm } from './ScoresForm';

interface GlobalGoodFlatFormProps {
  initialData?: GlobalGoodFlat | null;
  onSubmit: (data: GlobalGoodFlatFormValues) => Promise<void>;
  isSubmitting: boolean;
}

export const GlobalGoodFlatForm: React.FC<GlobalGoodFlatFormProps> = ({ 
  initialData, 
  onSubmit, 
  isSubmitting 
}) => {
  const { t } = useI18n();

  // Default values matching GlobalGoodFlat structure
  const defaultValues: GlobalGoodFlatFormValues = {
    ID: '',
    Name: '',
    Logo: '',
    Website: {
      main: { name: '', url: '', description: '' },
      docs: { name: '', url: '', description: '' },
      source_code: { name: '', url: '', description: '' },
      demo: { name: '', url: '', description: '' },
    },
    GlobalGoodsType: [],
    License: { id: '', name: '', url: '', description: '' },
    Contact: [],
    Classifications: {
      SDGs: [],
      WHO: [],
      WMO: [],
      DPI: [],
    },
    StandardsAndInteroperability: {
      HealthStandards: [],
      Interoperability: [],
      ClimateStandards: [],
    },
    ProductOverview: {
      Summary: '',
      Description: '',
      PrimaryFunctionality: '',
      Users: '',
      Languages: [],
      Screenshots: [],
    },
    Reach: {
      SummaryOfReach: '',
      NumberOfImplementations: 0,
      ImplementationMapOverview: null,
      ImplementationCountries: [],
    },
    Maturity: {
      SummaryOfMaturity: '',
      Scores: [],
    },
    ClimateAndHealthIntegration: {
      Description: '',
    },
    Community: {
      DescriptionOfCommunity: '',
      HostAnchorOrganization: {
        name: '',
        url: '',
        description: '',
        country: [],
      },
      InceptionYear: new Date().getFullYear(),
      SizeOfCommunity: 0,
      Links: {},
      Events: {
        description: '',
        schedule: '',
        recent: [],
      },
      Policies: {
        Description: '',
        Governance: { url: '', description: '' },
        TermsOfUse: { url: '', description: '' },
        UserAgreement: { url: '', description: '' },
        PrivacyPolicy: { url: '', description: '' },
        DoNoHarm: { url: '', description: '' },
        PIICollected: { url: '', description: '' },
        NPIIUsed: { url: '', description: '' },
      },
    },
    InclusiveDesign: {
      Description: '',
      UserInput: '',
      OfflineSupport: '',
    },
    EnvironmentalImpact: {
      LowCarbon: '',
    },
    TotalCostOfOwnership: {
      Description: '',
      url: '',
    },
    Sustainability: {
      Description: '',
      KeyFundersSupporters: [],
    },
    Resources: {
      Articles: [],
      ProductDocumentation: [],
      UserRequirements: [],
      EndUserDocumentation: [],
      ImplementerDocumentation: [],
      DeveloperDocumentation: [],
      OperatorDocumentation: [],
      InstallationDocumentation: [],
    },
    LinkedInitiatives: {
      Initiative: [],
    },
  };

  const initialFormValues: GlobalGoodFlatFormValues = initialData || defaultValues;

  const form = useForm<GlobalGoodFlatFormValues>({
    resolver: zodResolver(globalGoodFlatFormSchema),
    defaultValues: initialFormValues,
    mode: "onChange"
  });

  useEffect(() => {
    if (initialData) {
      form.reset(initialData);
    }
  }, [initialData, form]);

  const onSubmitHandler = (values: GlobalGoodFlatFormValues) => {
    onSubmit(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmitHandler)} className="space-y-4">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="ID"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ID</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Global Good ID" disabled={!!initialData} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="Name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Global Good Name" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="Logo"
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

        <Accordion type="multiple" className="w-full">
          {/* Product Overview */}
          <AccordionItem value="product-overview">
            <AccordionTrigger>Product Overview</AccordionTrigger>
            <AccordionContent>
              <Card>
                <CardContent className="pt-6 space-y-4">
                  <FormField
                    control={form.control}
                    name="ProductOverview.Summary"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Summary</FormLabel>
                        <FormControl>
                          <Textarea {...field} placeholder="Product summary" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="ProductOverview.Description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea {...field} placeholder="Product description" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="ProductOverview.PrimaryFunctionality"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Primary Functionality</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Primary functionality" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="ProductOverview.Users"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Users</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Target users" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <LanguagesForm form={form} />
                  <ScreenshotsForm form={form} />
                </CardContent>
              </Card>
            </AccordionContent>
          </AccordionItem>

          {/* Classifications */}
          <AccordionItem value="classifications">
            <AccordionTrigger>Classifications</AccordionTrigger>
            <AccordionContent>
              <ClassificationsForm form={form} />
            </AccordionContent>
          </AccordionItem>

          {/* Standards */}
          <AccordionItem value="standards">
            <AccordionTrigger>Standards and Interoperability</AccordionTrigger>
            <AccordionContent>
              <StandardsForm form={form} />
            </AccordionContent>
          </AccordionItem>

          {/* Reach */}
          <AccordionItem value="reach">
            <AccordionTrigger>Global Reach</AccordionTrigger>
            <AccordionContent>
              <Card>
                <CardContent className="pt-6 space-y-4">
                  <FormField
                    control={form.control}
                    name="Reach.SummaryOfReach"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Summary of Reach</FormLabel>
                        <FormControl>
                          <Textarea {...field} placeholder="Summary of global reach" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="Reach.NumberOfImplementations"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Number of Implementations</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            {...field} 
                            onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <ImplementationCountriesForm form={form} />
                </CardContent>
              </Card>
            </AccordionContent>
          </AccordionItem>

          {/* Maturity */}
          <AccordionItem value="maturity">
            <AccordionTrigger>Maturity</AccordionTrigger>
            <AccordionContent>
              <Card>
                <CardContent className="pt-6 space-y-4">
                  <FormField
                    control={form.control}
                    name="Maturity.SummaryOfMaturity"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Summary of Maturity</FormLabel>
                        <FormControl>
                          <Textarea {...field} placeholder="Summary of maturity" />
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

        <Button type="submit" disabled={isSubmitting} className="w-full">
          {isSubmitting ? t('admin.submitting') : t('admin.submit')}
        </Button>
      </form>
    </Form>
  );
};
