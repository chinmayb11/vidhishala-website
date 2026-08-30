'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  MapPin,
  Mail,
  Phone,
  Send,
  User,
  Building2,
  MessageSquare,
  Scale,
  Clock,
  CheckCircle2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

const purposes = [
  { value: 'internship', label: 'Internship Application' },
  { value: 'event', label: 'Event Registration' },
  { value: 'legal-aid', label: 'Legal Aid Request' },
  { value: 'mou', label: 'Institutional MOU' },
  { value: 'general', label: 'General Inquiry' },
];

function ContactContent() {
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const [purpose, setPurpose] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    organization: '',
    message: '',
  });

  useEffect(() => {
    const purposeParam = searchParams.get('purpose');
    if (purposeParam && purposes.find((p) => p.value === purposeParam)) {
      setPurpose(purposeParam);
    }
  }, [searchParams]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: 'Inquiry Submitted',
      description: 'We will respond to your inquiry within 2-3 business days.',
    });
    setFormData({ name: '', email: '', phone: '', organization: '', message: '' });
    setPurpose('');
  };

  return (
    <div className="overflow-hidden">
      {/* Hero */}
      <section className="relative pt-32 pb-16">
        <div className="absolute inset-0 bg-grid opacity-20" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo/10 rounded-full blur-[120px] animate-glow-pulse" />
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <Badge variant="outline" className="mb-6 border-indigo/30 text-indigo">Get in Touch</Badge>
            <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight mb-6">
              Contact & <span className="text-gradient-gold">Legal Aid Portal</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl">
              Reach out for internship applications, event registrations, legal
              aid requests, institutional partnerships, or general inquiries.
            </p>
          </div>
        </div>
      </section>

      {/* Split Container */}
      <section className="py-12">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left: Office Info & Map */}
            <div className="space-y-6">
              <Card className="glass-card">
                <CardContent className="p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-gold to-amber-600 text-navy">
                      <Building2 className="h-6 w-6" />
                    </div>
                    <div>
                      <h2 className="font-heading text-xl font-bold">Registered Office</h2>
                      <p className="text-sm text-muted-foreground">Vidhishala Foundation</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <MapPin className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                      <div>
                        <div className="text-sm font-medium">Address</div>
                        <div className="text-sm text-muted-foreground">
                          D-152-A, Durga Marg, Banipark,<br />
                          Jaipur, Rajasthan 302016 (India)
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Mail className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                      <div>
                        <div className="text-sm font-medium">Email</div>
                        <div className="text-sm text-muted-foreground">contact@vidhishala.org</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Phone className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                      <div>
                        <div className="text-sm font-medium">Phone</div>
                        <div className="text-sm text-muted-foreground">+91 141 220 1520</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Clock className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                      <div>
                        <div className="text-sm font-medium">Office Hours</div>
                        <div className="text-sm text-muted-foreground">Mon - Fri: 10:00 AM - 6:00 PM IST</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Map */}
              <Card className="glass-card overflow-hidden">
                <CardContent className="p-0">
                  <div className="relative aspect-[4/3] bg-navy rounded-lg overflow-hidden">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3559.783123456789!2d75.7879!3d26.9124!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396db5d5b%3A0x0!2sBanipark%2C%20Jaipur%2C%20Rajasthan%20302016!5e0!3m2!1sen!2sin!4v1700000000000"
                      width="100%"
                      height="100%"
                      style={{ border: 0, filter: 'grayscale(0.3) invert(0.9)' }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Vidhishala Foundation Office Location"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Legal Aid Notice */}
              <Card className="glass-card border-gold/20">
                <CardContent className="p-6">
                  <div className="flex items-start gap-3">
                    <Scale className="h-5 w-5 text-gold mt-0.5 shrink-0" />
                    <div>
                      <h3 className="font-heading font-semibold text-sm mb-1">Legal Aid Portal</h3>
                      <p className="text-xs text-muted-foreground">
                        Select &ldquo;Legal Aid Request&rdquo; in the form if you
                        require legal assistance. Our team will connect you with
                        appropriate resources and counsel.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right: Inquiry Form */}
            <div>
              <Card className="glass-card">
                <CardContent className="p-8">
                  <h2 className="font-heading text-2xl font-bold mb-2">Send Us a Message</h2>
                  <p className="text-sm text-muted-foreground mb-6">
                    Fill out the form below and we&apos;ll get back to you as soon as possible.
                  </p>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Purpose Selector */}
                    <div>
                      <Label htmlFor="purpose">Inquiry Purpose</Label>
                      <Select value={purpose} onValueChange={setPurpose}>
                        <SelectTrigger id="purpose" className="mt-1">
                          <SelectValue placeholder="Select purpose" />
                        </SelectTrigger>
                        <SelectContent>
                          {purposes.map((p) => (
                            <SelectItem key={p.value} value={p.value}>{p.label}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Full Name</Label>
                        <div className="relative mt-1">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="name"
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            placeholder="Your name"
                            className="pl-10"
                          />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="email">Email Address</Label>
                        <div className="relative mt-1">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="email"
                            type="email"
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            placeholder="you@example.com"
                            className="pl-10"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                      <div>
                        <Label htmlFor="organization">Organization / Institution</Label>
                        <Input
                          id="organization"
                          value={formData.organization}
                          onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                          placeholder="Your institution (optional)"
                          className="mt-1"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="message">Message</Label>
                      <Textarea
                        id="message"
                        required
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Tell us about your inquiry..."
                        className="mt-1 min-h-[120px]"
                      />
                    </div>

                    <Button type="submit" size="lg" className="w-full bg-gradient-to-r from-gold to-amber-600 text-navy font-semibold glow-gold">
                      <Send className="mr-2 h-4 w-4" />
                      Submit Inquiry
                    </Button>
                  </form>

                  {/* Quick info badges */}
                  <div className="mt-6 pt-6 border-t border-border/40">
                    <div className="flex flex-wrap gap-2">
                      {purposes.map((p) => (
                        <button
                          key={p.value}
                          onClick={() => setPurpose(p.value)}
                          className={`text-xs px-3 py-1.5 rounded-full transition-all ${
                            purpose === p.value
                              ? 'bg-gradient-to-r from-gold to-amber-600 text-navy'
                              : 'glass-card hover:border-primary/30'
                          }`}
                        >
                          {p.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default function ContactPage() {
  return (
    <Suspense fallback={<div className="pt-32" />}>
      <ContactContent />
    </Suspense>
  );
}
