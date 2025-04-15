import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import GlobalGoodsPage from './pages/GlobalGoodsPage';
import GlobalGoodDetailsPage from './pages/GlobalGoodDetailsPage';
import UseCasesPage from './pages/UseCasesPage';
import UseCaseDetailsPage from './pages/UseCaseDetailsPage';
import MapPage from './pages/MapPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import PrivacyPage from './pages/PrivacyPage';
import TermsPage from './pages/TermsPage';
import CookiePolicyPage from './pages/CookiePolicyPage';
import { useAuth } from '@/contexts/AuthContext';

// Admin pages
import LoginPage from './pages/admin/LoginPage';
import DashboardPage from './pages/admin/DashboardPage';
import UnauthorizedPage from './pages/admin/UnauthorizedPage';
import GlobalGoodsManagementPage from './pages/admin/GlobalGoodsManagementPage';
import UseCasesManagementPage from './pages/admin/UseCasesManagementPage';
import { ProtectedRoute } from './components/auth/ProtectedRoute';

function App() {
  const { user, loading } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    setIsAdmin(user?.role === 'admin');
  }, [user]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/global-goods" element={<GlobalGoodsPage />} />
        <Route path="/global-goods/:id" element={<GlobalGoodDetailsPage />} />
        <Route path="/use-cases" element={<UseCasesPage />} />
        <Route path="/use-cases/:id" element={<UseCaseDetailsPage />} />
        <Route path="/map" element={<MapPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/cookie" element={<CookiePolicyPage />} />
        
        {/* Admin Routes */}
        <Route path="/admin/login" element={<LoginPage />} />
        <Route path="/admin/dashboard" element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        } />
        <Route path="/admin/global-goods" element={
          <ProtectedRoute>
            <GlobalGoodsManagementPage />
          </ProtectedRoute>
        } />
        <Route path="/admin/use-cases" element={
          <ProtectedRoute>
            <UseCasesManagementPage />
          </ProtectedRoute>
        } />
        <Route path="/admin/unauthorized" element={<UnauthorizedPage />} />
        
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
