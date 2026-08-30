'use client';

import {
  FileText,
  Download,
  BookOpen,
  ScrollText,
  Scale,
  Gavel,
  Shield,
  GraduationCap,
  ExternalLink,
  Search,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

const categories = [
  { id: 'bare-acts', label: 'Bare Acts & References', icon: Scale },
  { id: 'fundamental-rights', label: 'Fundamental Rights', icon: Shield },
  { id: 'legal-duties', label: 'Legal Duties', icon: Gavel },
  { id: 'style-guides', label: 'Style Guides & Research', icon: ScrollText },
];

const resources = [
  { id: 1, title: 'Constitution of India - Bare Act', category: 'bare-acts', type: 'PDF', size: '2.4 MB', description: 'Complete text of the Constitution of India with all amendments.' },
  { id: 2, title: 'Indian Penal Code - Bare Act', category: 'bare-acts', type: 'PDF', size: '1.8 MB', description: 'Full text of the IPC with section-wise commentary references.' },
  { id: 3, title: 'Code of Civil Procedure - Bare Act', category: 'bare-acts', type: 'PDF', size: '3.1 MB', description: 'Complete CPC with orders and schedules.' },
  { id: 4, title: 'Fundamental Rights - A Comprehensive Guide', category: 'fundamental-rights', type: 'PDF', size: '1.2 MB', description: 'Detailed analysis of Articles 12-35 of the Constitution.' },
  { id: 5, title: 'Directive Principles of State Policy', category: 'fundamental-rights', type: 'PDF', size: '0.9 MB', description: 'Understanding DPSP under Part IV of the Constitution.' },
  { id: 6, title: 'Legal Duties of Citizens', category: 'legal-duties', type: 'PDF', size: '0.7 MB', description: 'Fundamental duties under Article 51A and other legal obligations.' },
  { id: 7, title: 'OSCOLA Citation Style Guide', category: 'style-guides', type: 'PDF', size: '1.5 MB', description: 'Legal citation guide adapted for Indian legal research.' },
  { id: 8, title: 'Legal Research Methodology', category: 'style-guides', type: 'PDF', size: '2.0 MB', description: 'A step-by-step guide to doctrinal and empirical legal research.' },
  { id: 9, title: 'Case Brief Writing Guide', category: 'style-guides', type: 'PDF', size: '0.8 MB', description: 'How to write effective case briefs and case comments.' },
  { id: 10, title: 'Right to Information Act Guide', category: 'fundamental-rights', type: 'PDF', size: '1.1 MB', description: 'Complete guide to the RTI Act, 2005 with practical examples.' },
  { id: 11, title: 'Consumer Protection Act Reference', category: 'bare-acts', type: 'PDF', size: '1.3 MB', description: 'Bare act text with key amendments and case law references.' },
  { id: 12, title: 'Legal Writing Style Manual', category: 'style-guides', type: 'PDF', size: '1.7 MB', description: 'Standards for legal writing, formatting, and citation.' },
];

export default function ResourcesPage() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const filtered = resources.filter((r) => {
    const catMatch = activeCategory === 'all' || r.category === activeCategory;
    const searchMatch = !search || r.title.toLowerCase().includes(search.toLowerCase());
    return catMatch && searchMatch;
  });

  return (
    <div className="overflow-hidden">
      {/* Hero */}
      <section className="relative pt-32 pb-16">
        <div className="absolute inset-0 bg-grid opacity-20" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo/10 rounded-full blur-[120px] animate-glow-pulse" />
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <Badge variant="outline" className="mb-6 border-indigo/30 text-indigo">Knowledge Hub</Badge>
            <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight mb-6">
              Resources & <span className="text-gradient-indigo">Knowledge Hub</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl">
              Downloadable guides on fundamental rights, legal duties, bare act
              references, and research methodologies. Free for students,
              researchers, and legal professionals.
            </p>
          </div>
        </div>
      </section>

      {/* Search & Filters */}
      <section className="py-8">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search resources..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Category Pills */}
          <div className="flex flex-wrap gap-2 mb-8">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === 'all'
                  ? 'bg-gradient-to-r from-gold to-amber-600 text-navy'
                  : 'glass-card hover:border-primary/30'
              }`}
            >
              All Resources
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${
                  activeCategory === cat.id
                    ? 'bg-gradient-to-r from-gold to-amber-600 text-navy'
                    : 'glass-card hover:border-primary/30'
                }`}
              >
                <cat.icon className="h-3 w-3" />
                {cat.label}
              </button>
            ))}
          </div>

          {/* Resources Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((resource) => (
              <Card key={resource.id} className="glass-card hover:shadow-lg transition-all group">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-all shrink-0">
                      <FileText className="h-6 w-6" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-heading font-semibold text-sm mb-1 group-hover:text-primary transition-colors line-clamp-2">
                        {resource.title}
                      </h3>
                      <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
                        {resource.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex gap-2">
                          <Badge variant="secondary" className="text-xs">{resource.type}</Badge>
                          <span className="text-xs text-muted-foreground">{resource.size}</span>
                        </div>
                        <Button size="sm" variant="ghost" className="text-primary h-8 px-2 group-hover:gap-2 transition-all">
                          <Download className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20">
              <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No resources found matching your search.</p>
            </div>
          )}
        </div>
      </section>

      {/* External Resources */}
      <section className="py-20">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4 border-gold/30 text-gold">External References</Badge>
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              Useful Legal Portals
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: 'Supreme Court of India', url: 'https://supremecourtofindia.nic.in' },
              { label: 'Rajasthan High Court', url: 'https://hcraj.nic.in' },
              { label: 'India Code', url: 'https://www.indiacode.nic.in' },
              { label: 'eCommittee Courts', url: 'https://ecommitteesci.gov.in' },
            ].map((link) => (
              <a
                key={link.label}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-card rounded-xl p-5 hover:shadow-lg transition-all group flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <GraduationCap className="h-5 w-5 text-primary" />
                  <span className="text-sm font-medium">{link.label}</span>
                </div>
                <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
