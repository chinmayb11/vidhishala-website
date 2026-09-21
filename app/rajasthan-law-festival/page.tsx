'use client';

import { useState } from 'react';
import {
  Scale,
  Calendar,
  MapPin,
  Trophy,
  Users,
  Gavel,
  BookOpen,
  Download,
  ArrowRight,
  CheckCircle2,
  Clock,
  Award,
  Mic,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

const festivalModules = [
  {
    icon: Gavel,
    title: 'Moot Court Competitions',
    description:
      'Compete in simulated court proceedings judged by practicing advocates and sitting judges. Develop oral advocacy and legal reasoning skills.',
    features: ['Memorial submission', 'Oral rounds', 'Research memoranda', 'Best memorial award'],
  },
  {
    icon: Mic,
    title: 'Seminars & Guest Lectures',
    description:
      'Engage with Supreme Court and High Court judges, senior advocates, and legal luminaries in interactive seminar sessions.',
    features: ['Keynote addresses', 'Panel discussions', 'Q&A sessions', 'Networking opportunities'],
  },
  {
    icon: BookOpen,
    title: 'Policy Debates',
    description:
      'Participate in structured debates on contemporary legal and policy issues, judged by experts in the field.',
    features: ['Team debates', 'Individual motions', 'Research-backed arguments', 'Audience voting'],
  },
  {
    icon: Trophy,
    title: 'Awards & Recognition',
    description:
      'Outstanding participants receive awards, certificates, and recognition from the Vidhishala and partner organizations.',
    features: ['Best Advocate', 'Best Researcher', 'Best Memorial', 'Overall Championship'],
  },
];

const eventSchedule = [
  { time: '09:00 AM', title: 'Registration & Inauguration', desc: 'Welcome ceremony and keynote address' },
  { time: '11:00 AM', title: 'Moot Court Prelims', desc: 'Preliminary rounds of moot court competition' },
  { time: '02:00 PM', title: 'Seminar: Judicial Perspectives', desc: 'Guest lecture by sitting High Court judges' },
  { time: '04:00 PM', title: 'Policy Debate Quarterfinals', desc: 'Quarterfinal rounds of policy debates' },
  { time: '06:00 PM', title: 'Cultural Evening & Networking', desc: 'Cultural performances and networking dinner' },
];

const archives = [
  { year: '2024', title: 'RLF 2024: Justice in the Digital Era', participants: '500+', events: '12' },
  { year: '2023', title: 'RLF 2023: Environmental Law & Sustainability', participants: '350+', events: '10' },
  { year: '2022', title: 'RLF 2022: Constitutional Values & Rights', participants: '280+', events: '8' },
];

export default function RajasthanLawFestivalPage() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    institution: '',
    category: '',
    phone: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: 'Registration Submitted',
      description: 'We will contact you with festival details and payment instructions.',
    });
    setFormData({ name: '', email: '', institution: '', category: '', phone: '' });
  };

  return (
    <div className="overflow-hidden">
      {/* Hero */}
      <section className="relative pt-32 pb-20">
        <div className="absolute inset-0 bg-grid opacity-20" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo/15 rounded-full blur-[120px] animate-glow-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gold/15 rounded-full blur-[120px] animate-glow-pulse" style={{ animationDelay: '1s' }} />
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <Badge variant="outline" className="mb-6 border-indigo/30 text-indigo">
              In collaboration with Ranka Public Charitable Trust
            </Badge>
            <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight mb-6">
              The Rajasthan
              <br />
              <span className="text-gradient-gold">Law Festival</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl">
              India&apos;s premier socio-legal festival. A convergence of legal
              minds, aspiring advocates, and distinguished jurists celebrating
              the spirit of law and justice.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="bg-gradient-to-r from-gold to-amber-600 text-navy font-semibold glow-gold">
                Register Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" className="glass-card">
                <Download className="mr-2 h-4 w-4" />
                Download Prospectus
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Info Bar */}
      <section className="py-8 border-y border-border/30">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: Calendar, label: 'Dates', value: 'TBA 2026' },
              { icon: MapPin, label: 'Venue', value: 'Jaipur, Rajasthan' },
              { icon: Users, label: 'Expected Participants', value: '500+' },
              { icon: Award, label: 'Partner', value: 'Ranka Charitable Trust' },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <item.icon className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-xs text-muted-foreground uppercase tracking-wider">{item.label}</div>
                  <div className="text-sm font-semibold">{item.value}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Festival Modules */}
      <section className="py-20">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4 border-gold/30 text-gold">Festival Modules</Badge>
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              What Awaits You
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Four core modules designed to challenge, inspire, and celebrate
              legal excellence.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {festivalModules.map((mod) => (
              <Card key={mod.title} className="glass-card hover:shadow-xl hover:shadow-indigo/10 transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-8">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo to-violet-600 text-white shrink-0">
                      <mod.icon className="h-7 w-7" />
                    </div>
                    <div>
                      <h3 className="font-heading text-xl font-bold mb-2">{mod.title}</h3>
                      <p className="text-sm text-muted-foreground">{mod.description}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 mt-4">
                    {mod.features.map((feat) => (
                      <div key={feat} className="flex items-center gap-2 text-xs text-muted-foreground">
                        <CheckCircle2 className="h-3 w-3 text-primary" />
                        {feat}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Event Schedule */}
      <section className="py-20">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4 border-indigo/30 text-indigo">Schedule</Badge>
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              Festival Day Schedule
            </h2>
          </div>
          <div className="max-w-3xl mx-auto">
            <div className="relative">
              <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-border" />
              {eventSchedule.map((event, i) => (
                <div
                  key={event.title}
                  className={`relative flex items-start gap-6 mb-8 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                >
                  <div className="absolute left-4 md:left-1/2 -translate-x-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-gold to-amber-600 text-navy z-10">
                    <Clock className="h-4 w-4" />
                  </div>
                  <div className={`flex-1 pl-12 md:pl-0 ${i % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
                    <Card className="glass-card">
                      <CardContent className="p-5">
                        <div className="text-xs text-primary font-semibold mb-1">{event.time}</div>
                        <h3 className="font-heading font-semibold mb-1">{event.title}</h3>
                        <p className="text-sm text-muted-foreground">{event.desc}</p>
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

      {/* Event Archives */}
      <section className="py-20">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4 border-gold/30 text-gold">Archives</Badge>
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              Past Editions
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {archives.map((archive) => (
              <Card key={archive.year} className="glass-card hover:shadow-lg transition-all group">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-heading text-3xl font-bold text-gradient-gold">{archive.year}</span>
                    <Trophy className="h-6 w-6 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                  <h3 className="font-heading text-lg font-semibold mb-3">{archive.title}</h3>
                  <div className="flex gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1"><Users className="h-3 w-3" /> {archive.participants}</span>
                    <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {archive.events} events</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Registration Form */}
      <section className="py-20">
        <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Card className="glass-card overflow-hidden">
            <CardContent className="p-8 md:p-12">
              <div className="text-center mb-8">
                <Badge variant="outline" className="mb-4 border-indigo/30 text-indigo">Live Registration</Badge>
                <h2 className="font-heading text-3xl md:text-4xl font-bold mb-2">
                  Register for RLF 2026
                </h2>
                <p className="text-muted-foreground">
                  Secure your spot at the Rajasthan Law Festival.
                </p>
              </div>
              <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter your name"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="you@example.com"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="institution">Institution</Label>
                  <Input
                    id="institution"
                    required
                    value={formData.institution}
                    onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                    placeholder="Your college / university"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 ..."
                    className="mt-1"
                  />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="category">Participation Category</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(v) => setFormData({ ...formData, category: v })}
                  >
                    <SelectTrigger id="category" className="mt-1">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="moot">Moot Court Competition</SelectItem>
                      <SelectItem value="debate">Policy Debate</SelectItem>
                      <SelectItem value="seminar">Seminar Attendee</SelectItem>
                      <SelectItem value="all">Full Festival Pass</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="md:col-span-2 mt-4">
                  <Button type="submit" size="lg" className="w-full bg-gradient-to-r from-gold to-amber-600 text-navy font-semibold glow-gold">
                    Submit Registration
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
