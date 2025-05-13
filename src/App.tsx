
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

// Admin Pages
import AdminLoginPage from "./pages/AdminLoginPage";
import AdminLayout from "./components/admin/AdminLayout";
import AdminDashboardPage from "./pages/AdminDashboardPage";
import GlobalGoodsListPage from "./pages/admin/GlobalGoodsListPage";
import GlobalGoodFormPage from "./pages/admin/GlobalGoodFormPage";
import UseCasesListPage from "./pages/admin/UseCasesListPage";
import SiteSettingsPage from "./pages/admin/SiteSettingsPage";
import UsersPage from "./pages/admin/UsersPage";
import ClassificationsPage from "./pages/admin/ClassificationsPage";
import AdminToolsPage from "./pages/admin/AdminToolsPage";

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
            <Routes>
              {/* Admin Routes */}
              <Route path="/admin/login" element={<AdminLoginPage />} />
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<AdminDashboardPage />} />
                <Route path="global-goods" element={<GlobalGoodsListPage />} />
                <Route path="global-goods/new" element={<GlobalGoodFormPage />} />
                <Route path="global-goods/edit/:id" element={<GlobalGoodFormPage />} />
                <Route path="global-goods/classifications" element={<ClassificationsPage />} />
                <Route path="use-cases" element={<UseCasesListPage />} />
                <Route path="use-cases/new" element={<GlobalGoodFormPage />} />
                <Route path="use-cases/edit/:id" element={<GlobalGoodFormPage />} />
                <Route path="settings" element={<SiteSettingsPage />} />
                <Route path="users" element={<UsersPage />} />
                <Route path="tools" element={<AdminToolsPage />} />
              </Route>
              
              {/* Public Routes */}
              <Route path="/" element={<PageLayout><HomePage /></PageLayout>} />
              <Route path="/home" element={<PageLayout><HomePage /></PageLayout>} />
              <Route path="/global-goods" element={<PageLayout><GlobalGoodsPage /></PageLayout>} />
              <Route path="/global-goods/:id" element={<PageLayout><GlobalGoodDetailsPage /></PageLayout>} />
              <Route path="/use-cases" element={<PageLayout><UseCasesPage /></PageLayout>} />
              <Route path="/use-cases/:id" element={<PageLayout><UseCaseDetailsPage /></PageLayout>} />
              <Route path="/map" element={<PageLayout><MapPage /></PageLayout>} />
              <Route path="/about" element={<PageLayout><AboutPage /></PageLayout>} />
              <Route path="/contact" element={<PageLayout><ContactPage /></PageLayout>} />
              <Route path="/privacy" element={<PageLayout><PrivacyPolicyPage /></PageLayout>} />
              <Route path="/terms" element={<PageLayout><TermsOfServicePage /></PageLayout>} />
              <Route path="*" element={<PageLayout><NotFound /></PageLayout>} />
            </Routes>
            <CookieConsent />
          </AnalyticsWrapper>
        </BrowserRouter>
      </ThemeProvider>
    </QueryClientProvider>
  </LanguageProvider>
);

export default App;
