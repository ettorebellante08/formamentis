import Image from 'next/image';
import Link from 'next/link';
import type { SiteSettings } from '@/lib/types';

function SocialLink({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  if (!href) return null;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="flex h-10 w-10 items-center justify-center rounded-full border border-ink/15 text-ink-muted transition-all hover:border-primary/50 hover:bg-primary/5 hover:text-primary"
    >
      {children}
    </a>
  );
}

export default function Footer({ settings }: { settings: SiteSettings }) {
  const year = new Date().getFullYear();

  return (
    <footer id="contatti" className="relative scroll-mt-20 overflow-hidden border-t border-ink/10 bg-background pt-16 sm:pt-24">
      <div className="pointer-events-none absolute -top-16 left-1/2 h-[30vmin] w-[60vmin] -translate-x-1/2 rounded-full bg-primary/10 blur-[110px]" />

      <div className="container-fm relative">
        <div className="grid gap-10 pb-12 sm:gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Image src="/formamentis.png" alt="Forma Mentis ODV" width={180} height={120} className="h-11 w-auto sm:h-12" />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-ink-muted">
              Organizzazione di Volontariato che dal 2016 promuove innovazione, cooperazione e
              valorizzazione delle eccellenze del territorio siciliano.
            </p>
            <div className="mt-6 flex gap-3">
              <SocialLink href={settings.social_facebook} label="Facebook">
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.3c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.4 2.9h-2.4v7A10 10 0 0 0 22 12Z" /></svg>
              </SocialLink>
              <SocialLink href={settings.social_instagram} label="Instagram">
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.2c3.2 0 3.6 0 4.9.1 1.2.1 1.8.3 2.2.4.6.2 1 .5 1.4.9.4.4.7.8.9 1.4.2.4.4 1 .4 2.2.1 1.3.1 1.7.1 4.9s0 3.6-.1 4.9c-.1 1.2-.3 1.8-.4 2.2-.2.6-.5 1-.9 1.4-.4.4-.8.7-1.4.9-.4.2-1 .4-2.2.4-1.3.1-1.7.1-4.9.1s-3.6 0-4.9-.1c-1.2-.1-1.8-.3-2.2-.4a3.8 3.8 0 0 1-1.4-.9 3.8 3.8 0 0 1-.9-1.4c-.2-.4-.4-1-.4-2.2C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.9c.1-1.2.3-1.8.4-2.2.2-.6.5-1 .9-1.4.4-.4.8-.7 1.4-.9.4-.2 1-.4 2.2-.4C8.4 2.2 8.8 2.2 12 2.2Zm0 8a4.9 4.9 0 1 1 0 9.8 4.9 4.9 0 0 1 0-9.8Zm0 8a3.1 3.1 0 1 0 0-6.2 3.1 3.1 0 0 0 0 6.2Zm6.3-8.2a1.2 1.2 0 1 1-2.3 0 1.2 1.2 0 0 1 2.3 0Z" /></svg>
              </SocialLink>
              <SocialLink href={settings.social_linkedin} label="LinkedIn">
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14ZM8.3 18.3V10H5.7v8.3h2.6Zm-1.3-9.4a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Zm11.3 9.4v-4.6c0-2.4-1.3-3.6-3.1-3.6-1.4 0-2 .8-2.4 1.4V10h-2.6v8.3h2.6v-4.6c0-.3 0-.5.1-.7.2-.5.6-1 1.4-1 1 0 1.4.7 1.4 1.9v4.4h2.6Z" /></svg>
              </SocialLink>
            </div>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-ink">Contatti</h4>
            <ul className="space-y-3 text-sm text-ink-muted">
              {settings.email_contatto && (
                <li><a href={`mailto:${settings.email_contatto}`} className="transition-colors hover:text-primary">{settings.email_contatto}</a></li>
              )}
              {settings.telefono && (
                <li><a href={`tel:${settings.telefono}`} className="transition-colors hover:text-primary">{settings.telefono}</a></li>
              )}
              {settings.indirizzo && <li>{settings.indirizzo}</li>}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-ink">Naviga</h4>
            <ul className="space-y-3 text-sm text-ink-muted">
              <li><Link href="#chi-siamo" className="transition-colors hover:text-primary">Chi Siamo</Link></li>
              <li><Link href="#progetti" className="transition-colors hover:text-primary">Progetti</Link></li>
              <li><Link href="#team" className="transition-colors hover:text-primary">Team</Link></li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-3 border-t border-ink/10 py-6 text-xs text-ink-dim sm:flex-row">
          <p>© {year} Forma Mentis ODV — Tutti i diritti riservati.</p>
          <p>Organizzazione di Volontariato · Sicilia, Italia</p>
        </div>
      </div>
    </footer>
  );
}
