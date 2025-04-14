
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { PageLayout } from "@/components/layout/PageLayout";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { CookieConsent } from "@/components/CookieConsent";
import { useGoogleAnalytics } from "@/hooks/useGoogleAnalytics";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";

// Main site pages
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

// Admin pages
import LoginPage from "./pages/admin/LoginPage";
import DashboardPage from "./pages/admin/DashboardPage";
import UnauthorizedPage from "./pages/admin/UnauthorizedPage";

const queryClient = new QueryClient();

// Analytics wrapper component
const AnalyticsWrapper = ({ children }: { children: React.ReactNode }) => {
  useGoogleAnalytics();
  return <>{children}</>;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <AuthProvider>
        <LanguageProvider>
          <BrowserRouter>
            <AnalyticsWrapper>
              <Routes>
                {/* Admin Routes */}
                <Route path="/admin/login" element={<LoginPage />} />
                <Route path="/admin/unauthorized" element={<UnauthorizedPage />} />
                
                {/* Protected Admin Routes */}
                <Route path="/admin/dashboard" element={
                  <ProtectedRoute>
                    <AdminLayout>
                      <DashboardPage />
                    </AdminLayout>
                  </ProtectedRoute>
                } />
                
                {/* Admin Routes requiring admin role */}
                <Route path="/admin/users" element={
                  <ProtectedRoute requiredRole="admin">
                    <AdminLayout>
                      {/* We will implement this page later */}
                      <div>Users Management Page</div>
                    </AdminLayout>
                  </ProtectedRoute>
                } />
                
                <Route path="/admin/settings" element={
                  <ProtectedRoute requiredRole="admin">
                    <AdminLayout>
                      {/* We will implement this page later */}
                      <div>Settings Page</div>
                    </AdminLayout>
                  </ProtectedRoute>
                } />
                
                {/* Public Website Routes */}
                <Route path="/" element={
                  <PageLayout>
                    <HomePage />
                  </PageLayout>
                } />
                <Route path="/home" element={
                  <PageLayout>
                    <HomePage />
                  </PageLayout>
                } />
                <Route path="/global-goods" element={
                  <PageLayout>
                    <GlobalGoodsPage />
                  </PageLayout>
                } />
                <Route path="/global-goods/:id" element={
                  <PageLayout>
                    <GlobalGoodDetailsPage />
                  </PageLayout>
                } />
                <Route path="/use-cases" element={
                  <PageLayout>
                    <UseCasesPage />
                  </PageLayout>
                } />
                <Route path="/use-cases/:id" element={
                  <PageLayout>
                    <UseCaseDetailsPage />
                  </PageLayout>
                } />
                <Route path="/map" element={
                  <PageLayout>
                    <MapPage />
                  </PageLayout>
                } />
                <Route path="/about" element={
                  <PageLayout>
                    <AboutPage />
                  </PageLayout>
                } />
                <Route path="/contact" element={
                  <PageLayout>
                    <ContactPage />
                  </PageLayout>
                } />
                <Route path="/privacy" element={
                  <PageLayout>
                    <PrivacyPolicyPage />
                  </PageLayout>
                } />
                <Route path="/terms" element={
                  <PageLayout>
                    <TermsOfServicePage />
                  </PageLayout>
                } />
                <Route path="*" element={
                  <PageLayout>
                    <NotFound />
                  </PageLayout>
                } />
              </Routes>
              <CookieConsent />
            </AnalyticsWrapper>
          </BrowserRouter>
        </LanguageProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
