import type { Project } from '@/lib/types';
import Reveal from '@/components/Reveal';
import ProjectCard from '@/components/ProjectCard';

export default function Progetti({ projects }: { projects: Project[] }) {
  return (
    <section id="progetti" className="relative scroll-mt-20 py-20 sm:py-32">
      <div className="container-fm">
        <Reveal className="mb-10 max-w-2xl sm:mb-14">
          <span className="section-label">Progetti</span>
          <h2 className="heading-lg text-balance">
            Iniziative che fanno <span className="text-gradient">crescere il territorio</span>
          </h2>
          <p className="mt-4 text-ink-muted">
            Ogni progetto nasce dalla collaborazione tra attori pubblici e privati per generare
            impatto concreto, innovazione e nuove opportunità in Sicilia.
          </p>
        </Reveal>

        {projects.length === 0 ? (
          <p className="text-ink-muted">Nessun progetto disponibile al momento.</p>
        ) : (
          <Reveal stagger staggerAmount={0.15} className="grid gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
            {projects.map((p) => (
              <ProjectCard key={p.id} project={p} />
            ))}
          </Reveal>
        )}
      </div>
    </section>
  );
}
