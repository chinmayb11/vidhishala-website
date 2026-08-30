'use client';

import Link from 'next/link';
import { GraduationCap, ArrowRight, CheckCircle2, Handshake, Calendar, Users, Globe, Monitor } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AnimatedCounter } from '@/components/animated-counter';

const stats = [
  { value: 2, suffix: '', label: 'Cohorts Per Year' },
  { value: 200, suffix: '+', label: 'Participants' },
  { value: 8, suffix: ' wks', label: 'Duration' },
];

const outcomes = [
  'Online legal research methodology modules',
  'Weekly virtual mentorship sessions',
  'On-site court visits and observation',
  'Collaborative research project with Lloyd University faculty',
];

const modules = [
  { title: 'Online Research Methodology', desc: 'Master digital legal databases, case law analysis, and online research tools.', icon: Monitor },
  { title: 'Virtual Mentorship', desc: 'Weekly sessions with experienced advocates and legal scholars.', icon: Users },
  { title: 'On-Site Court Observation', desc: 'Visit Rajasthan High Court and district courts for practical exposure.', icon: Calendar },
  { title: 'Collaborative Research', desc: 'Co-author research papers with Lloyd University faculty members.', icon: Globe },
];

export default function HybridInternshipPage() {
  return (
    <div className="overflow-hidden">
      <section className="relative pt-32 pb-16">
        <div className="absolute inset-0 bg-grid opacity-20" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo/10 rounded-full blur-[120px] animate-glow-pulse" />
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
            <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-indigo to-violet-600 text-white mb-6 shadow-xl">
              <GraduationCap className="h-10 w-10" />
            </div>
            <Badge variant="secondary" className="mb-3">In collaboration with Lloyd University, Noida</Badge>
            <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.1] tracking-tight mb-6">
              Hybrid Mode <span className="text-gradient-indigo">Internship</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl">
              A blended-learning internship combining online modules with on-site training sessions. Designed for law students across India who want to gain practical exposure without relocating full-time.
            </p>
            <Button asChild size="lg" className="bg-gradient-to-r from-indigo to-violet-600 text-white font-semibold">
              <Link href="/contact?purpose=internship">
                Apply for this Program
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {stats.map((stat) => (
              <div key={stat.label} className="glass-card rounded-2xl p-6 text-center">
                <div className="font-heading text-3xl sm:text-4xl font-bold text-primary">
                  <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4 border-indigo/30 text-indigo">Program Modules</Badge>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold mb-4">Four Core Modules</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">A structured blend of online and on-site learning for comprehensive legal training.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {modules.map((module) => (
              <div key={module.title} className="glass-card rounded-2xl p-6 hover:shadow-xl hover:shadow-indigo/10 transition-all hover:-translate-y-1">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo/15 to-violet-600/15 text-indigo mb-4">
                  <module.icon className="h-7 w-7" />
                </div>
                <h3 className="font-heading text-lg font-bold mb-2">{module.title}</h3>
                <p className="text-sm text-muted-foreground">{module.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <Badge variant="outline" className="mb-4 border-gold/30 text-gold">Program Outcomes</Badge>
              <h2 className="font-heading text-3xl font-bold mb-6">What You&apos;ll Gain</h2>
              <div className="space-y-3">
                {outcomes.map((outcome) => (
                  <div key={outcome} className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                    <span className="text-muted-foreground">{outcome}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <Badge variant="outline" className="mb-4 border-indigo/30 text-indigo">Collaborating Partner</Badge>
              <h2 className="font-heading text-3xl font-bold mb-6">Our Partner</h2>
              <div className="glass-card rounded-xl p-5 flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo/10 text-indigo">
                  <Handshake className="h-6 w-6" />
                </div>
                <span className="font-heading font-semibold">Lloyd University, Noida</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-3xl overflow-hidden glass-card p-12 md:p-20 text-center">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo/5 via-transparent to-gold/5" />
            <div className="relative z-10 max-w-2xl mx-auto">
              <GraduationCap className="h-12 w-12 text-indigo mx-auto mb-6" />
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">Ready to Apply?</h2>
              <p className="text-muted-foreground mb-8">Join the next cohort of the Hybrid Mode Internship Program.</p>
              <Button asChild size="lg" className="bg-gradient-to-r from-indigo to-violet-600 text-white font-semibold">
                <Link href="/contact?purpose=internship">Apply Now <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
