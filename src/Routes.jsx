// src/Routes.jsx
import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import Header from "components/ui/Header";
import InventoryOperationsDashboard from "pages/inventory-operations-dashboard";
import ExecutiveInventoryIntelligenceDashboard from "pages/executive-inventory-intelligence-dashboard";
import SupplierPerformanceProcurementDashboard from "pages/supplier-performance-procurement-dashboard";
import DemandAnalyticsForecastingDashboard from "pages/demand-analytics-forecasting-dashboard";
import AuthenticationLoginPage from "pages/authentication-login-page";
import NotFound from "pages/NotFound";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <ScrollToTop />
        <RouterRoutes>
          {/* Authentication Route - No Header */}
          <Route path="/authentication-login-page" element={<AuthenticationLoginPage />} />
          
          {/* Dashboard Routes - With Header */}
          <Route path="/*" element={
            <>
              <Header />
              <div className="pt-20">
                <RouterRoutes>
                  <Route path="/" element={<InventoryOperationsDashboard />} />
                  <Route path="/inventory-operations-dashboard" element={<InventoryOperationsDashboard />} />
                  <Route path="/executive-inventory-intelligence-dashboard" element={<ExecutiveInventoryIntelligenceDashboard />} />
                  <Route path="/supplier-performance-procurement-dashboard" element={<SupplierPerformanceProcurementDashboard />} />
                  <Route path="/demand-analytics-forecasting-dashboard" element={<DemandAnalyticsForecastingDashboard />} />
                  <Route path="*" element={<NotFound />} />
                </RouterRoutes>
              </div>
            </>
          } />
        </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;