import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { OverviewDashboard } from './pages/OverviewDashboard';
import { RealTimeMonitoring } from './pages/RealTimeMonitoring';
import { InfrastructureResources } from './pages/InfrastructureResources';
import { EdgeDevices } from './pages/EdgeDevices';
import { AlertsManagement } from './pages/AlertsManagement';
import { AiRecommendations } from './pages/AiRecommendations';
import { RootCauseAnalysis } from './pages/RootCauseAnalysis';
import { CostOptimization } from './pages/CostOptimization';
import { ControlActions } from './pages/ControlActions';
import { AuditLogs } from './pages/AuditLogs';
import { DemoDataProvider } from './context/DemoDataContext';

const App: React.FC = () => {
  return (
    <DemoDataProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<OverviewDashboard />} />
          <Route path="/monitoring" element={<RealTimeMonitoring />} />
          <Route path="/resources" element={<InfrastructureResources />} />
          <Route path="/edge" element={<EdgeDevices />} />
          <Route path="/alerts" element={<AlertsManagement />} />
          <Route path="/recommendations" element={<AiRecommendations />} />
          <Route path="/analysis" element={<RootCauseAnalysis />} />
          <Route path="/cost" element={<CostOptimization />} />
          <Route path="/actions" element={<ControlActions />} />
          <Route path="/audit" element={<AuditLogs />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </BrowserRouter>
    </DemoDataProvider>
  );
};

export default App;
