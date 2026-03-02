import type { ReactElement } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../features/auth/auth.state";

const ProtectedRoute = ({ route, children }: { route: string; children: ReactElement }) => {
  const { auth, canAccess } = useAuth();

  if (!auth) return <Navigate to="/login" replace />;
  if (!canAccess(route)) return <Navigate to="/dashboard" replace />;
  return children;
};

export default ProtectedRoute;
