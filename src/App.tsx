
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "next-themes";
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
import GlobalGoodsContentPage from "@/pages/admin/content/GlobalGoodsContentPage";
import UseCasesListPage from "@/pages/admin/UseCasesListPage";
import ClassificationsPage from "@/pages/admin/ClassificationsPage";
import UsersPage from "@/pages/admin/UsersPage";
import SiteSettingsPage from "@/pages/admin/SiteSettingsPage";
import AdminToolsPage from "@/pages/admin/AdminToolsPage";

// Layout components
import { PageLayout } from "@/components/layout/PageLayout";
import AdminLayout from "@/components/admin/AdminLayout";

// Import our hybrid pages
import GlobalGoodsPageHybrid from './pages/GlobalGoodsPageHybrid';
import GlobalGoodDetailsPageHybrid from './pages/GlobalGoodDetailsPageHybrid';

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
                
                {/* Content management routes */}
                <Route path="content/global-goods" element={<GlobalGoodsContentPage />} />
                <Route path="content/global-goods/new" element={<GlobalGoodFormPage />} />
                <Route path="content/global-goods/edit/:id" element={<GlobalGoodFormPage />} />
                
                {/* Legacy routes for backward compatibility */}
                <Route path="global-goods" element={<GlobalGoodsListPage />} />
                <Route path="global-goods/new" element={<GlobalGoodFormPage />} />
                <Route path="global-goods/:id/edit" element={<GlobalGoodFormPage />} />
                
                <Route path="use-cases" element={<UseCasesListPage />} />
                <Route path="classifications" element={<ClassificationsPage />} />
                <Route path="users" element={<UsersPage />} />
                <Route path="settings" element={<SiteSettingsPage />} />
                <Route path="tools" element={<AdminToolsPage />} />
              </Route>

              {/* Add routes for hybrid implementation */}
              <Route path="/global-goods-hybrid" element={<GlobalGoodsPageHybrid />} />
              <Route path="/global-goods-hybrid/:id" element={<GlobalGoodDetailsPageHybrid />} />

              {/* 404 route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </Router>
        <Toaster />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
