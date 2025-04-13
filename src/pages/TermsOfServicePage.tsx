
import { useEffect, useState } from 'react';
import { useContentLoader } from '@/hooks/useContentLoader';
import { Separator } from '@/components/ui/separator';

export default function TermsOfServicePage() {
  const { content, isLoading } = useContentLoader('pages/terms');
  const [termsContent, setTermsContent] = useState<any>(null);

  useEffect(() => {
    if (content) {
      setTermsContent(content);
    }
  }, [content]);

  if (isLoading || !termsContent) {
    return (
      <div className="container py-12 text-center">
        <p>Loading content...</p>
      </div>
    );
  }

  return (
    <div className="container py-12 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-2">{termsContent.title}</h1>
      <p className="text-muted-foreground mb-8">{termsContent.updatedDate}</p>
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">{termsContent.introduction.title}</h2>
        <p className="text-base text-muted-foreground">{termsContent.introduction.content}</p>
      </section>
      
      <Separator className="my-8" />
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">{termsContent.acceptance.title}</h2>
        <p className="text-base text-muted-foreground">{termsContent.acceptance.content}</p>
      </section>
      
      <Separator className="my-8" />
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">{termsContent.changes.title}</h2>
        <p className="text-base text-muted-foreground">{termsContent.changes.content}</p>
      </section>
      
      <Separator className="my-8" />
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">{termsContent.access.title}</h2>
        <p className="text-base text-muted-foreground">{termsContent.access.content}</p>
      </section>
      
      <Separator className="my-8" />
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">{termsContent.accountTerms.title}</h2>
        <ul className="list-disc pl-6 space-y-1">
          {termsContent.accountTerms.rules.map((rule: string, index: number) => (
            <li key={index} className="text-muted-foreground">{rule}</li>
          ))}
        </ul>
      </section>
      
      <Separator className="my-8" />
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">{termsContent.intellectualProperty.title}</h2>
        <p className="text-base text-muted-foreground">{termsContent.intellectualProperty.content}</p>
      </section>
      
      <Separator className="my-8" />
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">{termsContent.userContent.title}</h2>
        <p className="text-base text-muted-foreground mb-4">{termsContent.userContent.content}</p>
        
        <h3 className="text-xl font-medium mb-3">{termsContent.userContent.restrictions.title}</h3>
        <ul className="list-disc pl-6 space-y-1">
          {termsContent.userContent.restrictions.items.map((item: string, index: number) => (
            <li key={index} className="text-muted-foreground">{item}</li>
          ))}
        </ul>
      </section>
      
      <Separator className="my-8" />
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">{termsContent.links.title}</h2>
        <p className="text-base text-muted-foreground">{termsContent.links.content}</p>
      </section>
      
      <Separator className="my-8" />
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">{termsContent.termination.title}</h2>
        <p className="text-base text-muted-foreground">{termsContent.termination.content}</p>
      </section>
      
      <Separator className="my-8" />
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">{termsContent.governing.title}</h2>
        <p className="text-base text-muted-foreground">{termsContent.governing.content}</p>
      </section>
      
      <Separator className="my-8" />
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">{termsContent.disclaimer.title}</h2>
        <p className="text-base text-muted-foreground">{termsContent.disclaimer.content}</p>
      </section>
      
      <Separator className="my-8" />
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">{termsContent.contact.title}</h2>
        <p className="text-base text-muted-foreground mb-2">{termsContent.contact.content}</p>
        <p className="font-medium">{termsContent.contact.email}</p>
        <pre className="whitespace-pre-wrap text-muted-foreground mt-2">{termsContent.contact.address}</pre>
      </section>
    </div>
  );
}
