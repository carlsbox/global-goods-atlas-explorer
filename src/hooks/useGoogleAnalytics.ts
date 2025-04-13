
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getAnalyticsId } from '@/lib/config';

export const useGoogleAnalytics = () => {
  const location = useLocation();
  const analyticsId = getAnalyticsId();

  useEffect(() => {
    // Skip if no analytics ID is configured or if it's the placeholder
    if (!analyticsId || analyticsId === 'G-XXXXXXXXXX') {
      console.log('Google Analytics ID not configured');
      return;
    }

    // Load Google Analytics script
    const loadGoogleAnalytics = () => {
      if (document.getElementById('ga-script')) {
        return;
      }

      const script = document.createElement('script');
      script.id = 'ga-script';
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${analyticsId}`;
      document.head.appendChild(script);

      window.dataLayer = window.dataLayer || [];
      function gtag(...args: any[]) {
        window.dataLayer.push(arguments);
      }
      gtag('js', new Date());
      gtag('config', analyticsId);

      // Make gtag available globally
      window.gtag = gtag;
    };

    loadGoogleAnalytics();
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
