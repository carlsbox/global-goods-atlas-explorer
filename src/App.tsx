import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import GlobalGoodsPageFlat from './pages/GlobalGoodsPageFlat';
import GlobalGoodDetailsPageFlat from './pages/GlobalGoodDetailsPageFlat';
import GlobalGoodDetailsPageHybrid from './pages/GlobalGoodDetailsPageHybrid';
import { useTranslation } from 'react-i18next';
import i18n from './i18n';
import { useEffect } from 'react';
import { Toaster } from "@/components/ui/toaster"
import { ReferenceDataProvider } from '@/contexts/ReferenceDataContext';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 1,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReferenceDataProvider>
        <Router>
          <Routes>
            <Route path="/" element={<GlobalGoodsPageFlat />} />
            <Route path="/global-goods" element={<GlobalGoodsPageFlat />} />
            <Route path="/global-goods/:id" element={<GlobalGoodDetailsPageFlat />} />
            <Route path="/global-goods-hybrid/:id" element={<GlobalGoodDetailsPageHybrid />} />
          </Routes>
        </Router>
        <Toaster />
      </ReferenceDataProvider>
    </QueryClientProvider>
  );
}

export default App;
