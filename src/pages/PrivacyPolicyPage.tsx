
import { useEffect, useState } from 'react';
import { useContentLoader } from '@/hooks/useContentLoader';
import { Separator } from '@/components/ui/separator';

export default function PrivacyPolicyPage() {
  const { content, isLoading } = useContentLoader('pages/privacy');
  const [privacyContent, setPrivacyContent] = useState<any>(null);

  useEffect(() => {
    if (content) {
      setPrivacyContent(content);
    }
  }, [content]);

  if (isLoading || !privacyContent) {
    return (
      <div className="container py-12 text-center">
        <p>Loading content...</p>
      </div>
    );
  }

  return (
    <div className="container py-12 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-2">{privacyContent.title}</h1>
      <p className="text-muted-foreground mb-8">{privacyContent.updatedDate}</p>
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">{privacyContent.introduction.title}</h2>
        <p className="text-base text-muted-foreground">{privacyContent.introduction.content}</p>
      </section>
      
      <Separator className="my-8" />
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">{privacyContent.dataCollection.title}</h2>
        <p className="text-base text-muted-foreground mb-4">{privacyContent.dataCollection.content}</p>
        
        {privacyContent.dataCollection.categories.map((category: any, index: number) => (
          <div key={index} className="mb-4">
            <h3 className="text-xl font-medium mb-2">{category.title}</h3>
            <ul className="list-disc pl-6 space-y-1">
              {category.items.map((item: string, itemIndex: number) => (
                <li key={itemIndex} className="text-muted-foreground">{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>
      
      <Separator className="my-8" />
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">{privacyContent.cookies.title}</h2>
        <p className="text-base text-muted-foreground mb-4">{privacyContent.cookies.content}</p>
        
        <div className="space-y-3">
          {privacyContent.cookies.types.map((type: any, index: number) => (
            <div key={index} className="flex flex-col space-y-1">
              <span className="font-medium">{type.name}</span>
              <span className="text-sm text-muted-foreground">{type.description}</span>
            </div>
          ))}
        </div>
      </section>
      
      <Separator className="my-8" />
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">{privacyContent.dataUse.title}</h2>
        <ul className="list-disc pl-6 space-y-1">
          {privacyContent.dataUse.purposes.map((purpose: string, index: number) => (
            <li key={index} className="text-muted-foreground">{purpose}</li>
          ))}
        </ul>
      </section>
      
      <Separator className="my-8" />
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">{privacyContent.dataSharing.title}</h2>
        <p className="text-base text-muted-foreground mb-4">{privacyContent.dataSharing.content}</p>
        
        <div className="space-y-3">
          {privacyContent.dataSharing.thirdParties.map((party: any, index: number) => (
            <div key={index} className="flex flex-col space-y-1">
              <span className="font-medium">{party.name}</span>
              <span className="text-sm text-muted-foreground">{party.purpose}</span>
            </div>
          ))}
        </div>
      </section>
      
      <Separator className="my-8" />
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">{privacyContent.security.title}</h2>
        <p className="text-base text-muted-foreground">{privacyContent.security.content}</p>
      </section>
      
      <Separator className="my-8" />
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">{privacyContent.userRights.title}</h2>
        
        <div className="space-y-4 mb-4">
          {privacyContent.userRights.rights.map((right: any, index: number) => (
            <div key={index} className="flex flex-col space-y-1">
              <span className="font-medium">{right.name}</span>
              <span className="text-sm text-muted-foreground">{right.description}</span>
            </div>
          ))}
        </div>
        
        <p className="text-base text-muted-foreground">{privacyContent.userRights.contact}</p>
      </section>
      
      <Separator className="my-8" />
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">{privacyContent.contact.title}</h2>
        <p className="text-base text-muted-foreground mb-2">{privacyContent.contact.content}</p>
        <p className="font-medium">{privacyContent.contact.email}</p>
        <pre className="whitespace-pre-wrap text-muted-foreground mt-2">{privacyContent.contact.address}</pre>
      </section>
    </div>
  );
}
