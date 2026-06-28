import Image from 'next/image';
import Reveal from '@/components/Reveal';

const partners = [
  { src: '/partner/unipa.jpg', alt: 'Università degli Studi di Palermo' },
  { src: '/partner/ordine-ing-pa.png', alt: 'Ordine degli Ingegneri della Provincia di Palermo' },
  { src: '/partner/logova.png', alt: 'Partner' },
  { src: '/partner/livello-1.png', alt: 'Partner' },
  { src: '/partner/foto-1.png', alt: 'Partner' },
];

export default function Partner() {
  return (
    <section id="partner" className="relative scroll-mt-20 py-20 sm:py-32">
      <div className="container-fm">
        <Reveal className="mb-10 max-w-2xl sm:mb-14">
          <span className="section-label">Realtà Partner</span>
          <h2 className="heading-lg text-balance">
            Le organizzazioni che collaborano con{' '}
            <span className="text-gradient">Forma Mentis</span>
          </h2>
          <p className="mt-4 text-ink-muted">
            Un network di istituzioni, enti e realtà del territorio che condividono la nostra
            missione di crescita e innovazione in Sicilia.
          </p>
        </Reveal>

        <Reveal
          stagger
          staggerAmount={0.1}
          className="grid grid-cols-2 gap-5 sm:grid-cols-3 sm:gap-6 lg:grid-cols-5"
        >
          {partners.map((p) => (
            <div
              key={p.src}
              className="card-surface flex items-center justify-center p-6 transition-shadow hover:shadow-[0_10px_30px_-10px_rgba(24,144,204,0.2)]"
            >
              <div className="relative h-16 w-full sm:h-20">
                <Image
                  src={p.src}
                  alt={p.alt}
                  fill
                  sizes="(max-width: 640px) 40vw, (max-width: 1024px) 25vw, 15vw"
                  className="object-contain"
                />
              </div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
