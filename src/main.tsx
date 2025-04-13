
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Add global types for Google Analytics
declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}

createRoot(document.getElementById("root")!).render(<App />);
