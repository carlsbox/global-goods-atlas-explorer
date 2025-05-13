
import { useEffect, useState } from "react";
import { useI18n } from "@/hooks/useI18n";
import { toast } from "@/components/ui/use-toast";

export function CookieConsent() {
  const { tPage } = useI18n();
  
  const [showConsent, setShowConsent] = useState(false);
  const [cookiePreferences, setCookiePreferences] = useState({
    necessary: true,
    analytics: false,
    preferences: false,
  });
  const [showCustomize, setShowCustomize] = useState(false);

  useEffect(() => {
    // Check if consent is already given
    const consentGiven = localStorage.getItem('cookieConsent');
    if (!consentGiven) {
      setShowConsent(true);
    } else {
      try {
        const savedPreferences = JSON.parse(localStorage.getItem('cookiePreferences') || '{}');
        setCookiePreferences(prev => ({ ...prev, ...savedPreferences }));
      } catch (e) {
        console.error("Error parsing cookie preferences from localStorage", e);
      }
    }
  }, []);

  const handleAcceptAll = () => {
    const preferences = { necessary: true, analytics: true, preferences: true };
    localStorage.setItem('cookieConsent', 'true');
    localStorage.setItem('cookiePreferences', JSON.stringify({ analytics: true, preferences: true }));
    setCookiePreferences(preferences);
    setShowConsent(false);
    
    // Show toast notification
    toast({
      title: tPage('acceptToastTitle', 'cookie'),
      description: tPage('acceptAllToastDesc', 'cookie'),
    });
  };

  const handleSavePreferences = () => {
    localStorage.setItem('cookieConsent', 'true');
    localStorage.setItem('cookiePreferences', JSON.stringify(cookiePreferences));
    setShowConsent(false);
    
    // Show toast notification
    toast({
      title: tPage('acceptToastTitle', 'cookie'),
      description: tPage('acceptSelectedToastDesc', 'cookie'),
    });
  };

  const handleCustomize = () => {
    setShowCustomize(true);
  };

  const handlePreferenceChange = (type: string, value: boolean) => {
    setCookiePreferences(prev => ({ ...prev, [type]: value }));
  };

  return (
    <div className={`fixed bottom-0 left-0 w-full bg-background border-t z-50 p-4 ${showConsent ? '' : 'hidden'}`}>
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="mb-4 md:mb-0">
            <h2 className="text-lg font-semibold">{tPage('title', 'cookie')}</h2>
            <p className="text-sm text-muted-foreground">{tPage('description', 'cookie')}</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <button className="px-4 py-2 bg-secondary hover:bg-secondary/80 text-secondary-foreground rounded-md text-sm" onClick={handleCustomize}>
              {tPage('customize', 'cookie')}
            </button>
            <button className="px-4 py-2 bg-primary hover:bg-primary/80 text-primary-foreground rounded-md text-sm" onClick={handleAcceptAll}>
              {tPage('acceptAll', 'cookie')}
            </button>
          </div>
        </div>
        {showCustomize && (
          <div className="mt-4">
            <h3 className="text-md font-semibold mb-2">{tPage('customize', 'cookie')}</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{tPage('necessary', 'cookie')}</p>
                  <p className="text-sm text-muted-foreground">{tPage('necessaryDesc', 'cookie')}</p>
                </div>
                <span className="text-sm">{tPage('alwaysActive', 'cookie')}</span>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{tPage('analytics', 'cookie')}</p>
                  <p className="text-sm text-muted-foreground">{tPage('analyticsDesc', 'cookie')}</p>
                </div>
                <label className="switch">
                  <input type="checkbox" checked={cookiePreferences.analytics} onChange={(e) => handlePreferenceChange('analytics', e.target.checked)} />
                  <span className="slider round"></span>
                </label>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{tPage('preferences', 'cookie')}</p>
                  <p className="text-sm text-muted-foreground">{tPage('preferencesDesc', 'cookie')}</p>
                </div>
                <label className="switch">
                  <input type="checkbox" checked={cookiePreferences.preferences} onChange={(e) => handlePreferenceChange('preferences', e.target.checked)} />
                  <span className="slider round"></span>
                </label>
              </div>
            </div>
            <div className="mt-4">
              <button className="px-4 py-2 bg-primary hover:bg-primary/80 text-primary-foreground rounded-md text-sm" onClick={handleSavePreferences}>
                {tPage('savePreferences', 'cookie')}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
