'use client';

import { useState } from 'react';
import {
  Images,
  Filter,
  Calendar,
  Users,
  Play,
  Maximize2,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
const categories = [
  { value: 'all', label: 'All Events' },
  { value: 'rlf', label: 'Rajasthan Law Festival' },
  { value: 'lip', label: 'Library Internships' },
  { value: 'school', label: 'School Workshops' },
];

const galleryItems = [
  { id: 1, category: 'rlf', title: 'RLF 2024 Inauguration', date: 'Mar 2024', type: 'photo', span: 'lg' },
  { id: 2, category: 'lip', title: 'LIP Edition 3 - Research Session', date: 'Jan 2025', type: 'photo', span: 'md' },
  { id: 3, category: 'school', title: 'Leadership Workshop, Jaipur', date: 'Sep 2024', type: 'photo', span: 'sm' },
  { id: 4, category: 'rlf', title: 'Moot Court Finals', date: 'Mar 2024', type: 'photo', span: 'md' },
  { id: 5, category: 'lip', title: 'Library Cataloging', date: 'Aug 2024', type: 'photo', span: 'sm' },
  { id: 6, category: 'school', title: 'Gender Sensitivity Session', date: 'Nov 2024', type: 'photo', span: 'lg' },
  { id: 7, category: 'rlf', title: 'Judge Seminar Panel', date: 'Mar 2024', type: 'photo', span: 'md' },
  { id: 8, category: 'lip', title: 'Internship Certificate Ceremony', date: 'Dec 2024', type: 'photo', span: 'sm' },
  { id: 9, category: 'school', title: 'Menstrual Hygiene Awareness', date: 'Oct 2024', type: 'photo', span: 'md' },
  { id: 10, category: 'rlf', title: 'Cultural Evening at RLF', date: 'Mar 2024', type: 'photo', span: 'lg' },
  { id: 11, category: 'lip', title: 'Research Methodology Workshop', date: 'Jul 2024', type: 'photo', span: 'sm' },
  { id: 12, category: 'school', title: 'Student Leadership Program', date: 'Feb 2025', type: 'photo', span: 'md' },
];

const spanClass: Record<string, string> = {
  sm: 'row-span-1',
  md: 'row-span-2',
  lg: 'row-span-3',
};

export default function GalleryPage() {
  const [category, setCategory] = useState('all');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const filtered = galleryItems.filter(
    (item) => category === 'all' || item.category === category
  );

  return (
    <div className="overflow-hidden">
      {/* Hero */}
      <section className="relative pt-32 pb-16">
        <div className="absolute inset-0 bg-grid opacity-20" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold/10 rounded-full blur-[120px] animate-glow-pulse" />
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <Badge variant="outline" className="mb-6 border-gold/30 text-gold">Media Gallery</Badge>
            <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight mb-6">
              Moments & <span className="text-gradient-gold">Memories</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl">
              A visual journey through our festivals, internships, workshops,
              and community outreach programs.
            </p>
          </div>
        </div>
      </section>

      {/* Filter Bar */}
      <section className="py-8">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
            <p className="text-sm text-muted-foreground">
              Showing {filtered.length} of {galleryItems.length} items
            </p>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="w-full sm:w-64">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat.value} value={cat.value}>{cat.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Masonry Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 auto-rows-[180px] gap-4">
            {filtered.map((item) => (
              <div
                key={item.id}
                className={`relative group rounded-2xl overflow-hidden glass-card cursor-pointer ${spanClass[item.span]}`}
                onClick={() => setSelectedImage(item.title)}
              >
                {/* Placeholder gradient background */}
                <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy-light to-indigo/20" />
                <div className="absolute inset-0 bg-grid opacity-10" />

                {/* Content overlay */}
                <div className="absolute inset-0 flex flex-col justify-end p-4 bg-gradient-to-t from-navy/90 via-navy/40 to-transparent">
                  <div className="flex items-center gap-2 mb-1">
                    <Calendar className="h-3 w-3 text-gold" />
                    <span className="text-xs text-white/70">{item.date}</span>
                  </div>
                  <h3 className="font-heading font-semibold text-sm text-white">{item.title}</h3>
                </div>

                {/* Hover effects */}
                <div className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity">
                  <Maximize2 className="h-4 w-4 text-white" />
                </div>
                <div className="absolute inset-0 ring-2 ring-gold/0 group-hover:ring-gold/40 rounded-2xl transition-all" />
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20">
              <Images className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No media found in this category.</p>
            </div>
          )}
        </div>
      </section>

      {/* Video Section */}
      <section className="py-20">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4 border-indigo/30 text-indigo">Video Gallery</Badge>
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              Watch Our Story
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: 'RLF 2024 Highlights', duration: '3:45' },
              { title: 'LIP Internship Experience', duration: '5:20' },
              { title: 'School Outreach Impact', duration: '2:15' },
            ].map((video) => (
              <Card key={video.title} className="glass-card hover:shadow-lg transition-all group cursor-pointer">
                <CardContent className="p-0">
                  <div className="relative aspect-video bg-gradient-to-br from-navy to-navy-light rounded-t-lg flex items-center justify-center overflow-hidden">
                    <div className="absolute inset-0 bg-grid opacity-10" />
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-gold to-amber-600 text-navy group-hover:scale-110 transition-transform">
                      <Play className="h-8 w-8 ml-1" fill="currentColor" />
                    </div>
                    <div className="absolute bottom-3 right-3 px-2 py-1 rounded bg-navy/80 text-xs text-white">
                      {video.duration}
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-heading font-semibold text-sm">{video.title}</h3>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
