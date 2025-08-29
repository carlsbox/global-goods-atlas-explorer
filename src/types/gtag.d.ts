declare global {
  interface Window {
    gtag?: (
      command: 'config' | 'event' | 'js' | 'consent' | 'set',
      targetId: string | Date,
      options?: Record<string, any>
    ) => void;
    dataLayer?: any[];
  }
}

export {};