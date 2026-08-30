'use client';

import Link from 'next/link';
import { School, ArrowRight, CheckCircle2, Handshake, Users, Heart, BookOpen, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AnimatedCounter } from '@/components/animated-counter';

const stats = [
  { value: 15, suffix: '+', label: 'Schools Covered' },
  { value: 2000, suffix: '+', label: 'Students Reached' },
  { value: 8, suffix: '+', label: 'Workshop Topics' },
];

const outcomes = [
  'Leadership and public speaking workshops',
  'Menstrual hygiene awareness sessions',
  'Gender sensitivity and equality training',
  'Fundamental rights and legal literacy education',
];

const workshops = [
  { title: 'Leadership & Public Speaking', desc: 'Interactive sessions helping students build confidence, communication skills, and leadership qualities.', icon: Users },
  { title: 'Menstrual Hygiene Awareness', desc: 'Breaking taboos and spreading awareness about menstrual health and hygiene in schools.', icon: Heart },
  { title: 'Gender Sensitivity Training', desc: 'Workshops promoting gender equality, respect, and understanding among young students.', icon: Shield },
  { title: 'Fundamental Rights & Legal Literacy', desc: 'Educating students about their fundamental rights and basic legal knowledge every citizen should have.', icon: BookOpen },
];

export default function SchoolOutreachPage() {
  return (
    <div className="overflow-hidden">
      <section className="relative pt-32 pb-16">
        <div className="absolute inset-0 bg-grid opacity-20" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-[120px] animate-glow-pulse" />
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
            <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white mb-6 shadow-xl">
              <School className="h-10 w-10" />
            </div>
            <Badge variant="secondary" className="mb-3">School outreach & gender sensitivity</Badge>
            <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.1] tracking-tight mb-6">
              Children&apos;s Today, <span className="text-gradient-gold">Leaders Tomorrow</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl">
              A community outreach initiative bringing legal awareness, leadership training, menstrual hygiene education, and gender sensitivity workshops to school students across Rajasthan.
            </p>
            <Button asChild size="lg" className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold">
              <Link href="/contact?purpose=collaboration">
                Invite Us to Your School
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
            <Badge variant="outline" className="mb-4 border-emerald-500/30 text-emerald-500">Workshop Topics</Badge>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold mb-4">Our Workshop Modules</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">Four core workshop modules designed for school students of all ages.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {workshops.map((workshop) => (
              <div key={workshop.title} className="glass-card rounded-2xl p-6 hover:shadow-xl hover:shadow-emerald-500/10 transition-all hover:-translate-y-1">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500/15 to-teal-600/15 text-emerald-500 mb-4">
                  <workshop.icon className="h-7 w-7" />
                </div>
                <h3 className="font-heading text-lg font-bold mb-2">{workshop.title}</h3>
                <p className="text-sm text-muted-foreground">{workshop.desc}</p>
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
              <h2 className="font-heading text-3xl font-bold mb-6">Impact We Create</h2>
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
                <span className="font-heading font-semibold">Ranka Public Charitable Trust</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-3xl overflow-hidden glass-card p-12 md:p-20 text-center">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-gold/5" />
            <div className="relative z-10 max-w-2xl mx-auto">
              <School className="h-12 w-12 text-emerald-500 mx-auto mb-6" />
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">Want to Host a Workshop?</h2>
              <p className="text-muted-foreground mb-8">We partner with schools across Rajasthan to bring these workshops to your students. Get in touch to schedule a visit.</p>
              <Button asChild size="lg" className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold">
                <Link href="/contact?purpose=collaboration">Contact Us <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
