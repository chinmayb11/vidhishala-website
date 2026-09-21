'use client';

import * as React from 'react';

interface AdminUser {
  email: string;
  user_metadata: {
    full_name: string;
  };
}

interface AuthContextValue {
  session: { user: AdminUser } | null;
  user: AdminUser | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;
  updatePassword: (password: string) => Promise<{ error: string | null }>;
}

const AuthContext = React.createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = React.useState<{ user: AdminUser } | null>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    fetch('/api/admin/auth', { credentials: 'include' })
      .then((response) => response.ok ? response.json() : null)
      .then((data) => setSession(data?.user ? { user: data.user } : null))
      .catch(() => setSession(null))
      .finally(() => setLoading(false));
  }, []);

  const signIn = async (email: string, password: string) => {
    const response = await fetch('/api/admin/auth', { method: 'POST', credentials: 'include', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, password }) });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) return { error: data.error || 'The email or password is incorrect.' };
    setSession({ user: data.user });
    return { error: null };
  };

  const signOut = async () => {
    await fetch('/api/admin/auth', { method: 'DELETE', credentials: 'include' });
    setSession(null);
  };

  const updatePassword = async (password: string) => {
    if (password.length < 6) {
      return { error: 'Password must contain at least 6 characters.' };
    }
    const response = await fetch('/api/admin/auth', { method: 'PATCH', credentials: 'include', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ password }) });
    const data = await response.json().catch(() => ({}));
    return { error: response.ok ? null : data.error || 'Password update failed.' };
  };

  return (
    <AuthContext.Provider value={{ session, user: session?.user ?? null, loading, signIn, signOut, updatePassword }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = React.useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
