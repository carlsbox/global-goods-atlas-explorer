
import { useI18n } from '@/hooks/useI18n';
import { Separator } from '@/components/ui/separator';

export default function TermsOfServicePage() {
  const { tPage } = useI18n();

  return (
    <div className="container py-12 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-2">{tPage('title', 'terms')}</h1>
      <p className="text-muted-foreground mb-8">{tPage('updatedDate', 'terms')}</p>
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">{tPage('introduction.title', 'terms')}</h2>
        <p className="text-base text-muted-foreground">{tPage('introduction.content', 'terms')}</p>
      </section>
      
      <Separator className="my-8" />
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">{tPage('acceptance.title', 'terms')}</h2>
        <p className="text-base text-muted-foreground">{tPage('acceptance.content', 'terms')}</p>
      </section>
      
      <Separator className="my-8" />
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">{tPage('changes.title', 'terms')}</h2>
        <p className="text-base text-muted-foreground">{tPage('changes.content', 'terms')}</p>
      </section>
      
      <Separator className="my-8" />
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">{tPage('access.title', 'terms')}</h2>
        <p className="text-base text-muted-foreground">{tPage('access.content', 'terms')}</p>
      </section>
      
      <Separator className="my-8" />
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">{tPage('accountTerms.title', 'terms')}</h2>
        <ul className="list-disc pl-6 space-y-1">
          {Array.from({ length: 5 }).map((_, index) => (
            <li key={index} className="text-muted-foreground">{tPage(`accountTerms.rules.${index}`, 'terms')}</li>
          ))}
        </ul>
      </section>
      
      <Separator className="my-8" />
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">{tPage('intellectualProperty.title', 'terms')}</h2>
        <p className="text-base text-muted-foreground">{tPage('intellectualProperty.content', 'terms')}</p>
      </section>
      
      <Separator className="my-8" />
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">{tPage('userContent.title', 'terms')}</h2>
        <p className="text-base text-muted-foreground mb-4">{tPage('userContent.content', 'terms')}</p>
        
        <h3 className="text-xl font-medium mb-3">{tPage('userContent.restrictions.title', 'terms')}</h3>
        <ul className="list-disc pl-6 space-y-1">
          {Array.from({ length: 5 }).map((_, index) => (
            <li key={index} className="text-muted-foreground">{tPage(`userContent.restrictions.items.${index}`, 'terms')}</li>
          ))}
        </ul>
      </section>
      
      <Separator className="my-8" />
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">{tPage('links.title', 'terms')}</h2>
        <p className="text-base text-muted-foreground">{tPage('links.content', 'terms')}</p>
      </section>
      
      <Separator className="my-8" />
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">{tPage('termination.title', 'terms')}</h2>
        <p className="text-base text-muted-foreground">{tPage('termination.content', 'terms')}</p>
      </section>
      
      <Separator className="my-8" />
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">{tPage('governing.title', 'terms')}</h2>
        <p className="text-base text-muted-foreground">{tPage('governing.content', 'terms')}</p>
      </section>
      
      <Separator className="my-8" />
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">{tPage('disclaimer.title', 'terms')}</h2>
        <p className="text-base text-muted-foreground">{tPage('disclaimer.content', 'terms')}</p>
      </section>
      
      <Separator className="my-8" />
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">{tPage('contact.title', 'terms')}</h2>
        <p className="text-base text-muted-foreground mb-2">{tPage('contact.content', 'terms')}</p>
        <p className="font-medium">{tPage('contact.email', 'terms')}</p>
        <pre className="whitespace-pre-wrap text-muted-foreground mt-2">{tPage('contact.address', 'terms')}</pre>
      </section>
    </div>
  );
}
