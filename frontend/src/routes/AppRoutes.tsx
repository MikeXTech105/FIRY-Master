import type { ReactElement } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "../features/auth/LoginPage";
import DashboardPage from "../features/dashboard/DashboardPage";
import ProtectedRoute from "../components/ProtectedRoute";
import MainLayout from "../layouts/MainLayout";
import UsersPage from "../features/rbac/UsersPage";
import RolesPage from "../features/rbac/RolesPage";
import PagesPage from "../features/rbac/PagesPage";
import PermissionsPage from "../features/rbac/PermissionsPage";

const withLayout = (route: string, element: ReactElement) => (
  <ProtectedRoute route={route}>
    <MainLayout>{element}</MainLayout>
  </ProtectedRoute>
);

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={withLayout("/dashboard", <DashboardPage />)} />
        <Route path="/users" element={withLayout("/users", <UsersPage />)} />
        <Route path="/roles" element={withLayout("/roles", <RolesPage />)} />
        <Route path="/pages" element={withLayout("/pages", <PagesPage />)} />
        <Route path="/permissions" element={withLayout("/permissions", <PermissionsPage />)} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
