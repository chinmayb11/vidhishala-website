'use client';

import * as React from 'react';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { AuthProvider, useAuth } from '@/components/admin/auth-provider';
import { AdminShell } from '@/components/admin/admin-shell';

function AdminGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { user, loading } = useAuth();

  React.useEffect(() => {
    if (!loading && !user) {
      router.replace('/admin/login');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-muted-foreground">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return <AdminShell>{children}</AdminShell>;
}

function AdminRoute({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return pathname === '/admin/login' ? children : <AdminGuard>{children}</AdminGuard>;
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <AdminRoute>{children}</AdminRoute>
    </AuthProvider>
  );
}
