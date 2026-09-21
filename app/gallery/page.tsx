'use client';

import { Play } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { GalleryExperience, GalleryImage } from '@/components/gallery-experience';

const folderBase = '/drive-download-20260917T133658Z-1-001';
const featuredGalleryFiles = [
  'Copy of Rajasthan Law Fest, 2022-23.jpg',
  'DSC_0101.JPG',
  'DSC_0272 team jlf.JPG',
  'IMG-20241005-WA0004 (1).jpg',
];

const galleryFiles = [
  '326981445_584615363514760_5492890498566027165_n.jpg',
  '459502527_1967058427069673_5908335168485443982_n.jpg',
  '475070016_3869105766752842_6644766801507693099_n.jpg',
  '6269109092341628774.jpg',
  '6269109092341628778.jpg',
  '6269109092341628780.jpg',
  '6269109092341628782.jpg',
  '6269109092341628783.jpg',
  '6269109092341628785.jpg',
  'Copy of Rajasthan Law Fest, 2022-23.jpg',
  'DSC_0101.JPG',
  'DSC_0272 team jlf.JPG',
  'IMG-20241005-WA0004 (1).jpg',
  'Inaugural Ceremony of Debate competition .png',
  'WhatsApp Image 2024-02-19 at 22.22.38.jpeg',
  'WhatsApp Image 2024-02-19 at 22.25.58.jpeg',
  'WhatsApp Image 2024-07-14 at 00.26.49 (1).jpeg',
  'WhatsApp Image 2024-07-14 at 00.26.49.jpeg',
  'WhatsApp Image 2024-07-14 at 00.26.50.jpeg',
  'WhatsApp Image 2024-07-14 at 00.29.02 (2).jpeg',
  'WhatsApp Image 2024-07-14 at 00.29.02.jpeg',
  'WhatsApp Image 2024-07-14 at 00.29.03.jpeg',
  'WhatsApp Image 2024-07-14 at 00.30.14.jpeg',
  'WhatsApp Image 2024-07-14 at 00.30.15 (1).jpeg',
  'WhatsApp Image 2024-07-14 at 00.30.15.jpeg',
  'WhatsApp Image 2024-07-14 at 00.47.19.jpeg',
  'WhatsApp Image 2024-07-14 at 00.47.27.jpeg',
  'WhatsApp Image 2024-07-14 at 00.47.28.jpeg',
  'WhatsApp Image 2025-01-28 at 23.53.31 (1).jpeg',
  'WhatsApp Image 2025-01-28 at 23.53.31.jpeg',
  'WhatsApp Image 2025-01-28 at 23.53.33.jpeg',
  'WhatsApp Image 2025-01-28 at 23.53.35.jpeg',
  'WhatsApp Image 2025-01-28 at 23.53.37 (1).jpeg',
  'WhatsApp Image 2025-01-28 at 23.53.37.jpeg',
  'WhatsApp Image 2025-01-28 at 23.53.38.jpeg',
  'WhatsApp Image 2025-01-29 at 00.56.02.jpeg',
];

const galleryItems: GalleryImage[] = galleryFiles.map((fileName, index) => ({
  id: `local-gallery-${index + 1}`,
  category: 'all',
  title: `Gallery ${index + 1}`,
  date: 'Featured',
  src: `${folderBase}/${encodeURIComponent(fileName)}`,
}));

const categories = [{ value: 'all', label: 'All Photos' }];

export default function GalleryPage() {
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

      <section className="py-8">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <GalleryExperience images={galleryItems} categories={categories} />
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
