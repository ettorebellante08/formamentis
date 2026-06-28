// Rilevamento centralizzato della configurazione Supabase.
// Se le variabili non sono impostate il sito funziona comunque in
// "modalità demo" usando i dati di fallback (src/lib/fallback-data.ts).

export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? '';
export const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? '';

export const isSupabaseConfigured = Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);
