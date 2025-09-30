import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import LoginPage from './pages/login';
import DocumentManagement from './pages/document-management';
import StudentDashboard from './pages/student-dashboard';
import CoordinatorAdminPanel from './pages/coordinator-admin-panel';
import DigitalLogbook from './pages/digital-logbook';
import InstructorDashboard from './pages/instructor-dashboard';
import RegisterPage from './pages/register';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/admin/coordinator" element={<CoordinatorAdminPanel />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/document-management" element={<DocumentManagement />} />
        <Route path="/student-dashboard" element={<StudentDashboard />} />
        <Route path="/coordinator-admin-panel" element={<CoordinatorAdminPanel />} />
        <Route path="/digital-logbook" element={<DigitalLogbook />} />
        <Route path="/instructor-dashboard" element={<InstructorDashboard />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
