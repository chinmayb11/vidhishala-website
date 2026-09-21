'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  Activity,
  BarChart3,
  Bell,
  BookOpen,
  CalendarDays,
  ChevronDown,
  ChevronRight,
  FileText,
  FolderOpen,
  Globe2,
  Images,
  LayoutDashboard,
  LogOut,
  Mail,
  Menu,
  Newspaper,
  Search,
  Settings,
  ShieldCheck,
  Users,
  Video,
  X,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/components/admin/auth-provider';
import { ThemeToggle } from '@/components/theme-toggle';

interface AdminLink {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

const groups: { label: string; links: AdminLink[] }[] = [
  {
    label: 'Website Content',
    links: [
      { label: 'Home', href: '/', icon: Globe2 },
      { label: 'About Us', href: '/about', icon: BookOpen },
      { label: 'Activities & Gallery', href: '/programs', icon: CalendarDays },
      { label: 'Publications & Research', href: '/resources', icon: Newspaper },
      { label: 'Rajasthan Law Fest', href: '/rajasthan-law-festival', icon: ShieldCheck },
      { label: 'Contact Us', href: '/contact', icon: Mail },
      { label: 'Edit Page Content', href: '/admin/content', icon: FileText },
    ],
  },
  {
    label: 'Media',
    links: [
      { label: 'Image Gallery', href: '/admin/gallery', icon: Images },
      { label: 'Video Gallery', href: '/admin/gallery', icon: Video },
      { label: 'Documents / Downloads', href: '/resources', icon: FolderOpen },
    ],
  },
  {
    label: 'Blogs & Articles',
    links: [
      { label: 'Manage Blogs', href: '/resources/blogs', icon: FileText },
      { label: 'Manage Articles', href: '/resources/blogs', icon: FileText },
      { label: 'Manage Research Papers', href: '/resources/rnd', icon: FileText },
    ],
  },
  {
    label: 'Events',
    links: [
      { label: 'Add New Event', href: '/admin/events', icon: CalendarDays },
      { label: 'Manage Events', href: '/admin/events', icon: CalendarDays },
    ],
  },
  {
    label: 'Users & Settings',
    links: [
      { label: 'Manage Users', href: '/admin/team', icon: Users },
      { label: 'Website Settings', href: '/admin/settings', icon: Settings },
      { label: 'SEO & Analytics', href: '/admin/settings', icon: BarChart3 },
      { label: 'Change Password', href: '/admin/settings', icon: ShieldCheck },
    ],
  },
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { signOut, user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const [profileOpen, setProfileOpen] = React.useState(false);
  const [expanded, setExpanded] = React.useState<Record<string, boolean>>({});

  const handleSignOut = async () => {
    await signOut();
    router.replace('/admin/login');
  };

  const isActive = (href: string) => {
    if (href === '/') return false;
    if (href === '/admin') return pathname === '/admin';
    return pathname.startsWith(href);
  };

  return (
    <div className="min-h-screen bg-background text-foreground lg:flex">
      {sidebarOpen && <button aria-label="Close navigation" className="fixed inset-0 z-40 bg-black/60 lg:hidden" onClick={() => setSidebarOpen(false)} />}
      <aside className={cn('fixed inset-y-0 left-0 z-50 flex w-[276px] -translate-x-full flex-col border-r border-[#B08D57]/25 bg-[#4A0808] text-[#F8F5F3] transition-transform duration-300 lg:sticky lg:top-0 lg:h-screen lg:translate-x-0', sidebarOpen && 'translate-x-0')}>
        <div className="flex h-[74px] items-center justify-between border-b border-[#B08D57]/25 px-5">
          <Link href="/admin" className="flex items-center gap-3" onClick={() => setSidebarOpen(false)}>
            <span className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-full bg-white p-1 ring-1 ring-[#B08D57]/60">
              <img src="/vidhishala%20circle%20logo.png" alt="Vidhishala" className="h-full w-full rounded-full object-contain" />
            </span>
            <span>
              <span className="block font-heading text-lg font-bold">Vidhishala</span>
              <span className="block text-[9px] uppercase tracking-[0.18em] text-[#B08D57]">Admin CMS</span>
            </span>
          </Link>
          <Button variant="ghost" size="icon" className="text-white lg:hidden" onClick={() => setSidebarOpen(false)}><X className="h-5 w-5" /></Button>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-4">
          <Link href="/admin" onClick={() => setSidebarOpen(false)} className={cn('mb-5 flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-semibold transition-colors', pathname === '/admin' ? 'bg-white/15 text-white' : 'text-white/70 hover:bg-white/10 hover:text-white')}>
            <LayoutDashboard className="h-4 w-4" /> Dashboard
          </Link>
          {groups.map((group) => {
            const isExpanded = expanded[group.label] ?? true;
            return (
              <div key={group.label} className="mb-5">
                <button className="mb-1 flex w-full items-center justify-between px-3 text-[10px] font-bold uppercase tracking-[0.18em] text-[#B08D57]" onClick={() => setExpanded((current) => ({ ...current, [group.label]: !isExpanded }))}>
                  {group.label}
                  <ChevronDown className={cn('h-3.5 w-3.5 transition-transform', !isExpanded && '-rotate-90')} />
                </button>
                {isExpanded && <div className="space-y-0.5">{group.links.map((item) => <Link key={`${group.label}-${item.label}`} href={item.href} onClick={() => setSidebarOpen(false)} className={cn('flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors', isActive(item.href) ? 'bg-white/15 font-semibold text-white' : 'text-white/75 hover:bg-white/10 hover:text-white')}><item.icon className="h-4 w-4 shrink-0" />{item.label}</Link>)}</div>}
              </div>
            );
          })}
        </nav>

        <div className="border-t border-[#B08D57]/25 p-3">
          <Link href="/" target="_blank" className="mb-2 flex items-center gap-3 rounded-md px-3 py-2 text-sm text-white/70 hover:bg-white/10 hover:text-white"><Globe2 className="h-4 w-4" /> View Website</Link>
          <button onClick={handleSignOut} className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm text-white/70 hover:bg-white/10 hover:text-white"><LogOut className="h-4 w-4" /> Logout</button>
        </div>
      </aside>

      <div className="min-w-0 flex-1">
        <header className="sticky top-0 z-30 flex min-w-0 h-[74px] items-center justify-between gap-3 border-b border-border/60 bg-background/90 px-3 backdrop-blur-md sm:px-6">
          <div className="flex min-w-0 items-center gap-3">
            <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setSidebarOpen(true)} aria-label="Open navigation"><Menu className="h-5 w-5" /></Button>
            <div className="hidden items-center gap-2 md:flex"><span className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">LAW</span><span className="text-muted-foreground">|</span><span className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">LEARN</span><span className="text-muted-foreground">|</span><span className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">ENGAGE</span><span className="text-muted-foreground">|</span><span className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">CONTRIBUTE</span></div>
          </div>
          <div className="flex min-w-0 items-center gap-1 sm:gap-4">
            <div className="relative hidden w-52 lg:block"><Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" /><Input placeholder="Search content" className="h-9 pl-9" /></div>
            <Button variant="ghost" size="icon" className="relative" aria-label="Notifications"><Bell className="h-5 w-5" /><span className="absolute right-1 top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[9px] text-white">3</span></Button>
            <ThemeToggle />
            <div className="relative">
              <button className="flex items-center gap-2 rounded-md px-1 py-1 text-left hover:bg-muted" onClick={() => setProfileOpen((open) => !open)} aria-expanded={profileOpen}>
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#4A0808] text-xs font-bold text-white">{(user?.email?.[0] || 'K').toUpperCase()}</span>
                <span className="hidden max-w-[120px] sm:block"><span className="block truncate text-sm font-semibold">{user?.user_metadata?.full_name || 'Kunal Sharma'}</span><span className="block text-[11px] text-muted-foreground">Administrator</span></span><ChevronDown className="hidden h-4 w-4 sm:block" />
              </button>
              {profileOpen && <div className="absolute right-0 top-12 z-50 w-52 rounded-md border border-border bg-popover p-2 shadow-xl"><Link href="/admin/settings" className="flex items-center gap-2 rounded px-3 py-2 text-sm hover:bg-muted" onClick={() => setProfileOpen(false)}><ShieldCheck className="h-4 w-4" />Change Password</Link><button onClick={handleSignOut} className="flex w-full items-center gap-2 rounded px-3 py-2 text-left text-sm hover:bg-muted"><LogOut className="h-4 w-4" />Logout</button></div>}
            </div>
          </div>
        </header>
        <main className="min-w-0 p-3 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
