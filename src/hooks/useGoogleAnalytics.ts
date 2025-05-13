
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getAnalyticsId } from '@/lib/config';

export const useGoogleAnalytics = () => {
  const location = useLocation();
  const analyticsId = getAnalyticsId();

  useEffect(() => {
    // Initialize Google Analytics
    const initGoogleAnalytics = () => {
      if (!analyticsId || analyticsId === 'G-XXXXXXXXXX') {
        console.info('Google Analytics ID not configured');
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

    initGoogleAnalytics();
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
