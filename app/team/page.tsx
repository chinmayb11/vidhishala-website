'use client';

import {
  Gavel,
  GraduationCap,
  Users,
  BookOpen,
  Mail,
  Linkedin,
  Scale,
  Award,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const categories = [
  {
    id: 'advisory',
    label: 'Advisory Board',
    icon: Gavel,
    description: 'Distinguished judges and senior academicians guiding our mission.',
    members: [
      { name: 'Hon\'ble Justice (Retd.) R.K. Sharma', role: 'Former Judge, Rajasthan High Court', expertise: 'Constitutional Law' },
      { name: 'Hon\'ble Justice (Retd.) Sunita Agarwal', role: 'Former Judge, Rajasthan High Court', expertise: 'Family Law' },
      { name: 'Prof. (Dr.) Mahesh Bhalla', role: 'Dean, NLU Jodhpur', expertise: 'Jurisprudence' },
      { name: 'Prof. (Dr.) Rekha Sharma', role: 'Head of Law, University of Rajasthan', expertise: 'Commercial Law' },
    ],
  },
  {
    id: 'governing',
    label: 'Governing Body',
    icon: Scale,
    description: 'The leadership council responsible for strategic direction.',
    members: [
      { name: 'Adv. Vikram Ranka', role: 'President & Founder', expertise: 'Corporate Litigation' },
      { name: 'Adv. Priya Sharma', role: 'Vice President', expertise: 'Criminal Defense' },
      { name: 'CA. Anand Agarwal', role: 'Treasurer', expertise: 'Tax & Finance Law' },
      { name: 'Dr. Neha Joshi', role: 'Secretary', expertise: 'Academic Research' },
    ],
  },
  {
    id: 'executive',
    label: 'Executive Leads',
    icon: Users,
    description: 'Day-to-day operations and program management.',
    members: [
      { name: 'Rahul Mehta', role: 'Program Director, LIP', expertise: 'Legal Research' },
      { name: 'Sneha Pareek', role: 'Festival Coordinator, RLF', expertise: 'Event Management' },
      { name: 'Karan Singh', role: 'Editor-in-Chief, Vidhi Gazette', expertise: 'Legal Writing' },
      { name: 'Anjali Nair', role: 'Outreach Head', expertise: 'Community Engagement' },
    ],
  },
  {
    id: 'editors',
    label: 'Student Editorial Team',
    icon: BookOpen,
    description: 'Emerging legal scholars driving our publications.',
    members: [
      { name: 'Aditya Verma', role: 'Senior Editor', expertise: 'Constitutional Law' },
      { name: 'Tanya Kapoor', role: 'Associate Editor', expertise: 'Environmental Law' },
      { name: 'Rohit Jain', role: 'Research Editor', expertise: 'Criminal Law' },
      { name: 'Ishita Gupta', role: 'Copy Editor', expertise: 'Citation & Formatting' },
    ],
  },
];

export default function TeamPage() {
  return (
    <div className="overflow-hidden">
      {/* Hero */}
      <section className="relative pt-32 pb-16">
        <div className="absolute inset-0 bg-grid opacity-20" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo/10 rounded-full blur-[120px] animate-glow-pulse" />
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <Badge variant="outline" className="mb-6 border-gold/30 text-gold">Our People</Badge>
            <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight mb-6">
              Team & <span className="text-gradient-gold">Leadership</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl">
              The minds behind Vidhishala Foundation — a diverse team of
              jurists, academicians, advocates, and students united by a shared
              commitment to legal excellence.
            </p>
          </div>
        </div>
      </section>

      {/* Team Categories */}
      {categories.map((cat) => (
        <section key={cat.id} className="py-12">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-4 mb-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-gold to-amber-600 text-navy">
                <cat.icon className="h-6 w-6" />
              </div>
              <div>
                <h2 className="font-heading text-2xl md:text-3xl font-bold">{cat.label}</h2>
                <p className="text-sm text-muted-foreground">{cat.description}</p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {cat.members.map((member) => (
                <Card key={member.name} className="glass-card hover:shadow-xl hover:shadow-gold/10 transition-all duration-300 hover:-translate-y-1 group">
                  <CardContent className="p-6 text-center">
                    <div className="relative mx-auto mb-4">
                      <div className="absolute inset-0 bg-gradient-to-br from-gold/20 to-indigo/20 rounded-full blur-md group-hover:opacity-100 opacity-0 transition-opacity" />
                      <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-navy to-navy-light text-primary font-heading text-2xl font-bold border-2 border-gold/30">
                        {member.name.split(' ').map(n => n[0]).slice(0, 2).join('')}
                      </div>
                    </div>
                    <h3 className="font-heading font-semibold text-sm mb-1">{member.name}</h3>
                    <p className="text-xs text-primary mb-2">{member.role}</p>
                    <Badge variant="secondary" className="text-xs">{member.expertise}</Badge>
                    <div className="flex items-center justify-center gap-2 mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="flex h-7 w-7 items-center justify-center rounded-full bg-muted hover:bg-primary hover:text-white transition-all">
                        <Mail className="h-3 w-3" />
                      </button>
                      <button className="flex h-7 w-7 items-center justify-center rounded-full bg-muted hover:bg-primary hover:text-white transition-all">
                        <Linkedin className="h-3 w-3" />
                      </button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* Join Us CTA */}
      <section className="py-20">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-3xl overflow-hidden glass-card p-12 md:p-16 text-center">
            <div className="absolute inset-0 bg-gradient-to-br from-gold/5 via-transparent to-indigo/5" />
            <div className="relative z-10 max-w-2xl mx-auto">
              <GraduationCap className="h-12 w-12 text-gold mx-auto mb-6" />
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
                Join Our Team
              </h2>
              <p className="text-muted-foreground mb-8">
                We are always looking for passionate legal minds to join our
                advisory board, editorial team, or executive committee.
              </p>
              <a
                href="/contact?purpose=general"
                className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-lg bg-gradient-to-r from-gold to-amber-600 text-navy font-semibold glow-gold transition-all hover:shadow-lg hover:shadow-gold/30"
              >
                <Award className="h-4 w-4" />
                Get in Touch
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
