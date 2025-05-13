import { useEffect, useState } from "react";
import { useContentLoader } from "@/hooks/useContentLoader";

export function CookieConsent() {
  // Update the path to use 'pages/cookie' instead of 'cookie'
  const { content, isLoading } = useContentLoader("pages/cookie");
  
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
    localStorage.setItem('cookieConsent', 'true');
    localStorage.setItem('cookiePreferences', JSON.stringify({ analytics: true, preferences: true }));
    setCookiePreferences({ necessary: true, analytics: true, preferences: true });
    setShowConsent(false);
  };

  const handleSavePreferences = () => {
    localStorage.setItem('cookieConsent', 'true');
    localStorage.setItem('cookiePreferences', JSON.stringify(cookiePreferences));
    setShowConsent(false);
  };

  const handleCustomize = () => {
    setShowCustomize(true);
  };

  const handlePreferenceChange = (type: string, value: boolean) => {
    setCookiePreferences(prev => ({ ...prev, [type]: value }));
  };
  
  if (isLoading || !content) {
    return null; // Or a loading indicator
  }

  return (
    <div className={`fixed bottom-0 left-0 w-full bg-background border-t z-50 p-4 ${showConsent ? '' : 'hidden'}`}>
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="mb-4 md:mb-0">
            <h2 className="text-lg font-semibold">{content.title}</h2>
            <p className="text-sm text-muted-foreground">{content.description}</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <button className="px-4 py-2 bg-secondary hover:bg-secondary/80 text-secondary-foreground rounded-md text-sm" onClick={handleCustomize}>
              {content.customize}
            </button>
            <button className="px-4 py-2 bg-primary hover:bg-primary/80 text-primary-foreground rounded-md text-sm" onClick={handleAcceptAll}>
              {content.acceptAll}
            </button>
          </div>
        </div>
        {showCustomize && (
          <div className="mt-4">
            <h3 className="text-md font-semibold mb-2">{content.customize}</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{content.necessary}</p>
                  <p className="text-sm text-muted-foreground">{content.necessaryDesc}</p>
                </div>
                <span className="text-sm">{content.alwaysActive}</span>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{content.analytics}</p>
                  <p className="text-sm text-muted-foreground">{content.analyticsDesc}</p>
                </div>
                <label className="switch">
                  <input type="checkbox" checked={cookiePreferences.analytics} onChange={(e) => handlePreferenceChange('analytics', e.target.checked)} />
                  <span className="slider round"></span>
                </label>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{content.preferences}</p>
                  <p className="text-sm text-muted-foreground">{content.preferencesDesc}</p>
                </div>
                <label className="switch">
                  <input type="checkbox" checked={cookiePreferences.preferences} onChange={(e) => handlePreferenceChange('preferences', e.target.checked)} />
                  <span className="slider round"></span>
                </label>
              </div>
            </div>
            <div className="mt-4">
              <button className="px-4 py-2 bg-primary hover:bg-primary/80 text-primary-foreground rounded-md text-sm" onClick={handleSavePreferences}>
                {content.savePreferences}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
