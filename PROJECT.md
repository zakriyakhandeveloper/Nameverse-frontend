# Nameverse Frontend - Project Documentation

## 📋 Table of Contents
1. [Project Overview](#project-overview)
2. [Features](#features)
3. [Tech Stack](#tech-stack)
4. [Project Structure](#project-structure)
5. [Key Directories](#key-directories)
6. [Configuration](#configuration)
7. [API Integration](#api-integration)
8. [Data Sources](#data-sources)
9. [Components & Pages](#components--pages)
10. [Development Setup](#development-setup)
11. [Build & Deployment](#build--deployment)
12. [Performance Optimizations](#performance-optimizations)

---

## 📱 Project Overview

**NameVerse** is a comprehensive baby naming platform built with Next.js 16, featuring **60,000+ verified baby names** across multiple religions and cultures. The platform provides parents with detailed information about names including meanings, origins, numerology, personality traits, and linguistic translations across multiple languages.

**Target Audience:** Parents seeking meaningful baby names with cultural and linguistic insights

**Key Markets:** Global, with multi-language support (English, Urdu, Arabic, Hindi)

---

## ✨ Features

### Core Features
- 🌍 **60,000+ Baby Names** across Islamic, Hindu, Christian, and Modern categories
- 🔤 **Advanced Filtering** by gender, origin, starting letter, and custom criteria
- 🔍 **Global Search** with fuzzy matching and autocomplete
- 📊 **Detailed Name Information:**
  - Meanings and origins
  - Numerology analysis
  - Personality traits and characteristics
  - Hidden traits and compatibility
  - Famous people with the name
  - Origin history and cultural significance
- 💜 **Favorites System** - Bookmark and organize preferred names
- 🌐 **Multi-Language Support** - English, Urdu, Arabic, Hindi
- 📚 **Blog & Guides** - Expert naming advice and cultural insights
- 📲 **PWA Support** - Installable web app with offline capabilities
- ♿ **Accessibility** - WCAG compliant design
- 🎨 **Responsive Design** - Mobile-first approach

### Advanced Features
- Related and similar name suggestions
- Popularity tracking
- Lucky number calculations
- Gender compatibility
- Cultural significance indicators
- Trending names dashboard

---

## 🛠️ Tech Stack

### Frontend Framework
- **Next.js** 16.0.10 - React 19.2.3 framework with App Router
- **React** 19.2.3 - UI library
- **TypeScript** - Type safety (configured but ignored in builds)

### UI & Styling
- **Tailwind CSS** 4 - Utility-first CSS framework
- **shadcn/ui** - High-quality React components
- **Radix UI** - Unstyled, accessible components
- **Heroicons** - Beautiful SVG icons
- **Lucide React** - Modern icon library

### Animations & Graphics
- **Framer Motion** - React animation library
- **GSAP** - Advanced animations
- **Lottie React** - Complex JSON animations
- **Sharp** 3.4.4 - Image optimization

### State Management
- **Zustand** 5.0.9 - Lightweight store management
- **Context API** - Global state
- **React Query** - Server state management
- **SWR** - Data fetching with caching

### HTTP & API
- **Axios** 1.11.0 - HTTP client with custom configuration
- **Fuse.js** - Fuzzy search library

### Performance & Optimization
- **Web Vitals** - Performance monitoring
- **Virtual Scrolling** - Large list optimization
- **Next.js Image Optimization** - Automatic image resizing

### Notifications
- **React Hot Toast** - Toast notifications
- **Sonner** - Toast library

### Development Tools
- **ESLint** - Code linting
- **PostCSS** - CSS transformations
- **Prettier** - Code formatting

---

## 📁 Project Structure

```
Nameverse-frontend/
├── frontend/
│   ├── src/
│   │   ├── app/                 # Next.js App Router pages
│   │   ├── components/          # Reusable React components
│   │   ├── config/              # Environment & constants
│   │   ├── contexts/            # React contexts
│   │   ├── hooks/               # Custom React hooks
│   │   ├── lib/                 # Utilities and API client
│   │   ├── store/               # Zustand stores
│   │   └── types/               # TypeScript types
│   ├── public/
│   │   ├── data/                # Static JSON name databases
│   │   ├── sitemaps/            # XML sitemaps for SEO
│   │   └── ...                  # Static assets
│   ├── scripts/                 # Build and utility scripts
│   ├── next.config.mjs          # Next.js configuration
│   ├── middleware.js            # Next.js middleware
│   ├── jsconfig.json            # JavaScript path aliases
│   ├── postcss.config.mjs       # PostCSS configuration
│   ├── tailwind.config.js       # Tailwind CSS configuration
│   ├── package.json             # Dependencies & scripts
│   └── vercel.json              # Vercel deployment config
├── attached_assets/             # Documentation and assets
└── PROJECT.md                   # This file
```

---

## 📂 Key Directories

### `/src/app/` - Next.js App Router
Contains all routing pages using Next.js 16 App Router:
- **Root pages**: `page.js`, `layout.js`, `globals.css`
- **Routes**:
  - `/names/[religion]/` - Browse names by religion
  - `/names/[religion]/[name]/` - Individual name details
  - `/religion/` - Religion landing pages (Islamic, Hindu, Christian)
  - `/names/letter/[letter]/` - Names by starting letter
  - `/blog/[slug]/` - Blog articles
  - `/guides/[slug]/` - Expert guides
  - `/search/` - Global search page
  - `/about/`, `/privacy/`, `/terms/` - Legal/info pages

### `/src/components/` - Reusable Components
- **`apiInstance/`** - API client configuration
- **`Breadcrumbs/`** - Navigation breadcrumbs
- **`ErrorBoundary/`** - React error handling
- **`Filters/`** - Dynamic filtering UI
- **`Footer/`** - Site footer
- **`HomePage/`** - Homepage sections
- **`Layout/`** - Layout wrappers
- **`LoadingAnimation/`** - Loading states
- **`NameDetail/`** - Detailed name information display
- **`Navbar/`** - Navigation bar
- **`OptimizedImage/`** - Image optimization wrapper
- **`OptimizedList/`** - Virtual scrolling for lists
- **`Performance/`** - Performance monitoring
- **`SEO/`** - SEO components
- **`Toast/`** - Toast notifications
- **`ui/`** - shadcn/ui components
- **`VirtualList/`** - Virtual list implementation

### `/src/config/` - Configuration
- **`constants.js`** - Application-wide constants
- **`env.js`** - Environment variable validation and defaults

### `/src/hooks/` - Custom React Hooks
- **`useApi.js`** - API call management
- **`useDebounce.js`** - Debouncing utility
- **`useIntersectionObserver.js`** - Lazy loading
- **`useLocalStorage.js`** - Local storage management
- **`useOptimisticUpdate.js`** - Optimistic updates

### `/src/lib/` - Utility Libraries
- **`api/`** - Centralized API client with caching
- Other utility functions

### `/src/store/` - Zustand State Stores
- **`favorites/`** - Favorites management
- **`filters/`** - Filter state
- **`toasts/`** - Toast notifications
- **`ui/`** - UI state

### `/public/data/` - Static Name Databases
- `islamic-boy-names.json` - Islamic boy names
- `islamic-girl-names.json` - Islamic girl names
- `hindu-boy-names.json` - Hindu boy names
- `hindu-girl-names.json` - Hindu girl names
- `christian-boy-names.json` - Christian boy names
- `christian-girl-names.json` - Christian girl names
- `blog-posts.json` - Blog content

### `/public/` - Static Assets & Sitemaps
- **XML Sitemaps** for SEO (religion-specific and indexed)
- **`robots.txt`** - Search engine directives
- **`sitemap.xml`** - Main sitemap index
- **`manifest.json`** - PWA manifest
- **`sw.js`** - Service worker for offline support

---

## ⚙️ Configuration

### Environment Variables
Required environment variables in `.env.local`:

```env
# Site Configuration
NEXT_PUBLIC_SITE_URL=https://nameverse.vercel.app

# API Configuration
NEXT_PUBLIC_API_BASE=https://namverse-api.vercel.app
NEXT_PUBLIC_API_TIMEOUT=60000  # Request timeout in ms

# Rate Limiting
NEXT_PUBLIC_RATE_LIMIT=60      # Requests per window
NEXT_PUBLIC_RATE_WINDOW=60000  # Time window in ms

# Feature Flags
NEXT_PUBLIC_ENABLE_ANALYTICS=true
NEXT_PUBLIC_ENABLE_PWA=true
NEXT_PUBLIC_ENABLE_SENTRY=false

# Build Settings
NEXT_PUBLIC_BUILD_STATIC=true
NEXT_PUBLIC_BUILD_STATIC_LIMIT=1000
```

### `next.config.mjs`
Configuration highlights:
- **Compression**: Automatic gzip, deflate, brotli
- **Image Formats**: AVIF and WebP supported
- **Security Headers**: CSP, DNS prefetch control
- **Performance**: Optimized bundle and code splitting
- **Development**: Replit environment support

### `middleware.js`
URL sanitization middleware:
- Removes invalid characters from URLs
- Enforces clean slug formatting
- Issues 301 redirects for malformed URLs
- Prevents 404s from pattern mis-matches

### `jsconfig.json`
Path aliases for cleaner imports:
- `@/` → `src/`
- `@/components/` → `src/components/`
- `@/lib/` → `src/lib/`

---

## 🔌 API Integration

### Backend Connection
**Base URL:** `https://namverse-api.vercel.app` (configurable)

### API Endpoints

#### Filters & Options
```
GET /api/v1/filters/:religion
```
Returns available filter options for a specific religion

#### Name Listing
```
GET /api/v1/names
Query Parameters:
  - gender: boy | girl
  - religion: islamic | hindu | christian | modern
  - page: number (pagination)
  - limit: number (results per page)
  - sort: popularity | alphabetical | newest
```

#### Global Search
```
GET /api/v1/names/search
Query Parameters:
  - q: search query
  - limit: number (results limit)
```

#### Names by Starting Letter
```
GET /api/v1/names/:religion/letter/:letter
```

#### Single Name Details
```
GET /api/v1/names/:religion/:slug
```
Returns comprehensive name information including:
- Basic meaning and origin
- Numerology analysis
- Personality traits
- Hidden traits
- Popularity metrics
- Famous people with the name
- Origin history

#### Related Names
```
GET /api/v1/names/:religion/:slug/related
```
Returns names similar in style or meaning

#### Similar Names
```
GET /api/v1/names/:religion/:slug/similar
```
Returns phonetically or stylistically similar names

### API Client Features (`src/lib/api/`)

**Caching:**
- 5-minute TTL for GET requests
- Automatic cache invalidation
- Cache headers respected

**Deduplication:**
- Prevents duplicate concurrent requests
- Merges identical pending requests
- Reduces server load

**Rate Limiting:**
- Configurable request limits
- Time window-based throttling
- Graceful degradation

**Retry Logic:**
- Exponential backoff strategy
- Configurable retry attempts
- Network error handling

**Compression:**
- Automatic gzip support
- Deflate and Brotli compression
- Reduced bandwidth usage

**Monitoring:**
- Request timing and metrics
- Error tracking and logging
- Performance analytics

---

## 📊 Data Sources

### Dual Data Strategy

**1. Static JSON Files** (`/public/data/`)
- Pre-built during build process
- Used for build-time optimization and static generation
- Zero runtime latency
- 6 core files (3 religions × 2 genders)

**2. Dynamic API**
- Real-time data from backend
- Updates without redeploy
- Fresh information and counts
- Pagination support

### Data Structure
```json
{
  "id": "unique-identifier",
  "name": "Liam",
  "meaning": "Strong-willed warrior and protector",
  "origin": "Irish",
  "gender": "boy",
  "religion": "christian",
  "luckyNumber": 7,
  "biblical": false,
  "numerologyNumber": 3,
  "personality": ["Friendly", "Expressive", "Creative"],
  "hiddenTraits": ["Diplomatic", "Intuitive"],
  "compatibility": ["Ava", "Emma", "Sophia"],
  "popularity": "Very High",
  "famousPeople": ["Liam Neeson", "Liam Hemsworth"],
  "originHistory": "The name Liam comes from Irish...",
  "slug": "liam"
}
```

### Data Coverage
- **Records**: 60,000+
- **Religions**: Islamic, Hindu, Christian, Modern
- **Genders**: Boy, Girl
- **Languages**: English, Urdu, Arabic, Hindi
- **Details**: Meanings, origins, numerology, traits, compatibility

---

## 🎨 Components & Pages

### Major Components

#### HomePage
- Hero section with call-to-action
- Alphabet navigation (A-Z)
- Popular names showcase
- Trending names section
- FAQ accordion
- Structured data for SEO

#### NameDetail
- Tabbed interface:
  - **Meaning** - Name meaning and origin
  - **Hidden Traits** - Numerological traits
  - **Popularity** - Usage statistics
  - **Personality** - Character traits
  - **Lucky Attributes** - Numbers, colors, elements
  - **Famous People** - Notable people with name
  - **Origin History** - Cultural background
- Related and similar name suggestions
- Share and bookmark functionality

#### Filters
- Gender selection (Boy/Girl)
- Origin/Culture filtering
- Starting letter quick filter
- Advanced filter panel
- Real-time filtering

#### NameList / VirtualList
- Virtual scrolling for performance
- Lazy loading thumbnails
- Infinite scroll support
- Search highlighting
- Responsive grid layout

#### Navigation
- **Navbar**: Logo, search bar, favorites, menu
- **Breadcrumbs**: Navigation context
- **Footer**: Links, legal, social

### Main Pages

| Route | Purpose |
|-------|---------|
| `/` | Homepage with all categories |
| `/names/[religion]` | Browse names by religion (Islamic, Hindu, Christian) |
| `/names/[religion]/[name]` | Individual name detail page |
| `/names/[religion]/letter/[letter]` | Names starting with specific letter |
| `/islamic/`, `/hindu/`, `/christian/` | Religion-specific landing pages |
| `/blog/[slug]` | Blog articles and naming tips |
| `/guides/[slug]` | Expert naming guides |
| `/search` | Global search results |
| `/about` | About page |
| `/privacy` | Privacy policy |
| `/terms` | Terms of service |

---

## 🚀 Development Setup

### Prerequisites
- Node.js 18+ (LTS recommended)
- npm or yarn package manager
- Git for version control

### Installation

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Create .env.local file
cp .env.example .env.local

# Edit .env.local with your configuration
# Set NEXT_PUBLIC_SITE_URL and NEXT_PUBLIC_API_BASE
```

### Development Server

```bash
# Start development server (runs on port 3000)
npm run dev

# Or with custom port
npm run dev -- -p 3001
```

Visit `http://localhost:3000` in your browser.

### Available Scripts

```bash
# Development
npm run dev          # Start dev server with hot reload

# Production
npm run build        # Build for production
npm start            # Start production server (0.0.0.0:3000)

# Code Quality
npm run lint         # Run ESLint
npm run format       # Format code with Prettier

# Utilities
npm run build-sitemap  # Generate XML sitemaps
```

### Project Structure Tips
- Components should export as default from `index.js`
- Use TS/JSX extensions for clarity
- Follow Tailwind CSS utility first approach
- Use Zustand for global state
- Keep components small and focused

---

## 🏗️ Build & Deployment

### Build Process

```bash
# Full production build
npm run build

# Build output
# - Next.js static optimization
# - Image optimization
# - Code splitting
# - CSS minification
# - JS minification and compression
```

### Deployment Target
**Platform:** Vercel (recommended)

**Why Vercel:**
- Native Next.js support
- Automatic optimizations
- Edge functions support
- Built-in analytics
- Easy environment variables
- GitHub integration

### Deployment Steps

1. **Prepare for deployment:**
   ```bash
   npm run build
   npm run lint
   ```

2. **Push to GitHub:**
   ```bash
   git add .
   git commit -m "Deploy: production build"
   git push origin main
   ```

3. **Vercel Deployment:**
   - Connect GitHub repository to Vercel
   - Set environment variables (see Configuration)
   - Vercel automatically builds and deploys on push

### Environment Variables for Production
Set in Vercel Dashboard → Settings → Environment Variables:

```
NEXT_PUBLIC_SITE_URL → https://nameverse.vercel.app
NEXT_PUBLIC_API_BASE → https://namverse-api.vercel.app
NEXT_PUBLIC_ENABLE_ANALYTICS → true
NEXT_PUBLIC_ENABLE_PWA → true
```

### Performance Specifications
- **Build Time**: ~2-3 minutes
- **First Load**: < 3 seconds
- **Lighthouse Score**: 90+
- **Core Web Vitals**: Green
- **Compression**: Gzip, Brotli enabled

---

## ⚡ Performance Optimizations

### Image Optimization
- **Next.js Image Component** for automatic optimization
- **Multiple Formats**: AVIF (modern browsers), WebP fallback, PNG baseline
- **Responsive Images**: Automatic srcset generation
- **Lazy Loading**: Images load on intersection
- **LQIP**: Low-quality image placeholders

### Code Splitting
- **Route-based**: Each page bundled separately
- **Component-based**: Dynamic imports with `next/dynamic`
- **Vendor splitting**: Dependencies isolated
- **Tree shaking**: Unused code removed

### Caching Strategy
- **API Caching**: 5-minute TTL
- **Static Assets**: Browser cache headers
- **CDN Cache**: Vercel edge caching
- **Service Worker**: Offline availability

### Virtual Scrolling
- **Large Lists**: Only visible items rendered
- **Memory Efficient**: Handles 1000+ items seamlessly
- **Smooth Scrolling**: No jank
- **Lazy Image Loading**: Images load on scroll

### Font Optimization
- **Google Fonts**: Preload key fonts
- **Font Display**: `swap` strategy for fast rendering
- **Variable Fonts**: Single file for multiple weights
- **Subsetting**: Load only required characters

### Database Query Optimization
- **API Deduplication**: Prevents duplicate requests
- **Request Batching**: Group multiple requests
- **Pagination**: Limit data transfer
- **Compression**: Gzip/Brotli enabled

### Monitoring
- **Web Vitals**: Real User Monitoring (RUM)
- **Core Web Vitals Tracking**:
  - LCP (Largest Contentful Paint)
  - FID (First Input Delay)
  - CLS (Cumulative Layout Shift)
- **Performance Dashboard**: Vercel Analytics
- **Error Tracking**: Sentry integration (optional)

---

## 🔒 Security Features

- **Content Security Policy (CSP)** headers
- **HTTPS** enforcement
- **Environment Variables**: Secrets not exposed to client
- **Input Sanitization**: URL and search query validation
- **CORS**: API cross-origin configuration
- **Rate Limiting**: API abuse prevention
- **Middleware Validation**: Request validation

---

## 📱 PWA Features

- **Installable**: Add to home screen
- **Offline Support**: Service worker with cache
- **Manifest**: App icon and metadata
- **Fast Loading**: Cached assets
- **Responsive**: Mobile-first design

---

## 📊 SEO & Metadata

### Sitemaps
- Main sitemap index
- Religion-specific sitemaps (Islamic, Hindu, Christian)
- Auto-generated from name database
- Last modified timestamps

### Structured Data
- JSON-LD schema markup
- OpenGraph metadata
- Twitter Card support
- Rich snippets for search results

### Meta Tags
- Dynamic meta titles and descriptions
- Open Graph images
- Canonical URLs
- Robots directives

### Robots.txt
- Search engine crawling rules
- Disallow admin paths
- Sitemap references

---

## 📝 SEO Analysis Documents

The project includes comprehensive SEO documentation:
- **HERO_SECTION_SEO_ANALYSIS.md** - Homepage hero optimization
- **HOMEPAGE_COMPLETE_OVERVIEW.md** - Homepage structure
- **HOMEPAGE_SEO_AUDIT_REPORT.md** - Full SEO audit findings
- **SEO_KEYWORDS_UPDATE.md** - Keyword strategy updates

---

## 🐛 Troubleshooting

### Build Issues
```bash
# Clear cache and rebuild
rm -rf .next
npm run build

# Check for errors
npm run lint
```

### API Connection Issues
```bash
# Verify environment variables
echo $NEXT_PUBLIC_API_BASE

# Check API availability
curl https://namverse-api.vercel.app/api/v1/filters/islamic
```

### Performance Issues
- Run Lighthouse audit in DevTools
- Check Network tab for slow requests
- Review bundle size: `npm run build -- --analyze`
- Monitor Web Vitals in Vercel Analytics

### Local Development Issues
```bash
# Try new node_modules install
rm -rf node_modules package-lock.json
npm install

# Clear Next.js cache
npm run build -- --no-lint
```

---

## 📚 Additional Resources

### Documentation Files
- `HERO_SECTION_SEO_ANALYSIS.md` - SEO analysis of hero section
- `HOMEPAGE_COMPLETE_OVERVIEW.md` - Complete homepage documentation
- `HOMEPAGE_SEO_AUDIT_REPORT.md` - Full SEO audit
- `SEO_KEYWORDS_UPDATE.md` - Keyword strategy guide

### Attached Assets
- API documentation (routes and endpoints)
- Design specifications
- Architecture diagrams

### External Docs
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [React Documentation](https://react.dev)
- [Zustand Docs](https://github.com/pmndrs/zustand)

---

## 🤝 Contributing

### Code Standards
- Follow ESLint rules
- Use TypeScript/JSX
- Comment complex logic
- Write descriptive commits
- Test changes locally

### Component Creation
```
new-feature/
  ├── index.js
  ├── Component.jsx
  ├── styles.css
  └── Component.test.js
```

### Git Workflow
```bash
# Create feature branch
git checkout -b feature/name-feature

# Make changes and commit
git add .
git commit -m "feat: add new feature"

# Push and create PR
git push origin feature/name-feature
```

---

## 📄 License

Nameverse Frontend - © 2025. All rights reserved.

---

**Last Updated:** April 2025  
**Version:** 1.0.0  
**Maintained By:** Development Team
