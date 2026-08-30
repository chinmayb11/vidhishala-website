'use client';

import { FileText, Download, ScrollText, Search } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

const guides = [
  { id: 1, title: 'OSCOLA Citation Style Guide', type: 'PDF', size: '1.5 MB', description: 'Legal citation guide adapted for Indian legal research.' },
  { id: 2, title: 'Legal Research Methodology', type: 'PDF', size: '2.0 MB', description: 'A step-by-step guide to doctrinal and empirical legal research.' },
  { id: 3, title: 'Case Brief Writing Guide', type: 'PDF', size: '0.8 MB', description: 'How to write effective case briefs and case comments.' },
  { id: 4, title: 'Legal Writing Style Manual', type: 'PDF', size: '1.7 MB', description: 'Standards for legal writing, formatting, and citation.' },
  { id: 5, title: 'Research Paper Template', type: 'DOCX', size: '0.3 MB', description: 'Standardized template for legal research paper submissions.' },
  { id: 6, title: 'Bluebook Citation Quick Reference', type: 'PDF', size: '0.5 MB', description: 'Quick reference card for Bluebook citation rules.' },
];

export default function StyleGuidesPage() {
  const [search, setSearch] = useState('');
  const filtered = guides.filter((r) => !search || r.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="overflow-hidden">
      <section className="relative pt-32 pb-16">
        <div className="absolute inset-0 bg-grid opacity-20" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo/10 rounded-full blur-[120px] animate-glow-pulse" />
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo to-violet-600 text-white mb-6">
              <ScrollText className="h-8 w-8" />
            </div>
            <Badge variant="outline" className="mb-4 border-indigo/30 text-indigo">Resources</Badge>
            <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.1] tracking-tight mb-6">
              Style Guides & <span className="text-gradient-indigo">Research</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Research methodology guides, citation styles, and writing manuals for legal scholarship.
            </p>
          </div>
        </div>
      </section>

      <section className="py-8">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative mb-8 max-w-xl">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search guides..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((resource) => (
              <Card key={resource.id} className="glass-card hover:shadow-lg transition-all group">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-all shrink-0">
                      <FileText className="h-6 w-6" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-heading font-semibold text-sm mb-1 group-hover:text-primary transition-colors">{resource.title}</h3>
                      <p className="text-xs text-muted-foreground mb-3">{resource.description}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex gap-2">
                          <Badge variant="secondary" className="text-xs">{resource.type}</Badge>
                          <span className="text-xs text-muted-foreground">{resource.size}</span>
                        </div>
                        <Button size="sm" variant="ghost" className="text-primary h-8 px-2"><Download className="h-3 w-3" /></Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          {filtered.length === 0 && (
            <div className="text-center py-20">
              <p className="text-muted-foreground">No guides found matching your search.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
