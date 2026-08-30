'use client';

import { useState } from 'react';
import {
  FileText,
  Download,
  Search,
  Filter,
  ArrowRight,
  PenSquare,
  Calendar,
  User,
  X,
  Send,
  BookOpen,
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';

const volumes = ['All Volumes', 'Volume 3 (2025)', 'Volume 2 (2024)', 'Volume 1 (2023)'];

const publications = [
  { id: 1, title: 'Constitutional Interpretation in the Digital Age', author: 'Dr. Anjali Sharma', category: 'Constitutional Law', volume: 'Volume 3 (2025)', date: 'Jan 2025', summary: 'An analysis of how digital transformation challenges traditional constitutional interpretation frameworks.' },
  { id: 2, title: 'Data Privacy and the Right to be Forgotten', author: 'Adv. Rajesh Mehta', category: 'Privacy Law', volume: 'Volume 3 (2025)', date: 'Jan 2025', summary: 'Examining the intersection of data protection laws and the emerging right to be forgotten in Indian jurisprudence.' },
  { id: 3, title: 'Environmental Jurisprudence in Rajasthan', author: 'Prof. Kavita Joshi', category: 'Environmental Law', volume: 'Volume 2 (2024)', date: 'Oct 2024', summary: 'A comprehensive study of environmental legal developments specific to Rajasthan.' },
  { id: 4, title: 'Judicial Activism and Separation of Powers', author: 'Dr. Vikram Singh', category: 'Constitutional Law', volume: 'Volume 2 (2024)', date: 'Jul 2024', summary: 'Tracing the evolution of judicial activism and its impact on the doctrine of separation of powers.' },
  { id: 5, title: 'Cyber Law and E-Governance in India', author: 'Adv. Priya Nair', category: 'Technology Law', volume: 'Volume 2 (2024)', date: 'Apr 2024', summary: 'Legal frameworks governing electronic governance and cybercrime in India.' },
  { id: 6, title: 'Women\'s Rights and Legal Reform', author: 'Dr. Sunita Pareek', category: 'Human Rights', volume: 'Volume 1 (2023)', date: 'Dec 2023', summary: 'A critical analysis of legal reforms affecting women\'s rights in post-independence India.' },
  { id: 7, title: 'Alternative Dispute Resolution Mechanisms', author: 'Adv. Manoj Jain', category: 'Procedural Law', volume: 'Volume 1 (2023)', date: 'Aug 2023', summary: 'Comparative study of ADR mechanisms and their effectiveness in the Indian legal system.' },
  { id: 8, title: 'Criminal Justice Reform and Prisoners\' Rights', author: 'Prof. Arun Kumar', category: 'Criminal Law', volume: 'Volume 1 (2023)', date: 'Apr 2023', summary: 'Examining reform needs in the criminal justice system with focus on prisoners\' constitutional rights.' },
];

export default function VidhiGazettePage() {
  const { toast } = useToast();
  const [selectedVolume, setSelectedVolume] = useState('All Volumes');
  const [searchQuery, setSearchQuery] = useState('');
  const [cfpOpen, setCfpOpen] = useState(false);
  const [cfpData, setCfpData] = useState({ name: '', email: '', title: '', abstract: '', category: '' });

  const filtered = publications.filter((p) => {
    const volMatch = selectedVolume === 'All Volumes' || p.volume === selectedVolume;
    const searchMatch =
      !searchQuery ||
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.author.toLowerCase().includes(searchQuery.toLowerCase());
    return volMatch && searchMatch;
  });

  const handleCfpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: 'Paper Submitted',
      description: 'Your paper has been submitted for review. We will contact you within 4-6 weeks.',
    });
    setCfpOpen(false);
    setCfpData({ name: '', email: '', title: '', abstract: '', category: '' });
  };

  return (
    <div className="overflow-hidden">
      {/* Hero */}
      <section className="relative pt-32 pb-16">
        <div className="absolute inset-0 bg-grid opacity-20" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold/10 rounded-full blur-[120px] animate-glow-pulse" />
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <Badge variant="outline" className="mb-6 border-gold/30 text-gold">Digital Publication Hub</Badge>
            <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight mb-6">
              The Vidhi <span className="text-gradient-gold">Gazette</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl">
              A peer-reviewed legal research publication featuring articles from
              jurists, academicians, and emerging legal scholars. Published
              quarterly since 2023.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="bg-gradient-to-r from-gold to-amber-600 text-navy font-semibold glow-gold" onClick={() => setCfpOpen(true)}>
                <PenSquare className="mr-2 h-4 w-4" />
                Call for Papers
              </Button>
              <Button size="lg" variant="outline" className="glass-card">
                <Download className="mr-2 h-4 w-4" />
                Download Latest Issue
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Filters & Publications */}
      <section className="py-12">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Filter Bar */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search articles or authors..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedVolume} onValueChange={setSelectedVolume}>
              <SelectTrigger className="md:w-56">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {volumes.map((vol) => (
                  <SelectItem key={vol} value={vol}>{vol}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Results count */}
          <p className="text-sm text-muted-foreground mb-6">
            Showing {filtered.length} of {publications.length} articles
          </p>

          {/* Publications Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((pub) => (
              <Card key={pub.id} className="glass-card hover:shadow-xl hover:shadow-gold/10 transition-all duration-300 hover:-translate-y-1 group">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <Badge variant="secondary" className="text-xs">{pub.category}</Badge>
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {pub.date}
                    </span>
                  </div>
                  <h3 className="font-heading text-lg font-bold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                    {pub.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3 flex items-center gap-1">
                    <User className="h-3 w-3" />
                    {pub.author}
                  </p>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {pub.summary}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">{pub.volume}</span>
                    <Button size="sm" variant="ghost" className="text-primary group-hover:gap-2 transition-all">
                      <Download className="h-4 w-4 mr-1" />
                      PDF
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20">
              <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No articles found matching your criteria.</p>
            </div>
          )}
        </div>
      </section>

      {/* Call for Papers CTA */}
      <section className="py-20">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-3xl overflow-hidden glass-card p-12 md:p-16 text-center">
            <div className="absolute inset-0 bg-gradient-to-br from-gold/5 via-transparent to-indigo/5" />
            <div className="relative z-10 max-w-2xl mx-auto">
              <BookOpen className="h-12 w-12 text-gold mx-auto mb-6" />
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
                Submit Your Research
              </h2>
              <p className="text-muted-foreground mb-8">
                The Vidhi Gazette welcomes original, unpublished research
                articles from law students, academicians, and legal
                professionals. Submissions are reviewed on a rolling basis.
              </p>
              <Button size="lg" className="bg-gradient-to-r from-gold to-amber-600 text-navy font-semibold glow-gold" onClick={() => setCfpOpen(true)}>
                <PenSquare className="mr-2 h-4 w-4" />
                Submit a Paper
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Call for Papers Modal */}
      <Dialog open={cfpOpen} onOpenChange={setCfpOpen}>
        <DialogContent className="glass-nav max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-heading text-2xl">Call for Papers</DialogTitle>
            <DialogDescription>
              Submit your research article for consideration in The Vidhi Gazette.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleCfpSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <Label htmlFor="cfp-name">Author Name</Label>
              <Input
                id="cfp-name"
                required
                value={cfpData.name}
                onChange={(e) => setCfpData({ ...cfpData, name: e.target.value })}
                placeholder="Your full name"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="cfp-email">Email</Label>
              <Input
                id="cfp-email"
                type="email"
                required
                value={cfpData.email}
                onChange={(e) => setCfpData({ ...cfpData, email: e.target.value })}
                placeholder="you@example.com"
                className="mt-1"
              />
            </div>
            <div className="md:col-span-2">
              <Label htmlFor="cfp-title">Paper Title</Label>
              <Input
                id="cfp-title"
                required
                value={cfpData.title}
                onChange={(e) => setCfpData({ ...cfpData, title: e.target.value })}
                placeholder="Enter your paper title"
                className="mt-1"
              />
            </div>
            <div className="md:col-span-2">
              <Label htmlFor="cfp-category">Category</Label>
              <Select
                value={cfpData.category}
                onValueChange={(v) => setCfpData({ ...cfpData, category: v })}
              >
                <SelectTrigger id="cfp-category" className="mt-1">
                  <SelectValue placeholder="Select research category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="constitutional">Constitutional Law</SelectItem>
                  <SelectItem value="criminal">Criminal Law</SelectItem>
                  <SelectItem value="civil">Civil Law</SelectItem>
                  <SelectItem value="corporate">Corporate Law</SelectItem>
                  <SelectItem value="environmental">Environmental Law</SelectItem>
                  <SelectItem value="technology">Technology Law</SelectItem>
                  <SelectItem value="human-rights">Human Rights</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="md:col-span-2">
              <Label htmlFor="cfp-abstract">Abstract</Label>
              <Textarea
                id="cfp-abstract"
                required
                value={cfpData.abstract}
                onChange={(e) => setCfpData({ ...cfpData, abstract: e.target.value })}
                placeholder="Paste your abstract (max 500 words)"
                className="mt-1 min-h-[120px]"
              />
            </div>
            <div className="md:col-span-2 mt-2">
              <Button type="submit" size="lg" className="w-full bg-gradient-to-r from-gold to-amber-600 text-navy font-semibold">
                <Send className="mr-2 h-4 w-4" />
                Submit Paper
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
