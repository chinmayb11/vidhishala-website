'use client';

import Link from 'next/link';
import { Library, ArrowRight, CheckCircle2, Handshake, Calendar, Users, Award, BookOpen, FileText, Scale } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AnimatedCounter } from '@/components/animated-counter';

const stats = [
  { value: 3, suffix: '', label: 'Editions Executed' },
  { value: 150, suffix: '+', label: 'Interns Trained' },
  { value: 500, suffix: '+', label: 'Texts Cataloged' },
];

const outcomes = [
  'Hands-on experience with legal databases and cataloging systems',
  'Mentorship from senior advocates and legal academicians',
  'Research publications in The Vidhi Gazette',
  'Certificate of completion and letter of recommendation',
];

const partners = ['Rajasthan Education Trust', 'C.L. Agrawal Memorial Library Trust'];

const curriculum = [
  { week: 'Week 1-2', title: 'Legal Research Fundamentals', desc: 'Introduction to legal databases, citation systems, and research methodology.' },
  { week: 'Week 3-4', title: 'Cataloging & Classification', desc: 'Practical training in cataloging legal texts using DDC and UDC systems.' },
  { week: 'Week 5-6', title: 'Doctrinal Research Project', desc: 'Independent research on assigned legal topics under faculty guidance.' },
  { week: 'Week 7-8', title: 'Publication & Review', desc: 'Drafting and refining research papers for potential publication in The Vidhi Gazette.' },
];

export default function LibraryInternshipPage() {
  return (
    <div className="overflow-hidden">
      <section className="relative pt-32 pb-16">
        <div className="absolute inset-0 bg-grid opacity-20" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold/10 rounded-full blur-[120px] animate-glow-pulse" />
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
            <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-gold to-amber-600 text-white mb-6 shadow-xl">
              <Library className="h-10 w-10" />
            </div>
            <Badge variant="secondary" className="mb-3">Practical legal research & cataloging</Badge>
            <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.1] tracking-tight mb-6">
              Library Internship <span className="text-gradient-gold">Program (LIP)</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl">
              A flagship internship program bridging the gap between academic legal education and practical legal research. Interns work with the C.L. Agrawal Memorial Library Trust and Rajasthan Education Trust to catalog legal texts, conduct doctrinal research, and produce publishable work.
            </p>
            <Button asChild size="lg" className="bg-gradient-to-r from-gold to-amber-600 text-navy font-semibold glow-gold">
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
              <Badge variant="outline" className="mb-4 border-indigo/30 text-indigo">Collaborating Partners</Badge>
              <h2 className="font-heading text-3xl font-bold mb-6">Our Partners</h2>
              <div className="space-y-4">
                {partners.map((partner) => (
                  <div key={partner} className="glass-card rounded-xl p-5 flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo/10 text-indigo">
                      <Handshake className="h-6 w-6" />
                    </div>
                    <span className="font-heading font-semibold">{partner}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4 border-gold/30 text-gold">Curriculum</Badge>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold mb-4">8-Week Program Structure</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {curriculum.map((item, i) => (
              <div key={item.title} className="glass-card rounded-2xl p-6 relative">
                <div className="absolute top-6 right-6 flex h-8 w-8 items-center justify-center rounded-full bg-gold/15 text-gold text-xs font-bold">
                  {i + 1}
                </div>
                <div className="text-xs text-primary font-semibold mb-2">{item.week}</div>
                <h3 className="font-heading text-lg font-bold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-3xl overflow-hidden glass-card p-12 md:p-20 text-center">
            <div className="absolute inset-0 bg-gradient-to-br from-gold/5 via-transparent to-indigo/5" />
            <div className="relative z-10 max-w-2xl mx-auto">
              <FileText className="h-12 w-12 text-gold mx-auto mb-6" />
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">Ready to Apply?</h2>
              <p className="text-muted-foreground mb-8">Start your journey with the Library Internship Program. Applications are open year-round.</p>
              <Button asChild size="lg" className="bg-gradient-to-r from-gold to-amber-600 text-navy font-semibold glow-gold">
                <Link href="/contact?purpose=internship">Apply Now <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
