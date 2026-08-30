'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Scale,
  ChevronDown,
  Menu,
  Library,
  GraduationCap,
  School,
  FileText,
  BookOpen,
  ScrollText,
  Calendar,
  Users,
  Images,
  Award,
  Info,
  Shield,
  Gavel,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { ThemeToggle } from '@/components/theme-toggle';
import { PWAInstallButton } from '@/components/pwa-install-button';

interface NavChild {
  label: string;
  href: string;
  description: string;
  icon: React.ElementType;
}

interface NavItem {
  label: string;
  href: string;
  children?: NavChild[];
}

const navItems: NavItem[] = [
  { label: 'Home', href: '/' },
  {
    label: 'Programs',
    href: '/programs',
    children: [
      { label: 'Library Internship Program (LIP)', href: '/programs/library-internship', description: 'Practical legal research & cataloging', icon: Library },
      { label: 'Hybrid Mode Internship', href: '/programs/hybrid-internship', description: 'In collaboration with Lloyd University', icon: GraduationCap },
      { label: "Children's Today, Leaders Tomorrow", href: '/programs/school-outreach', description: 'School outreach & gender sensitivity', icon: School },
    ],
  },
  {
    label: 'Resources',
    href: '/resources',
    children: [
      { label: 'The Vidhi Gazette', href: '/vidhi-gazette', description: 'Digital publication hub', icon: FileText },
      { label: 'Bare Acts & References', href: '/resources/bare-acts', description: 'Downloadable legal guides', icon: BookOpen },
      { label: 'Style Guides & Research', href: '/resources/style-guides', description: 'Research guidelines', icon: ScrollText },
      { label: 'Fundamental Rights', href: '/resources/fundamental-rights', description: 'Constitutional rights guides', icon: Shield },
      { label: 'Legal Duties', href: '/resources/legal-duties', description: 'Citizen obligations', icon: Gavel },
    ],
  },
  {
    label: 'About',
    href: '/about',
    children: [
      { label: 'About Us', href: '/about', description: 'Our story & registration', icon: Info },
      { label: 'Team & Leadership', href: '/team', description: 'Advisory board & members', icon: Users },
      { label: 'Media Gallery', href: '/gallery', description: 'Photos & videos', icon: Images },
    ],
  },
  { label: 'Law Festival', href: '/rajasthan-law-festival' },
  { label: 'Contact', href: '/contact' },
];

function HoverDropdown({ item, isActive }: { item: NavItem; isActive: (href: string) => boolean }) {
  const [open, setOpen] = React.useState(false);
  const timeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpen(true);
  };

  const handleLeave = () => {
    timeoutRef.current = setTimeout(() => setOpen(false), 150);
  };

  React.useEffect(() => () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  }, []);

  return (
    <div className="relative" onMouseEnter={handleEnter} onMouseLeave={handleLeave}>
      <Link
        href={item.href}
        className={cn(
          'flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-md transition-colors hover:text-primary',
          isActive(item.href) && 'text-primary'
        )}
      >
        {item.label}
        <ChevronDown className={cn('h-3 w-3 opacity-60 transition-transform duration-200', open && 'rotate-180')} />
      </Link>
      {open && (
        <div className="absolute left-0 top-full pt-2 z-50">
          <div
            className="glass-card rounded-xl p-2 w-80 shadow-xl border border-border/50 animate-dropdown-in"
            onMouseEnter={handleEnter}
          >
            <div className="px-3 py-2 text-xs font-semibold uppercase tracking-wider text-primary">
              {item.label}
            </div>
            <div className="h-px bg-border/40 my-1" />
            {item.children!.map((child) => (
              <Link
                key={child.label}
                href={child.href}
                className="flex items-start gap-3 p-3 rounded-lg hover:bg-primary/10 transition-colors group"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary/10 text-primary shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                  <child.icon className="h-4 w-4" />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-medium">{child.label}</span>
                  <span className="text-xs text-muted-foreground">{child.description}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href.split('#')[0]);
  };

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full transition-all duration-300',
        scrolled ? 'glass-nav shadow-sm' : 'bg-transparent'
      )}
    >
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group shrink-0">
            <div className="relative">
              <div className="absolute inset-0 bg-gold/30 rounded-full blur-md group-hover:bg-gold/50 transition-all" />
              <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-gold to-amber-600 text-navy shadow-lg">
                <Scale className="h-5 w-5" strokeWidth={2.5} />
              </div>
            </div>
            <div className="hidden sm:block">
              <div className="font-heading font-bold text-sm leading-tight tracking-wide">
                VIDHISHALA
              </div>
              <div className="text-[10px] text-muted-foreground leading-tight tracking-wider uppercase">
                Foundation
              </div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) =>
              item.children ? (
                <HoverDropdown key={item.label} item={item} isActive={isActive} />
              ) : (
                <Link
                  key={item.label}
                  href={item.href}
                  className={cn(
                    'px-3 py-2 text-sm font-medium rounded-md transition-colors hover:text-primary',
                    isActive(item.href) && 'text-primary'
                  )}
                >
                  {item.label}
                </Link>
              )
            )}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <PWAInstallButton />
            <Button
              asChild
              size="sm"
              className="hidden md:inline-flex bg-gradient-to-r from-gold to-amber-600 text-navy font-semibold hover:shadow-lg hover:shadow-gold/30 transition-all"
            >
              <Link href="/contact?purpose=internship">
                <Award className="h-4 w-4 mr-1" />
                Apply
              </Link>
            </Button>

            {/* Mobile menu */}
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="lg:hidden h-9 w-9"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80 glass-nav overflow-y-auto">
                <SheetHeader>
                  <SheetTitle className="font-heading">
                    <div className="flex items-center gap-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-gold to-amber-600 text-navy">
                        <Scale className="h-4 w-4" strokeWidth={2.5} />
                      </div>
                      Vidhishala Foundation
                    </div>
                  </SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col gap-1 mt-6">
                  {navItems.map((item) =>
                    item.children ? (
                      <div key={item.label} className="flex flex-col">
                        <Link
                          href={item.href}
                          className="px-3 py-2 text-sm font-semibold text-foreground"
                          onClick={() => setMobileOpen(false)}
                        >
                          {item.label}
                        </Link>
                        {item.children.map((child) => (
                          <Link
                            key={child.label}
                            href={child.href}
                            className="flex items-center gap-2 pl-6 pr-3 py-1.5 text-sm text-muted-foreground hover:text-primary"
                            onClick={() => setMobileOpen(false)}
                          >
                            <child.icon className="h-3 w-3" />
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    ) : (
                      <Link
                        key={item.label}
                        href={item.href}
                        className={cn(
                          'px-3 py-2 text-sm font-medium rounded-md transition-colors hover:text-primary',
                          isActive(item.href) && 'text-primary'
                        )}
                        onClick={() => setMobileOpen(false)}
                      >
                        {item.label}
                      </Link>
                    )
                  )}
                  <Button
                    asChild
                    className="mt-4 bg-gradient-to-r from-gold to-amber-600 text-navy font-semibold"
                  >
                    <Link href="/contact?purpose=internship" onClick={() => setMobileOpen(false)}>
                      <Award className="h-4 w-4 mr-1" />
                      Apply for Internship
                    </Link>
                  </Button>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
