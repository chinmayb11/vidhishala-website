import type { GalleryImage } from '@/components/gallery-experience';
import { getAdminRows } from '@/lib/page-content-store';

const image = (id: string, title: string, date: string, category: string, photo: string): GalleryImage => ({
  id,
  title,
  date,
  category,
  src: `https://images.unsplash.com/${photo}?auto=format&fit=crop&w=1200&q=85`,
});

export const galleryCollections: Record<string, GalleryImage[]> = {
  events: [
    image('events-1', 'Ideas in conversation', 'Events', 'events', 'photo-1540575467063-178a50c2df87'),
    image('events-2', 'An evening of dialogue', 'Events', 'events', 'photo-1505373877841-8d25f7d46678'),
    image('events-3', 'Celebrating participation', 'Events', 'events', 'photo-1492684223066-81342ee5ff30'),
    image('events-4', 'Learning together', 'Events', 'events', 'photo-1529156069898-49953e39b3ac'),
  ],
  internships: [
    image('internships-1', 'Research in practice', 'Internships', 'internships', 'photo-1524178232363-1fb2b075b655'),
    image('internships-2', 'A collaborative cohort', 'Internships', 'internships', 'photo-1517245386807-bb43f82c33c4'),
    image('internships-3', 'Building professional skills', 'Internships', 'internships', 'photo-1529390079861-591de354faf5'),
    image('internships-4', 'Learning from experience', 'Internships', 'internships', 'photo-1531482615713-2afd69097998'),
  ],
  workshops: [
    image('workshops-1', 'A room full of questions', 'Workshops', 'workshops', 'photo-1556761175-b413da4baf72'),
    image('workshops-2', 'Practice-led learning', 'Workshops', 'workshops', 'photo-1521737711867-e3b97375f902'),
    image('workshops-3', 'Sharing perspectives', 'Workshops', 'workshops', 'photo-1505373877841-8d25f7d46678'),
    image('workshops-4', 'Ideas becoming action', 'Workshops', 'workshops', 'photo-1542744173-8e7e53415bb0'),
  ],
  visits: [
    image('visits-1', 'Learning beyond the classroom', 'Educational Visits', 'visits', 'photo-1521587760476-6c12a4b040da'),
    image('visits-2', 'Institutional understanding', 'Educational Visits', 'visits', 'photo-1505664194779-8beaceb93744'),
    image('visits-3', 'Curiosity in action', 'Educational Visits', 'visits', 'photo-1524178232363-1fb2b075b655'),
    image('visits-4', 'Shared discoveries', 'Educational Visits', 'visits', 'photo-1529156069898-49953e39b3ac'),
  ],
  welfare: [
    image('welfare-1', 'Community at the centre', 'Social Welfare', 'welfare', 'photo-1529156069898-49953e39b3ac'),
    image('welfare-2', 'Service with dignity', 'Social Welfare', 'welfare', 'photo-1559027615-cd4628902d4a'),
    image('welfare-3', 'Working for awareness', 'Social Welfare', 'welfare', 'photo-1531482615713-2afd69097998'),
    image('welfare-4', 'Together for change', 'Social Welfare', 'welfare', 'photo-1511632765486-a01980e01a18'),
  ],
  fest: [
    image('fest-1', 'Rajasthan Law Festival', 'Law Fest', 'fest', 'photo-1540575467063-178a50c2df87'),
    image('fest-2', 'Competition and conversation', 'Law Fest', 'fest', 'photo-1505373877841-8d25f7d46678'),
    image('fest-3', 'Voices shaping law', 'Law Fest', 'fest', 'photo-1492684223066-81342ee5ff30'),
    image('fest-4', 'A national gathering', 'Law Fest', 'fest', 'photo-1521737711867-e3b97375f902'),
  ],
};

export async function getGalleryCollection(category: string): Promise<GalleryImage[]> {
  const managed = await getAdminRows<{ id: string; title: string; event_date?: string | null; category: string; media_url?: string | null; media_type?: string }>('gallery_media');
  const managedImages: GalleryImage[] = managed
    .filter((item) => item.category === category && item.media_url)
    .map((item) => {
      const mediaType: GalleryImage['mediaType'] = item.media_type === 'video' ? 'video' : 'photo';
      return {
        id: item.id,
        title: item.title,
        date: item.event_date || 'Vidhishala',
        category,
        src: item.media_url as string,
        mediaType,
      };
    });

  return managedImages.length > 0 ? managedImages : (galleryCollections[category] ?? []) as GalleryImage[];
}
