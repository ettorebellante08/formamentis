// Tipi condivisi che rispecchiano lo schema Supabase (vedi supabase/schema.sql)

export interface Project {
  id: string;
  nome: string;
  slug: string;
  tipo: 'interno' | 'esterno';
  descrizione_breve: string;
  descrizione_completa: string;
  immagine_url: string | null;
  link_esterno: string | null;
  apri_in_nuova_scheda: boolean;
  cta_label: string | null;
  ordine: number;
  attivo: boolean;
  created_at: string;
}

export interface TeamMember {
  id: string;
  nome: string;
  ruolo: string;
  foto_url: string | null;
  ordine: number;
  created_at: string;
}

export interface Setting {
  id: string;
  chiave: string;
  valore: string;
}

// Mappa chiave→valore delle impostazioni associazione
export interface SiteSettings {
  chi_siamo: string;
  email_contatto: string;
  indirizzo: string;
  telefono: string;
  social_facebook: string;
  social_instagram: string;
  social_linkedin: string;
}

export const DEFAULT_SETTINGS: SiteSettings = {
  chi_siamo:
    "Forma Mentis ODV (nata nel 2016) si configura come soggetto aggregatore di una rete territoriale di professionisti, imprese, startup e realtà locali operanti in diversi ambiti del territorio siciliano. L'associazione favorisce la costruzione di relazioni collaborative tra attori pubblici e privati, promuovendo un modello di cooperazione orientato all'innovazione, alla crescita competitiva e alla valorizzazione delle eccellenze del territorio.",
  email_contatto: 'info@formamentisodv.it',
  indirizzo: 'Sicilia, Italia',
  telefono: '',
  social_facebook: '',
  social_instagram: '',
  social_linkedin: '',
};

// Chiavi gestibili dal pannello admin (Info Associazione)
export const SETTING_KEYS: { key: keyof SiteSettings; label: string; multiline?: boolean }[] = [
  { key: 'chi_siamo', label: 'Testo "Chi Siamo"', multiline: true },
  { key: 'email_contatto', label: 'Email di contatto' },
  { key: 'indirizzo', label: 'Indirizzo' },
  { key: 'telefono', label: 'Telefono' },
  { key: 'social_facebook', label: 'Link Facebook' },
  { key: 'social_instagram', label: 'Link Instagram' },
  { key: 'social_linkedin', label: 'Link LinkedIn' },
];
