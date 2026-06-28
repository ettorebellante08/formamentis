import Image from 'next/image';
import type { TeamMember } from '@/lib/types';
import Reveal from '@/components/Reveal';

function initials(nome: string) {
  return nome
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase())
    .join('');
}

export default function Team({ members }: { members: TeamMember[] }) {
  if (members.length === 0) return null;

  return (
    <section id="team" className="relative scroll-mt-20 bg-surface py-20 sm:py-32">
      <div className="container-fm">
        <Reveal className="mb-10 max-w-2xl sm:mb-14">
          <span className="section-label">Il Team</span>
          <h2 className="heading-lg text-balance">
            Le persone dietro <span className="text-gradient">Forma Mentis</span>
          </h2>
          <p className="mt-4 text-ink-muted">
            Una squadra di professionisti uniti dalla volontà di mettere competenze e relazioni al
            servizio del territorio.
          </p>
        </Reveal>

        <Reveal stagger staggerAmount={0.1} className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4">
          {members.map((m) => (
            <article
              key={m.id}
              className="card-surface group flex flex-col items-center p-5 text-center hover:border-primary/30 hover:shadow-card sm:p-6"
            >
              <div className="relative mb-4 h-20 w-20 overflow-hidden rounded-full ring-2 ring-primary/10 transition-all duration-500 group-hover:ring-primary/40 sm:h-24 sm:w-24">
                {m.foto_url ? (
                  <Image src={m.foto_url} alt={m.nome} fill sizes="96px" className="object-cover" />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-fm-gradient font-display text-xl font-bold text-white sm:text-2xl">
                    {initials(m.nome)}
                  </div>
                )}
              </div>
              <h3 className="font-display text-sm font-semibold text-ink sm:text-base">{m.nome}</h3>
              <p className="mt-1 text-xs text-primary-600 sm:text-sm">{m.ruolo}</p>
            </article>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
