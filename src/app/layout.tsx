import type { Metadata, Viewport } from 'next';
import { DM_Sans, Space_Grotesk } from 'next/font/google';
import './globals.css';

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://formamentis-odv.vercel.app';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Forma Mentis ODV — Rete territoriale per l\'innovazione in Sicilia',
    template: '%s — Forma Mentis ODV',
  },
  description:
    'Forma Mentis ODV (2016) aggrega professionisti, imprese, startup e realtà locali siciliane, promuovendo innovazione, crescita competitiva e valorizzazione delle eccellenze del territorio.',
  keywords: [
    'Forma Mentis',
    'ODV',
    'Sicilia',
    'innovazione',
    'rete territoriale',
    'startup',
    'imprese',
    'no profit',
  ],
  openGraph: {
    type: 'website',
    locale: 'it_IT',
    siteName: 'Forma Mentis ODV',
    title: 'Forma Mentis ODV',
    description:
      'Rete territoriale siciliana di professionisti, imprese e startup per l\'innovazione e la crescita competitiva.',
  },
  icons: {
    icon: '/formamentis.png',
  },
};

export const viewport: Viewport = {
  themeColor: '#F4F7FA',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="it" className={`${dmSans.variable} ${spaceGrotesk.variable}`}>
      <body className="no-js min-h-screen">
        {/* Rimuove la classe no-js appena JS è disponibile, così le animazioni GSAP prendono il controllo */}
        <script
          dangerouslySetInnerHTML={{
            __html: `document.body.classList.remove('no-js');`,
          }}
        />
        {children}
      </body>
    </html>
  );
}
