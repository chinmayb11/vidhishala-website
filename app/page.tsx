'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Scale, ArrowRight, CalendarDays, Clock3, FileText, MapPin, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function HomePage() {
  return (
    <div className="overflow-hidden">
      {/* Hero video */}
      <section className="relative flex min-h-[100svh] w-full items-center justify-center overflow-hidden bg-[#1C1C1C]">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/smallscreen_background.webp"
          controls={false}
          disablePictureInPicture
          disableRemotePlayback
          className="absolute inset-0 h-full w-full object-cover object-center"
          aria-label="Vidhishala introduction"
        >
          <source src="/hero-background.mp4" type="video/mp4" />
        </video>
        <div className="pointer-events-none absolute inset-0 bg-black/10" />
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

      {/* Featured upcoming event */}
      <section id="latest-events" className="py-12 sm:py-16">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 max-w-2xl">
            <Badge variant="outline" className="mb-4 border-gold/30 text-gold">Upcoming event</Badge>
            <h2 className="font-heading text-3xl font-bold sm:text-4xl">The latest from Vidhishala</h2>
            <p className="mt-3 text-muted-foreground">
              A closer look at the opportunities and events shaping our legal community.
            </p>
          </div>

          <div className="overflow-hidden rounded-2xl border border-[#D9D0C7] bg-white shadow-[0_24px_70px_rgba(74,8,8,0.10)] dark:border-[#B08D57]/30 dark:bg-[#1C1C1C]">
            <div className="grid md:grid-cols-[minmax(260px,0.85fr)_1.15fr]">
              <div className="relative aspect-[4/5] min-h-[420px] bg-[#E8EFED] p-3 sm:p-5 md:aspect-auto md:min-h-[600px]">
                <Image
                  src="/new%20events/WhatsApp%20Image%202026-10-08%20at%2011.43.10%20AM.jpeg"
                  alt="KSLW Fourth Moot Court Training Workshop, November 2-3, 2026"
                  fill
                  sizes="(max-width: 1023px) 100vw, 42vw"
                  className="object-contain p-3 sm:p-5"
                />
              </div>

              <article className="flex flex-col justify-center p-6 sm:p-9 lg:p-12">
                <div className="mb-5 flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-[#7A0C0C]/[0.07] px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-[#7A0C0C] dark:bg-[#B08D57]/15 dark:text-[#D7B879]">
                    <Sparkles className="h-3.5 w-3.5" /> Moot court training
                  </span>
                  <span className="rounded-full border border-[#B08D57]/50 px-3 py-1.5 text-xs font-semibold text-[#7A0C0C] dark:text-[#D7B879]">
                    Limited seats
                  </span>
                </div>

                <h3 className="font-heading text-3xl font-bold leading-tight text-[#1C1C1C] dark:text-[#F8F5F3] sm:text-4xl">
                  KSLW Fourth Moot Court Training Workshop
                </h3>
                <p className="mt-4 text-base leading-7 text-[#6B6B6B] dark:text-[#D9D0C7]">
                  Join the Moot Court Club under the aegis of Kanoria School of Law for Women, Jaipur, for an online workshop designed to build practical mooting and advocacy skills.
                </p>

                <div className="my-7 grid gap-4 border-y border-[#D9D0C7] py-5 dark:border-[#B08D57]/25 sm:grid-cols-2">
                  <div className="flex items-start gap-3">
                    <CalendarDays className="mt-0.5 h-5 w-5 shrink-0 text-[#B08D57]" />
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-[#6B6B6B]">Dates</p>
                      <p className="mt-1 font-semibold text-[#1C1C1C] dark:text-[#F8F5F3]">November 2-3, 2026</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-[#B08D57]" />
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-[#6B6B6B]">Format</p>
                      <p className="mt-1 font-semibold text-[#1C1C1C] dark:text-[#F8F5F3]">Online</p>
                    </div>
                  </div>
                </div>

                <h4 className="font-heading text-lg font-bold text-[#4A0808] dark:text-[#D7B879]">A practical two-day programme</h4>
                <ul className="mt-3 space-y-2 text-sm leading-6 text-[#6B6B6B] dark:text-[#D9D0C7]">
                  <li className="flex gap-2"><Clock3 className="mt-1 h-4 w-4 shrink-0 text-[#B08D57]" />Fundamentals of mooting, argumentation skills, and courtroom etiquette</li>
                  <li className="flex gap-2"><Clock3 className="mt-1 h-4 w-4 shrink-0 text-[#B08D57]" />Mooting research, memorial drafting, and compendium formulation</li>
                </ul>
              </article>
            </div>

            <div className="border-t border-[#D9D0C7] bg-[#F8F5F3]/70 p-5 dark:border-[#B08D57]/25 dark:bg-[#24201F] sm:p-8">
              <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#7A0C0C] text-white dark:bg-[#B08D57] dark:text-[#1C1C1C]">
                    <FileText className="h-5 w-5" />
                  </span>
                  <div>
                    <h4 className="font-heading text-lg font-bold text-[#1C1C1C] dark:text-[#F8F5F3]">Event brochure</h4>
                    <p className="text-sm text-[#6B6B6B] dark:text-[#D9D0C7]">Read the full workshop details below</p>
                  </div>
                </div>
                <a
                  href="/new%20events/Workshop%202026.pdf"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[#7A0C0C] underline-offset-4 hover:underline dark:text-[#D7B879]"
                >
                  Open in new tab <ArrowRight className="h-4 w-4" />
                </a>
              </div>
              <iframe
                src="/new%20events/Workshop%202026.pdf#view=FitH"
                title="KSLW Fourth Moot Court Training Workshop brochure"
                className="h-[560px] w-full rounded-lg border border-[#D9D0C7] bg-white sm:h-[720px]"
                loading="lazy"
              />
            </div>
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
                  Vidhishala is a registered socio-legal organization
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
                Whether you&apos;re a student, academician, or legal professional, there&apos;s a place for you at Vidhishala.
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
