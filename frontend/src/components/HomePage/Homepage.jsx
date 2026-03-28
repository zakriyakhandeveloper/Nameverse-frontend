"use client";

import { lazy, Suspense } from "react";
import HeroSection from "./HeroSection";
import AlphabetNavigation from "./AlphabetNavigation";
import HomePageSection from "./HomePageSection";

// Lazy load below-fold sections
const PopularNamesSection = lazy(() => import("./PopularNamesSection"));
const TrendingNames = lazy(() => import("./TrendingNames"));
const WhyChooseSection = lazy(() => import("./WhyChooseSection"));
const SEOContentBlock = lazy(() => import("./SeoContentBlock"));
const ComprehensiveFAQ = lazy(() => import("./ComprehensiveFAQ"));
const ArticleExplorer = lazy(() => import("./latestStories"));

// Loading skeleton for lazy sections
const SectionSkeleton = () => (
  <div className="animate-pulse space-y-4 p-8">
    <div className="h-8 bg-gray-200 rounded w-1/3 mx-auto" />
    <div className="h-4 bg-gray-200 rounded w-2/3 mx-auto" />
    <div className="grid grid-cols-3 gap-4 mt-8">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div key={i} className="h-24 bg-gray-200 rounded-xl" />
      ))}
    </div>
  </div>
);

const SITE =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "https://nameverse.com";

export default function HomePageClient({ initialArticles = [], initialCategories = [] }) {
  return (
    <>
      <link rel="preload" as="image" href="/images/hero.jpg" />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "WebSite",
                "@id": `${SITE}/#website`,
                url: `${SITE}/`,
                name: "NameVerse — Baby Names with Meanings | Islamic, Hindu, Christian",
                description:
                  "60,000+ verified baby names from Islamic, Hindu & Christian traditions with meanings in English, Urdu, Arabic & Hindi. Baby naming guides, Quranic names, Sanskrit names, Biblical names.",
                inLanguage: "en-US",
                publisher: { "@id": `${SITE}/#organization` },
                potentialAction: {
                  "@type": "SearchAction",
                  target: {
                    "@type": "EntryPoint",
                    urlTemplate: `${SITE}/search/{search_term_string}`,
                  },
                  "query-input": "required name=search_term_string",
                },
              },
              {
                "@type": "Organization",
                "@id": `${SITE}/#organization`,
                name: "NameVerse",
                url: SITE,
                logo: {
                  "@type": "ImageObject",
                  url: `${SITE}/logo.png`,
                  width: 200,
                  height: 60,
                },
                sameAs: [
                  "https://www.facebook.com/nameverse",
                  "https://twitter.com/nameverse",
                  "https://www.instagram.com/nameverse",
                ],
              },
              {
                "@type": "WebPage",
                "@id": `${SITE}/#webpage`,
                url: `${SITE}/`,
                name: "Baby Names with Meanings | Islamic, Hindu & Christian | NameVerse",
                isPartOf: { "@id": `${SITE}/#website` },
                about: { "@id": `${SITE}/#organization` },
                description:
                  "Find Islamic baby names, Hindu baby names, Christian baby names, baby boy names, baby girl names, names by letter A–Z, meanings in Urdu and Arabic, and expert baby naming articles.",
                primaryImageOfPage: {
                  "@type": "ImageObject",
                  url: `${SITE}/og-image.jpg`,
                },
              },
              {
                "@type": "ItemList",
                name: "Popular baby name categories",
                itemListElement: [
                  {
                    "@type": "ListItem",
                    position: 1,
                    item: {
                      "@type": "Thing",
                      "@id": `${SITE}/names/islamic`,
                      name: "Islamic baby names",
                      description:
                        "Muslim and Quranic baby names with meanings in Urdu and Arabic",
                    },
                  },
                  {
                    "@type": "ListItem",
                    position: 2,
                    item: {
                      "@type": "Thing",
                      "@id": `${SITE}/names/hindu`,
                      name: "Hindu baby names",
                      description: "Sanskrit and Hindi baby names with Vedic meanings",
                    },
                  },
                  {
                    "@type": "ListItem",
                    position: 3,
                    item: {
                      "@type": "Thing",
                      "@id": `${SITE}/names/christian`,
                      name: "Christian baby names",
                      description: "Biblical and saint names with verse references",
                    },
                  },
                  {
                    "@type": "ListItem",
                    position: 4,
                    item: {
                      "@type": "Thing",
                      "@id": `${SITE}/blog`,
                      name: "Baby naming articles & guides",
                      description: "Expert guides on Islamic, Hindu, and Christian naming",
                    },
                  },
                ],
              },
              {
                "@type": "FAQPage",
                mainEntity: [
                  {
                    "@type": "Question",
                    name: "What are popular Muslim baby names?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "Popular Muslim baby names include Muhammad, Ali, Omar, Aisha, Fatima, and Zara. NameVerse lists thousands of Islamic names with Quranic context and Urdu and Arabic meanings.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "Where can I find Hindu baby names with Sanskrit meanings?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "NameVerse offers Hindu baby names from Sanskrit and regional traditions with meanings in Hindi and English, plus pronunciation and deity associations.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "How do I choose a meaningful baby name?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "Consider meaning, pronunciation, family tradition, and spiritual significance. NameVerse provides verified meanings, origins, and naming guides by religion and culture.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "How many baby names does NameVerse include?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "NameVerse features over 60,000 verified names across Islamic, Hindu, and Christian traditions with multilingual meanings and expert-reviewed content.",
                    },
                  },
                ],
              },
              {
                "@type": "BreadcrumbList",
                itemListElement: [
                  {
                    "@type": "ListItem",
                    position: 1,
                    name: "Home",
                    item: SITE,
                  },
                ],
              },
            ],
          }),
        }}
      />

      <main
        role="main"
        className="min-h-screen w-full flex flex-col bg-white [&>section:last-child]:border-b-0"
      >
        {/* 1 — Hero + search */}
        <HomePageSection id="hero" variant="default" aria-label="Hero">
          <HeroSection />
        </HomePageSection>

        {/* 2 — A–Z navigation */}
        <HomePageSection id="browse-by-letter" variant="muted">
          <AlphabetNavigation />
        </HomePageSection>

        {/* 3 — Popular picks */}
        <HomePageSection id="popular-names" variant="default">
          <Suspense fallback={<SectionSkeleton />}>
            <PopularNamesSection />
          </Suspense>
        </HomePageSection>

        {/* 4 — Trending (API) */}
        <HomePageSection id="trending-names" variant="brand">
          <Suspense fallback={<SectionSkeleton />}>
            <TrendingNames />
          </Suspense>
        </HomePageSection>

        {/* 5 — Latest articles (server-hydrated for instant paint) */}
        <HomePageSection id="latest-articles" variant="subtle" aria-labelledby="latest-articles-heading">
          <Suspense fallback={<SectionSkeleton />}>
            <ArticleExplorer
              embedded
              initialArticles={initialArticles}
              initialCategories={initialCategories}
            />
          </Suspense>
        </HomePageSection>

        {/* 6 — Trust / why us */}
        <HomePageSection id="why-nameverse" variant="muted">
          <Suspense fallback={<SectionSkeleton />}>
            <WhyChooseSection />
          </Suspense>
        </HomePageSection>

        {/* 7 — SEO editorial block */}
        <HomePageSection id="baby-name-meanings-seo" variant="default">
          <Suspense fallback={<SectionSkeleton />}>
            <SEOContentBlock />
          </Suspense>
        </HomePageSection>

        {/* 8 — FAQ (bottom: standard SEO pattern) */}
        <HomePageSection id="faq" variant="muted" className="!border-b-0">
          <Suspense fallback={<SectionSkeleton />}>
            <ComprehensiveFAQ />
          </Suspense>
        </HomePageSection>
      </main>
    </>
  );
}
