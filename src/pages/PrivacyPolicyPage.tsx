
import { useI18n } from '@/hooks/useI18n';
import { Separator } from '@/components/ui/separator';

export default function PrivacyPolicyPage() {
  const { tPage } = useI18n();

  return (
    <div className="container py-12 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-2">{tPage('title', 'privacy')}</h1>
      <p className="text-muted-foreground mb-8">{tPage('updatedDate', 'privacy')}</p>
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">{tPage('introduction.title', 'privacy')}</h2>
        <p className="text-base text-muted-foreground">{tPage('introduction.content', 'privacy')}</p>
      </section>
      
      <Separator className="my-8" />
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">{tPage('dataCollection.title', 'privacy')}</h2>
        <p className="text-base text-muted-foreground mb-4">{tPage('dataCollection.content', 'privacy')}</p>
        
        <div className="mb-4">
          <h3 className="text-xl font-medium mb-2">{tPage('dataCollection.categories.0.title', 'privacy')}</h3>
          <ul className="list-disc pl-6 space-y-1">
            {Array.from({ length: 4 }).map((_, index) => (
              <li key={index} className="text-muted-foreground">
                {tPage(`dataCollection.categories.0.items.${index}`, 'privacy')}
              </li>
            ))}
          </ul>
        </div>
        
        <div className="mb-4">
          <h3 className="text-xl font-medium mb-2">{tPage('dataCollection.categories.1.title', 'privacy')}</h3>
          <ul className="list-disc pl-6 space-y-1">
            {Array.from({ length: 5 }).map((_, index) => (
              <li key={index} className="text-muted-foreground">
                {tPage(`dataCollection.categories.1.items.${index}`, 'privacy')}
              </li>
            ))}
          </ul>
        </div>
      </section>
      
      <Separator className="my-8" />
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">{tPage('cookies.title', 'privacy')}</h2>
        <p className="text-base text-muted-foreground mb-4">{tPage('cookies.content', 'privacy')}</p>
        
        <div className="space-y-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="flex flex-col space-y-1">
              <span className="font-medium">{tPage(`cookies.types.${index}.name`, 'privacy')}</span>
              <span className="text-sm text-muted-foreground">{tPage(`cookies.types.${index}.description`, 'privacy')}</span>
            </div>
          ))}
        </div>
      </section>
      
      <Separator className="my-8" />
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">{tPage('dataUse.title', 'privacy')}</h2>
        <ul className="list-disc pl-6 space-y-1">
          {Array.from({ length: 7 }).map((_, index) => (
            <li key={index} className="text-muted-foreground">
              {tPage(`dataUse.purposes.${index}`, 'privacy')}
            </li>
          ))}
        </ul>
      </section>
      
      <Separator className="my-8" />
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">{tPage('dataSharing.title', 'privacy')}</h2>
        <p className="text-base text-muted-foreground mb-4">{tPage('dataSharing.content', 'privacy')}</p>
        
        <div className="space-y-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="flex flex-col space-y-1">
              <span className="font-medium">{tPage(`dataSharing.thirdParties.${index}.name`, 'privacy')}</span>
              <span className="text-sm text-muted-foreground">{tPage(`dataSharing.thirdParties.${index}.purpose`, 'privacy')}</span>
            </div>
          ))}
        </div>
      </section>
      
      <Separator className="my-8" />
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">{tPage('security.title', 'privacy')}</h2>
        <p className="text-base text-muted-foreground">{tPage('security.content', 'privacy')}</p>
      </section>
      
      <Separator className="my-8" />
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">{tPage('userRights.title', 'privacy')}</h2>
        
        <div className="space-y-4 mb-4">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="flex flex-col space-y-1">
              <span className="font-medium">{tPage(`userRights.rights.${index}.name`, 'privacy')}</span>
              <span className="text-sm text-muted-foreground">{tPage(`userRights.rights.${index}.description`, 'privacy')}</span>
            </div>
          ))}
        </div>
        
        <p className="text-base text-muted-foreground">{tPage('userRights.contact', 'privacy')}</p>
      </section>
      
      <Separator className="my-8" />
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">{tPage('contact.title', 'privacy')}</h2>
        <p className="text-base text-muted-foreground mb-2">{tPage('contact.content', 'privacy')}</p>
        <p className="font-medium">{tPage('contact.email', 'privacy')}</p>
        <pre className="whitespace-pre-wrap text-muted-foreground mt-2">{tPage('contact.address', 'privacy')}</pre>
      </section>
    </div>
  );
}
