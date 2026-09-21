'use client';

import Link from 'next/link';
import {
  Scale,
  MapPin,
  Calendar,
  Award,
  Target,
  Eye,
  FileText,
  ArrowRight,
  CheckCircle2,
  Building2,
  Landmark,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AnimatedCounter } from '@/components/animated-counter';

const milestones = [
  { year: '2020', title: ' Established', desc: 'Vidhishala registered under The Rajasthan Societies Registration Act, 1958.' },
  { year: '2021', title: 'Top 100 Law Blog Recognition', desc: 'Ranked among the Top 100 Indian Law Blogs by Feedspot.' },
  { year: '2022', title: 'First LIP Edition', desc: 'Launched the Library Internship Program with Rajasthan Education Trust.' },
  { year: '2023', title: 'The Vidhi Gazette Launch', desc: 'Published the inaugural volume of our peer-reviewed legal journal.' },
  { year: '2024', title: 'Rajasthan Law Festival', desc: 'Hosted the first edition of RLF in collaboration with Ranka Public Charitable Trust.' },
  { year: '2025', title: '7+ Institutional MOUs', desc: 'Expanded partnerships with universities across India.' },
];

const values = [
  { icon: Target, title: 'Our Mission', desc: 'To bridge the gap between legal academia and practical legal work through research, education, and community engagement.' },
  { icon: Eye, title: 'Our Vision', desc: 'A society where every citizen understands their legal rights and duties, and where legal education is accessible, practical, and transformative.' },
  { icon: Scale, title: 'Our Values', desc: 'Integrity, accessibility, excellence, and social responsibility guide every initiative we undertake.' },
];

export default function AboutPage() {
  return (
    <div className="overflow-hidden">
      {/* Hero */}
      <section className="relative pt-32 pb-16">
        <div className="absolute inset-0 bg-grid opacity-20" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold/10 rounded-full blur-[120px] animate-glow-pulse" />
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <Badge variant="outline" className="mb-6 border-gold/30 text-gold">About Us</Badge>
            <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight mb-6">
              Empowering Legal Minds.
              <br />
              <span className="text-gradient-gold">Since 2020.</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl">
              The Vidhishala is a registered socio-legal
              organization committed to advancing legal education, research,
              and community impact across Rajasthan and India.
            </p>
          </div>
        </div>
      </section>

      {/* Registration Credentials */}
      <section className="py-12">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Card className="glass-card overflow-hidden">
            <CardContent className="p-8 md:p-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-gold to-amber-600 text-navy">
                      <Landmark className="h-6 w-6" />
                    </div>
                    <h2 className="font-heading text-2xl font-bold">Registration Credentials</h2>
                  </div>
                  <p className="text-muted-foreground mb-4">
                    Vidhishala is a legally registered socio-legal
                    organization under The Rajasthan Societies Registration
                    Act, 1958. We operate with full statutory compliance and
                    transparency.
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                      <span className="text-muted-foreground">Registered under The Rajasthan Societies Registration Act, 1958</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                      <span className="text-muted-foreground">Socio-legal organization status</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                      <span className="text-muted-foreground">Established in 2020</span>
                    </div>
                  </div>
                </div>
                <div className="glass-card rounded-2xl p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <Building2 className="h-5 w-5 text-primary" />
                    <span className="text-sm font-semibold uppercase tracking-wider">Registered Office</span>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <MapPin className="h-4 w-4 text-primary mt-1 shrink-0" />
                      <div>
                        <div className="font-medium">D-152-A, Durga Marg, Banipark</div>
                        <div className="text-sm text-muted-foreground">Jaipur, Rajasthan 302016 (India)</div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 pt-6 border-t border-border/40">
                    <div className="text-3xl font-heading font-bold text-gradient-gold mb-1">
                      <AnimatedCounter end={6} suffix="+" />
                    </div>
                    <div className="text-xs text-muted-foreground">Years of Impact</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Mission / Vision / Values */}
      <section className="py-20">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4 border-indigo/30 text-indigo">Our Purpose</Badge>
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              Mission, Vision & Values
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {values.map((val) => (
              <Card key={val.title} className="glass-card hover:shadow-lg transition-all">
                <CardContent className="p-8 text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-gold to-amber-600 text-navy mx-auto mb-5">
                    <val.icon className="h-8 w-8" />
                  </div>
                  <h3 className="font-heading text-xl font-bold mb-3">{val.title}</h3>
                  <p className="text-sm text-muted-foreground">{val.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4 border-gold/30 text-gold">Journey</Badge>
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              Our Milestones
            </h2>
          </div>
          <div className="max-w-3xl mx-auto">
            <div className="relative">
              <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-border" />
              {milestones.map((m, i) => (
                <div
                  key={m.year}
                  className={`relative flex items-start gap-6 mb-8 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                >
                  <div className="absolute left-4 md:left-1/2 -translate-x-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-gold to-amber-600 text-navy z-10 font-heading text-xs font-bold">
                    {m.year.slice(-2)}
                  </div>
                  <div className={`flex-1 pl-14 md:pl-0 ${i % 2 === 0 ? 'md:pr-14 md:text-right' : 'md:pl-14'}`}>
                    <Card className="glass-card">
                      <CardContent className="p-5">
                        <div className="text-xs text-primary font-semibold mb-1">{m.year}</div>
                        <h3 className="font-heading font-semibold mb-1">{m.title}</h3>
                        <p className="text-sm text-muted-foreground">{m.desc}</p>
                      </CardContent>
                    </Card>
                  </div>
                  <div className="hidden md:block flex-1" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-3xl overflow-hidden glass-card p-12 md:p-16 text-center">
            <div className="absolute inset-0 bg-gradient-to-br from-gold/5 via-transparent to-indigo/5" />
            <div className="relative z-10 max-w-2xl mx-auto">
              <FileText className="h-12 w-12 text-gold mx-auto mb-6" />
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
                Get Involved
              </h2>
              <p className="text-muted-foreground mb-8">
                Whether you want to intern, collaborate, or simply learn more,
                we&apos;d love to hear from you.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button asChild size="lg" className="bg-gradient-to-r from-gold to-amber-600 text-navy font-semibold glow-gold">
                  <Link href="/contact">
                    Contact Us
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="glass-card">
                  <Link href="/team">
                    Meet Our Team
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
