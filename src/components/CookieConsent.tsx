
import { useEffect, useState } from "react";
import { useI18n } from "@/hooks/useI18n";
import { toast } from "@/components/ui/use-toast";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { X, Settings, Shield } from "lucide-react";

interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  preferences: boolean;
  marketing: boolean;
}

interface ConsentData {
  timestamp: string;
  version: string;
  preferences: CookiePreferences;
}

export function CookieConsent() {
  const { tPage } = useI18n();
  
  const [showConsent, setShowConsent] = useState(false);
  const [cookiePreferences, setCookiePreferences] = useState<CookiePreferences>({
    necessary: true,
    analytics: false,
    preferences: false,
    marketing: false,
  });
  const [showCustomize, setShowCustomize] = useState(false);

  useEffect(() => {
    // Check if consent is already given and not expired
    const consentData = localStorage.getItem('cookieConsentData');
    if (!consentData) {
      setShowConsent(true);
      // Set default consent state for Google
      if (typeof window !== 'undefined' && window.gtag) {
        (window as any).gtag('consent', 'default', {
          'analytics_storage': 'denied',
          'ad_storage': 'denied',
          'ad_user_data': 'denied',
          'ad_personalization': 'denied',
          'functionality_storage': 'denied',
          'personalization_storage': 'denied',
          'security_storage': 'granted'
        });
      }
    } else {
      try {
        const data: ConsentData = JSON.parse(consentData);
        // Check if consent is older than 12 months
        const consentDate = new Date(data.timestamp);
        const now = new Date();
        const monthsDiff = (now.getTime() - consentDate.getTime()) / (1000 * 60 * 60 * 24 * 30);
        
        if (monthsDiff > 12) {
          // Consent expired, ask again
          setShowConsent(true);
          localStorage.removeItem('cookieConsentData');
        } else {
          setCookiePreferences(data.preferences);
          // Send consent update to Google
          updateGoogleConsent(data.preferences);
        }
      } catch (e) {
        console.error("Error parsing cookie consent data", e);
        setShowConsent(true);
      }
    }
  }, []);

  const updateGoogleConsent = (preferences: CookiePreferences) => {
    if (typeof window !== 'undefined' && window.gtag) {
      (window as any).gtag('consent', 'update', {
        'analytics_storage': preferences.analytics ? 'granted' : 'denied',
        'ad_storage': preferences.marketing ? 'granted' : 'denied',
        'ad_user_data': preferences.marketing ? 'granted' : 'denied',
        'ad_personalization': preferences.marketing ? 'granted' : 'denied',
        'functionality_storage': preferences.preferences ? 'granted' : 'denied',
        'personalization_storage': preferences.preferences ? 'granted' : 'denied',
        'security_storage': 'granted'
      });
    }
    
    // Trigger storage event for other tabs/hooks
    window.dispatchEvent(new StorageEvent('storage', {
      key: 'cookiePreferences',
      newValue: JSON.stringify(preferences),
      storageArea: localStorage
    }));
  };

  const saveConsent = (preferences: CookiePreferences) => {
    const consentData: ConsentData = {
      timestamp: new Date().toISOString(),
      version: '1.0',
      preferences
    };
    
    localStorage.setItem('cookieConsentData', JSON.stringify(consentData));
    localStorage.setItem('cookieConsent', 'true');
    localStorage.setItem('cookiePreferences', JSON.stringify(preferences));
    
    updateGoogleConsent(preferences);
    setCookiePreferences(preferences);
    setShowConsent(false);
  };

  const handleAcceptAll = () => {
    const preferences: CookiePreferences = { 
      necessary: true, 
      analytics: true, 
      preferences: true,
      marketing: true 
    };
    
    saveConsent(preferences);
    
    toast({
      title: tPage('acceptToastTitle', 'cookie'),
      description: tPage('acceptAllToastDesc', 'cookie'),
    });
  };

  const handleRejectAll = () => {
    const preferences: CookiePreferences = { 
      necessary: true, 
      analytics: false, 
      preferences: false,
      marketing: false 
    };
    
    saveConsent(preferences);
    clearNonEssentialCookies();
    
    toast({
      title: tPage('rejectToastTitle', 'cookie') || 'Preferences Saved',
      description: tPage('rejectAllToastDesc', 'cookie') || 'Only essential cookies will be used.',
    });
  };

  const handleSavePreferences = () => {
    saveConsent(cookiePreferences);
    
    if (!cookiePreferences.analytics && !cookiePreferences.marketing) {
      clearNonEssentialCookies();
    }
    
    toast({
      title: tPage('acceptToastTitle', 'cookie'),
      description: tPage('acceptSelectedToastDesc', 'cookie'),
    });
  };

  const clearNonEssentialCookies = () => {
    // Clear Google Analytics cookies
    document.cookie.split(";").forEach((c) => {
      const eqPos = c.indexOf("=");
      const name = eqPos > -1 ? c.substring(0, eqPos).trim() : c.trim();
      if (name.startsWith('_ga') || name.startsWith('_gid') || name.startsWith('_gat')) {
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${window.location.hostname}`;
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.${window.location.hostname}`;
      }
    });
  };

  const handleCustomize = () => {
    setShowCustomize(!showCustomize);
  };

  const handlePreferenceChange = (type: keyof CookiePreferences, value: boolean) => {
    setCookiePreferences(prev => ({ ...prev, [type]: value }));
  };

  // Allow reopening consent settings
  useEffect(() => {
    const handleReopenConsent = (e: CustomEvent) => {
      setShowConsent(true);
      setShowCustomize(true);
    };
    
    window.addEventListener('openCookieSettings' as any, handleReopenConsent);
    return () => window.removeEventListener('openCookieSettings' as any, handleReopenConsent);
  }, []);

  if (!showConsent) return null;

  return (
    <Card className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-lg z-50 p-6 shadow-xl border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/85">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-semibold">{tPage('title', 'cookie')}</h2>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="h-6 w-6"
          onClick={() => setShowConsent(false)}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
      
      <p className="text-sm text-muted-foreground mb-4">
        {tPage('description', 'cookie')}
      </p>

      <div className="text-xs text-muted-foreground mb-4">
        {tPage('policyIntro', 'cookie')}{' '}
        <a href="https://www.path.org/privacy-notice/" target="_blank" rel="noopener noreferrer" className="underline hover:text-primary">
          {tPage('privacyPolicy', 'cookie')}
        </a>
        {' '}and{' '}
        <a href="/cookie-policy" className="underline hover:text-primary">
          Cookie Policy
        </a>.
      </div>

      {!showCustomize ? (
        <div className="flex flex-col gap-2">
          <div className="flex gap-2">
            <Button 
              onClick={handleRejectAll}
              variant="outline"
              className="flex-1"
              size="sm"
            >
              {tPage('rejectAll', 'cookie') || 'Reject All'}
            </Button>
            <Button 
              onClick={handleCustomize}
              variant="outline"
              className="flex-1"
              size="sm"
            >
              <Settings className="h-3 w-3 mr-1" />
              {tPage('customize', 'cookie')}
            </Button>
          </div>
          <Button 
            onClick={handleAcceptAll}
            className="w-full"
            size="sm"
          >
            {tPage('acceptAll', 'cookie')}
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between p-2 rounded-md bg-muted/30">
              <div className="flex-1">
                <p className="font-medium text-sm">{tPage('necessary', 'cookie')}</p>
                <p className="text-xs text-muted-foreground">{tPage('necessaryDesc', 'cookie')}</p>
              </div>
              <span className="text-xs font-medium text-muted-foreground ml-4">
                {tPage('alwaysActive', 'cookie')}
              </span>
            </div>

            <div className="flex items-center justify-between p-2 rounded-md hover:bg-muted/30 transition-colors">
              <div className="flex-1">
                <p className="font-medium text-sm">{tPage('analytics', 'cookie')}</p>
                <p className="text-xs text-muted-foreground">{tPage('analyticsDesc', 'cookie')}</p>
              </div>
              <Switch
                checked={cookiePreferences.analytics}
                onCheckedChange={(checked) => handlePreferenceChange('analytics', checked)}
                className="ml-4"
              />
            </div>

            <div className="flex items-center justify-between p-2 rounded-md hover:bg-muted/30 transition-colors">
              <div className="flex-1">
                <p className="font-medium text-sm">{tPage('preferences', 'cookie')}</p>
                <p className="text-xs text-muted-foreground">{tPage('preferencesDesc', 'cookie')}</p>
              </div>
              <Switch
                checked={cookiePreferences.preferences}
                onCheckedChange={(checked) => handlePreferenceChange('preferences', checked)}
                className="ml-4"
              />
            </div>

            <div className="flex items-center justify-between p-2 rounded-md hover:bg-muted/30 transition-colors">
              <div className="flex-1">
                <p className="font-medium text-sm">{tPage('marketing', 'cookie') || 'Marketing Cookies'}</p>
                <p className="text-xs text-muted-foreground">
                  {tPage('marketingDesc', 'cookie') || 'These cookies are used to track visitors across websites for advertising purposes.'}
                </p>
              </div>
              <Switch
                checked={cookiePreferences.marketing}
                onCheckedChange={(checked) => handlePreferenceChange('marketing', checked)}
                className="ml-4"
              />
            </div>
          </div>

          <div className="flex gap-2">
            <Button 
              onClick={handleRejectAll}
              variant="outline"
              size="sm"
              className="flex-1"
            >
              {tPage('rejectAll', 'cookie') || 'Reject All'}
            </Button>
            <Button 
              onClick={handleSavePreferences}
              size="sm"
              className="flex-1"
            >
              {tPage('savePreferences', 'cookie')}
            </Button>
          </div>
        </div>
      )}
    </Card>
  );
}
