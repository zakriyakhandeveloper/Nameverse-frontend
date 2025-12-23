# Name Detail Page - Frontend Specification & Implementation Guide

## 🎯 Project Overview
This specification defines the complete frontend implementation for a multi-religious name detail page supporting **Islamic**, **Christian**, and **Hindu** names with world-class design, SEO, and responsive UI.

---

## 📊 Complete Data Structure

### Core Fields (All Religions)

```typescript
interface NameData {
  _id: string;
  name: string;
  slug: string;
  language: string[];
  gender: "Male" | "Female" | "Unisex";
  origin: string;
  religion: "Islam" | "Christianity" | "Hinduism";
  category: string[];
  themes: string[];

  // Meanings
  short_meaning: string;
  long_meaning: string;
  spiritual_meaning: string;

  // Personality & Numerology
  emotional_traits: string[];
  hidden_personality_traits: string[];
  lucky_number?: number;
  lucky_day?: string;
  lucky_colors: string[];
  lucky_stone?: string;
  life_path_number?: number;
  numerology_meaning?: string;

  // Multilingual Support
  in_arabic?: LanguageTranslation;
  in_urdu?: LanguageTranslation;
  in_hindi?: LanguageTranslation;
  in_pashto?: LanguageTranslation;
  in_hebrew?: LanguageTranslation;
  in_greek?: LanguageTranslation;
  in_latin?: LanguageTranslation;
  in_english?: LanguageTranslation;
  in_sanskrit?: LanguageTranslation;
  in_tamil?: LanguageTranslation;
  in_telugu?: LanguageTranslation;

  // Pronunciation
  pronunciation: {
    english: string;
    urdu?: string;
    hindi?: string;
    pashto?: string;
    biblical?: string;
    ipa: string;
  };

  // Social & Related
  celebrity_usage: string[];
  related_names: string[];
  similar_sounding_names: string[];
  social_tags: string[];

  // Religion-Specific
  biblical_reference?: BiblicalReference;  // Christian only
  vedic_reference?: VedicReference;        // Hindu only

  // SEO
  seo: SEOData;
}

interface LanguageTranslation {
  name: string;
  meaning: string;
  long_meaning: string;
}

interface BiblicalReference {
  is_biblical: boolean;
  origin_scripture: string;
  verse_reference: string;
  note: string;
}

interface VedicReference {
  is_vedic: boolean;
  root_origin: string;
  note: string;
}

interface SEOData {
  title: string;
  meta_description: string;
  description_paragraph: string;
  keywords?: string[];
  slug_url?: string;
  faq: FAQItem[];
}

interface FAQItem {
  q: string;
  a: string;
}
```

---

## 🎨 Design System & UI Components

### Color Palette (Religion-Based Theming)

```typescript
const religionThemes = {
  Islam: {
    primary: "#10B981",      // Emerald green
    secondary: "#059669",
    accent: "#D97706",       // Amber
    gradient: "from-emerald-600 to-teal-600",
    light: "#D1FAE5",
    iconColor: "text-emerald-600"
  },
  Christianity: {
    primary: "#3B82F6",      // Blue
    secondary: "#1D4ED8",
    accent: "#DC2626",       // Red
    gradient: "from-blue-600 to-indigo-600",
    light: "#DBEAFE",
    iconColor: "text-blue-600"
  },
  Hinduism: {
    primary: "#F97316",      // Orange
    secondary: "#EA580C",
    accent: "#FDE047",       // Yellow
    gradient: "from-orange-600 to-amber-600",
    light: "#FED7AA",
    iconColor: "text-orange-600"
  }
};
```

### Icon Mapping (Using Lucide React)

```typescript
import {
  Sparkles,         // Name header
  BookOpen,         // Meanings
  Heart,            // Spiritual meaning
  Brain,            // Personality traits
  Gem,              // Lucky stone
  Calendar,         // Lucky day
  Palette,          // Lucky colors
  Hash,             // Numerology
  Languages,        // Translations
  Volume2,          // Pronunciation
  Users,            // Celebrity usage
  Link2,            // Related names
  Tag,              // Social tags
  Book,             // Biblical/Vedic reference
  Star,             // Rating/Featured
  Share2,           // Share button
  Bookmark,         // Save button
  TrendingUp,       // Popularity
  Globe             // Origin/Language
} from "lucide-react";
```

---

## 🏗️ Component Structure

### 1. Hero Section
```jsx
<section className="hero-gradient py-16 px-4">
  <div className="max-w-6xl mx-auto">
    {/* Breadcrumb */}
    <nav className="text-sm mb-6 opacity-90">
      Home > {religion} Names > {gender} > {name}
    </nav>

    {/* Main Name Display */}
    <div className="text-center mb-8">
      <h1 className="text-6xl font-bold mb-4 text-white">
        {name}
      </h1>

      {/* Native Script (Arabic/Hebrew/Sanskrit) */}
      <p className="text-4xl mb-6 font-arabic">
        {in_arabic?.name || in_hebrew?.name || in_sanskrit?.name}
      </p>

      {/* Quick Info Pills */}
      <div className="flex flex-wrap justify-center gap-3 mb-6">
        <Badge icon={<Globe />}>{origin}</Badge>
        <Badge icon={<Users />}>{gender}</Badge>
        <Badge>{religion}</Badge>
        <Badge icon={<TrendingUp />}>Popular</Badge>
      </div>

      {/* Short Meaning */}
      <p className="text-2xl text-white/90 mb-8">
        "{short_meaning}"
      </p>

      {/* Action Buttons */}
      <div className="flex gap-4 justify-center">
        <Button variant="primary" icon={<Share2 />}>Share</Button>
        <Button variant="secondary" icon={<Bookmark />}>Save</Button>
        <Button variant="outline" icon={<Volume2 />}>Pronounce</Button>
      </div>
    </div>
  </div>
</section>
```

### 2. Meanings Section
```jsx
<section className="py-12 px-4 bg-white">
  <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
    <MeaningCard
      icon={<BookOpen />}
      title="Meaning"
      content={long_meaning}
      theme={religionTheme}
    />
    <MeaningCard
      icon={<Heart />}
      title="Spiritual Significance"
      content={spiritual_meaning}
      theme={religionTheme}
    />
    <MeaningCard
      icon={<Sparkles />}
      title="Symbolism"
      content={themes.join(", ")}
      theme={religionTheme}
    />
  </div>
</section>
```

### 3. Multilingual Translations Section
```jsx
<section className="py-12 px-4 bg-gray-50">
  <div className="max-w-6xl mx-auto">
    <SectionHeader icon={<Languages />} title="Translations" />

    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Arabic */}
      {in_arabic && (
        <TranslationCard
          language="Arabic"
          nativeName={in_arabic.name}
          meaning={in_arabic.meaning}
          longMeaning={in_arabic.long_meaning}
          flag="🇸🇦"
        />
      )}

      {/* Urdu */}
      {in_urdu && (
        <TranslationCard
          language="Urdu"
          nativeName={in_urdu.name}
          meaning={in_urdu.meaning}
          longMeaning={in_urdu.long_meaning}
          flag="🇵🇰"
        />
      )}

      {/* Hindi */}
      {in_hindi && (
        <TranslationCard
          language="Hindi"
          nativeName={in_hindi.name}
          meaning={in_hindi.meaning}
          longMeaning={in_hindi.long_meaning}
          flag="🇮🇳"
        />
      )}

      {/* Hebrew */}
      {in_hebrew && (
        <TranslationCard
          language="Hebrew"
          nativeName={in_hebrew.name}
          meaning={in_hebrew.meaning}
          longMeaning={in_hebrew.long_meaning}
          flag="🇮🇱"
        />
      )}

      {/* Sanskrit */}
      {in_sanskrit && (
        <TranslationCard
          language="Sanskrit"
          nativeName={in_sanskrit.name}
          meaning={in_sanskrit.meaning}
          longMeaning={in_sanskrit.long_meaning}
          flag="🕉️"
        />
      )}

      {/* Add more languages as needed */}
    </div>
  </div>
</section>
```

### 4. Pronunciation Guide
```jsx
<section className="py-12 px-4 bg-white">
  <div className="max-w-4xl mx-auto">
    <SectionHeader icon={<Volume2 />} title="How to Pronounce" />

    <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl p-8">
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-semibold mb-3">English</h3>
          <p className="text-3xl font-bold text-purple-600 mb-2">
            {pronunciation.english}
          </p>
          <p className="text-gray-600">IPA: {pronunciation.ipa}</p>
        </div>

        {pronunciation.urdu && (
          <div className="text-right">
            <h3 className="text-lg font-semibold mb-3">Urdu</h3>
            <p className="text-2xl font-arabic">
              {pronunciation.urdu}
            </p>
          </div>
        )}
      </div>

      <button className="mt-6 px-6 py-3 bg-purple-600 text-white rounded-full flex items-center gap-2 mx-auto hover:bg-purple-700 transition">
        <Volume2 size={20} />
        Listen to Pronunciation
      </button>
    </div>
  </div>
</section>
```

### 5. Personality & Numerology
```jsx
<section className="py-12 px-4 bg-gradient-to-br from-indigo-50 to-purple-50">
  <div className="max-w-6xl mx-auto">
    <SectionHeader icon={<Brain />} title="Personality Insights" />

    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* Emotional Traits */}
      <InsightCard
        icon={<Heart />}
        title="Emotional Traits"
        items={emotional_traits}
        color="rose"
      />

      {/* Hidden Traits */}
      <InsightCard
        icon={<Sparkles />}
        title="Hidden Traits"
        items={hidden_personality_traits}
        color="amber"
      />

      {/* Lucky Number */}
      <InsightCard
        icon={<Hash />}
        title="Life Path Number"
        value={life_path_number}
        description={numerology_meaning}
        color="blue"
      />

      {/* Lucky Day */}
      <InsightCard
        icon={<Calendar />}
        title="Lucky Day"
        value={lucky_day}
        color="green"
      />
    </div>

    {/* Lucky Colors & Stone */}
    <div className="mt-8 grid md:grid-cols-2 gap-6">
      <div className="bg-white rounded-2xl p-6 shadow-lg">
        <div className="flex items-center gap-3 mb-4">
          <Palette className="text-pink-600" size={28} />
          <h3 className="text-xl font-bold">Lucky Colors</h3>
        </div>
        <div className="flex gap-3">
          {lucky_colors.map(color => (
            <div
              key={color}
              className="w-16 h-16 rounded-full shadow-md"
              style={{backgroundColor: getColorHex(color)}}
              title={color}
            />
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-lg">
        <div className="flex items-center gap-3 mb-4">
          <Gem className="text-purple-600" size={28} />
          <h3 className="text-xl font-bold">Lucky Stone</h3>
        </div>
        <p className="text-2xl font-semibold text-purple-600">
          {lucky_stone}
        </p>
      </div>
    </div>
  </div>
</section>
```

### 6. Biblical/Vedic Reference (Conditional)
```jsx
{/* For Christian Names */}
{biblical_reference && biblical_reference.is_biblical && (
  <section className="py-12 px-4 bg-blue-50">
    <div className="max-w-4xl mx-auto">
      <SectionHeader icon={<Book />} title="Biblical Reference" />

      <div className="bg-white rounded-2xl p-8 shadow-lg">
        <div className="mb-4">
          <span className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold">
            {biblical_reference.verse_reference}
          </span>
        </div>
        <p className="text-lg text-gray-700 mb-4">
          {biblical_reference.origin_scripture}
        </p>
        <p className="text-gray-600 italic">
          {biblical_reference.note}
        </p>
      </div>
    </div>
  </section>
)}

{/* For Hindu Names */}
{vedic_reference && vedic_reference.is_vedic && (
  <section className="py-12 px-4 bg-orange-50">
    <div className="max-w-4xl mx-auto">
      <SectionHeader icon={<Book />} title="Vedic Origin" />

      <div className="bg-white rounded-2xl p-8 shadow-lg">
        <div className="mb-4">
          <span className="px-4 py-2 bg-orange-100 text-orange-800 rounded-full text-sm font-semibold">
            {vedic_reference.root_origin}
          </span>
        </div>
        <p className="text-lg text-gray-700">
          {vedic_reference.note}
        </p>
      </div>
    </div>
  </section>
)}
```

### 7. Celebrity Usage & Popular Culture
```jsx
<section className="py-12 px-4 bg-white">
  <div className="max-w-6xl mx-auto">
    <SectionHeader icon={<Users />} title="Famous People Named {name}" />

    {celebrity_usage.length > 0 ? (
      <div className="grid md:grid-cols-3 gap-6">
        {celebrity_usage.map((celebrity, idx) => (
          <div key={idx} className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full mb-4 flex items-center justify-center text-white text-2xl font-bold">
              {celebrity.charAt(0)}
            </div>
            <h4 className="font-semibold text-lg">{celebrity}</h4>
          </div>
        ))}
      </div>
    ) : (
      <p className="text-gray-500 text-center py-8">
        No celebrity usage data available yet.
      </p>
    )}
  </div>
</section>
```

### 8. Related & Similar Names
```jsx
<section className="py-12 px-4 bg-gray-50">
  <div className="max-w-6xl mx-auto">
    <div className="grid md:grid-cols-2 gap-8">
      {/* Related Names */}
      <div>
        <SectionHeader icon={<Link2 />} title="Related Names" />
        <div className="flex flex-wrap gap-3">
          {related_names.map(relatedName => (
            <Link
              key={relatedName}
              href={`/name/${relatedName.toLowerCase()}`}
              className="px-4 py-2 bg-white rounded-full border-2 border-gray-200 hover:border-blue-500 hover:text-blue-600 transition font-semibold"
            >
              {relatedName}
            </Link>
          ))}
        </div>
      </div>

      {/* Similar Sounding */}
      <div>
        <SectionHeader icon={<Volume2 />} title="Similar Sounding Names" />
        <div className="flex flex-wrap gap-3">
          {similar_sounding_names.map(similarName => (
            <Link
              key={similarName}
              href={`/name/${similarName.toLowerCase()}`}
              className="px-4 py-2 bg-white rounded-full border-2 border-gray-200 hover:border-green-500 hover:text-green-600 transition font-semibold"
            >
              {similarName}
            </Link>
          ))}
        </div>
      </div>
    </div>
  </div>
</section>
```

### 9. FAQ Schema (SEO-Optimized)
```jsx
<section className="py-12 px-4 bg-white">
  <div className="max-w-4xl mx-auto">
    <SectionHeader icon={<MessageCircle />} title="Frequently Asked Questions" />

    <div className="space-y-4">
      {seo.faq.map((faq, idx) => (
        <Accordion key={idx}>
          <AccordionTrigger className="text-left font-semibold text-lg">
            {faq.q}
          </AccordionTrigger>
          <AccordionContent className="text-gray-700 leading-relaxed">
            {faq.a}
          </AccordionContent>
        </Accordion>
      ))}
    </div>
  </div>
</section>
```

### 10. Social Sharing Section
```jsx
<section className="py-12 px-4 bg-gradient-to-r from-pink-50 to-purple-50">
  <div className="max-w-4xl mx-auto text-center">
    <h2 className="text-3xl font-bold mb-6">Share This Beautiful Name</h2>

    <div className="flex flex-wrap justify-center gap-4 mb-6">
      {social_tags.map(tag => (
        <span key={tag} className="px-4 py-2 bg-white rounded-full text-sm font-semibold text-gray-700 shadow">
          {tag}
        </span>
      ))}
    </div>

    <div className="flex justify-center gap-4">
      <ShareButton platform="twitter" />
      <ShareButton platform="facebook" />
      <ShareButton platform="whatsapp" />
      <ShareButton platform="pinterest" />
      <ShareButton platform="copy" />
    </div>
  </div>
</section>
```

---

## 🔧 Technology Stack & Dependencies

### Core Dependencies
```json
{
  "dependencies": {
    "next": "^14.2.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "typescript": "^5.3.0",

    // UI & Icons
    "lucide-react": "^0.344.0",
    "@radix-ui/react-accordion": "^1.1.2",
    "@radix-ui/react-tabs": "^1.0.4",
    "@radix-ui/react-dialog": "^1.0.5",
    "framer-motion": "^11.0.0",

    // Styling
    "tailwindcss": "^3.4.0",
    "clsx": "^2.1.0",
    "tailwind-merge": "^2.2.0",

    // SEO & Meta
    "next-seo": "^6.5.0",
    "react-helmet-async": "^2.0.4",
    "schema-dts": "^1.1.2",

    // Fonts
    "@next/font": "^14.1.0",
    "next/font/google": "Built-in",

    // Audio/Pronunciation
    "react-speech-kit": "^3.0.1",
    "use-sound": "^4.0.1",

    // Animations
    "gsap": "^3.12.0",
    "aos": "^2.3.4",

    // Share functionality
    "react-share": "^5.1.0",

    // Copy to clipboard
    "react-hot-toast": "^2.4.1"
  }
}
```

### Fonts Configuration (next/font)
```typescript
import { Inter, Playfair_Display, Noto_Nastaliq_Urdu, Noto_Sans_Arabic, Noto_Sans_Devanagari } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' });
const arabic = Noto_Sans_Arabic({ subsets: ['arabic'], variable: '--font-arabic' });
const urdu = Noto_Nastaliq_Urdu({ subsets: ['arabic'], variable: '--font-urdu' });
const devanagari = Noto_Sans_Devanagari({ subsets: ['devanagari'], variable: '--font-devanagari' });
```

---

## 🎯 SEO Implementation

### 1. Next.js Metadata API (App Router)
```typescript
// app/name/[slug]/page.tsx
export async function generateMetadata({ params }): Promise<Metadata> {
  const nameData = await fetchNameData(params.slug);

  return {
    title: nameData.seo.title,
    description: nameData.seo.meta_description,
    keywords: nameData.seo.keywords?.join(', '),

    openGraph: {
      title: nameData.seo.title,
      description: nameData.seo.meta_description,
      type: 'article',
      url: `https://yoursite.com/name/${params.slug}`,
      images: [
        {
          url: `/api/og?name=${nameData.name}&religion=${nameData.religion}`,
          width: 1200,
          height: 630,
        }
      ],
    },

    twitter: {
      card: 'summary_large_image',
      title: nameData.seo.title,
      description: nameData.seo.meta_description,
      images: [`/api/og?name=${nameData.name}`],
    },

    alternates: {
      canonical: `https://yoursite.com/name/${params.slug}`,
    },

    robots: {
      index: true,
      follow: true,
    }
  };
}
```

### 2. Structured Data (JSON-LD)
```typescript
const structuredData = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": nameData.seo.title,
  "description": nameData.seo.meta_description,
  "author": {
    "@type": "Organization",
    "name": "Nameverse"
  },
  "datePublished": new Date().toISOString(),
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": `https://yoursite.com/name/${slug}`
  }
};

// FAQ Schema
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": nameData.seo.faq.map(faq => ({
    "@type": "Question",
    "name": faq.q,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.a
    }
  }))
};
```

### 3. Dynamic OG Image Generation
```typescript
// app/api/og/route.tsx
import { ImageResponse } from 'next/og';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const name = searchParams.get('name');
  const religion = searchParams.get('religion');

  return new ImageResponse(
    (
      <div style={{
        background: religionThemes[religion].gradient,
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <h1 style={{ fontSize: 96, color: 'white' }}>{name}</h1>
        <p style={{ fontSize: 48, color: 'white' }}>Meaning & Origin</p>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
```

---

## 📱 Responsive Design Breakpoints

```typescript
const breakpoints = {
  sm: '640px',   // Mobile
  md: '768px',   // Tablet
  lg: '1024px',  // Desktop
  xl: '1280px',  // Large Desktop
  '2xl': '1536px' // Extra Large
};

// Tailwind Config
module.exports = {
  theme: {
    screens: {
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    }
  }
}
```

### Mobile-First Approach
```jsx
// Example responsive component
<div className="
  px-4 py-8           // Mobile
  md:px-8 md:py-12   // Tablet
  lg:px-16 lg:py-16  // Desktop
  max-w-7xl mx-auto
">
  <h1 className="
    text-3xl          // Mobile
    md:text-5xl       // Tablet
    lg:text-6xl       // Desktop
    font-bold
  ">
    {name}
  </h1>
</div>
```

---

## ⚡ Performance Optimization

### 1. Image Optimization
```typescript
import Image from 'next/image';

// Lazy load images
<Image
  src="/path/to/image.jpg"
  alt="Description"
  width={800}
  height={600}
  loading="lazy"
  placeholder="blur"
/>
```

### 2. Code Splitting
```typescript
// Dynamic imports for heavy components
import dynamic from 'next/dynamic';

const PronunciationPlayer = dynamic(
  () => import('./PronunciationPlayer'),
  { loading: () => <Skeleton /> }
);
```

### 3. Font Optimization
```typescript
// Preload critical fonts
<link
  rel="preload"
  href="/fonts/arabic.woff2"
  as="font"
  type="font/woff2"
  crossOrigin="anonymous"
/>
```

---

## 🎨 Animation & Interactions

### Framer Motion Examples
```typescript
import { motion } from 'framer-motion';

// Fade in on scroll
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.6 }}
>
  <ContentCard />
</motion.div>

// Stagger children
<motion.div
  variants={{
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }}
  initial="hidden"
  animate="show"
>
  {items.map(item => (
    <motion.div
      key={item}
      variants={{
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
      }}
    >
      {item}
    </motion.div>
  ))}
</motion.div>
```

---

## 🌐 Internationalization (i18n)

```typescript
// next.config.js
module.exports = {
  i18n: {
    locales: ['en', 'ar', 'ur', 'hi'],
    defaultLocale: 'en',
  },
}

// Translations
const translations = {
  en: {
    meaning: "Meaning",
    pronunciation: "Pronunciation",
    // ...
  },
  ar: {
    meaning: "المعنى",
    pronunciation: "النطق",
    // ...
  }
}
```

---

## 🧪 Testing & Quality Assurance

### Lighthouse Targets
- Performance: 90+
- Accessibility: 100
- Best Practices: 100
- SEO: 100

### A11y Requirements
- ARIA labels for all interactive elements
- Keyboard navigation support
- Screen reader compatibility
- Color contrast ratio 4.5:1 minimum
- Focus indicators visible

---

## 📦 File Structure

```
app/
├── name/
│   └── [slug]/
│       ├── page.tsx              # Main name detail page
│       ├── loading.tsx           # Loading skeleton
│       └── error.tsx             # Error boundary
├── api/
│   ├── og/
│   │   └── route.tsx            # OG image generation
│   └── names/
│       └── [slug]/
│           └── route.ts         # API endpoint
components/
├── name-detail/
│   ├── HeroSection.tsx
│   ├── MeaningCard.tsx
│   ├── TranslationCard.tsx
│   ├── PronunciationGuide.tsx
│   ├── PersonalityInsights.tsx
│   ├── BiblicalReference.tsx
│   ├── VedicReference.tsx
│   ├── CelebrityUsage.tsx
│   ├── RelatedNames.tsx
│   ├── FAQSection.tsx
│   └── ShareSection.tsx
├── ui/
│   ├── Button.tsx
│   ├── Badge.tsx
│   ├── Card.tsx
│   ├── Accordion.tsx
│   └── SectionHeader.tsx
lib/
├── utils/
│   ├── colors.ts               # Color utilities
│   ├── seo.ts                  # SEO helpers
│   └── formatters.ts           # Data formatters
├── hooks/
│   ├── useName.ts
│   └── useShare.ts
└── constants/
    ├── themes.ts
    └── icons.ts
```

---

## 🚀 Implementation Checklist

### Phase 1: Setup
- [ ] Initialize Next.js 14 project with App Router
- [ ] Install all dependencies
- [ ] Configure Tailwind CSS
- [ ] Setup font families (Inter, Arabic, Devanagari)
- [ ] Create theme configuration

### Phase 2: Core Components
- [ ] Build reusable UI components (Button, Card, Badge)
- [ ] Implement religion-based theming system
- [ ] Create section components (Hero, Meanings, etc.)
- [ ] Add icon mapping system

### Phase 3: Data Integration
- [ ] Create API route for fetching name data
- [ ] Implement data fetching hooks
- [ ] Add loading states and skeletons
- [ ] Handle error states

### Phase 4: Features
- [ ] Implement pronunciation player
- [ ] Add share functionality
- [ ] Create bookmark/save feature
- [ ] Build related names navigation

### Phase 5: SEO & Performance
- [ ] Add metadata generation
- [ ] Implement structured data (JSON-LD)
- [ ] Create dynamic OG image generation
- [ ] Optimize images and fonts
- [ ] Add sitemap generation

### Phase 6: Polish
- [ ] Add animations (Framer Motion)
- [ ] Implement responsive design
- [ ] Test accessibility (a11y)
- [ ] Cross-browser testing
- [ ] Mobile testing (iOS/Android)

### Phase 7: Testing & Launch
- [ ] Run Lighthouse audits
- [ ] Test SEO with Google Search Console
- [ ] Performance testing (Core Web Vitals)
- [ ] User acceptance testing
- [ ] Deploy to production

---

## 🎨 Sample Color Usage

```typescript
// Islamic Name Example
<div className="bg-gradient-to-br from-emerald-500 to-teal-600">
  <Gem className="text-emerald-600" />
  <Badge className="bg-emerald-100 text-emerald-800">Islamic</Badge>
</div>

// Christian Name Example
<div className="bg-gradient-to-br from-blue-500 to-indigo-600">
  <Book className="text-blue-600" />
  <Badge className="bg-blue-100 text-blue-800">Christian</Badge>
</div>

// Hindu Name Example
<div className="bg-gradient-to-br from-orange-500 to-amber-600">
  <Sparkles className="text-orange-600" />
  <Badge className="bg-orange-100 text-orange-800">Hindu</Badge>
</div>
```

---

## 📊 Analytics & Tracking

```typescript
// Google Analytics Events
const trackEvent = (action: string, category: string, label: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
    });
  }
};

// Example usage
trackEvent('share', 'Name Detail', name);
trackEvent('pronunciation_play', 'Engagement', name);
trackEvent('save_name', 'Conversion', name);
```

---

## 🔒 Security Best Practices

- Sanitize all user inputs
- Use CSP headers
- Implement rate limiting on API routes
- Validate data from backend
- Use HTTPS only
- Implement proper CORS policies

---

## 📝 Notes

1. **Accessibility First**: Every component must be keyboard navigable and screen-reader friendly
2. **Performance Budget**: Page load under 3 seconds on 3G networks
3. **Mobile-First**: Design and test for mobile before desktop
4. **Progressive Enhancement**: Core content must work without JavaScript
5. **Semantic HTML**: Use proper HTML5 elements for better SEO and accessibility

---

## 🎯 Success Metrics

- Page Load Speed: < 2s
- Lighthouse Score: 90+ (all categories)
- Mobile Usability: 100/100
- Core Web Vitals: All "Good"
- SEO Score: 100/100
- Accessibility: WCAG 2.1 AA compliant

---

**This specification provides everything needed to build a world-class name detail page with exceptional UX, SEO, and performance. Use this as your complete reference guide for implementation.**
