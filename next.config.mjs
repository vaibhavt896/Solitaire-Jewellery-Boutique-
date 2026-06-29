/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/webp'],
    qualities: [75, 85, 90],
    minimumCacheTTL: 31536000,
    /* One provenance: all imagery is local/owned. No remote hosts. */
    /* Allow our own labelled placeholder SVGs (in /public/placeholders)
       to be served through next/image. They are static, first-party
       files — no user-supplied SVGs are ever rendered. */
    dangerouslyAllowSVG: true,
    contentDispositionType: 'inline',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  experimental: {
    optimizePackageImports: ['framer-motion'],
  },
};

export default nextConfig;
