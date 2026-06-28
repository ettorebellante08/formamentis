'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useIsomorphicLayoutEffect } from '@/lib/useIsomorphicLayoutEffect';

export default function Hero() {
  const root = useRef<HTMLElement>(null);

  useIsomorphicLayoutEffect(() => {
    const el = root.current;
    if (!el) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      if (reduce) {
        gsap.set('.hero-anim', { opacity: 1, y: 0, scale: 1 });
        gsap.set('.hero-logo-in', { opacity: 1, scale: 1 });
        return;
      }

      // Timeline d'ingresso al caricamento
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.from('.hero-glow', { opacity: 0, scale: 0.6, duration: 1.4 })
        .from('.hero-logo-in', { opacity: 0, scale: 0.82, y: 12, duration: 1.1 }, '-=1.0')
        .from('.hero-badge', { opacity: 0, y: 16, duration: 0.7 }, '-=0.6')
        .from('.hero-title span', { opacity: 0, y: 26, duration: 0.8, stagger: 0.12 }, '-=0.4')
        .from('.hero-sub', { opacity: 0, y: 18, duration: 0.7 }, '-=0.4')
        .from('.hero-cta', { opacity: 0, y: 14, duration: 0.6, stagger: 0.1 }, '-=0.4')
        .from('.hero-scroll', { opacity: 0, duration: 0.6 }, '-=0.2');

      // Il logo SI MUOVE allo scorrere: sale, si rimpicciolisce e sfuma
      gsap.to('.hero-logo-scroll', {
        yPercent: -120,
        scale: 0.5,
        opacity: 0.15,
        ease: 'none',
        scrollTrigger: { trigger: el, start: 'top top', end: 'bottom top', scrub: 0.6 },
      });

      // Il testo accompagna lo scroll con un parallax più lieve
      gsap.to('.hero-text', {
        yPercent: -22,
        opacity: 0,
        ease: 'none',
        scrollTrigger: { trigger: el, start: 'top top', end: 'bottom top', scrub: 0.6 },
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero"
      ref={root}
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden"
    >
      {/* Sfondo chiaro: griglia + bagliori soft */}
      <div className="pointer-events-none absolute inset-0 bg-grid-faint [background-size:44px_44px] [mask-image:radial-gradient(70%_60%_at_50%_42%,#000_25%,transparent_100%)]" />
      <div className="hero-glow pointer-events-none absolute left-1/2 top-1/3 h-[55vmin] w-[55vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/20 blur-[110px]" />
      <div className="hero-glow pointer-events-none absolute right-[10%] top-[16%] h-[26vmin] w-[26vmin] rounded-full bg-accent/10 blur-[100px]" />

      <div className="container-fm relative z-10 flex flex-col items-center pt-24 text-center sm:pt-20">
        {/* Logo che si muove allo scroll (scroll → in → float) */}
        <div className="hero-logo-scroll mb-7 sm:mb-9">
          <div className="hero-logo-in hero-anim">
            <Image
              src="/formamentis.png"
              alt="Forma Mentis ODV"
              width={560}
              height={370}
              priority
              className="h-auto w-[66vw] max-w-[300px] animate-float drop-shadow-[0_18px_40px_rgba(24,144,204,0.28)] sm:max-w-[380px]"
            />
          </div>
        </div>

        <div className="hero-text flex flex-col items-center">
          <span className="hero-badge hero-anim glass mb-5 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[11px] font-medium uppercase tracking-[0.18em] text-primary-700 sm:text-xs">
            <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse-glow" />
            Organizzazione di Volontariato · dal 2016
          </span>

          <h1 className="hero-title heading-xl max-w-3xl text-balance">
            <span className="block">Una rete territoriale</span>
            <span className="block text-gradient">per l’innovazione siciliana</span>
          </h1>

          <p className="hero-sub hero-anim mt-5 max-w-xl text-balance text-base text-ink-muted sm:mt-6 sm:text-lg">
            Aggreghiamo professionisti, imprese, startup e realtà locali per costruire collaborazioni
            orientate alla crescita competitiva e alla valorizzazione delle eccellenze del territorio.
          </p>

          <div className="mt-8 flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row">
            <Link href="#progetti" className="hero-cta hero-anim btn-primary w-full sm:w-auto">
              Scopri i progetti
            </Link>
            <Link href="#chi-siamo" className="hero-cta hero-anim btn-ghost w-full sm:w-auto">
              Chi siamo
            </Link>
          </div>
        </div>
      </div>

      <Link
        href="#chi-siamo"
        aria-label="Scorri"
        className="hero-scroll hero-anim absolute bottom-7 left-1/2 -translate-x-1/2 text-ink-dim transition-colors hover:text-primary"
      >
        <span className="flex h-10 w-6 items-start justify-center rounded-full border border-current p-1.5">
          <span className="h-2 w-1 rounded-full bg-current animate-float" />
        </span>
      </Link>
    </section>
  );
}
