'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Scale, ArrowRight, Calendar, Award, Sparkles, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const languages = [
  { text: 'विधिशाला', lang: 'Hindi', font: 'font-serif-display' },
  { text: 'विधिशाला', lang: 'Sanskrit', font: 'font-serif-display' },
  { text: 'Vidhishala', lang: 'English', font: 'font-heading' },
];

export default function HomePage() {
  const [langIndex, setLangIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setLangIndex((prev) => (prev + 1) % languages.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="overflow-hidden">
      {/* Hero with Video Background */}
      <section className="relative min-h-screen flex items-center justify-center">
        {/* Video Background */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="h-full w-full object-cover"
            poster="https://images.pexels.com/photos/5668772/pexels-photo-5668772.jpeg?auto=compress&cs=tinysrgb&w=1920"
          >
            <source src="/hero-background.mp4" type="video/mp4" />
          </video>
          {/* Dark overlay for readability */}
          <div className="absolute inset-0 bg-background/80" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/70 to-background" />
        </div>

        {/* Content */}
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 pt-20">
          <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-8 animate-fade-up">
              <Award className="h-4 w-4 text-gold" />
              <span className="text-xs font-medium tracking-wide">
                Ranked in Top 100 Indian Law Blogs by Feedspot (2021)
              </span>
              <Sparkles className="h-3 w-3 text-gold animate-glow-pulse" />
            </div>

            {/* Tri-lingual Vidhishala Display */}
            <div className="relative h-24 sm:h-32 md:h-40 mb-4 flex items-center justify-center w-full">
              {languages.map((lang, i) => (
                <div
                  key={lang.lang}
                  className={`absolute transition-all duration-700 ${lang.font} text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-wide ${
                    i === langIndex
                      ? 'opacity-100 translate-y-0 scale-100 text-gradient-gold'
                      : i === (langIndex + 1) % languages.length
                      ? 'opacity-0 translate-y-8 scale-95 text-muted-foreground'
                      : 'opacity-0 -translate-y-8 scale-95 text-muted-foreground'
                  }`}
                >
                  {lang.text}
                </div>
              ))}
            </div>

            {/* Language indicator */}
            <div className="flex gap-2 mb-6">
              {languages.map((lang, i) => (
                <div
                  key={lang.lang}
                  className={`h-1.5 rounded-full transition-all duration-500 ${
                    i === langIndex ? 'w-8 bg-gold' : 'w-4 bg-muted-foreground/30'
                  }`}
                />
              ))}
            </div>

            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mb-8 animate-fade-up" style={{ animationDelay: '0.2s' }}>
              A registered socio-legal organization under The Rajasthan
              Societies Registration Act, 1958. We bridge legal education,
              research, and community impact through innovative programs and
              publications.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center gap-4 animate-fade-up" style={{ animationDelay: '0.3s' }}>
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-gold to-amber-600 text-navy font-semibold glow-gold glow-gold-hover transition-all"
              >
                <Link href="/contact?purpose=internship">
                  Apply for Internship
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="glass-card">
                <Link href="/rajasthan-law-festival">
                  <Calendar className="mr-2 h-4 w-4" />
                  Rajasthan Law Festival
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 hidden md:flex flex-col items-center gap-2 text-muted-foreground animate-fade-up" style={{ animationDelay: '0.5s' }}>
          <span className="text-xs uppercase tracking-widest">Scroll to explore</span>
          <ChevronDown className="h-4 w-4 animate-bounce" />
        </div>
      </section>

      {/* Quick Navigation Cards */}
      <section className="py-20 relative">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4 border-gold/30 text-gold">Explore</Badge>
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              Discover Vidhishala
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Navigate to our key programs, publications, and initiatives.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: 'Library Internship Program', desc: 'Practical legal research & cataloging', href: '/programs/library-internship', icon: '📚' },
              { title: 'Hybrid Mode Internship', desc: 'Blended learning with Lloyd University', href: '/programs/hybrid-internship', icon: '🎓' },
              { title: 'School Outreach', desc: 'Leadership & legal literacy in schools', href: '/programs/school-outreach', icon: '🏫' },
              { title: 'The Vidhi Gazette', desc: 'Peer-reviewed legal publications', href: '/vidhi-gazette', icon: '📄' },
              { title: 'Rajasthan Law Festival', desc: 'India\'s premier socio-legal festival', href: '/rajasthan-law-festival', icon: '⚖️' },
              { title: 'Resources & References', desc: 'Bare acts, guides, and research tools', href: '/resources', icon: '📖' },
            ].map((card) => (
              <Link href={card.href} key={card.title} className="group">
                <div className="glass-card rounded-2xl p-6 h-full hover:shadow-xl hover:shadow-gold/10 transition-all duration-300 hover:-translate-y-1">
                  <div className="flex items-center gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-gold/15 to-indigo/15 text-2xl shrink-0">
                      {card.icon}
                    </div>
                    <div className="text-left">
                      <h3 className="font-heading text-lg font-bold mb-1 group-hover:text-primary transition-colors">
                        {card.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">{card.desc}</p>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center text-sm font-medium text-primary group-hover:gap-2 transition-all">
                    Learn more
                    <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* About Preview */}
      <section className="py-20">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-3xl overflow-hidden glass-card p-8 md:p-16">
            <div className="absolute top-0 right-0 w-96 h-96 bg-gold/10 rounded-full blur-[100px]" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo/10 rounded-full blur-[100px]" />
            <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <Badge variant="outline" className="mb-4 border-gold/30 text-gold">About Us</Badge>
                <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
                  Empowering Legal Minds Since 2020
                </h2>
                <p className="text-muted-foreground mb-6">
                  Vidhishala Foundation is a registered socio-legal organization
                  driving legal education, research, and societal transformation
                  across Rajasthan and India. Through our internship programs,
                  publications, and community outreach, we bridge the gap
                  between legal theory and practice.
                </p>
                <Button asChild className="bg-gradient-to-r from-gold to-amber-600 text-navy font-semibold glow-gold">
                  <Link href="/about">
                    Learn More About Us
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
              <div className="relative">
                <div className="aspect-square max-w-md mx-auto relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-gold/20 to-indigo/20 rounded-3xl blur-2xl animate-glow-pulse" />
                  <div className="relative glass-card rounded-3xl p-8 h-full flex items-center justify-center">
                    <div className="text-center">
                      <div className="flex h-24 w-24 mx-auto items-center justify-center rounded-full bg-gradient-to-br from-gold to-amber-600 text-navy mb-4 animate-float">
                        <Scale className="h-12 w-12" strokeWidth={1.5} />
                      </div>
                      <p className="font-serif-display text-xl italic text-muted-foreground">
                        &ldquo;Justice is the constant and perpetual will to render to each his due.&rdquo;
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-3xl overflow-hidden glass-card p-12 md:p-20 text-center">
            <div className="absolute inset-0 bg-gradient-to-br from-gold/5 via-transparent to-indigo/5" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-gold/10 rounded-full blur-[100px]" />
            <div className="relative z-10 max-w-2xl mx-auto">
              <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
                Join Our Legal Community
              </h2>
              <p className="text-muted-foreground mb-8">
                Whether you&apos;re a student, academician, or legal professional, there&apos;s a place for you at Vidhishala Foundation.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button asChild size="lg" className="bg-gradient-to-r from-gold to-amber-600 text-navy font-semibold glow-gold">
                  <Link href="/contact?purpose=internship">
                    Apply for Internship
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="glass-card">
                  <Link href="/contact">Get in Touch</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
