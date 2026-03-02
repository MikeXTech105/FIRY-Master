import { createContext, useContext } from "react";
import type { LoginResponse } from "./auth.types";

export interface AuthContextType {
  auth: LoginResponse | null;
  setAuth: (data: LoginResponse | null) => void;
  canAccess: (route: string) => boolean;
}

export const AUTH_KEY = "firy_auth";

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
