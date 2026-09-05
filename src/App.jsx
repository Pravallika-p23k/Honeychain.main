import React, { useState } from "react";
import BuyerQRPage from "./pages/BuyerQRPage";
import HoneyTrackingPage from "./pages/HoneyTrackingPage";
import LabDashboardPage from "./pages/LabDashboardPage";
import LabTestingPage from "./pages/LabTestingPage";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { DataProvider } from "./context/DataContext";

import { Header } from "./components/Header";
import { Sidebar } from "./components/Sidebar";
import { Footer } from "./components/Footer";

import { LandingPage } from "./pages/LandingPage";
import { LoginPage } from "./pages/LoginPage";
import { SignupPage } from "./pages/SignupPage";
import { BeekeeperDashboard } from "./pages/BeekeeperDashboard";
import { MyHivesPage } from "./pages/MyHivesPage";
import { HiveDetailPage } from "./pages/HiveDetailPage";
import { IoTMonitoringPage } from "./pages/IoTMonitoringPage";
import { AIInsightsPage } from "./pages/AIInsightsPage";
import { HarvestHoneyPage } from "./pages/HarvestHoneyPage";
import { HoneyBatchesPage } from "./pages/HoneyBatchesPage";
import { BlockchainRecordsPage } from "./pages/BlockchainRecordsPage";
import { MarketplacePage } from "./pages/MarketplacePage";
import { GovDashboard } from "./pages/GovDashboard";
import { BeekeeperManagementPage } from "./pages/BeekeeperManagementPage";
import { GovBatchVerificationPage } from "./pages/GovBatchVerificationPage";
import { ConsumerVerificationPage } from "./pages/ConsumerVerificationPage";
import { AlertsPage } from "./pages/AlertsPage";
import { ProfilePage } from "./pages/ProfilePage";

function AppLayout() {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const location = useLocation();

  // Pages that display public full-width layout without sidebar
  const isPublicPage =
    location.pathname === "/" ||
    location.pathname === "/login" ||
    location.pathname === "/signup" ||
    location.pathname === "/verify";

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans">
      <Header
        toggleMobileSidebar={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
      />

      {isPublicPage ? (
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/verify" element={<ConsumerVerificationPage />} />
          </Routes>
        </main>
      ) : (
        <div className="flex-1 flex max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 gap-6">
          <Sidebar
            isMobileOpen={isMobileSidebarOpen}
            closeMobileSidebar={() => setIsMobileSidebarOpen(false)}
          />
          <main className="flex-1 min-w-0">
            <Routes>
              <Route path="/dashboard" element={<BeekeeperDashboard />} />
              <Route path="/hives" element={<MyHivesPage />} />
              <Route path="/hives/:id" element={<HiveDetailPage />} />
              <Route path="/iot" element={<IoTMonitoringPage />} />
              <Route path="/ai-insights" element={<AIInsightsPage />} />
              <Route path="/harvest" element={<HarvestHoneyPage />} />
              <Route path="/batches" element={<HoneyBatchesPage />} />
              <Route path="/blockchain" element={<BlockchainRecordsPage />} />
              <Route path="/marketplace" element={<MarketplacePage />} />
              <Route path="/gov-dashboard" element={<GovDashboard />} />
              <Route path="/beekeepers" element={<BeekeeperManagementPage />} />
              <Route
                path="/gov-verify"
                element={<GovBatchVerificationPage />}
              />
              <Route path="/alerts" element={<AlertsPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/buyer-qr" element={<BuyerQRPage />} />
              <Route path="/track/:batchId" element={<HoneyTrackingPage />} />
              <Route path="/lab-dashboard" element={<LabDashboardPage />} />

              <Route path="/lab-testing" element={<LabTestingPage />} />
            </Routes>
          </main>
        </div>
      )}

      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <Router>
          <AppLayout />
        </Router>
      </DataProvider>
    </AuthProvider>
  );
}
