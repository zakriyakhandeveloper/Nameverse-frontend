/** @type {import('next').NextConfig} */
const nextConfig = {
reactStrictMode: true,

compiler: {
removeConsole:
process.env.NODE_ENV === 'production'
? { exclude: ['error', 'warn'] }
: false,
},

// Remove X-Powered-By header
poweredByHeader: false,

// Disable TypeScript checking during build
typescript: {
ignoreBuildErrors: true,
},

// Allow hosts for Replit proxy
allowedDevOrigins: [
'https://faea070e-8320-40f1-92b2-b79c20b8d2f6-00-6rm0csoemn1l.kirk.replit.dev',
'http://faea070e-8320-40f1-92b2-b79c20b8d2f6-00-6rm0csoemn1l.kirk.replit.dev',
'*.replit.dev',
'*.repl.co',
'*.kirk.replit.dev',
],

// Performance Optimizations
compress: true,

// Image Optimization
images: {
formats: ['image/avif', 'image/webp'],
deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
minimumCacheTTL: 31536000,
dangerouslyAllowSVG: true,
contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
unoptimized: false,
},

// Headers for Security and Performance
async headers() {
return [
{
source: '/:path*',
headers: [
{
key: 'X-DNS-Prefetch-Control',
value: 'on'
},
{
key: 'X-Content-Type-Options',
value: 'nosniff'
},
{
key: 'X-Frame-Options',
value: 'SAMEORIGIN'
},
{
key: 'X-XSS-Protection',
value: '1; mode=block'
},
{
key: 'Referrer-Policy',
value: 'origin-when-cross-origin'
},
],
},
{
source: '/images/:path*',
headers: [
{
key: 'Cache-Control',
value: 'public, max-age=31536000, immutable',
},
],
}
];
},

// Experimental Features
experimental: {
optimizePackageImports: [
'lucide-react',
'@radix-ui/react-dropdown-menu'
],
},

// Webpack config
webpack: (config, { dev, isServer }) => {
// Production optimizations
if (!dev && !isServer) {
config.optimization = {
...config.optimization,
splitChunks: {
...config.optimization.splitChunks,
cacheGroups: {
...config.optimization.splitChunks?.cacheGroups,
lucide: {
test: /[\\/]node_modules[\\/]lucide-react[\\/]/,
name: 'lucide',
chunks: 'all',
priority: 10,
},
framerMotion: {
test: /[\\/]node_modules[\\/]framer-motion[\\/]/,
name: 'framer-motion',
chunks: 'all',
priority: 10,
},
},
},
};
}
return config;
},
};

export default nextConfig;
