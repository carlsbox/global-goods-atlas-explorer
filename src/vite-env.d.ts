
/// <reference types="vite/client" />

interface Window {
  gtag: (
    command: 'config' | 'event' | 'js', 
    targetId: string | Date, 
    options?: Record<string, any>
  ) => void;
  dataLayer: any[];
}
