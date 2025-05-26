
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { Toaster } from "@/components/ui/toaster";
import Layout from "@/components/Layout";

// Import the new flat pages
import GlobalGoodsPageFlat from "@/pages/GlobalGoodsPageFlat";
import GlobalGoodDetailsPageFlat from "@/pages/GlobalGoodDetailsPageFlat";

// Import other existing pages
import HomePage from "@/pages/HomePage";
import UseCasesPage from "@/pages/UseCasesPage";
import UseCaseDetailsPage from "@/pages/UseCaseDetailsPage";
import MapPage from "@/pages/MapPage";
import AboutPage from "@/pages/AboutPage";
import SiteSettingsPage from "@/pages/admin/SiteSettingsPage";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/global-goods" element={<GlobalGoodsPageFlat />} />
              <Route path="/global-goods/:id" element={<GlobalGoodDetailsPageFlat />} />
              <Route path="/use-cases" element={<UseCasesPage />} />
              <Route path="/use-cases/:id" element={<UseCaseDetailsPage />} />
              <Route path="/map" element={<MapPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/admin/settings" element={<SiteSettingsPage />} />
            </Routes>
          </Layout>
          <Toaster />
        </Router>
      </LanguageProvider>
    </QueryClientProvider>
  );
}

export default App;
