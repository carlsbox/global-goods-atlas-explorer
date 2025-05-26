import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "next-themes";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { Toaster } from "@/components/ui/toaster";

// Import pages
import HomePage from "@/pages/HomePage";
import GlobalGoodsPage from "@/pages/GlobalGoodsPage";
import GlobalGoodsPageFlat from "@/pages/GlobalGoodsPageFlat";
import GlobalGoodDetailsPageFlat from "@/pages/GlobalGoodDetailsPageFlat";
import UseCasesPage from "@/pages/UseCasesPage";
import UseCaseDetailsPage from "@/pages/UseCaseDetailsPage";
import EnhancedMapPage from "@/pages/EnhancedMapPage";
import AboutPage from "@/pages/AboutPage";
import ContactPage from "@/pages/ContactPage";
import PrivacyPolicyPage from "@/pages/PrivacyPolicyPage";
import TermsOfServicePage from "@/pages/TermsOfServicePage";
import NotFound from "@/pages/NotFound";

// Admin pages
import AdminLoginPage from "@/pages/AdminLoginPage";
import AdminDashboardPage from "@/pages/AdminDashboardPage";
import GlobalGoodsListPage from "@/pages/admin/GlobalGoodsListPage";
import GlobalGoodFormPage from "@/pages/admin/GlobalGoodFormPage";
import UseCasesListPage from "@/pages/admin/UseCasesListPage";
import ClassificationsPage from "@/pages/admin/ClassificationsPage";
import UsersPage from "@/pages/admin/UsersPage";
import SiteSettingsPage from "@/pages/admin/SiteSettingsPage";
import AdminToolsPage from "@/pages/admin/AdminToolsPage";

// Layout components
import PageLayout from "@/components/layout/PageLayout";
import AdminLayout from "@/components/admin/AdminLayout";

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
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
        <LanguageProvider>
          <Router>
            <div className="min-h-screen bg-background">
              <Routes>
                {/* Public routes with layout */}
                <Route path="/" element={<PageLayout />}>
                  <Route index element={<HomePage />} />
                  <Route path="global-goods" element={<GlobalGoodsPageFlat />} />
                  <Route path="global-goods/:id" element={<GlobalGoodDetailsPageFlat />} />
                  <Route path="use-cases" element={<UseCasesPage />} />
                  <Route path="use-cases/:id" element={<UseCaseDetailsPage />} />
                  <Route path="map" element={<EnhancedMapPage />} />
                  <Route path="about" element={<AboutPage />} />
                  <Route path="contact" element={<ContactPage />} />
                  <Route path="privacy" element={<PrivacyPolicyPage />} />
                  <Route path="terms" element={<TermsOfServicePage />} />
                </Route>

                {/* Admin routes */}
                <Route path="/admin/login" element={<AdminLoginPage />} />
                <Route path="/admin" element={<AdminLayout />}>
                  <Route index element={<AdminDashboardPage />} />
                  <Route path="global-goods" element={<GlobalGoodsListPage />} />
                  <Route path="global-goods/new" element={<GlobalGoodFormPage />} />
                  <Route path="global-goods/:id/edit" element={<GlobalGoodFormPage />} />
                  <Route path="use-cases" element={<UseCasesListPage />} />
                  <Route path="classifications" element={<ClassificationsPage />} />
                  <Route path="users" element={<UsersPage />} />
                  <Route path="settings" element={<SiteSettingsPage />} />
                  <Route path="tools" element={<AdminToolsPage />} />
                </Route>

                {/* 404 route */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
          </Router>
          <Toaster />
        </LanguageProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
