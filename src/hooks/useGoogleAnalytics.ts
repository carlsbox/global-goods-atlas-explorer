
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getAnalyticsId } from '@/lib/config';

// Type definitions are in src/types/gtag.d.ts

export const useGoogleAnalytics = () => {
  const location = useLocation();
  const analyticsId = getAnalyticsId();

  useEffect(() => {
    const initializeGoogleConsent = () => {
      // Initialize Google Consent Mode v2 with default denied state
      const script = document.createElement('script');
      script.innerHTML = `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        
        // Set default consent state to denied
        gtag('consent', 'default', {
          'analytics_storage': 'denied',
          'ad_storage': 'denied',
          'ad_user_data': 'denied',
          'ad_personalization': 'denied',
          'functionality_storage': 'denied',
          'personalization_storage': 'denied',
          'security_storage': 'granted',
          'wait_for_update': 500
        });
        
        // Optional: set ads data redaction
        gtag('set', 'ads_data_redaction', true);
        
        // Optional: set URL passthrough for better conversion tracking without cookies
        gtag('set', 'url_passthrough', true);
      `;
      document.head.appendChild(script);
      
      // Mark consent mode as initialized
      window.gtag = window.gtag || function(){
        (window.dataLayer = window.dataLayer || []).push(arguments);
      };
    };

    // Check for cookie consent before initializing GA
    const checkConsentAndInit = () => {
      if (!analyticsId || analyticsId === 'G-XXXXXXXXXX') {
        console.info('Google Analytics ID not configured');
        return;
      }

      // Initialize consent mode if not already done
      if (!window.gtag) {
        initializeGoogleConsent();
      }

      // Check consent data
      const consentData = localStorage.getItem('cookieConsentData');
      
      if (!consentData) {
        console.info('Cookie consent not given, Google Analytics in denied state');
        return;
      }
      
      try {
        const data = JSON.parse(consentData);
        const preferences = data.preferences;
        
        // Update consent based on user preferences
        window.gtag('consent', 'update', {
          'analytics_storage': preferences.analytics ? 'granted' : 'denied',
          'ad_storage': preferences.marketing ? 'granted' : 'denied',
          'ad_user_data': preferences.marketing ? 'granted' : 'denied',
          'ad_personalization': preferences.marketing ? 'granted' : 'denied',
          'functionality_storage': preferences.preferences ? 'granted' : 'denied',
          'personalization_storage': preferences.preferences ? 'granted' : 'denied',
          'security_storage': 'granted'
        });
        
        // Only load GA script if analytics consent is granted
        if (preferences.analytics) {
          // Check if GA script already loaded
          const existingScript = document.querySelector(`script[src*="googletagmanager.com/gtag/js?id=${analyticsId}"]`);
          if (!existingScript) {
            const gaScript = document.createElement('script');
            gaScript.async = true;
            gaScript.src = `https://www.googletagmanager.com/gtag/js?id=${analyticsId}`;
            document.head.appendChild(gaScript);
            
            gaScript.onload = () => {
              window.gtag('js', new Date());
              window.gtag('config', analyticsId, {
                page_path: location.pathname + location.search,
                send_page_view: true,
                cookie_flags: 'SameSite=None;Secure'
              });
            };
          }
        } else {
          console.info('Analytics consent not granted, GA script not loaded');
        }
      } catch (e) {
        console.error('Error parsing cookie consent data:', e);
      }
    };

    checkConsentAndInit();
    
    // Listen for storage changes
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'cookiePreferences' || e.key === 'cookieConsentData') {
        // Re-check consent when it changes
        const preferences = e.newValue ? JSON.parse(e.newValue) : null;
        
        if (preferences) {
          // Update Google consent state
          window.gtag('consent', 'update', {
            'analytics_storage': preferences.analytics ? 'granted' : 'denied',
            'ad_storage': preferences.marketing ? 'granted' : 'denied',
            'ad_user_data': preferences.marketing ? 'granted' : 'denied',
            'ad_personalization': preferences.marketing ? 'granted' : 'denied',
            'functionality_storage': preferences.preferences ? 'granted' : 'denied',
            'personalization_storage': preferences.preferences ? 'granted' : 'denied'
          });
          
          // Reload page if analytics preference changed to ensure proper initialization
          if (e.key === 'cookiePreferences') {
            const oldPrefs = e.oldValue ? JSON.parse(e.oldValue) : null;
            if (oldPrefs && oldPrefs.analytics !== preferences.analytics) {
              window.location.reload();
            }
          }
        }
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [analyticsId, location]);

  // Track page views (only if consent granted)
  useEffect(() => {
    if (!analyticsId || analyticsId === 'G-XXXXXXXXXX' || !window.gtag) {
      return;
    }

    // Check if analytics consent is granted before tracking
    const consentData = localStorage.getItem('cookieConsentData');
    if (consentData) {
      try {
        const data = JSON.parse(consentData);
        if (data.preferences.analytics) {
          window.gtag('event', 'page_view', {
            page_path: location.pathname + location.search,
            page_location: window.location.href,
            page_title: document.title
          });
        }
      } catch (e) {
        console.error('Error checking consent for page view:', e);
      }
    }
  }, [location, analyticsId]);
};
