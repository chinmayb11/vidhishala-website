import { CollaboratorOrbit } from '@/components/collaborator-orbit';
import { CollaboratorPdfViewer } from '@/components/collaborator-pdf-viewer';
import { ContentPage } from '@/components/content-page';
import { contentData } from '@/lib/content-data';

export default function LawFestAboutPage() {
  return (
    <>
      <ContentPage {...contentData.festAbout} />
      <CollaboratorOrbit />
      <CollaboratorPdfViewer />
    </>
  );
}
