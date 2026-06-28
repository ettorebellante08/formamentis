// Genera uno slug URL-friendly da un nome (es. "Campus in Salute" → "campus-in-salute")
export function slugify(input: string): string {
  return input
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '') // rimuove accenti combinanti
    .replace(/['’]/g, '') // apostrofi dritti e tipografici
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80);
}
