import Link from 'next/link';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { getPageContent } from '@/lib/page-content-store';

export interface ContentSection {
  heading?: string;
  paragraphs?: string[];
  bullets?: string[];
}

interface ContentPageProps {
  contentKey?: string;
  eyebrow: string;
  title: string;
  intro?: string;
  sections: ContentSection[];
  cta?: { label: string; href: string };
}

export async function ContentPage({ contentKey, eyebrow, title, intro, sections, cta }: ContentPageProps) {
  if (contentKey) {
    ({ eyebrow, title, intro, sections, cta } = await getPageContent(contentKey));
  }
  return (
    <article className="overflow-hidden">
      <section className="relative border-b border-[#D9D0C7] bg-[#F8F5F3] py-20 sm:py-28 dark:border-[#B08D57]/40 dark:bg-[#1C1C1C]">
        <div className="absolute inset-0 bg-grid opacity-10 dark:opacity-20" />
        <div className="container relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-[#B08D57]">{eyebrow}</p>
          <h1 className="max-w-4xl font-heading text-4xl font-bold leading-tight text-[#7A0C0C] sm:text-5xl lg:text-6xl dark:text-[#B08D57]">{title}</h1>
          {intro && <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">{intro}</p>}
        </div>
      </section>

      <section className="py-14 sm:py-20">
        <div className="container mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            {sections.map((section, index) => (
              <section key={`${section.heading ?? 'section'}-${index}`} className="border-l-2 border-[#B08D57] pl-6 sm:pl-8">
                {section.heading && <h2 className="mb-4 font-heading text-2xl font-bold text-[#4A0808] sm:text-3xl dark:text-[#B08D57]">{section.heading}</h2>}
                <div className="space-y-4 text-base leading-8 text-[#6B6B6B] dark:text-[#F8F5F3]/85">
                  {section.paragraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                  {section.bullets && (
                    <ul className="space-y-3 pt-1">
                      {section.bullets.map((bullet) => (
                        <li key={bullet} className="flex items-start gap-3">
                          <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-[#7A0C0C] dark:text-[#B08D57]" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </section>
            ))}
          </div>
          {cta && (
            <Link href={cta.href} className="mt-14 inline-flex items-center gap-2 rounded-md bg-[#7A0C0C] px-5 py-3 font-semibold text-white transition-colors hover:bg-[#4A0808]">
              {cta.label}<ArrowRight className="h-4 w-4" />
            </Link>
          )}
        </div>
      </section>
    </article>
  );
}
