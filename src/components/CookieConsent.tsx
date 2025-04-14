
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Card,
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Cookie, X, Settings, Info } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/hooks/use-toast';
import { useContentLoader } from '@/hooks/useContentLoader';

interface CookieSettings {
  necessary: boolean;
  analytics: boolean;
  preferences: boolean;
}

export function CookieConsent() {
  const [isOpen, setIsOpen] = useState(false);
  const [settings, setSettings] = useState<CookieSettings>({
    necessary: true,
    analytics: false,
    preferences: false
  });
  const { language } = useLanguage();
  const { toast } = useToast();
  const { content, isLoading } = useContentLoader('pages/cookie');
  
  // Check if the user has already consented to cookies
  useEffect(() => {
    const hasConsent = localStorage.getItem('cookieConsent');
    if (!hasConsent) {
      setIsOpen(true);
    } else {
      try {
        const savedSettings = JSON.parse(hasConsent);
        setSettings(savedSettings);
      } catch (e) {
        console.error('Error parsing cookie settings', e);
      }
    }
  }, []);

  const acceptAll = () => {
    const allSettings = { necessary: true, analytics: true, preferences: true };
    localStorage.setItem('cookieConsent', JSON.stringify(allSettings));
    setSettings(allSettings);
    setIsOpen(false);
    
    toast({
      title: content?.acceptToastTitle || 'Cookies accepted',
      description: content?.acceptAllToastDesc || 'All cookie preferences have been saved.',
      duration: 3000
    });
  };

  const acceptSelected = () => {
    localStorage.setItem('cookieConsent', JSON.stringify(settings));
    setIsOpen(false);
    
    toast({
      title: content?.acceptToastTitle || 'Cookies saved',
      description: content?.acceptSelectedToastDesc || 'Your cookie preferences have been saved.',
      duration: 3000
    });
  };

  const handleSettingChange = (key: keyof CookieSettings) => {
    if (key === 'necessary') return; // Necessary cookies can't be disabled
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  if (!isOpen) return null;
  if (isLoading) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-background/80 backdrop-blur-sm">
      <Card className="mx-auto max-w-4xl shadow-lg">
        <CardHeader className="flex flex-row items-center gap-2 pb-2">
          <Cookie className="h-6 w-6 text-primary" />
          <div>
            <CardTitle>{content?.title || 'Cookie Consent'}</CardTitle>
            <CardDescription>
              {content?.description || 'We use cookies to enhance your browsing experience.'}
            </CardDescription>
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            className="ml-auto" 
            onClick={() => setIsOpen(false)}
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </Button>
        </CardHeader>
        <CardContent className="pt-0">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="settings">
              <AccordionTrigger>
                <div className="flex items-center gap-2">
                  <Settings className="h-4 w-4" />
                  <span>{content?.customize || 'Customize Cookie Settings'}</span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4 pt-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium">{content?.necessary || 'Necessary Cookies'}</h4>
                      <p className="text-xs text-muted-foreground">
                        {content?.necessaryDesc || 'These cookies are essential for the website to function.'}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-muted-foreground">{content?.alwaysActive || 'Always active'}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium">{content?.analytics || 'Analytics Cookies'}</h4>
                      <p className="text-xs text-muted-foreground">
                        {content?.analyticsDesc || 'These cookies help us understand how visitors interact with our website.'}
                      </p>
                    </div>
                    <Button 
                      variant={settings.analytics ? "default" : "outline"} 
                      size="sm"
                      onClick={() => handleSettingChange('analytics')}
                    >
                      {settings.analytics 
                        ? (content?.enabled || 'Enabled') 
                        : (content?.disabled || 'Disabled')}
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium">{content?.preferences || 'Preferences Cookies'}</h4>
                      <p className="text-xs text-muted-foreground">
                        {content?.preferencesDesc || 'These cookies allow the website to remember your preferences.'}
                      </p>
                    </div>
                    <Button 
                      variant={settings.preferences ? "default" : "outline"} 
                      size="sm"
                      onClick={() => handleSettingChange('preferences')}
                    >
                      {settings.preferences 
                        ? (content?.enabled || 'Enabled') 
                        : (content?.disabled || 'Disabled')}
                    </Button>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="info">
              <AccordionTrigger>
                <div className="flex items-center gap-2">
                  <Info className="h-4 w-4" />
                  <span>{content?.moreInfo || 'More Information'}</span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-sm text-muted-foreground mb-2">
                  {content?.policyIntro || 'For more information about how we use cookies, please visit our'}
                  {' '}
                  <a href="/privacy" className="text-primary hover:underline">
                    {content?.privacyPolicy || 'Privacy Policy'}
                  </a>.
                </p>
                <p className="text-sm text-muted-foreground">
                  {content?.contactInfo || 'If you have any questions, please contact us at'}
                  {' '}
                  <a href="mailto:privacy@globalgoodsatlas.org" className="text-primary hover:underline">
                    privacy@globalgoodsatlas.org
                  </a>
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row gap-2 justify-end">
          <Button variant="outline" onClick={acceptSelected}>
            {content?.savePreferences || 'Save Preferences'}
          </Button>
          <Button onClick={acceptAll}>
            {content?.acceptAll || 'Accept All'}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
