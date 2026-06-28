import type { Project, TeamMember } from '@/lib/types';

export const STATIC_PROJECTS: Project[] = [
  {
    id: 'campus-in-salute',
    nome: 'Campus in Salute',
    slug: 'campus-in-salute',
    tipo: 'esterno',
    descrizione_breve: 'da completare',
    descrizione_completa: '',
    immagine_url: '/projects/campus-in-salute.png',
    link_esterno: 'https://campusinsalute.it',
    apri_in_nuova_scheda: true,
    cta_label: 'Visita il sito',
    ordine: 1,
    attivo: true,
    created_at: '2024-01-01T00:00:00.000Z',
  },
  {
    id: 'amuni',
    nome: 'A.M.U.N.Ì.',
    slug: 'amuni',
    tipo: 'interno',
    descrizione_breve:
      'Promozione e valorizzazione del settore agroalimentare siciliano — olio extravergine e vino — attraverso una piattaforma digitale che connette produttori locali e mercati internazionali.',
    descrizione_completa:
      "Il progetto A.M.U.N.Ì. — Agricoltura Made in Sicily: Unione Network Imprese nasce per rispondere alla riduzione di competitività internazionale di olio extravergine di oliva e vino siciliani causata dall'aumento dei dazi negli Stati Uniti. La soluzione è l'apertura verso mercati alternativi, con focus sul Regno Unito, dove cresce la domanda di prodotti agroalimentari premium, tracciabili e legati al territorio.\n\nIl progetto si basa su una piattaforma ICT integrata che mette in comunicazione diretta produttori e consumatori: ogni produttore dispone di una scheda digitale con prodotti, informazioni commerciali e contatti diretti. La piattaforma è affiancata da 3 eventi fisici B2B aperti al pubblico dedicati alla degustazione e all'incontro tra produttori, consumatori e operatori commerciali.\n\nRisultati attesi: coinvolgimento di almeno 20 produttori, nuovi contatti commerciali e ampliamento delle opportunità di vendita per le eccellenze agroalimentari siciliane.",
    immagine_url:
      'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=1600&q=80',
    link_esterno: null,
    apri_in_nuova_scheda: false,
    cta_label: null,
    ordine: 2,
    attivo: true,
    created_at: '2024-01-02T00:00:00.000Z',
  },
  {
    id: 'open-radio',
    nome: 'Open Radio',
    slug: 'open-radio',
    tipo: 'esterno',
    descrizione_breve: 'da completare',
    descrizione_completa: '',
    immagine_url:
      'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?auto=format&fit=crop&w=1600&q=80',
    link_esterno: 'https://www.instagram.com/open.radioo/?hl=it',
    apri_in_nuova_scheda: true,
    cta_label: 'Seguici su Instagram',
    ordine: 3,
    attivo: true,
    created_at: '2024-01-03T00:00:00.000Z',
  },
];

export const STATIC_TEAM: TeamMember[] = [
  {
    id: 'team-1',
    nome: 'Prof. Ing. Ivan Marchese',
    ruolo: 'Presidente',
    foto_url: '/team/ivan-marchese.webp',
    ordine: 1,
    created_at: '2024-01-01T00:00:00.000Z',
  },
  {
    id: 'team-2',
    nome: 'Dr. Giuseppe Liotta',
    ruolo: 'Responsabile attività sanitarie',
    foto_url: '/team/giuseppe-liotta.webp',
    ordine: 2,
    created_at: '2024-01-01T00:00:00.000Z',
  },
  {
    id: 'team-3',
    nome: 'Prof.ssa Mariagemma Pecoraro',
    ruolo: 'Segretario',
    foto_url: '/team/mariagemma-pecoraro.webp',
    ordine: 3,
    created_at: '2024-01-01T00:00:00.000Z',
  },
];
