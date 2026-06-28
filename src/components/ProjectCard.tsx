import Image from 'next/image';
import Link from 'next/link';
import type { Project } from '@/lib/types';

function isLogoAsset(url: string | null) {
  return !!url && url.startsWith('/');
}

export default function ProjectCard({ project }: { project: Project }) {
  const logo = isLogoAsset(project.immagine_url);
  const isExternal = project.tipo === 'esterno';

  const cardContent = (
    <>
      <div className="relative aspect-[16/10] overflow-hidden">
        {project.immagine_url ? (
          <>
            {logo && <div className="absolute inset-0 bg-fm-gradient" />}
            <Image
              src={project.immagine_url}
              alt={project.nome}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className={
                logo
                  ? 'object-contain p-8 transition-transform duration-700 group-hover:scale-105'
                  : 'object-cover transition-transform duration-700 group-hover:scale-110'
              }
            />
          </>
        ) : (
          <div className="absolute inset-0 bg-fm-gradient" />
        )}
        {!logo && project.immagine_url && (
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        )}
        {isExternal && (
          <div className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-black/40 px-2.5 py-1 text-[10px] font-semibold text-white backdrop-blur-sm">
            <svg className="h-3 w-3" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M2 10L10 2M5 2h5v5" />
            </svg>
            Sito esterno
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <h3 className="font-display text-lg font-bold text-ink transition-colors group-hover:text-primary sm:text-xl">
          {project.nome}
        </h3>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-ink-muted">
          {project.descrizione_breve}
        </p>
        <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary-600">
          {isExternal ? (project.cta_label ?? 'Visita il sito') : 'Scopri di più'}
          <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 10h12M11 5l5 5-5 5" />
          </svg>
        </span>
      </div>
    </>
  );

  if (isExternal && project.link_esterno) {
    return (
      <a
        href={project.link_esterno}
        target={project.apri_in_nuova_scheda ? '_blank' : '_self'}
        rel="noopener noreferrer"
        className="card-surface group relative flex flex-col overflow-hidden hover:-translate-y-1.5 hover:border-primary/30 hover:shadow-[0_20px_50px_-20px_rgba(24,144,204,0.25)]"
      >
        {cardContent}
      </a>
    );
  }

  return (
    <Link
      href={`/progetti/${project.slug}`}
      className="card-surface group relative flex flex-col overflow-hidden hover:-translate-y-1.5 hover:border-primary/30 hover:shadow-[0_20px_50px_-20px_rgba(24,144,204,0.25)]"
    >
      {cardContent}
    </Link>
  );
}
