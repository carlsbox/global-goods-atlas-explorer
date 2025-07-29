import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { globalGoodFlatFormSchema, type GlobalGoodFlatFormValues } from '@/lib/schemas/globalGoodFlatFormSchema';
import { GlobalGoodFlat } from '@/lib/types/globalGoodFlat';
import { Form } from '@/components/ui/form';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { BasicInfoSection } from './form-sections/BasicInfoSection';
import { WebsiteContactSection } from './form-sections/WebsiteContactSection';
import { TypeLicenseSection } from './form-sections/TypeLicenseSection';
import { ClassificationsSection } from './form-sections/ClassificationsSection';
import { StandardsSection } from './form-sections/StandardsSection';
import { ProductOverviewSection } from './form-sections/ProductOverviewSection';
import { ReachSection } from './form-sections/ReachSection';
import { MaturitySection } from './form-sections/MaturitySection';
import { CommunitySection } from './form-sections/CommunitySection';
import { SustainabilitySection } from './form-sections/SustainabilitySection';
import { ResourcesSection } from './form-sections/ResourcesSection';
import { useEffect, useState } from 'react';

interface GlobalGoodCreatorFormProps {
  formData: Partial<GlobalGoodFlat>;
  onFormDataChange: (data: Partial<GlobalGoodFlat>) => void;
}

export function GlobalGoodCreatorForm({ formData, onFormDataChange }: GlobalGoodCreatorFormProps) {
  const [expandedSections, setExpandedSections] = useState<string[]>(['basic-info']);

  const form = useForm<GlobalGoodFlatFormValues>({
    resolver: zodResolver(globalGoodFlatFormSchema),
    defaultValues: {
      ID: '',
      Name: '',
      Logo: '',
      ClimateHealth: false,
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
        Scores: [{
          year: new Date().getFullYear(),
          global_utility: 0,
          community_support: 0,
          maturity_of_gg: 0,
          inclusive_design: 0,
          climate_resilience: 0,
          low_carbon: 0,
        }],
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
      ...formData,
    } as GlobalGoodFlatFormValues,
    mode: 'onBlur',
  });

  // Watch form changes and propagate to parent (but debounce to avoid performance issues)
  useEffect(() => {
    const subscription = form.watch((data) => {
      // Only propagate if the data is valid and different
      if (data && typeof data === 'object') {
        onFormDataChange(data as Partial<GlobalGoodFlat>);
      }
    });
    return () => subscription.unsubscribe();
  }, [form, onFormDataChange]);

  const formSections = [
    {
      id: 'basic-info',
      title: 'Basic Information',
      description: 'Core identity and branding',
      component: BasicInfoSection,
      required: true,
    },
    {
      id: 'website-contact',
      title: 'Website & Contact',
      description: 'Links and contact information',
      component: WebsiteContactSection,
      required: true,
    },
    {
      id: 'type-license',
      title: 'Type & License',
      description: 'Classification and licensing',
      component: TypeLicenseSection,
      required: true,
    },
    {
      id: 'classifications',
      title: 'Classifications',
      description: 'SDGs, WHO, WMO, DPI classifications',
      component: ClassificationsSection,
      required: false,
    },
    {
      id: 'standards',
      title: 'Standards & Interoperability',
      description: 'Technical standards compliance',
      component: StandardsSection,
      required: false,
    },
    {
      id: 'product-overview',
      title: 'Product Overview',
      description: 'Summary, description, and features',
      component: ProductOverviewSection,
      required: true,
    },
    {
      id: 'reach',
      title: 'Global Reach',
      description: 'Implementation countries and scale',
      component: ReachSection,
      required: true,
    },
    {
      id: 'maturity',
      title: 'Maturity Assessment',
      description: 'Maturity scores and evaluation',
      component: MaturitySection,
      required: false,
    },
    {
      id: 'community',
      title: 'Community & Governance',
      description: 'Community information and policies',
      component: CommunitySection,
      required: false,
    },
    {
      id: 'sustainability',
      title: 'Sustainability & Economics',
      description: 'Funding and environmental impact',
      component: SustainabilitySection,
      required: false,
    },
    {
      id: 'resources',
      title: 'Resources & Documentation',
      description: 'Links to documentation and resources',
      component: ResourcesSection,
      required: false,
    },
  ];

  return (
    <Form {...form}>
      <form className="space-y-6">
        <Accordion 
          type="multiple" 
          value={expandedSections} 
          onValueChange={setExpandedSections}
          className="w-full"
        >
          {formSections.map((section) => {
            const SectionComponent = section.component;
            const hasErrors = Object.keys(form.formState.errors).some(key => 
              key.startsWith(section.id.replace('-', ''))
            );

            return (
              <AccordionItem key={section.id} value={section.id}>
                <AccordionTrigger className="hover:no-underline">
                  <div className="flex items-center justify-between w-full pr-4">
                    <div className="text-left">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{section.title}</span>
                        {section.required && (
                          <span className="text-xs bg-primary text-primary-foreground px-2 py-0.5 rounded">
                            Required
                          </span>
                        )}
                        {hasErrors && (
                          <span className="text-xs bg-destructive text-destructive-foreground px-2 py-0.5 rounded">
                            Errors
                          </span>
                        )}
                      </div>
                      <div className="text-sm text-muted-foreground mt-1">
                        {section.description}
                      </div>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pt-4">
                  <SectionComponent form={form} />
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      </form>
    </Form>
  );
}