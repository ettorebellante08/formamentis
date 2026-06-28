import Image from 'next/image';
import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="flex min-h-[100svh] flex-col items-center justify-center px-6 text-center">
      <Image src="/formamentis.png" alt="Forma Mentis" width={200} height={132} className="h-14 w-auto" />
      <p className="mt-10 font-display text-6xl font-bold text-gradient sm:text-7xl">404</p>
      <h1 className="heading-lg mt-3">Pagina non trovata</h1>
      <p className="mt-3 max-w-md text-ink-muted">La pagina che cerchi non esiste o è stata spostata.</p>
      <Link href="/" className="btn-primary mt-8">Torna alla home</Link>
    </main>
  );
}
