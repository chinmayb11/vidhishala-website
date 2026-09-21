import fs from 'fs';
import path from 'path';
import Image from 'next/image';

const collaboratorFiles = fs
  .readdirSync(path.join(process.cwd(), 'public', 'COLLAB_LOGOS'))
  .filter((file) => /\.(jpe?g|png|webp|svg)$/i.test(file))
  .sort();

const marqueeLogos = [...collaboratorFiles, ...collaboratorFiles];

export function CollaboratorOrbit() {
  return (
    <section className="border-t border-[#D9D0C7] bg-[#F8F5F3] py-16 sm:py-24 dark:border-[#B08D57]/40 dark:bg-[#1C1C1C]">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-[#B08D57]">Our Collaborators</p>
          <h2 className="font-heading text-3xl font-bold text-[#4A0808] sm:text-4xl dark:text-[#F8F5F3]">Partners powering the festival</h2>
        </div>

        <div className="collab-panel" aria-label="Partners and collaborators of the Rajasthan Law Festival">
          <div className="collab-panel__header">
            <div className="collab-panel__logo-wrap">
              <Image
                src="/RLF_LOGO.jpeg"
                alt="Rajasthan Law Festival logo"
                fill
                sizes="(max-width: 640px) 140px, 220px"
                className="object-contain p-3"
              />
            </div>
          </div>

          <div className="collab-panel__marquee">
            <div className="collab-panel__track">
              {marqueeLogos.map((file, index) => (
                <div key={`${file}-${index}`} className="collab-panel__item">
                  <div className="collab-panel__card">
                    <Image
                      src={`/COLLAB_LOGOS/${file}`}
                      alt="Collaborator logo"
                      fill
                      sizes="(max-width: 640px) 62px, 90px"
                      className="object-contain p-2"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
