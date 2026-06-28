import { createClient } from '@supabase/supabase-js';

// Client con privilegi service_role — SOLO server-side.
// Usato per operazioni che bypassano le RLS (es. seed). Non importare mai
// questo file in un Client Component.
export function createAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceKey) {
    throw new Error(
      'SUPABASE_SERVICE_ROLE_KEY o NEXT_PUBLIC_SUPABASE_URL mancanti: impossibile creare il client admin.',
    );
  }
  return createClient(url, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}
