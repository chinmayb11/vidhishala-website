'use client';

import { FileText, Download, Shield, Search } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

const resources = [
  { id: 1, title: 'Fundamental Rights - A Comprehensive Guide', type: 'PDF', size: '1.2 MB', description: 'Detailed analysis of Articles 12-35 of the Constitution.' },
  { id: 2, title: 'Directive Principles of State Policy', type: 'PDF', size: '0.9 MB', description: 'Understanding DPSP under Part IV of the Constitution.' },
  { id: 3, title: 'Right to Information Act Guide', type: 'PDF', size: '1.1 MB', description: 'Complete guide to the RTI Act, 2005 with practical examples.' },
  { id: 4, title: 'Human Rights in India - Overview', type: 'PDF', size: '1.4 MB', description: 'Overview of human rights protections under Indian and international law.' },
];

export default function FundamentalRightsPage() {
  const [search, setSearch] = useState('');
  const filtered = resources.filter((r) => !search || r.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="overflow-hidden">
      <section className="relative pt-32 pb-16">
        <div className="absolute inset-0 bg-grid opacity-20" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-[120px] animate-glow-pulse" />
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white mb-6">
              <Shield className="h-8 w-8" />
            </div>
            <Badge variant="outline" className="mb-4 border-emerald-500/30 text-emerald-500">Resources</Badge>
            <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.1] tracking-tight mb-6">
              Fundamental <span className="text-gradient-gold">Rights</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Guides and references on fundamental rights guaranteed under the Constitution of India.
            </p>
          </div>
        </div>
      </section>

      <section className="py-8">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative mb-8 max-w-xl">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10" />
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
            <div className="text-center py-20"><p className="text-muted-foreground">No resources found matching your search.</p></div>
          )}
        </div>
      </section>
    </div>
  );
}
