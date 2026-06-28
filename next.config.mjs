/** @type {import('next').NextConfig} */
const supabaseHost = (() => {
  try {
    return process.env.NEXT_PUBLIC_SUPABASE_URL
      ? new URL(process.env.NEXT_PUBLIC_SUPABASE_URL).hostname
      : null;
  } catch {
    return null;
  }
})();

const nextConfig = {
  images: {
    remotePatterns: [
      // Supabase Storage public bucket (host derived from env, fallback to wildcard).
      ...(supabaseHost
        ? [{ protocol: 'https', hostname: supabaseHost }]
        : [{ protocol: 'https', hostname: '*.supabase.co' }]),
      { protocol: 'https', hostname: 'images.unsplash.com' },
    ],
  },
};

export default nextConfig;
