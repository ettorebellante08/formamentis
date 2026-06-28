'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useIsomorphicLayoutEffect } from '@/lib/useIsomorphicLayoutEffect';

const STATS = [
  { value: '2016', label: 'Anno di fondazione' },
  { value: 'Sicilia', label: 'Territorio' },
  { value: 'Rete', label: 'Pubblico · privato' },
];

export default function ChiSiamo({ text }: { text: string }) {
  const root = useRef<HTMLElement>(null);
  const words = text.split(/\s+/).filter(Boolean);

  useIsomorphicLayoutEffect(() => {
    const el = root.current;
    if (!el) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      if (reduce) {
        gsap.set('.cs-word', { opacity: 1 });
        gsap.set('.cs-fade', { opacity: 1, y: 0 });
        return;
      }

      gsap.fromTo(
        '.cs-word',
        { opacity: 0.12 },
        {
          opacity: 1,
          ease: 'none',
          stagger: 0.5,
          scrollTrigger: { trigger: '.cs-paragraph', start: 'top 80%', end: 'bottom 62%', scrub: true },
        },
      );

      gsap.from('.cs-fade', {
        opacity: 0,
        y: 30,
        duration: 0.9,
        ease: 'power3.out',
        stagger: 0.15,
        scrollTrigger: { trigger: el, start: 'top 72%' },
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section id="chi-siamo" ref={root} className="relative scroll-mt-20 py-20 sm:py-32">
      <div className="container-fm">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div className="cs-fade">
            <span className="section-label">Chi Siamo</span>
            <h2 className="heading-lg max-w-md text-balance">
              Soggetto <span className="text-gradient">aggregatore</span> di una rete territoriale
            </h2>
          </div>

          <div>
            <p className="cs-paragraph text-pretty text-xl font-light leading-relaxed text-ink sm:text-2xl">
              {words.map((w, i) => (
                <span key={i} className="cs-word">
                  {w}{' '}
                </span>
              ))}
            </p>

            <div className="cs-fade mt-10 grid grid-cols-3 gap-4 border-t border-ink/10 pt-8 sm:mt-12">
              {STATS.map((s) => (
                <div key={s.label}>
                  <div className="font-display text-2xl font-bold text-gradient sm:text-3xl">{s.value}</div>
                  <div className="mt-1 text-[11px] text-ink-muted sm:text-sm">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
