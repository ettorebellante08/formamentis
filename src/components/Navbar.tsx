'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const LINKS = [
  { href: '#chi-siamo', label: 'Chi Siamo' },
  { href: '#progetti', label: 'Progetti' },
  { href: '#team', label: 'Team' },
  { href: '#contatti', label: 'Contatti' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const solid = scrolled || open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        solid ? 'border-b border-ink/10 bg-background/85 backdrop-blur-xl' : 'border-b border-transparent'
      }`}
    >
      <nav className="container-fm flex h-16 items-center justify-between sm:h-20">
        <Link href="#hero" className="group flex items-center" aria-label="Forma Mentis — home">
          <Image
            src="/formamentis.png"
            alt="Forma Mentis"
            width={140}
            height={92}
            priority
            className="h-8 w-auto transition-transform duration-500 group-hover:scale-105 sm:h-9"
          />
        </Link>

        {/* Desktop */}
        <ul className="hidden items-center gap-8 md:flex">
          {LINKS.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="text-sm font-medium text-ink-muted transition-colors hover:text-primary">
                {l.label}
              </Link>
            </li>
          ))}
          <li>
            <Link href="/admin" className="btn-ghost px-5 py-2 text-xs">
              Area riservata
            </Link>
          </li>
        </ul>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-ink/15 text-ink md:hidden"
          aria-label="Apri menu"
          aria-expanded={open}
        >
          <span className="relative block h-3 w-5">
            <span className={`absolute left-0 top-0 h-0.5 w-5 rounded bg-current transition-transform duration-300 ${open ? 'translate-y-[5px] rotate-45' : ''}`} />
            <span className={`absolute bottom-0 left-0 h-0.5 w-5 rounded bg-current transition-transform duration-300 ${open ? '-translate-y-[5px] -rotate-45' : ''}`} />
          </span>
        </button>
      </nav>

      {/* Mobile menu */}
      <div className={`overflow-hidden border-t border-ink/10 bg-background/95 backdrop-blur-xl transition-[max-height] duration-500 md:hidden ${open ? 'max-h-80' : 'max-h-0 border-t-transparent'}`}>
        <ul className="container-fm flex flex-col gap-1 py-4">
          {LINKS.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                onClick={() => setOpen(false)}
                className="block rounded-lg px-3 py-3 text-base font-medium text-ink-muted transition-colors hover:bg-primary/5 hover:text-primary"
              >
                {l.label}
              </Link>
            </li>
          ))}
          <li>
            <Link href="/admin" onClick={() => setOpen(false)} className="mt-1 block rounded-lg px-3 py-3 text-base font-medium text-primary-600">
              Area riservata →
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}
