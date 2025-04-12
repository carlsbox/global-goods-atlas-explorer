
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";

// Pages
import HomePage from "./pages/HomePage";
import GlobalGoodsPage from "./pages/GlobalGoodsPage";
import GlobalGoodDetailsPage from "./pages/GlobalGoodDetailsPage";
import UseCasesPage from "./pages/UseCasesPage";
import UseCaseDetailsPage from "./pages/UseCaseDetailsPage";
import MapPage from "./pages/MapPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import NotFound from "./pages/NotFound";
import Index from "./pages/Index";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/global-goods" element={<GlobalGoodsPage />} />
          <Route path="/global-goods/:id" element={<GlobalGoodDetailsPage />} />
          <Route path="/use-cases" element={<UseCasesPage />} />
          <Route path="/use-cases/:id" element={<UseCaseDetailsPage />} />
          <Route path="/map" element={<MapPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
