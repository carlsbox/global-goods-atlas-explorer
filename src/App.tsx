
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { PageLayout } from "@/components/layout/PageLayout";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { CookieConsent } from "@/components/CookieConsent";
import { useGoogleAnalytics } from "@/hooks/useGoogleAnalytics";

// Pages
import HomePage from "./pages/HomePage";
import GlobalGoodsPage from "./pages/GlobalGoodsPage";
import GlobalGoodDetailsPage from "./pages/GlobalGoodDetailsPage";
import UseCasesPage from "./pages/UseCasesPage";
import UseCaseDetailsPage from "./pages/UseCaseDetailsPage";
import MapPage from "./pages/MapPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import TermsOfServicePage from "./pages/TermsOfServicePage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Analytics wrapper component
const AnalyticsWrapper = ({ children }: { children: React.ReactNode }) => {
  useGoogleAnalytics();
  return <>{children}</>;
};

const App = () => (
  <LanguageProvider>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <BrowserRouter>
          <AnalyticsWrapper>
            <PageLayout>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/home" element={<HomePage />} />
                <Route path="/global-goods" element={<GlobalGoodsPage />} />
                <Route path="/global-goods/:id" element={<GlobalGoodDetailsPage />} />
                <Route path="/use-cases" element={<UseCasesPage />} />
                <Route path="/use-cases/:id" element={<UseCaseDetailsPage />} />
                <Route path="/map" element={<MapPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/privacy" element={<PrivacyPolicyPage />} />
                <Route path="/terms" element={<TermsOfServicePage />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
              <CookieConsent />
            </PageLayout>
          </AnalyticsWrapper>
        </BrowserRouter>
      </ThemeProvider>
    </QueryClientProvider>
  </LanguageProvider>
);

export default App;
