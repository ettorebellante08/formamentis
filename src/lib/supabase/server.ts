import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { cookies } from 'next/headers';

type CookieToSet = { name: string; value: string; options: CookieOptions };
import { SUPABASE_ANON_KEY, SUPABASE_URL } from '@/lib/env';

// Client Supabase per Server Component / Server Action / Route Handler.
// Legge e scrive i cookie di sessione per mantenere l'autenticazione.
export function createClient() {
  const cookieStore = cookies();

  return createServerClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet: CookieToSet[]) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options),
          );
        } catch {
          // Chiamato da un Server Component: ignorabile se esiste un middleware
          // che si occupa del refresh della sessione.
        }
      },
    },
  });
}
