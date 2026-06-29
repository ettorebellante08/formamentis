import Image from 'next/image';
import Reveal from '@/components/Reveal';

const partners = [
  { src: '/partner/unipa.jpg', alt: 'Università degli Studi di Palermo' },
  { src: '/partner/ordine-ing-pa.png', alt: 'Ordine degli Ingegneri della Provincia di Palermo' },
  { src: '/partner/logova.png', alt: 'Vivere Ateneo' },
  { src: '/partner/livello-1.png', alt: 'ERSU', invertWhite: true },
  { src: '/partner/foto-1.png', alt: 'Dipartimento di Ingegneria UniPa' },
];

export default function Partner() {
  return (
    <section id="partner" className="relative scroll-mt-20 py-20 sm:py-32">
      <div className="container-fm">
        <Reveal className="mb-12 max-w-2xl sm:mb-16">
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
      </div>

      {/* Marquee — full-width, fade out on the edges */}
      <div
        className="relative overflow-hidden"
        style={{
          maskImage: 'linear-gradient(to right, transparent, black 12%, black 88%, transparent)',
          WebkitMaskImage:
            'linear-gradient(to right, transparent, black 12%, black 88%, transparent)',
        }}
      >
        <div className="flex w-max animate-marquee gap-6 hover:[animation-play-state:paused]">
          {[...partners, ...partners].map((p, i) => (
            <div
              key={i}
              className="card-surface flex w-64 flex-shrink-0 items-center justify-center p-8 transition-shadow hover:shadow-[0_10px_30px_-10px_rgba(24,144,204,0.25)]"
            >
              <div className="relative h-28 w-full">
                <Image
                  src={p.src}
                  alt={p.alt}
                  fill
                  sizes="256px"
                  className="object-contain"
                  style={p.invertWhite ? { filter: 'invert(1) hue-rotate(180deg)' } : undefined}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
