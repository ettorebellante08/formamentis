'use client';

import { useRef, type ElementType, type ReactNode } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useIsomorphicLayoutEffect } from '@/lib/useIsomorphicLayoutEffect';

type RevealProps = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  /** Direzione di ingresso */
  from?: 'up' | 'down' | 'left' | 'right' | 'scale';
  /** Ritardo in secondi */
  delay?: number;
  /** Anima i figli diretti in sequenza (stagger) invece dell'elemento intero */
  stagger?: boolean;
  /** Quantità di stagger tra i figli */
  staggerAmount?: number;
};

const OFFSETS: Record<NonNullable<RevealProps['from']>, gsap.TweenVars> = {
  up: { y: 40 },
  down: { y: -40 },
  left: { x: 40 },
  right: { x: -40 },
  scale: { scale: 0.92 },
};

export default function Reveal({
  children,
  as,
  className,
  from = 'up',
  delay = 0,
  stagger = false,
  staggerAmount = 0.12,
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  const Tag = (as ?? 'div') as ElementType;

  useIsomorphicLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      gsap.set(stagger ? el.children : el, { opacity: 1, clearProps: 'all' });
      return;
    }

    gsap.registerPlugin(ScrollTrigger);
    const targets = stagger ? el.children : el;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        targets,
        { opacity: 0, ...OFFSETS[from] },
        {
          opacity: 1,
          x: 0,
          y: 0,
          scale: 1,
          duration: 0.9,
          delay,
          ease: 'power3.out',
          stagger: stagger ? staggerAmount : 0,
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        },
      );
    }, el);

    return () => ctx.revert();
  }, [from, delay, stagger, staggerAmount]);

  // In modalità stagger i target sono i figli: GSAP (fromTo, immediateRender)
  // li nasconde prima del paint, quindi il parent NON deve avere gsap-reveal.
  return (
    <Tag ref={ref} className={`${stagger ? '' : 'gsap-reveal'} ${className ?? ''}`.trim()}>
      {children}
    </Tag>
  );
}
