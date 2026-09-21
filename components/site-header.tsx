'use client';

import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  ChevronDown,
  Menu,
  X,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { ThemeToggle } from '@/components/theme-toggle';
import { PWAInstallButton } from '@/components/pwa-install-button';

interface NavChild {
  label: string;
  href: string;
  children?: NavChild[];
}

interface NavItem {
  label: string;
  href: string;
  children?: NavChild[];
}

const navItems: NavItem[] = [
  { label: 'Home', href: '/' },
  {
    label: 'About Us', href: '/about',
    children: [
      { label: 'About the Organisation', href: '/about/organisation' },
      { label: 'Aim & Objective', href: '/about/aim-objective' },
      { label: 'Our Team', href: '/team' },
      { label: 'Advisory Board', href: '/about/advisory-board' },
    ],
  },
  {
    label: 'Activities & Gallery', href: '/programs',
    children: [
      {
        label: 'Internship Programmes', href: '/programs/internships', children: [
          { label: 'NITP', href: '/programs/internships/nitp' },
          { label: 'Regular Internship', href: '/programs/internships/regular' },
          { label: 'LIP', href: '/programs/internships/lip' },
        ],
      },
      { label: 'Pandit A.L. Sharma Debate Competition', href: '/programs/debate' },
      { label: 'Educational Visits', href: '/programs/educational-visits' },
      { label: 'Workshops, Seminars & Conferences', href: '/programs/workshops' },
      { label: 'Social Welfare Activities', href: '/programs/social-welfare' },
      {
        label: 'Gallery', href: '/gallery', children: [
          { label: 'Events', href: '/gallery/events' },
          { label: 'Internships', href: '/gallery/internships' },
          { label: 'Workshops', href: '/gallery/workshops' },
          { label: 'Educational Visits', href: '/gallery/educational-visits' },
          { label: 'Social Welfare Activities', href: '/gallery/social-welfare' },
        ],
      },
    ],
  },
  {
    label: 'Publications & Research', href: '/resources',
    children: [
      { label: 'The Vidhi Gazette', href: '/vidhi-gazette' },
      { label: 'Rajasthan Law Journal', href: '/resources/journal' },
      { label: 'Blogs, Articles & Research Papers', href: '/resources/blogs' },
      { label: 'Press Releases', href: '/resources/press-releases' },
      { label: 'Research & Development (R & D)', href: '/resources/rnd' },
    ],
  },
  {
    label: 'Rajasthan Law Fest', href: '/rajasthan-law-festival',
    children: [
      { label: 'About the Law Fest', href: '/rajasthan-law-festival/about' },
      { label: 'Past Editions', href: '/rajasthan-law-festival/past-editions' },
      { label: 'Events & Competitions', href: '/rajasthan-law-festival/events' },
      { label: 'Panel Discussions', href: '/rajasthan-law-festival/panel-discussions' },
      { label: 'Eminent Speakers', href: '/rajasthan-law-festival/speakers' },
      { label: 'Gallery', href: '/rajasthan-law-festival/gallery' },
      { label: 'Downloads', href: '/rajasthan-law-festival/downloads' },
      { label: 'Contact (Law Fest)', href: '/rajasthan-law-festival/contact' },
    ],
  },
  {
    label: 'Contact Us', href: '/contact',
    children: [
      { label: 'Contact Information', href: '/contact/information' },
      { label: 'Enquiry Form', href: '/contact/enquiry' },
      { label: 'Our Address', href: '/contact/address' },
      { label: 'Get in Touch', href: '/contact/touch' },
    ],
  },
];

function DropdownLinks({ items, nested = false }: { items: NavChild[]; nested?: boolean }) {
  return (
    <div className={cn(nested ? 'ml-3 border-l border-[#B08D57]/40 pl-3' : 'space-y-0.5')}>
      {items.map((child) => (
        <div key={child.label} className="group/item relative">
          <Link
            href={child.href}
            className="flex items-center justify-between gap-3 rounded-lg border border-transparent px-3 py-2.5 text-sm text-slate-700 transition-all hover:border-[#B08D57]/25 hover:bg-[#F8F5F3] hover:text-[#7A0C0C] dark:text-[#F8F5F3] dark:hover:border-[#B08D57]/30 dark:hover:bg-[#1C1C1C] dark:hover:text-[#B08D57]"
          >
            <span className="truncate">{child.label}</span>
            {child.children && <ChevronDown className="h-3.5 w-3.5 -rotate-90 text-[#B08D57]" />}
          </Link>
          {child.children && (
            <div className="hidden pt-1 group-hover/item:block group-focus-within/item:block">
              <DropdownLinks items={child.children} nested />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function MobileLinks({ items }: { items: NavChild[] }) {
  return (
    <div className="flex flex-col gap-2">
      {items.map((child) => (
        <div key={child.label}>
          <Link href={child.href} className="flex items-center gap-3 py-1 text-sm text-slate-700 hover:text-[#7A0C0C] dark:text-white dark:hover:text-[#B08D57]">
            <span>{child.label}</span>
          </Link>
          {child.children && (
            <div className="ml-4 border-l border-[#B08D57]/30 pl-3">
              <MobileLinks items={child.children} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function HoverDropdown({ item, isActive }: { item: NavItem; isActive: (href: string) => boolean }) {
  const [open, setOpen] = React.useState(false);
  const timeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const menuRef = React.useRef<HTMLDivElement | null>(null);

  const handleEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpen(true);
  };

  const handleLeave = () => {
    timeoutRef.current = setTimeout(() => setOpen(false), 150);
  };

  React.useEffect(() => {
    const handlePointerDown = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handlePointerDown);
    return () => document.removeEventListener('mousedown', handlePointerDown);
  }, []);

  React.useEffect(() => () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  }, []);

  return (
    <div ref={menuRef} className="relative" onMouseEnter={handleEnter} onMouseLeave={handleLeave}>
      <Link
        href={item.href}
        onClick={(event) => {
          if (item.children) {
            event.preventDefault();
            setOpen((current) => !current);
          }
        }}
        className={cn(
          'flex min-h-12 items-center justify-center gap-1 border-b-2 border-transparent px-3 py-3 text-center text-xs font-semibold tracking-wide text-[#1C1C1C] transition-colors hover:border-[#B08D57] hover:bg-[#F8F5F3] hover:text-[#7A0C0C] dark:text-white dark:hover:bg-[#4A0808] dark:hover:text-white xl:text-sm',
          isActive(item.href) && 'border-[#7A0C0C] font-bold text-[#7A0C0C] dark:border-[#B08D57] dark:text-[#B08D57]'
        )}
      >
        {item.label}
        <ChevronDown className={cn('h-4 w-4 opacity-70 transition-transform duration-200', open && 'rotate-180')} />
      </Link>
      {open && (
        <div className="absolute left-1/2 top-full z-[60] w-[min(22rem,calc(100vw-1.5rem))] -translate-x-1/2 pt-2">
          <div
            className="max-h-[70vh] w-full overflow-y-auto overflow-x-hidden rounded-xl border border-[#D9D0C7] border-t-2 border-t-[#B08D57] bg-white/95 p-2 text-slate-800 shadow-[0_18px_45px_rgba(74,8,8,0.18)] backdrop-blur-md dark:border-[#B08D57]/30 dark:border-t-[#B08D57] dark:bg-[#4A0808]/95 dark:text-[#F8F5F3]"
            onMouseEnter={handleEnter}
          >
            <div className="px-3 py-2 text-[10px] font-bold uppercase tracking-[0.16em] text-[#B08D57]">
              {item.label}
            </div>
            <div className="my-1 h-px bg-gradient-to-r from-transparent via-[#B08D57]/45 to-transparent" />
            <DropdownLinks items={item.children ?? []} />
          </div>
        </div>
      )}
    </div>
  );
}

function DesktopNavLink({ item, isActive }: { item: NavItem; isActive: (href: string) => boolean }) {
  return (
    <Link
      href={item.href}
      className={cn(
        'flex min-h-12 items-center justify-center border-b-2 border-transparent px-3 py-3 text-center text-xs font-semibold tracking-wide text-[#1C1C1C] transition-colors hover:border-[#B08D57] hover:bg-[#F8F5F3] hover:text-[#7A0C0C] dark:text-white dark:hover:bg-[#4A0808] dark:hover:text-white xl:text-sm',
        isActive(item.href) && 'border-[#7A0C0C] font-bold text-[#7A0C0C] dark:border-[#B08D57] dark:text-[#B08D57]'
      )}
    >
      {item.label}
    </Link>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const isHome = pathname === '/';
  const [scrolled, setScrolled] = React.useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [expandedMobileItem, setExpandedMobileItem] = React.useState<string | null>(null);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile drawer when changing routes
  React.useEffect(() => {
    setMobileMenuOpen(false);
    setExpandedMobileItem(null);
  }, [pathname]);

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href.split('#')[0]);
  };

  const toggleMobileSubmenu = (label: string) => {
    setExpandedMobileItem(expandedMobileItem === label ? null : label);
  };

  return (
    <header
      className={cn(
        'site-header top-0 z-50 w-full overflow-visible border-b border-[#D9D0C7] bg-white/95 shadow-sm transition-[background-color,backdrop-filter,box-shadow] duration-300 dark:border-[#B08D57]/40 dark:bg-[#1C1C1C]/95',
        isHome ? 'home-header absolute bg-white/10 backdrop-blur-2xl dark:bg-[#1C1C1C]/20' : 'sticky',
        scrolled && (isHome ? 'bg-white/30 shadow-lg dark:!bg-[#1C1C1C]/60' : 'bg-white/75 shadow-lg backdrop-blur-md dark:!bg-[#1C1C1C]/80')
      )}
    >
      <div className="absolute right-4 top-3 z-20 flex items-center gap-1 sm:gap-2">
        <ThemeToggle />
        <PWAInstallButton />
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="rounded-md p-2 text-[#1C1C1C] transition-colors hover:bg-[#F8F5F3] dark:text-white dark:hover:bg-[#4A0808] xl:hidden"
          aria-label="Toggle Navigation Menu"
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      <div className={cn(
        'container relative mx-auto flex min-h-[174px] items-center justify-center px-4 py-6 text-center sm:px-6 sm:py-7 lg:min-h-[190px] lg:px-8 lg:py-8'
      )}>
        <Link href="/" className="group inline-flex flex-col items-center">
          <span className="mb-3 flex h-24 w-24 items-center justify-center overflow-hidden rounded-full bg-white p-1 shadow-[0_8px_24px_rgba(74,8,8,0.16)] ring-1 ring-[#B08D57]/60 transition-transform duration-300 group-hover:scale-[1.03] sm:h-28 sm:w-28 sm:p-1.5 lg:h-32 lg:w-32 lg:p-2">
            <Image src="/vidhishala%20circle%20logo.png" alt="Vidhishala logo" width={128} height={128} className="h-full w-full rounded-full object-contain" />
          </span>
          <span className="font-heading text-3xl font-extrabold tracking-tight text-[#7A0C0C] dark:text-[#B08D57] sm:text-4xl">VIDHISHALA</span>
          <span className="mt-0.5 text-[10px] font-medium uppercase tracking-[0.2em] text-[#B08D57]">Learn | Engage | Empower</span>
        </Link>
      </div>

      <nav aria-label="Primary navigation" className={cn(
        'hidden overflow-visible border-t border-[#D9D0C7] bg-white dark:border-[#B08D57]/40 dark:bg-[#4A0808] xl:block',
        isHome && 'border-white/30 bg-white/10 backdrop-blur-2xl dark:bg-[#1C1C1C]/20'
      )}>
        <div className="container mx-auto flex min-w-0 max-w-full items-stretch justify-center gap-0 overflow-visible px-1 lg:gap-1 lg:px-6">
          {navItems.map((item) => item.children
            ? <HoverDropdown key={item.label} item={item} isActive={isActive} />
            : <DesktopNavLink key={item.label} item={item} isActive={isActive} />
          )}
        </div>
      </nav>

      {mobileMenuOpen && (
        <div className={cn(
          'border-t border-[#B08D57]/50 bg-white px-4 py-6 shadow-2xl dark:bg-[#1C1C1C] xl:hidden',
          isHome && 'bg-white/90 backdrop-blur-xl dark:bg-[#1C1C1C]/90'
        )}>
          <nav className="flex flex-col gap-2">
            {navItems.map((item) =>
              item.children ? (
                <div key={item.label} className="border-b border-[#B08D57]/20 pb-2">
                  <button
                    onClick={() => toggleMobileSubmenu(item.label)}
                    className="flex w-full items-center justify-between py-2 text-left text-base font-bold text-[#7A0C0C] transition-colors hover:text-[#4A0808] dark:text-[#B08D57]"
                  >
                    <span>{item.label}</span>
                    <ChevronDown
                      className={cn(
                        'h-5 w-5 opacity-70 transition-transform duration-200',
                        expandedMobileItem === item.label && 'rotate-180'
                      )}
                    />
                  </button>
                  {expandedMobileItem === item.label && (
                    <div className="mt-1 rounded-xl border border-[#D9D0C7] bg-[#F8F5F3] p-2 pl-4 shadow-inner dark:border-[#B08D57]/30 dark:bg-[#4A0808]">
                      <MobileLinks items={item.children} />
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={item.label}
                  href={item.href}
                  className={cn(
                    'border-b border-[#B08D57]/20 py-2 text-base font-bold transition-colors',
                    isActive(item.href) ? 'text-[#7A0C0C] dark:text-[#B08D57]' : 'text-slate-800 dark:text-white'
                  )}
                >
                  {item.label}
                </Link>
              )
            )}
          </nav>
        </div>
      )}
    </header>
  );
}