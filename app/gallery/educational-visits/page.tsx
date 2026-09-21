import { ContentPage } from '@/components/content-page';
import { GalleryExperience } from '@/components/gallery-experience';
import { contentData } from '@/lib/content-data';
import { getGalleryCollection } from '@/lib/gallery-data';

export default async function EducationalVisitsGalleryPage() {
	return <><ContentPage {...contentData.galleryVisits} /><div className="container mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8"><GalleryExperience images={await getGalleryCollection('visits')} /></div></>;
}
