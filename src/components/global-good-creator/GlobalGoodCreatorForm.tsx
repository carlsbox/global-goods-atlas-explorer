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
    defaultValues: formData as GlobalGoodFlatFormValues,
    mode: 'onChange',
  });

  // Watch form changes and propagate to parent
  useEffect(() => {
    const subscription = form.watch((data) => {
      onFormDataChange(data as Partial<GlobalGoodFlat>);
    });
    return () => subscription.unsubscribe();
  }, [form, onFormDataChange]);

  // Update form when external data changes
  useEffect(() => {
    form.reset(formData as GlobalGoodFlatFormValues);
  }, [formData, form]);

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