
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "next-themes";
import { HelmetProvider } from "react-helmet-async";
import { Toaster } from "@/components/ui/toaster";
import { ReferenceDataProvider } from "@/contexts/ReferenceDataContext";
import { Skeleton } from "@/components/ui/skeleton";
import { useGoogleAnalytics } from "@/hooks/useGoogleAnalytics";

// Lazy load all pages for better performance
const HomePage = lazy(() => import("@/pages/HomePage"));
const GlobalGoodsPageProgressive = lazy(() => import("@/pages/GlobalGoodsPageProgressive"));
const GlobalGoodDetailsPageFlat = lazy(() => import("@/pages/GlobalGoodDetailsPageFlat"));
const GlobalGoodCreatorPage = lazy(() => import("@/pages/GlobalGoodCreatorPage"));
const ClimateServicesPage = lazy(() => import("@/pages/ClimateServicesPage"));
const UseCasesPage = lazy(() => import("@/pages/UseCasesPage"));
const UseCaseDetailsPage = lazy(() => import("@/pages/UseCaseDetailsPage"));
const EnhancedMapPage = lazy(() => import("@/pages/EnhancedMapPage"));
const ReferencePage = lazy(() => import("@/pages/ReferencePage"));
const AboutPage = lazy(() => import("@/pages/AboutPage"));
const CookiePolicyPage = lazy(() => import("@/pages/CookiePolicyPage"));
const ContentLicensePage = lazy(() => import("@/pages/ContentLicensePage"));
const NotFound = lazy(() => import("@/pages/NotFound"));

// Layout components
import { PageLayout } from "@/components/layout/PageLayout";

// Loading component for Suspense fallback
const PageLoadingSkeleton = () => (
  <div className="min-h-screen bg-background">
    <div className="container mx-auto px-4 py-8">
      <Skeleton className="h-8 w-64 mb-4" />
      <Skeleton className="h-4 w-96 mb-8" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="space-y-3">
            <Skeleton className="h-48 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        ))}
      </div>
    </div>
  </div>
);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 1,
    },
  },
});

// Analytics wrapper component that must be inside Router
function AnalyticsWrapper({ children }: { children: React.ReactNode }) {
  useGoogleAnalytics();
  return <>{children}</>;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <ReferenceDataProvider>
            <Router>
              <AnalyticsWrapper>
                <div className="min-h-screen bg-background">
                  <Routes>
                    {/* Public routes with layout */}
                    <Route path="/" element={<PageLayout />}>
                  <Route index element={
                    <Suspense fallback={<PageLoadingSkeleton />}>
                      <HomePage />
                    </Suspense>
                  } />
                  <Route path="global-goods" element={
                    <Suspense fallback={<PageLoadingSkeleton />}>
                      <GlobalGoodsPageProgressive />
                    </Suspense>
                  } />
                  <Route path="global-goods/:id" element={
                    <Suspense fallback={<PageLoadingSkeleton />}>
                      <GlobalGoodDetailsPageFlat />
                    </Suspense>
                  } />
                  <Route path="create-global-good" element={
                    <Suspense fallback={<PageLoadingSkeleton />}>
                      <GlobalGoodCreatorPage />
                    </Suspense>
                  } />
                  <Route path="climate-health" element={
                    <Suspense fallback={<PageLoadingSkeleton />}>
                      <ClimateServicesPage />
                    </Suspense>
                  } />
                  <Route path="use-cases" element={
                    <Suspense fallback={<PageLoadingSkeleton />}>
                      <UseCasesPage />
                    </Suspense>
                  } />
                  <Route path="use-cases/:id" element={
                    <Suspense fallback={<PageLoadingSkeleton />}>
                      <UseCaseDetailsPage />
                    </Suspense>
                  } />
                  <Route path="map" element={
                    <Suspense fallback={<PageLoadingSkeleton />}>
                      <EnhancedMapPage />
                    </Suspense>
                  } />
                  <Route path="reference" element={
                    <Suspense fallback={<PageLoadingSkeleton />}>
                      <ReferencePage />
                    </Suspense>
                  } />
                  <Route path="about" element={
                    <Suspense fallback={<PageLoadingSkeleton />}>
                      <AboutPage />
                    </Suspense>
                  } />
                  <Route path="cookie-policy" element={
                    <Suspense fallback={<PageLoadingSkeleton />}>
                      <CookiePolicyPage />
                    </Suspense>
                  } />
                  <Route path="content-license" element={
                    <Suspense fallback={<PageLoadingSkeleton />}>
                      <ContentLicensePage />
                    </Suspense>
                  } />
                </Route>

                {/* 404 route */}
                <Route path="*" element={
                  <Suspense fallback={<PageLoadingSkeleton />}>
                    <NotFound />
                  </Suspense>
                } />
              </Routes>
            </div>
          </AnalyticsWrapper>
        </Router>
        </ReferenceDataProvider>
        <Toaster />
        </ThemeProvider>
      </HelmetProvider>
    </QueryClientProvider>
  );
}

export default App;
