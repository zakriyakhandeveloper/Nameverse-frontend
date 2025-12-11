# NameVerse Frontend

A world-class Next.js application for exploring baby names with meanings, origins, and cultural stories across Islamic, Hindu, and Christian traditions.

## 🚀 Features

- **65,000+ Baby Names** with detailed meanings and origins
- **Multi-Religion Support** - Islamic, Hindu, and Christian names
- **Advanced Filtering** - Filter by origin, language, theme, lucky attributes
- **SEO Optimized** - Comprehensive metadata and structured data
- **PWA Ready** - Installable progressive web app
- **Performance Optimized** - ISR, code splitting, caching
- **World-Class Architecture** - Scalable, maintainable, production-ready

## 🏗️ Architecture

This project uses a world-class architecture with:

- **Centralized Configuration** - Environment variables and constants
- **API Client** - Axios with interceptors, retry logic, error handling
- **Error Boundaries** - Comprehensive error handling
- **Custom Hooks** - Reusable React hooks
- **Logging System** - Structured logging with levels
- **Type Safety** - JSDoc type definitions (TypeScript-ready)
- **Cache Management** - LocalStorage cache with TTL

See [ARCHITECTURE.md](./ARCHITECTURE.md) for detailed architecture documentation.

## 📋 Prerequisites

- Node.js 18+ 
- npm, yarn, pnpm, or bun

## 🛠️ Getting Started

### 1. Clone the repository

```bash
git clone <repository-url>
cd frontend
```

### 2. Install dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

### 3. Set up environment variables

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

Fill in your environment variables:

```env
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
NEXT_PUBLIC_API_BASE=https://api.yourdomain.com/api
```

### 4. Run the development server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to see the result.

### 5. Build for production

```bash
npm run build
npm start
```

## 📁 Project Structure

```
src/
├── app/              # Next.js App Router pages
├── components/       # React components
├── config/          # Configuration files
├── hooks/           # Custom React hooks
├── lib/             # Core libraries (API, utils, logger)
└── types/           # Type definitions
```

See [ARCHITECTURE.md](./ARCHITECTURE.md) for detailed structure.

## 🔧 Configuration

### Environment Variables

See `.env.example` for all available environment variables.

### Constants

Application constants are centralized in `src/config/constants.js`.

## 📚 Documentation

- [Architecture Documentation](./ARCHITECTURE.md) - Detailed architecture overview
- [Migration Guide](./MIGRATION_GUIDE.md) - Guide for upgrading from old architecture
- [Code Review](./CODE_REVIEW.md) - Code review and rating

## 🧪 Testing

Testing setup is ready. Recommended tools:

- **Jest** - Unit testing
- **React Testing Library** - Component testing
- **Playwright** - E2E testing

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy!

### Other Platforms

The app can be deployed to any platform that supports Next.js:
- Netlify
- AWS Amplify
- Railway
- DigitalOcean App Platform

## 🛡️ Security

- All sensitive data in environment variables
- Input validation and sanitization
- Security headers in middleware
- Error handling without exposing internals

## 📈 Performance

- ISR (Incremental Static Regeneration)
- Code splitting
- Image optimization
- Caching strategies
- Bundle optimization

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

[Your License Here]

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- All contributors and supporters

---

**Built with ❤️ using Next.js 15**