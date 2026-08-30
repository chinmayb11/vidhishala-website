'use client';

import Link from 'next/link';
import {
  Library,
  GraduationCap,
  School,
  Handshake,
  ArrowRight,
  CheckCircle2,
  Calendar,
  Users,
  Award,
  BookOpen,
  FileText,
  Scale,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AnimatedCounter } from '@/components/animated-counter';

const programs = [
  {
    id: 'lip',
    icon: Library,
    title: 'Library Internship Program (LIP)',
    tagline: 'Practical legal research & cataloging',
    description:
      'A flagship internship program bridging the gap between academic legal education and practical legal research. Interns work with the C.L. Agrawal Memorial Library Trust and Rajasthan Education Trust to catalog legal texts, conduct doctrinal research, and produce publishable work.',
    stats: [
      { value: 3, suffix: '', label: 'Editions Executed' },
      { value: 150, suffix: '+', label: 'Interns Trained' },
      { value: 500, suffix: '+', label: 'Texts Cataloged' },
    ],
    outcomes: [
      'Hands-on experience with legal databases and cataloging systems',
      'Mentorship from senior advocates and legal academicians',
      'Research publications in The Vidhi Gazette',
      'Certificate of completion and letter of recommendation',
    ],
    partners: ['Rajasthan Education Trust', 'C.L. Agrawal Memorial Library Trust'],
    color: 'from-gold to-amber-600',
  },
  {
    id: 'hybrid',
    icon: GraduationCap,
    title: 'Hybrid Mode Internship',
    tagline: 'In collaboration with Lloyd University, Noida',
    description:
      'A blended-learning internship combining online modules with on-site training sessions. Designed for law students across India who want to gain practical exposure without relocating full-time.',
    stats: [
      { value: 2, suffix: '', label: 'Cohorts Per Year' },
      { value: 200, suffix: '+', label: 'Participants' },
      { value: 8, suffix: ' wks', label: 'Duration' },
    ],
    outcomes: [
      'Online legal research methodology modules',
      'Weekly virtual mentorship sessions',
      'On-site court visits and observation',
      'Collaborative research project with Lloyd University faculty',
    ],
    partners: ['Lloyd University, Noida'],
    color: 'from-indigo to-violet-600',
  },
  {
    id: 'school-outreach',
    icon: School,
    title: "Children's Today, Leaders Tomorrow",
    tagline: 'School outreach on leadership & sensitivity',
    description:
      'A community outreach initiative bringing legal awareness, leadership training, menstrual hygiene education, and gender sensitivity workshops to school students across Rajasthan.',
    stats: [
      { value: 15, suffix: '+', label: 'Schools Covered' },
      { value: 2000, suffix: '+', label: 'Students Reached' },
      { value: 8, suffix: '+', label: 'Workshop Topics' },
    ],
    outcomes: [
      'Leadership and public speaking workshops',
      'Menstrual hygiene awareness sessions',
      'Gender sensitivity and equality training',
      'Fundamental rights and legal literacy education',
    ],
    partners: ['Ranka Public Charitable Trust'],
    color: 'from-emerald-500 to-teal-600',
  },
];

const mous = [
  { name: 'Lloyd University, Noida', field: 'Legal Education' },
  { name: 'Rajasthan Education Trust', field: 'Library Research' },
  { name: 'C.L. Agrawal Memorial Library Trust', field: 'Cataloging & Archives' },
  { name: 'Ranka Public Charitable Trust', field: 'Festival & Outreach' },
  { name: 'National Law University, Jodhpur', field: 'Research Collaboration' },
  { name: 'University of Rajasthan', field: 'Academic Partnership' },
  { name: 'MLSU, Udaipur', field: 'Student Exchange' },
];

export default function ProgramsPage() {
  return (
    <div className="overflow-hidden">
      {/* Hero */}
      <section className="relative pt-32 pb-16">
        <div className="absolute inset-0 bg-grid opacity-20" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold/10 rounded-full blur-[120px] animate-glow-pulse" />
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <Badge variant="outline" className="mb-6 border-gold/30 text-gold">Our Work</Badge>
            <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight mb-6">
              Programs & <span className="text-gradient-gold">Initiatives</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl">
              From legal research internships to school outreach and strategic
              educational partnerships, our programs create tangible impact
              across the legal education landscape.
            </p>
          </div>
        </div>
      </section>

      {/* Program Sections */}
      {programs.map((program, idx) => (
        <section key={program.id} id={program.id} className="py-16 scroll-mt-20">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${idx % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
              {/* Content */}
              <div className={idx % 2 === 1 ? 'lg:order-2' : ''}>
                <div className={`inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${program.color} text-white mb-6`}>
                  <program.icon className="h-8 w-8" />
                </div>
                <Badge variant="secondary" className="mb-3">{program.tagline}</Badge>
                <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">{program.title}</h2>
                <p className="text-muted-foreground mb-6">{program.description}</p>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                  {program.stats.map((stat) => (
                    <div key={stat.label} className="glass-card rounded-xl p-4 text-center">
                      <div className="font-heading text-2xl font-bold text-primary">
                        <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
                    </div>
                  ))}
                </div>

                {/* Outcomes */}
                <div className="space-y-2 mb-6">
                  {program.outcomes.map((outcome) => (
                    <div key={outcome} className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                      <span className="text-muted-foreground">{outcome}</span>
                    </div>
                  ))}
                </div>

                {/* Partners */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {program.partners.map((partner) => (
                    <Badge key={partner} variant="outline" className="border-primary/30">
                      <Handshake className="h-3 w-3 mr-1" />
                      {partner}
                    </Badge>
                  ))}
                </div>

                <Button asChild className="bg-gradient-to-r from-gold to-amber-600 text-navy font-semibold glow-gold">
                  <Link href="/contact?purpose=internship">
                    Apply for this Program
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>

              {/* Visual */}
              <div className={idx % 2 === 1 ? 'lg:order-1' : ''}>
                <div className="relative">
                  <div className={`absolute inset-0 bg-gradient-to-br ${program.color} opacity-10 rounded-3xl blur-2xl`} />
                  <Card className="glass-card relative overflow-hidden">
                    <CardContent className="p-8">
                      <div className="flex items-center justify-center h-64 relative">
                        <div className={`flex h-32 w-32 items-center justify-center rounded-full bg-gradient-to-br ${program.color} text-white animate-float`}>
                          <program.icon className="h-16 w-16" strokeWidth={1.5} />
                        </div>
                        <div className="absolute top-4 left-4 flex items-center gap-2 text-xs text-muted-foreground">
                          <Calendar className="h-3 w-3" />
                          Ongoing
                        </div>
                        <div className="absolute bottom-4 right-4 flex items-center gap-2 text-xs text-muted-foreground">
                          <Users className="h-3 w-3" />
                          Open for Applications
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* MOUs Section */}
      <section id="mous" className="py-20 scroll-mt-20">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4 border-indigo/30 text-indigo">Partnerships</Badge>
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              Strategic Educational MOUs
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
              We have signed Memorandums of Understanding with{' '}
              <span className="font-semibold text-primary">7 institutions</span>{' '}
              across India to further legal education and research.
            </p>
            <div className="inline-flex items-center gap-3 glass-card rounded-2xl px-8 py-4 mb-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-indigo to-violet-600 text-white">
                <Handshake className="h-6 w-6" />
              </div>
              <div>
                <div className="font-heading text-3xl font-bold">
                  <AnimatedCounter end={7} suffix="+" />
                </div>
                <div className="text-xs text-muted-foreground">Institutional Partners</div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mous.map((mou) => (
              <Card key={mou.name} className="glass-card hover:shadow-lg transition-all group">
                <CardContent className="p-5 flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo/10 text-indigo group-hover:bg-indigo group-hover:text-white transition-all">
                    <Scale className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="font-heading font-semibold text-sm">{mou.name}</div>
                    <div className="text-xs text-muted-foreground">{mou.field}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-3xl overflow-hidden glass-card p-12 md:p-20 text-center">
            <div className="absolute inset-0 bg-gradient-to-br from-gold/5 via-transparent to-indigo/5" />
            <div className="relative z-10 max-w-2xl mx-auto">
              <FileText className="h-12 w-12 text-gold mx-auto mb-6" />
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
                Ready to Apply?
              </h2>
              <p className="text-muted-foreground mb-8">
                Start your journey with Vidhishala Foundation. Applications are
                open for all programs.
              </p>
              <Button asChild size="lg" className="bg-gradient-to-r from-gold to-amber-600 text-navy font-semibold glow-gold">
                <Link href="/contact?purpose=internship">
                  Apply Now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
