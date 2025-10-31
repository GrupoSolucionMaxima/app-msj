import React, { createContext, useContext, useEffect, useState } from 'react';
import { login as apiLogin, logout as apiLogout, me as apiMe, register as apiRegister } from '../lib/api/auth';
import { setupAuthInterceptor } from '../lib/api/interceptor';
import { AuthUser, getUser, removeUser, saveUser } from '../lib/storage/user';

type AuthContextValue = {
  user: AuthUser | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (name: string, email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  refresh: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  // Interceptor + arranque: intenta restaurar sesión
  useEffect(() => {
    setupAuthInterceptor();
    (async () => {
      try {
        // 1) levanta user cacheado
        const cached = await getUser();
        if (cached) setUser(cached);
        // 2) consulta /me si hay token para refrescar datos
        const u = await apiMe();
        setUser(u);
        await saveUser(u);
      } catch {
        // sin token o expirado: queda null
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const signIn = async (email: string, password: string) => {
    const { user } = await apiLogin({ email, password });
    setUser(user);
    await saveUser(user);
  };

  const signUp = async (name: string, email: string, password: string) => {
    const { user } = await apiRegister({ name, email, password, password_confirmation: password });
    setUser(user);
    await saveUser(user);
  };

  const signOut = async () => {
    try { await apiLogout(); } catch {}
    setUser(null);
    await removeUser();
  };

  const refresh = async () => {
    const u = await apiMe();
    setUser(u);
    await saveUser(u);
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signUp, signOut, refresh }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
