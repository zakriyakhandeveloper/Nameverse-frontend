# NameVerse - Baby Names Discovery Platform

## Overview

NameVerse is a Next.js frontend application for discovering baby names with meanings, origins, and cultural significance across Islamic, Hindu, and Christian traditions. The platform features 65,000+ names with advanced filtering, search capabilities, and SEO optimization. The frontend consumes a separate backend API hosted at `namverse-api.vercel.app`.

## Recent Changes (December 2025)

- **Fixed Next.js 15 async params/searchParams** - Updated all page components to properly await params and searchParams
- **Fixed pagination errors** - Added optional chaining for `pagination.totalResults` and `pagination.totalPages` to prevent TypeErrors during initial render
- **Fixed pageTitle/pageSubtitle undefined errors** - Added useMemo hooks in ClientComponent.jsx
- **Configured for Replit** - Added `allowedDevOrigins` in next.config.mjs for Replit proxy
- **Updated dev/start scripts** - Configured to run on port 5000

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Framework
- **Next.js 15** with App Router for server-side rendering and static generation
- **React 19** as the UI library
- **Tailwind CSS v4** for styling with custom animations
- **shadcn/ui** components built on Radix UI primitives

### State Management
- **Zustand** for global client-side state (favorites, filters, UI state, toasts)
- **TanStack React Query** for server state and data fetching
- **SWR** as an alternative data fetching library

### API Architecture
The frontend connects to an external backend API (`https://namverse-api.vercel.app`):

- **API Client** (`src/lib/api/client.js`): Axios-based client with request caching (5-minute TTL), request deduplication, automatic retry with exponential backoff, and compression support
- **Modular API Modules**: Separate files for names, articles, and search endpoints
- **No database on frontend**: All data comes from the backend API

### Key API Endpoints Consumed
- `GET /api/v1/names` - Paginated names with filters (religion, gender, origin, letter)
- `GET /api/v1/names/:religion/:slug` - Single name details
- `GET /api/v1/filters/:religion` - Available filter options
- `GET /api/v1/search` - Global search functionality

### Performance Optimizations
- Request caching with configurable TTL
- Request deduplication to prevent duplicate concurrent requests
- Image optimization via Next.js and Sharp
- Resource hints and prefetching
- Web Vitals monitoring
- PWA support with service worker registration

### SEO Implementation
- Comprehensive metadata generation
- Dynamic sitemaps (`/sitemap.xml`, `/post-sitemap.xml`)
- Structured data (JSON-LD schemas)
- Robots.txt configuration
- Google Search Console verification
- OpenGraph and Twitter card support

### Project Structure
```
frontend/
├── src/
│   ├── app/           # Next.js App Router pages and routes
│   ├── components/    # React components (Navbar, SEO, Performance, etc.)
│   ├── config/        # Environment and constants configuration
│   ├── contexts/      # React context providers
│   ├── hooks/         # Custom React hooks
│   ├── lib/
│   │   ├── api/       # API client and endpoint modules
│   │   ├── performance/  # Performance utilities
│   │   ├── seo/       # SEO utilities
│   │   └── utils/     # General utilities
│   ├── store/         # Zustand state stores
│   └── types/         # Type definitions (JSDoc)
├── public/            # Static assets, manifest, robots.txt
└── scripts/           # Build scripts (sitemap generation)
```

## External Dependencies

### Backend API
- **Base URL**: `https://namverse-api.vercel.app`
- **Rate Limit**: 50 requests/day per IP (unlimited for `nameverse.vercel.app`)
- The backend uses MongoDB and Redis (managed separately)

### Third-Party Services
- **Vercel**: Deployment platform (configured via `vercel.json`)
- **Google Search Console**: SEO verification file present

### Key NPM Dependencies
- `axios`: HTTP client for API requests
- `framer-motion` and `gsap`: Animation libraries
- `fuse.js`: Client-side fuzzy search
- `sharp`: Image optimization
- `sitemap`: Dynamic sitemap generation
- `zustand`: State management
- `@tanstack/react-query`: Server state management
- `lucide-react` and `@heroicons/react`: Icon libraries

### Environment Variables Required
```
NEXT_PUBLIC_SITE_URL=https://nameverse.vercel.app
NEXT_PUBLIC_API_BASE=https://namverse-api.vercel.app
NEXT_PUBLIC_API_TIMEOUT=60000 (optional)
```