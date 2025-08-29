
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getAnalyticsId } from '@/lib/config';

export const useGoogleAnalytics = () => {
  const location = useLocation();
  const analyticsId = getAnalyticsId();

  useEffect(() => {
    // Check for cookie consent before initializing
    const checkConsentAndInit = () => {
      // Check if user has given consent for analytics cookies
      const consent = localStorage.getItem('cookieConsent');
      const preferences = localStorage.getItem('cookiePreferences');
      
      // Only proceed if consent is given and analytics is enabled
      if (!consent || consent !== 'true') {
        console.info('Cookie consent not given, skipping Google Analytics initialization');
        return;
      }
      
      if (preferences) {
        try {
          const prefs = JSON.parse(preferences);
          if (!prefs.analytics) {
            console.info('Analytics cookies not enabled, skipping Google Analytics initialization');
            return;
          }
        } catch (e) {
          console.error('Error parsing cookie preferences:', e);
          return;
        }
      }

      // Initialize Google Analytics only after consent
      if (!analyticsId || analyticsId === 'G-XXXXXXXXXX') {
        console.info('Google Analytics ID not configured');
        return;
      }

      // Check if already initialized
      if (window.gtag) {
        console.info('Google Analytics already initialized');
        return;
      }

      const script1 = document.createElement('script');
      script1.async = true;
      script1.src = `https://www.googletagmanager.com/gtag/js?id=${analyticsId}`;

      const script2 = document.createElement('script');
      script2.innerHTML = `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${analyticsId}');
      `;

      document.head.appendChild(script1);
      document.head.appendChild(script2);
    };

    checkConsentAndInit();
    
    // Listen for storage changes (in case consent is given in another tab)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'cookieConsent' || e.key === 'cookiePreferences') {
        checkConsentAndInit();
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [analyticsId]);

  // Track page views
  useEffect(() => {
    if (!analyticsId || analyticsId === 'G-XXXXXXXXXX' || !window.gtag) {
      return;
    }

    window.gtag('config', analyticsId, {
      page_path: location.pathname + location.search
    });
  }, [location, analyticsId]);
};
