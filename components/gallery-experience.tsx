'use client';

import * as React from 'react';
import { ChevronLeft, ChevronRight, Images, Maximize2, X } from 'lucide-react';

export interface GalleryImage {
  id: string;
  title: string;
  date: string;
  category: string;
  src: string;
  mediaType?: 'photo' | 'video';
}

interface GalleryExperienceProps {
  images: GalleryImage[];
  categories?: { value: string; label: string }[];
}

const fallbackImages: GalleryImage[] = [
  { id: 'gallery-1', title: 'Ideas, learning and community', date: 'Featured', category: 'all', src: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80' },
  { id: 'gallery-2', title: 'A shared space for dialogue', date: 'Featured', category: 'all', src: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=1200&q=80' },
  { id: 'gallery-3', title: 'Learning beyond the classroom', date: 'Featured', category: 'all', src: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1200&q=80' },
];

export function GalleryExperience({ images, categories = [] }: GalleryExperienceProps) {
  const galleryImages = images.length > 0 ? images : fallbackImages;
  const [activeCategory, setActiveCategory] = React.useState('all');
  const [selectedIndex, setSelectedIndex] = React.useState<number | null>(null);
  const [slideIndex, setSlideIndex] = React.useState(0);

  const visibleImages = React.useMemo(
    () => activeCategory === 'all' ? galleryImages : galleryImages.filter((image) => image.category === activeCategory),
    [activeCategory, galleryImages]
  );
  const featuredImages = React.useMemo(() => {
    const preferred = [
      '/drive-download-20260917T133658Z-1-001/Copy%20of%20Rajasthan%20Law%20Fest,%202022-23.jpg',
      '/drive-download-20260917T133658Z-1-001/DSC_0101.JPG',
      '/drive-download-20260917T133658Z-1-001/DSC_0272%20team%20jlf.JPG',
      '/drive-download-20260917T133658Z-1-001/IMG-20241005-WA0004%20(1).jpg',
    ];

    return galleryImages.filter((image) => preferred.includes(image.src)).length === 4
      ? galleryImages.filter((image) => preferred.includes(image.src))
      : galleryImages.slice(0, 4);
  }, [galleryImages]);

  React.useEffect(() => {
    if (featuredImages.length < 2) return;
    const timer = window.setInterval(() => {
      setSlideIndex((current) => (current + 1) % featuredImages.length);
    }, 4500);
    return () => window.clearInterval(timer);
  }, [featuredImages.length]);

  React.useEffect(() => {
    if (selectedIndex === null) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setSelectedIndex(null);
      if (event.key === 'ArrowRight') setSelectedIndex((current) => current === null ? null : (current + 1) % visibleImages.length);
      if (event.key === 'ArrowLeft') setSelectedIndex((current) => current === null ? null : (current - 1 + visibleImages.length) % visibleImages.length);
    };
    document.addEventListener('keydown', closeOnEscape);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', closeOnEscape);
      document.body.style.overflow = '';
    };
  }, [selectedIndex, visibleImages.length]);

  const openImage = (index: number) => setSelectedIndex(index);
  const selectedImage = selectedIndex === null ? null : visibleImages[selectedIndex];

  return (
    <section className="space-y-8">
      <div className="relative overflow-hidden rounded-2xl border border-[#D9D0C7] bg-[#f3efe9] shadow-[0_16px_40px_rgba(74,8,8,0.16)]">
        {featuredImages.map((image, index) => image.mediaType === 'video' ? (
          <video key={image.id} src={image.src} muted loop autoPlay playsInline className={`absolute inset-0 h-full w-full object-contain bg-[#f3efe9] transition-opacity duration-700 ${index === slideIndex ? 'opacity-100' : 'opacity-0'}`} />
        ) : (
          <img key={image.id} src={image.src} alt={image.title} className={`absolute inset-0 h-full w-full object-contain bg-[#f3efe9] transition-opacity duration-700 ${index === slideIndex ? 'opacity-100' : 'opacity-0'}`} />
        ))}
        <div className="relative flex min-h-[300px] items-end justify-end bg-gradient-to-t from-black/5 via-transparent to-transparent p-6 sm:min-h-[390px] sm:p-10">
          <div className="absolute bottom-6 right-6 flex gap-2 sm:bottom-10 sm:right-10" aria-label="Featured image slides">
            {featuredImages.map((image, index) => (
              <button key={image.id} type="button" aria-label={`Show featured image ${index + 1}`} onClick={() => setSlideIndex(index)} className={`h-2.5 w-2.5 rounded-full transition-colors ${index === slideIndex ? 'bg-[#7A0C0C]' : 'bg-black/35'}`} />
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-muted-foreground">{visibleImages.length} moments</p>
          <h2 className="font-heading text-2xl font-bold text-[#4A0808] dark:text-[#B08D57] sm:text-3xl">Browse the collection</h2>
        </div>
        {categories.length > 0 && (
          <div className="flex max-w-full gap-2 overflow-x-auto pb-1" role="tablist" aria-label="Gallery categories">
            {categories.map((category) => (
              <button key={category.value} type="button" role="tab" aria-selected={activeCategory === category.value} onClick={() => { setActiveCategory(category.value); setSelectedIndex(null); }} className={`whitespace-nowrap rounded-full border px-4 py-2 text-sm transition-colors ${activeCategory === category.value ? 'border-[#7A0C0C] bg-[#7A0C0C] text-white' : 'border-[#D9D0C7] text-muted-foreground hover:border-[#B08D57] hover:text-[#7A0C0C]'}`}>
                {category.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {visibleImages.length > 0 ? (
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3 lg:grid-cols-4 lg:gap-4">
          {visibleImages.map((image, index) => (
            <button key={image.id} type="button" onClick={() => openImage(index)} className="group relative aspect-square overflow-hidden rounded-lg bg-[#4A0808] text-left focus:outline-none focus:ring-2 focus:ring-[#B08D57]">
              {image.mediaType === 'video' ? <video src={image.src} muted loop autoPlay playsInline className="h-full w-full object-cover transition duration-500 group-hover:scale-105" /> : <img src={image.src} alt={image.title} loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />}
              <span className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              <span className="absolute right-3 top-3 rounded-full bg-black/40 p-2 text-white opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100"><Maximize2 className="h-4 w-4" /></span>
            </button>
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-dashed border-[#D9D0C7] py-16 text-center"><Images className="mx-auto mb-3 h-10 w-10 text-muted-foreground" /><p className="text-muted-foreground">No images found in this category.</p></div>
      )}

      {selectedImage && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 sm:p-8" role="dialog" aria-modal="true" aria-label={selectedImage.title} onMouseDown={(event) => { if (event.target === event.currentTarget) setSelectedIndex(null); }}>
          <button type="button" onClick={() => setSelectedIndex(null)} aria-label="Close image viewer" className="absolute right-4 top-4 z-10 rounded-full bg-white/10 p-3 text-white transition-colors hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-[#D9B56D]"><X className="h-6 w-6" /></button>
          <button type="button" onClick={() => setSelectedIndex((current) => current === null ? null : (current - 1 + visibleImages.length) % visibleImages.length)} aria-label="Previous image" className="absolute left-3 top-1/2 rounded-full bg-white/10 p-3 text-white transition-colors hover:bg-white/20 sm:left-6"><ChevronLeft className="h-6 w-6" /></button>
          <figure className="flex max-h-full max-w-5xl flex-col items-center">
            {selectedImage.mediaType === 'video' ? <video src={selectedImage.src} controls autoPlay className="max-h-[75vh] w-auto max-w-full rounded-lg object-contain" /> : <img src={selectedImage.src} alt={selectedImage.title} className="max-h-[75vh] w-auto max-w-full rounded-lg object-contain" />}
            <figcaption className="mt-4 text-center text-white"><p className="font-heading text-xl">{selectedImage.title}</p><p className="mt-1 text-sm text-white/70">{selectedImage.date}</p></figcaption>
          </figure>
          <button type="button" onClick={() => setSelectedIndex((current) => current === null ? null : (current + 1) % visibleImages.length)} aria-label="Next image" className="absolute right-3 top-1/2 rounded-full bg-white/10 p-3 text-white transition-colors hover:bg-white/20 sm:right-6"><ChevronRight className="h-6 w-6" /></button>
        </div>
      )}
    </section>
  );
}
