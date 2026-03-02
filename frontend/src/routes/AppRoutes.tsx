import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import HealthPage from "../features/health/HealthPage";
import LoginPage from "../features/auth/LoginPage";
import DashboardPage from "../features/dashboard/DashboardPage";
import RbacAdminPage from "../features/rbac/RbacAdminPage";
import ProtectedRoute from "../components/ProtectedRoute";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/health" element={<HealthPage />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute route="/dashboard">
              <DashboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/users"
          element={
            <ProtectedRoute route="/users">
              <RbacAdminPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/roles"
          element={
            <ProtectedRoute route="/roles">
              <RbacAdminPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/permissions"
          element={
            <ProtectedRoute route="/permissions">
              <RbacAdminPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
