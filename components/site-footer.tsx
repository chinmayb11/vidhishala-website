'use client';

import Link from 'next/link';
import {
  Scale,
  MapPin,
  Mail,
  Phone,
  Shield,
  ArrowRight,
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

const footerLinks = [
  {
    title: 'Organization',
    links: [
      { label: 'About Us', href: '/about' },
      { label: 'Team & Leadership', href: '/team' },
      { label: 'Rajasthan Law Festival', href: '/rajasthan-law-festival' },
      { label: 'Admin Login', href: '/admin/login' },
    ],
  },
  {
    title: 'Programs',
    links: [
      { label: 'Library Internship Program', href: '/programs/library-internship' },
      { label: 'Hybrid Mode Internship', href: '/programs/hybrid-internship' },
      { label: 'School Outreach', href: '/programs/school-outreach' },
      { label: 'All Programs', href: '/programs' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'The Vidhi Gazette', href: '/vidhi-gazette' },
      { label: 'Bare Acts', href: '/resources/bare-acts' },
      { label: 'Style Guides', href: '/resources/style-guides' },
      { label: 'Gallery', href: '/gallery' },
    ],
  },
];

export function SiteFooter() {
  const [email, setEmail] = useState('');
  const { toast } = useToast();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    toast({
      title: 'Subscribed Successfully',
      description: 'You will receive updates from Vidhishala.',
    });
    setEmail('');
  };

  return (
    <footer className="relative mt-20 border-t border-border/40">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-navy/5 dark:to-navy/30" />
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-gold to-amber-600 text-navy shadow-lg">
                <Scale className="h-5 w-5" strokeWidth={2.5} />
              </div>
              <div>
                <div className="font-heading font-bold text-base leading-tight tracking-wide">
                  VIDHISHALA
                </div>
                <div className="text-[10px] text-muted-foreground leading-tight tracking-wider uppercase">
                  Empowering Legal Minds Since 2020
                </div>
              </div>
            </Link>
            <p className="text-sm text-muted-foreground max-w-sm mb-4">
              A registered socio-legal organization under The Rajasthan
              Societies Registration Act, 1958. Driving legal education,
              research, and societal transformation.
            </p>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                <span>
                  D-152-A, Durga Marg, Banipark, Jaipur,
                  <br />
                  Rajasthan 302016 (India)
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary shrink-0" />
                <span>vidhishala.law@gmail.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-primary shrink-0" />
                <span>+91 9799998882, +91 9079847809</span>
              </div>
            </div>
          </div>

          {/* Link columns */}
          {footerLinks.map((col) => (
            <div key={col.title}>
              <h4 className="font-heading font-semibold text-sm mb-4 uppercase tracking-wider">
                {col.title}
              </h4>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter */}
        <div className="mt-12 pt-8 border-t border-border/40">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <h4 className="font-heading font-semibold text-base mb-1">
                Subscribe to Our Newsletter
              </h4>
              <p className="text-sm text-muted-foreground">
                Get updates on events, publications, and internship
                opportunities.
              </p>
            </div>
            <form onSubmit={handleSubscribe} className="flex w-full flex-col gap-2 sm:flex-row md:w-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full sm:w-64"
              />
              <Button type="submit" size="icon" className="self-end bg-gradient-to-r from-gold to-amber-600 text-navy sm:self-auto">
                <ArrowRight className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 pt-8 border-t border-border/40 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground text-center md:text-left">
            &copy; 2026 Vidhishala. All rights reserved.
            Registered under The Rajasthan Societies Registration Act, 1958.
          </p>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <Link href="/admin/login" className="flex items-center gap-1 hover:text-primary transition-colors">
              <Shield className="h-3 w-3" />
              Admin Portal
            </Link>
            <Link href="/contact" className="hover:text-primary transition-colors">
              Legal Aid Portal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
