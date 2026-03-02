import { useMemo, useState } from "react";
import { AUTH_KEY, AuthContext } from "./auth.state";
import type { LoginResponse } from "./auth.types";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [auth, setAuthState] = useState<LoginResponse | null>(() => {
    const raw = localStorage.getItem(AUTH_KEY);
    return raw ? JSON.parse(raw) : null;
  });

  const setAuth = (data: LoginResponse | null) => {
    setAuthState(data);
    if (data) localStorage.setItem(AUTH_KEY, JSON.stringify(data));
    else localStorage.removeItem(AUTH_KEY);
  };

  const value = useMemo(
    () => ({
      auth,
      setAuth,
      canAccess: (route: string) => !!auth && (auth.role === "MasterAdmin" || auth.allowedRoutes.includes(route)),
    }),
    [auth]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
