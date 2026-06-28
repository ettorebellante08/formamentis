import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getProjectBySlug, getProjects, getSettings } from '@/lib/data';
import Reveal from '@/components/Reveal';
import Footer from '@/components/Footer';

export const revalidate = 60;

export async function generateStaticParams() {
  const projects = await getProjects(true);
  return projects.filter((p) => p.tipo === 'interno').map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const project = await getProjectBySlug(params.slug);
  if (!project) return { title: 'Progetto non trovato' };
  return {
    title: project.nome,
    description: project.descrizione_breve,
    openGraph: {
      title: project.nome,
      description: project.descrizione_breve,
      images: project.immagine_url ? [{ url: project.immagine_url }] : undefined,
    },
  };
}

function isLogoAsset(url: string | null) {
  return !!url && url.startsWith('/');
}

export default async function ProjectPage({ params }: { params: { slug: string } }) {
  const [project, settings] = await Promise.all([getProjectBySlug(params.slug), getSettings()]);
  if (!project || project.tipo === 'esterno') notFound();

  const logo = isLogoAsset(project.immagine_url);
  const paragraphs = project.descrizione_completa.split(/\n\s*\n/).filter(Boolean);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 border-b border-ink/10 bg-background/85 backdrop-blur-xl">
        <div className="container-fm flex h-16 items-center justify-between sm:h-20">
          <Link href="/" className="flex items-center" aria-label="Forma Mentis — home">
            <Image src="/formamentis.png" alt="Forma Mentis" width={140} height={92} className="h-8 w-auto sm:h-9" />
          </Link>
          <Link href="/#progetti" className="btn-ghost px-4 py-2 text-xs">
            ← Torna ai progetti
          </Link>
        </div>
      </header>

      <main className="pt-16 sm:pt-20">
        {/* HERO immagine progetto */}
        <section className="relative h-[42vh] min-h-[300px] w-full overflow-hidden sm:h-[56vh]">
          {project.immagine_url ? (
            <>
              {logo && <div className="absolute inset-0 bg-fm-gradient" />}
              <Image
                src={project.immagine_url}
                alt={project.nome}
                fill
                priority
                sizes="100vw"
                className={logo ? 'object-contain p-8 sm:p-16' : 'object-cover'}
              />
            </>
          ) : (
            <div className="absolute inset-0 bg-fm-gradient" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/55 to-background/10" />

          <div className="container-fm absolute inset-x-0 bottom-0 pb-8 sm:pb-12">
            <Reveal>
              <span className="section-label">Progetto</span>
              <h1 className="heading-xl max-w-3xl text-balance">{project.nome}</h1>
              <p className="mt-3 max-w-2xl text-balance text-base text-ink-muted sm:text-lg">
                {project.descrizione_breve}
              </p>
            </Reveal>
          </div>
        </section>

        {/* CORPO */}
        <section className="py-14 sm:py-20">
          <div className="container-fm">
            <div className="grid gap-10 lg:grid-cols-[1fr_300px] lg:gap-16">
              <Reveal as="article" className="max-w-2xl space-y-5 text-base leading-relaxed text-ink-muted sm:text-lg">
                {paragraphs.map((p, i) => (
                  <p key={i} className="text-pretty">{p}</p>
                ))}
              </Reveal>

              <aside className="lg:sticky lg:top-28 lg:self-start">
                <div className="card-surface p-6">
                  <h3 className="font-display text-lg font-semibold text-ink">Vuoi saperne di più?</h3>
                  <p className="mt-2 text-sm text-ink-muted">
                    Contattaci per collaborare o ricevere informazioni su questo progetto.
                  </p>
                  {project.link_esterno && (
                    <a href={project.link_esterno} target="_blank" rel="noopener noreferrer" className="btn-primary mt-5 w-full">
                      {project.cta_label || 'Visita il sito'}
                    </a>
                  )}
                  <a href={`mailto:${settings.email_contatto}`} className="btn-ghost mt-3 w-full">
                    Scrivici
                  </a>
                </div>
              </aside>
            </div>

            <div className="mt-14 border-t border-ink/10 pt-8">
              <Link href="/#progetti" className="btn-ghost">← Torna ai progetti</Link>
            </div>
          </div>
        </section>
      </main>

      <Footer settings={settings} />
    </>
  );
}
