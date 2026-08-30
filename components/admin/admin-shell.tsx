'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  Scale,
  LayoutDashboard,
  FileText,
  Users,
  Calendar,
  Images,
  Inbox,
  LogOut,
  GraduationCap,
  Menu,
  X,
  ExternalLink,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/components/admin/auth-provider';
import { ThemeToggle } from '@/components/theme-toggle';

const navItems = [
  { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { label: 'Gazette Manager', href: '/admin/gazette', icon: FileText },
  { label: 'Applications', href: '/admin/applications', icon: GraduationCap },
  { label: 'Events Manager', href: '/admin/events', icon: Calendar },
  { label: 'Team Editor', href: '/admin/team', icon: Users },
  { label: 'Gallery Manager', href: '/admin/gallery', icon: Images },
  { label: 'Inquiries Inbox', href: '/admin/inquiries', icon: Inbox },
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { signOut, user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  const handleSignOut = async () => {
    await signOut();
    router.replace('/admin/login');
  };

  const isActive = (href: string) => {
    if (href === '/admin') return pathname === '/admin';
    return pathname.startsWith(href);
  };

  return (
    <div className="min-h-screen flex bg-muted/10">
      {/* Sidebar */}
      <aside
        className={cn(
          'fixed lg:sticky top-0 left-0 z-50 h-screen w-64 glass-nav border-r border-border/40 flex flex-col transition-transform duration-300',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        )}
      >
        <div className="p-5 border-b border-border/40">
          <Link href="/admin" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-gold to-amber-600 text-navy shadow-lg">
              <Scale className="h-5 w-5" strokeWidth={2.5} />
            </div>
            <div>
              <div className="font-heading font-bold text-sm tracking-wide">VIDHISHALA</div>
              <div className="text-[10px] text-muted-foreground uppercase tracking-wider">Admin Panel</div>
            </div>
          </Link>
        </div>

        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setSidebarOpen(false)}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
                isActive(item.href)
                  ? 'bg-gradient-to-r from-gold/20 to-amber-600/10 text-primary border border-gold/20'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="p-3 border-t border-border/40 space-y-2">
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
          >
            <ExternalLink className="h-4 w-4" />
            View Website
          </Link>
          <div className="px-3 py-2 text-xs text-muted-foreground truncate">
            {user?.email}
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleSignOut}
            className="w-full justify-start text-muted-foreground hover:text-destructive"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </aside>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="sticky top-0 z-30 glass-nav border-b border-border/40 px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden h-9 w-9"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
            <h1 className="font-heading font-semibold text-lg">
              {navItems.find((n) => isActive(n.href))?.label || 'Admin'}
            </h1>
          </div>
          <ThemeToggle />
        </header>
        <div className="flex-1 p-4 lg:p-6">{children}</div>
      </div>
    </div>
  );
}
